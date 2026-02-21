import { useState, useCallback } from 'react';
import { useContent } from './useContent';
import { useSettings } from './useSettings';

const PASTEBIN_API_LOGIN_URL = 'https://pastebin.com/api/api_login.php';
const PASTEBIN_API_POST_URL = 'https://pastebin.com/api/api_post.php';
const PASTEBIN_API_RAW_URL = 'https://pastebin.com/raw/';

// --- Quota Constants & Helpers ---
const PASTEBIN_DAILY_LIMIT = 20;
const PASTEBIN_WARNING_THRESHOLD = 15;
const PASTEBIN_AUTO_DISABLE_THRESHOLD = 18;
const QUOTA_STORAGE_KEY = 'amazon_review_studio_sync_quota';

interface SyncQuota {
    date: string;
    count: number;
}

export function getSyncQuota(): SyncQuota {
    const today = new Date().toDateString();
    const stored = localStorage.getItem(QUOTA_STORAGE_KEY);
    if (stored) {
        try {
            const data = JSON.parse(stored);
            // Reset if it's a new day
            if (data.date !== today) {
                return { date: today, count: 0 };
            }
            return data;
        } catch (e) {
            console.error('Review Studio: Failed to parse sync quota:', e);
        }
    }
    return { date: today, count: 0 };
}

function incrementSyncQuota(): number {
    const quota = getSyncQuota();
    quota.count++;
    localStorage.setItem(QUOTA_STORAGE_KEY, JSON.stringify(quota));
    return quota.count;
}

