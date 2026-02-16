import { useCallback } from 'react';
import { useSettingsContext } from '../context/SettingsContext';

export interface Template {
    id: string;
    title: string;
    content: string;
    editorHeight?: number;
}

export interface Phrase {
    id: string;
    label?: string;
    content: string;
    category?: string;
}

export function useContent() {
    const { templates, phrases, isLoaded, setTemplates, setPhrases } = useSettingsContext();

    // --- Template Operations ---

    const addTemplate = useCallback((template: Omit<Template, 'id'>) => {
        const newTemplate = { ...template, id: crypto.randomUUID() };
        setTemplates([...templates, newTemplate]);
    }, [templates, setTemplates]);

    const updateTemplate = useCallback((id: string, updates: Partial<Template>) => {
        const newTemplates = templates.map(t => t.id === id ? { ...t, ...updates } : t);
        setTemplates(newTemplates);
    }, [templates, setTemplates]);

    const deleteTemplate = useCallback((id: string) => {
        const newTemplates = templates.filter(t => t.id !== id);
        setTemplates(newTemplates);
    }, [templates, setTemplates]);

    const reorderTemplates = useCallback((newOrder: string[]) => {
        // Create a map for quick lookup
        const templateMap = new Map(templates.map(t => [t.id, t]));
        // Reorder based on the new order, filtering out any IDs that don't exist
        const reordered = newOrder
            .map(id => templateMap.get(id))
            .filter((t): t is Template => t !== undefined);
        setTemplates(reordered);
    }, [templates, setTemplates]);

    // --- Phrase Operations ---

    const addPhrase = useCallback((phrase: Omit<Phrase, 'id'>) => {
        const newPhrase = { ...phrase, id: crypto.randomUUID() };
        setPhrases([...phrases, newPhrase]);
    }, [phrases, setPhrases]);

    const deletePhrase = useCallback((id: string) => {
        const newPhrases = phrases.filter(p => p.id !== id);
        setPhrases(newPhrases);
    }, [phrases, setPhrases]);

    return {
        templates,
        phrases,
        isLoaded,
        addTemplate,
        updateTemplate,
        deleteTemplate,
        reorderTemplates,
        addPhrase,
        deletePhrase,
        saveLocalTemplates: setTemplates,
        saveLocalPhrases: setPhrases,
    };
}
