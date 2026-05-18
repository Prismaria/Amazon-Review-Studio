import type { Phrase, Template } from '../hooks/useContent';

export interface NormalizedTemplate {
    name: string;
    text: string;
    height?: number;
}

export interface NormalizedPhrase {
    label: string;
    text: string;
}

export type ImportMode = 'merge' | 'replace';

export interface ImportApplyResult<T> {
    items: T[];
    changed: boolean;
    importedCount: number;
}

function stableTemplateKey(t: NormalizedTemplate): string {
    return JSON.stringify({ name: t.name, text: t.text, height: t.height ?? null });
}

function stablePhraseKey(p: NormalizedPhrase): string {
    return JSON.stringify({ label: p.label, text: p.text });
}

export function normalizeTemplatesFromLocal(templates: Template[]): NormalizedTemplate[] {
    return templates
        .map(t => ({
            name: t.title,
            text: t.content,
            height: t.editorHeight,
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
}

export function normalizePhrasesFromLocal(phrases: Phrase[]): NormalizedPhrase[] {
    return phrases
        .map(p => ({
            label: p.label || '',
            text: p.content,
        }))
        .sort((a, b) => a.text.localeCompare(b.text));
}

export function parseCloudTemplatesFromPaste(content: string): NormalizedTemplate[] {
    try {
        const data = JSON.parse(content);
        const tList = data.templates || data;
        if (!Array.isArray(tList)) return [];
        return tList
            .map((t: any) => ({
                name: (t.name || t.title || '').trim(),
                text: (t.text || t.content || '').trim(),
                height: t.height ?? t.editorHeight,
            }))
            .filter((t: NormalizedTemplate) => t.name && t.text)
            .sort((a, b) => a.name.localeCompare(b.name));
    } catch {
        return [];
    }
}

export function parseCloudPhrasesFromPaste(content: string): NormalizedPhrase[] {
    try {
        const data = JSON.parse(content);
        const pList = data.phrases || data;
        if (!Array.isArray(pList)) return [];
        return pList
            .map((p: any) => ({
                label: (p.name || p.label || '').trim(),
                text: (p.text || p.content || '').trim(),
            }))
            .filter((p: NormalizedPhrase) => p.text)
            .sort((a, b) => a.text.localeCompare(b.text));
    } catch {
        return [];
    }
}

export function areNormalizedTemplatesEqual(a: NormalizedTemplate[], b: NormalizedTemplate[]): boolean {
    if (a.length !== b.length) return false;
    const aKeys = a.map(stableTemplateKey).sort();
    const bKeys = b.map(stableTemplateKey).sort();
    return aKeys.every((k, i) => k === bKeys[i]);
}

export function areNormalizedPhrasesEqual(a: NormalizedPhrase[], b: NormalizedPhrase[]): boolean {
    if (a.length !== b.length) return false;
    const aKeys = a.map(stablePhraseKey).sort();
    const bKeys = b.map(stablePhraseKey).sort();
    return aKeys.every((k, i) => k === bKeys[i]);
}

export function areLocalTemplatesEqual(a: Template[], b: Template[]): boolean {
    return areNormalizedTemplatesEqual(
        normalizeTemplatesFromLocal(a),
        normalizeTemplatesFromLocal(b)
    );
}

export function areLocalPhrasesEqual(a: Phrase[], b: Phrase[]): boolean {
    return areNormalizedPhrasesEqual(
        normalizePhrasesFromLocal(a),
        normalizePhrasesFromLocal(b)
    );
}

export function applyTemplatesImport(
    local: Template[],
    cloud: NormalizedTemplate[],
    mode: ImportMode,
    generateId: () => string
): ImportApplyResult<Template> {
    let result: Template[] = mode === 'replace' ? [] : [...local];
    let importedCount = 0;

    for (const ct of cloud) {
        const idx = result.findIndex(t => t.title === ct.name);
        if (idx >= 0) {
            const prev = result[idx];
            const next = { ...prev, content: ct.text, editorHeight: ct.height };
            if (prev.content !== ct.text || prev.editorHeight !== ct.height) {
                importedCount++;
            }
            result[idx] = next;
        } else {
            result.push({
                id: generateId(),
                title: ct.name,
                content: ct.text,
                editorHeight: ct.height,
            });
            importedCount++;
        }
    }

    return {
        items: result,
        changed: !areLocalTemplatesEqual(local, result),
        importedCount,
    };
}

export function applyPhrasesImport(
    local: Phrase[],
    cloud: NormalizedPhrase[],
    mode: ImportMode,
    generateId: () => string
): ImportApplyResult<Phrase> {
    let result: Phrase[] = mode === 'replace' ? [] : [...local];
    let importedCount = 0;

    for (const cp of cloud) {
        const idx = result.findIndex(ep => ep.content === cp.text);
        if (idx === -1) {
            result.push({ id: generateId(), label: cp.label, content: cp.text });
            importedCount++;
        } else if (cp.label && !result[idx].label) {
            result[idx] = { ...result[idx], label: cp.label };
            importedCount++;
        }
    }

    return {
        items: result,
        changed: !areLocalPhrasesEqual(local, result),
        importedCount,
    };
}