export function usePastebin() {
    const { settings, setSetting } = useSettings();
    const [isLoading, setIsLoading] = useState(false);
    const { templates, phrases, saveLocalTemplates, saveLocalPhrases } = useContent();

    const apiRequest = async (url: string, method: 'POST' | 'GET', data?: URLSearchParams) => {
        // @ts-ignore
        if (typeof GM_xmlhttpRequest !== 'undefined') {
            return new Promise<string>((resolve, reject) => {
                // @ts-ignore
                GM_xmlhttpRequest({
                    method: method,
                    url: url,
                    data: data ? data.toString() : undefined,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    onload: (response: any) => {
                        if (response.status >= 200 && response.status < 300) resolve(response.responseText);
                        else reject(new Error(response.responseText || `HTTP ${response.status}`));
                    },
                    onerror: (error: any) => reject(error)
                });
            });
        } else {
            const response = await fetch(url, {
                method: method,
                body: data,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            const text = await response.text();
            if (!response.ok) throw new Error(text || `HTTP ${response.status}`);
            return text;
        }
    };

    const generateUserKey = useCallback(async (username?: string, password?: string, updateRecovery = false) => {
        const user = username || settings.amazon_pastebin_api_user_name;
        const pass = password || settings.amazon_pastebin_api_user_password;
        const devKey = settings.amazon_pastebin_api_dev_key;
        if (!user || !pass || !devKey) throw new Error('Missing credentials');
        setIsLoading(true);
        try {
            const data = new URLSearchParams({ api_dev_key: devKey, api_user_name: user, api_user_password: pass });
            const userKey = await apiRequest(PASTEBIN_API_LOGIN_URL, 'POST', data);
            if (userKey.includes('Bad API request')) throw new Error(userKey);

            setSetting('amazon_pastebin_api_user_name', user);
            setSetting('amazon_pastebin_api_user_password', pass);
            setSetting('amazon_pastebin_api_user_key', userKey);

            if (updateRecovery) {
                // We'll call saveUserKeyToCloud separately in the UI to keep logic clean, 
                // but we could also do it here. For now just returning the key.
            }

            return userKey;
        } catch (error: any) {
            throw new Error(error.message || 'Failed to generate User Key');
        } finally {
            setIsLoading(false);
        }
    }, [settings, setSetting]);

    const createPaste = useCallback(async (title: string, content: string, format = 'json', privacy = '2') => {
        if (!settings.amazon_pastebin_api_dev_key || !settings.amazon_pastebin_api_user_key) throw new Error('Missing Keys');

        // Check quota before creating
        const quota = getSyncQuota();
        if (quota.count >= PASTEBIN_DAILY_LIMIT) {
            throw new Error(`Pastebin daily limit reached (${PASTEBIN_DAILY_LIMIT}/20). Try again tomorrow.`);
        }

        const data = new URLSearchParams({
            api_dev_key: settings.amazon_pastebin_api_dev_key,
            api_user_key: settings.amazon_pastebin_api_user_key,
            api_option: 'paste',
            api_paste_code: content,
            api_paste_name: title,
            api_paste_format: format,
            api_paste_private: privacy
        });
        const response = await apiRequest(PASTEBIN_API_POST_URL, 'POST', data);
        if (response.includes('Bad API request')) throw new Error(response);

        // Only increment quota on successful creation
        incrementSyncQuota();

        const match = response.match(/pastebin\.com\/(.+)$/);
        return match ? match[1] : response;
    }, [settings]);

    const deletePaste = useCallback(async (pasteKey: string) => {
        if (!settings.amazon_pastebin_api_dev_key || !settings.amazon_pastebin_api_user_key) return;
        const data = new URLSearchParams({
            api_dev_key: settings.amazon_pastebin_api_dev_key,
            api_user_key: settings.amazon_pastebin_api_user_key,
            api_option: 'delete',
            api_paste_key: pasteKey
        });
        const response = await apiRequest(PASTEBIN_API_POST_URL, 'POST', data);
        if (response.includes('Bad API request') && !response.includes('Paste does not exist')) throw new Error(response);
    }, [settings]);

    const getPasteContent = useCallback(async (pasteKey: string) => {
        try {
            const response = await fetch(`${PASTEBIN_API_RAW_URL}${pasteKey}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.text();
        } catch {
            return await apiRequest(`${PASTEBIN_API_RAW_URL}${pasteKey}`, 'GET');
        }
    }, []);

    const listPastes = useCallback(async (limit = 100) => {
        if (!settings.amazon_pastebin_api_dev_key || !settings.amazon_pastebin_api_user_key) throw new Error('Not logged in');
        const data = new URLSearchParams({
            api_dev_key: settings.amazon_pastebin_api_dev_key,
            api_user_key: settings.amazon_pastebin_api_user_key,
            api_option: 'list',
            api_results_limit: limit.toString()
        });
        const xmlResponse = await apiRequest(PASTEBIN_API_POST_URL, 'POST', data);
        if (xmlResponse.includes('Bad API request')) throw new Error(xmlResponse);

        console.log('[Cloud Sync] Raw XML response length:', xmlResponse.length);
        console.log('[Cloud Sync] Raw XML response:', xmlResponse.substring(0, 2000));

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlResponse, 'text/xml');
        const pasteElements = xmlDoc.getElementsByTagName('paste');

        console.log('[Cloud Sync] XML parsed paste elements:', pasteElements.length);

        // If XML parsing didn't work properly, try manual parsing as fallback
        let pastes: { key: string; title: string }[] = [];

        if (pasteElements.length === 0 || pasteElements.length === 1) {
            console.log('[Cloud Sync] XML parsing may have failed, trying manual parsing...');

            // Manual parsing using regex
            const pasteMatches = xmlResponse.match(/<paste>([\s\S]*?)<\/paste>/g);
            if (pasteMatches) {
                console.log(`[Cloud Sync] Manual parsing found ${pasteMatches.length} pastes`);

                for (const pasteXml of pasteMatches) {
                    const titleMatch = pasteXml.match(/<paste_title>([^<]+)<\/paste_title>/);
                    const keyMatch = pasteXml.match(/<paste_key>([^<]+)<\/paste_key>/);

                    if (titleMatch && keyMatch) {
                        const title = titleMatch[1];
                        const key = keyMatch[1];
                        console.log(`[Cloud Sync] Manual parse - Title: "${title}", Key: "${key}"`);
                        pastes.push({ key, title });
                    }
                }
            }
        } else {
            // Use normal XML parsing
            pastes = Array.from(pasteElements).map(node => ({
                key: node.querySelector('paste_key')?.textContent || node.getElementsByTagName('paste_key')[0]?.textContent || '',
                title: node.querySelector('paste_title')?.textContent || node.getElementsByTagName('paste_title')[0]?.textContent || '',
            }));
        }

        console.log(`[Cloud Sync] Total pastes parsed: ${pastes.length}`);
        pastes.forEach(p => console.log(`[Cloud Sync] Parsed paste: "${p.title}" (${p.key})`));

        return pastes;
    }, [settings]);

    const fetchUserKeyFromCloud = useCallback(async (recoveryId?: string) => {
        const id = recoveryId || settings.amazon_pastebin_recovery_id;
        if (!id) throw new Error('Missing Recovery Paste ID');

        setIsLoading(true);
        try {
            const content = await getPasteContent(id);
            const encoded = content.trim();
            const decoded = atob(encoded);

            if (decoded.length === 32 && /^[a-f0-9]+$/i.test(decoded)) {
                setSetting('amazon_pastebin_api_user_key', decoded);
                if (recoveryId) setSetting('amazon_pastebin_recovery_id', recoveryId);
                return decoded;
            } else {
                throw new Error('Invalid User Key format in recovery paste');
            }
        } catch (error: any) {
            throw new Error(error.message || 'Failed to recover User Key');
        } finally {
            setIsLoading(false);
        }
    }, [settings, getPasteContent, setSetting]);

    const syncTemplatesToCloud = useCallback(async () => {
        setIsLoading(true);
        try {
            const pastes = await listPastes();
            const existingT = pastes.find(p => p.title === 'Amazon Review Templates');
            const tContent = JSON.stringify({ version: '1.0', templates: templates.map(t => ({ name: t.title, text: t.content, height: t.editorHeight })) });
            if (existingT) await deletePaste(existingT.key);
            await createPaste('Amazon Review Templates', tContent);
            return { success: true, message: 'Templates synced' };
        } catch (e: any) { return { success: false, message: e.message }; }
        finally { setIsLoading(false); }
    }, [listPastes, templates, deletePaste, createPaste]);

    const syncPhrasesToCloud = useCallback(async () => {
        setIsLoading(true);
        try {
            const pastes = await listPastes();
            const existingP = pastes.find(p => p.title === 'Amazon Review Phrases');
            const pContent = JSON.stringify({ version: '1.0', lastUpdated: new Date().toISOString(), phrases: phrases.map(p => ({ name: p.label || p.content.slice(0, 20), text: p.content })) });
            if (existingP) await deletePaste(existingP.key);
            await createPaste('Amazon Review Phrases', pContent);
            return { success: true, message: 'Phrases synced' };
        } catch (e: any) { return { success: false, message: e.message }; }
        finally { setIsLoading(false); }
    }, [listPastes, phrases, deletePaste, createPaste]);

    const syncAllToCloud = useCallback(async () => {
        setIsLoading(true);
        try {
            await syncTemplatesToCloud();
            await syncPhrasesToCloud();
            return { success: true, message: 'Templates & Phrases synced' };
        } catch (e: any) { return { success: false, message: e.message }; }
        finally { setIsLoading(false); }
    }, [syncTemplatesToCloud, syncPhrasesToCloud]);

    const syncTemplatesFromCloud = useCallback(async () => {
        setIsLoading(true);
        console.log('[Cloud Sync] Starting template and phrase import...');
        try {
            const pastes = await listPastes();
            let importedCount = 0;
            let currentTemplates = [...templates];
            let currentPhrases = [...phrases];

            const generateId = () => {
                try { return crypto.randomUUID(); }
                catch { return Math.random().toString(36).substring(2) + Date.now().toString(36); }
            };

            // 1. Fetch Templates (Modern Grouped takes priority)
            const modernT = pastes.find(p => p.title === 'Amazon Review Templates');
            if (modernT) {
                console.log('[Cloud Sync] Found modern grouped templates. Using as source of truth.');
                const data = JSON.parse(await getPasteContent(modernT.key));
                const tList = data.templates || data;
                if (Array.isArray(tList)) {
                    // Reset local templates to match cloud truth exactly
                    currentTemplates = tList.map((t: any) => ({
                        id: generateId(),
                        title: t.name || t.title,
                        content: t.text || t.content,
                        editorHeight: t.height
                    })).filter(t => t.title && t.content);
                    importedCount++;
                }
            } else {
                // 2. Fallback to Legacy Individual Templates only if modern grouped is missing
                // Broadened filter to catch legacy templates more reliably
                console.log('[Cloud Sync] No modern grouped templates found. Checking for legacy individual templates...');
                console.log(`[Cloud Sync] Total pastes found: ${pastes.length}`);

                // Log all pastes for debugging
                pastes.forEach(p => {
                    console.log(`[Cloud Sync] Paste found: "${p.title}"`);
                });

                const legacyT = pastes.filter(p => {
                    // Must start with the template prefix (with or without trailing space)
                    const hasPrefix = p.title.startsWith('Amazon Review Template:') ||
                        p.title.startsWith('Amazon Review Template: ');

                    // Exclude the phrases paste
                    const isPhrases = p.title === 'Amazon Review Template: Amazon Review Phrases' ||
                        p.title.includes('Amazon Review Phrases');

                    // Exclude review pastes (they contain specific review indicators)
                    // IMPORTANT: Only check for the specific review suffix format, not just 'REVIEW'
                    // because template titles like "Standard Pros/Cons Review" contain 'Review'
                    const isReview = p.title.includes(' — REVIEW — ') ||
                        p.title.includes(' - REVIEW - ') ||
                        /\s-\sREVIEW\s-\s[A-Z0-9]{10}$/.test(p.title) ||  // "Product - REVIEW - ASIN" format
                        /\s—\sREVIEW\s—\s[A-Z0-9]{10}$/.test(p.title);    // "Product — REVIEW — ASIN" format

                    const include = hasPrefix && !isPhrases && !isReview;

                    if (hasPrefix) {
                        console.log(`[Cloud Sync] Filter check for "${p.title}": hasPrefix=${hasPrefix}, isPhrases=${isPhrases}, isReview=${isReview}, include=${include}`);
                    }

                    return include;
                });

                console.log(`[Cloud Sync] Filtered to ${legacyT.length} legacy templates`);

                if (legacyT.length > 0) {
                    console.log(`[Cloud Sync] No modern templates found. Falling back to ${legacyT.length} legacy individual templates.`);
                    for (const p of legacyT) {
                        try {
                            // Extract name from title, handling both formats
                            const name = p.title
                                .replace('Amazon Review Template: ', '')
                                .replace('Amazon Review Template:', '')
                                .trim();

                            if (!name) {
                                console.warn(`[Cloud Sync] Skipping template with empty name: ${p.title}`);
                                continue;
                            }

                            const content = await getPasteContent(p.key);
                            let text = content;
                            let height: any = undefined;
                            let templateName = name;

                            // Improved JSON parsing for legacy templates
                            if (content.trim().startsWith('{')) {
                                try {
                                    const data = JSON.parse(content);

                                    // Handle both modern and legacy JSON formats
                                    text = data.text || data.content || content;
                                    height = data.height || data.editorHeight;

                                    // Use name from JSON if available (legacy format includes name)
                                    if (data.name && typeof data.name === 'string') {
                                        templateName = data.name;
                                    }

                                    // Validate extracted text
                                    if (!text || (typeof text !== 'string')) {
                                        console.warn(`[Cloud Sync] Invalid text in template ${p.title}, using raw content`);
                                        text = content;
                                    }
                                } catch (e) {
                                    console.warn(`[Cloud Sync] Failed to parse JSON for ${p.title}, using raw content`);
                                }
                            }

                            // Check for duplicate by name (either from title or JSON)
                            const idx = currentTemplates.findIndex(et =>
                                et.title === templateName || et.title === name
                            );

                            if (idx >= 0) {
                                // Update existing template
                                currentTemplates[idx] = {
                                    ...currentTemplates[idx],
                                    title: templateName,
                                    content: text,
                                    editorHeight: height
                                };
                                console.log(`[Cloud Sync] Updated existing template: ${templateName}`);
                            } else {
                                // Add new template
                                currentTemplates.push({
                                    id: generateId(),
                                    title: templateName,
                                    content: text,
                                    editorHeight: height
                                });
                                console.log(`[Cloud Sync] Imported new template: ${templateName}`);
                            }
                            importedCount++;
                        } catch (err) {
                            console.error(`[Cloud Sync] Failed to import individual template: ${p.title}`, err);
                        }
                    }
                } else {
                    console.log('[Cloud Sync] No legacy individual templates found.');
                }
            }

            // 3. Fetch Phrases (Modern takes priority)
            let phrasePaste = pastes.find(p => p.title === 'Amazon Review Phrases');
            const isModernPhrase = !!phrasePaste;

            if (!phrasePaste) {
                phrasePaste = pastes.find(p => p.title === 'Amazon Review Template: Amazon Review Phrases');
            }

            if (phrasePaste) {
                console.log(`[Cloud Sync] Found phrases list (${isModernPhrase ? 'Modern' : 'Legacy'}).`);
                const data = JSON.parse(await getPasteContent(phrasePaste.key));
                const pList = data.phrases || data;
                if (Array.isArray(pList)) {
                    if (isModernPhrase) {
                        // Source of truth: replace local with cloud
                        currentPhrases = pList.map((p: any) => ({
                            id: generateId(),
                            label: p.name || p.label || '',
                            content: p.text || p.content
                        })).filter(p => p.content);
                    } else {
                        // Legacy: merge as before
                        pList.forEach((p: any) => {
                            const label = p.name || p.label || '';
                            const text = p.text || p.content;
                            if (!text) return;
                            const idx = currentPhrases.findIndex(ep => ep.content === text);
                            if (idx === -1) {
                                currentPhrases.push({ id: generateId(), label, content: text });
                            }
                        });
                    }
                    importedCount++;
                }
            }

            if (importedCount > 0) {
                saveLocalTemplates(currentTemplates);
                saveLocalPhrases(currentPhrases);
                console.log(`[Cloud Sync] Successfully imported ${importedCount} items.`);
                return { success: true, message: `Sync completed: Found ${importedCount} items` };
            }

            console.warn('[Cloud Sync] No valid sync data found in your Pastebin account.');
            return { success: false, message: 'No sync data found in cloud' };
        } catch (e: any) {
            console.error('[Cloud Sync] Critical error during import:', e);
            return { success: false, message: e.message };
        }
        finally { setIsLoading(false); }
    }, [listPastes, getPasteContent, templates, phrases, saveLocalTemplates, saveLocalPhrases]);

    const REVIEW_OBFUSCATION_HEADER = `=== AMAZON REVIEW STUDIO PASTE ===
This Pastebin contains an encrypted, base64-encoded review draft.
It has been obfuscated for general privacy reasons and to
prevent search engines from indexing unreleased review content.

To view the contents of this review, you must import it using
the Amazon Review Studio browser extension.
================================

`;

    const PLAINTEXT_HEADER = `=== AMAZON REVIEW STUDIO PASTE ===
This is a review draft created via the Amazon Review Studio extension.
Please do not comment on this paste directly, thank you.
================================

`;

    const saveReviewToCloud = useCallback(async (reviewData: { reviewTitle: string, reviewBody: string, asin: string, productTitle: string }) => {
        setIsLoading(true);
        try {
            const ObjectContentJson = JSON.stringify({ ...reviewData, savedAt: new Date().toISOString() });

            let finalContent = '';
            if (settings.amazon_pastebin_privacy_mode) {
                // Encode content to safe Base64 (handling UTF-8)
                const base64Content = btoa(unescape(encodeURIComponent(ObjectContentJson)));
                finalContent = REVIEW_OBFUSCATION_HEADER + base64Content;
            } else {
                finalContent = PLAINTEXT_HEADER + ObjectContentJson;
            }

            const pastes = await listPastes();
            const titleSuffix = ` - REVIEW - ${reviewData.asin}`;
            const existing = pastes.find(p => p.title.endsWith(titleSuffix));
            const pasteTitle = `${reviewData.productTitle.slice(0, 50)}${titleSuffix}`;

            if (existing) await deletePaste(existing.key);
            // Reviews are saved as Public (0) to avoid private paste limits and formatted as text
            await createPaste(pasteTitle, finalContent, 'text', '0');
            return { success: true, message: 'Review saved' };
        } catch (e: any) { return { success: false, message: e.message }; }
        finally { setIsLoading(false); }
    }, [listPastes, deletePaste, createPaste, settings.amazon_pastebin_privacy_mode]);

    const fetchReviewFromCloud = useCallback(async (asin: string) => {
        setIsLoading(true);
        try {
            const pastes = await listPastes();
            const existing = pastes.find(p => p.title.endsWith(` - REVIEW - ${asin}`));
            if (!existing) return { success: false, message: 'No review found' };

            const rawContent = await getPasteContent(existing.key);
            let parsedData;

            // Check if it's the new obfuscated format
            if (rawContent.includes('=== AMAZON REVIEW STUDIO PASTE ===')) {
                const parts = rawContent.split('================================');
                if (parts.length > 1) {
                    const base64Payload = parts[1].trim();
                    try {
                        const decodedJson = decodeURIComponent(escape(atob(base64Payload)));
                        parsedData = JSON.parse(decodedJson);
                    } catch (decodeErr) {
                        return { success: false, message: 'Failed to decode review content' };
                    }
                } else {
                    return { success: false, message: 'Invalid obfuscated paste format' };
                }
            } else {
                // Fallback to legacy plain JSON parsing
                try {
                    parsedData = JSON.parse(rawContent);
                } catch (parseErr) {
                    return { success: false, message: 'Failed to parse legacy review data' };
                }
            }

            return { success: true, message: 'Review fetched', data: parsedData };
        } catch (e: any) { return { success: false, message: e.message }; }
        finally { setIsLoading(false); }
    }, [listPastes, getPasteContent]);

    const testConnection = useCallback(async () => {
        setIsLoading(true);
        try {
            const testTitle = `Test Connection - ${new Date().toISOString()}`;
            const pasteKey = await createPaste(testTitle, 'Connection Test Success', 'text', '1'); // Unlisted
            await deletePaste(pasteKey);
            return { success: true, message: 'Connection successful!' };
        } catch (e: any) {
            return { success: false, message: e.message };
        } finally {
            setIsLoading(false);
        }
    }, [createPaste, deletePaste]);

    const findRecoveryPasteID = useCallback(async () => {
        setIsLoading(true);
        try {
            const pastes = await listPastes();
            const recoveryPaste = pastes.find(p => p.title === 'Amazon Review - Account Token');
            if (recoveryPaste) {
                setSetting('amazon_pastebin_recovery_id', recoveryPaste.key);
                return { success: true, pasteId: recoveryPaste.key };
            }
            return { success: false, message: 'No recovery paste found on your account.' };
        } catch (e: any) {
            return { success: false, message: e.message };
        } finally {
            setIsLoading(false);
        }
    }, [listPastes, setSetting]);

    const saveUserKeyToCloud = useCallback(async () => {
        if (!settings.amazon_pastebin_api_user_key) throw new Error('No User Key to save');
        setIsLoading(true);
        try {
            const pastes = await listPastes();
            const existing = pastes.find(p => p.title === 'Amazon Review - Account Token');
            const encodedKey = btoa(settings.amazon_pastebin_api_user_key);
            if (existing) await deletePaste(existing.key);
            const newPasteId = await createPaste('Amazon Review - Account Token', encodedKey, 'text', '1'); // Unlisted
            setSetting('amazon_pastebin_recovery_id', newPasteId);
            return { success: true, pasteId: newPasteId };
        } catch (e: any) {
            return { success: false, message: e.message };
        } finally {
            setIsLoading(false);
        }
    }, [listPastes, settings.amazon_pastebin_api_user_key, deletePaste, createPaste, setSetting]);

    const clearCloudData = useCallback(async () => {
        setIsLoading(true);
        try {
            const pastes = await listPastes();
            const appPastes = pastes.filter(p =>
                p.title === 'Amazon Review Templates' ||
                p.title === 'Amazon Review - Account Token' ||
                p.title.includes(' - REVIEW - ')
            );
            if (appPastes.length === 0) return { success: true, message: 'No cloud data found.' };

            for (const paste of appPastes) {
                await deletePaste(paste.key);
            }
            return { success: true, message: `Cleared ${appPastes.length} pastes from cloud.` };
        } catch (e: any) {
            return { success: false, message: e.message };
        } finally {
            setIsLoading(false);
        }
    }, [listPastes, deletePaste]);

    return {
        isLoading,
        syncTemplatesToCloud,
        syncPhrasesToCloud,
        syncAllToCloud,
        syncTemplatesFromCloud,
        saveReviewToCloud,
        fetchReviewFromCloud,
        generateUserKey,
        fetchUserKeyFromCloud,
        testConnection,
        findRecoveryPasteID,
        saveUserKeyToCloud,
        clearCloudData,
        getSyncQuota // Exposed for UI display
    };
}
