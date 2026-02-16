import { useEffect, useRef } from 'react';
import { useContent } from './useContent';
import { usePastebin, getSyncQuota } from './usePastebin';
import { useSettings } from './useSettings';

// Helper to sort objects by ID to ignore order changes
const stringifyUnordered = (items: any[]) => {
    // Create a copy and sort by ID
    const sorted = [...items].sort((a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
    });
    return JSON.stringify(sorted);
};

export function useAutoSync() {
    const { templates, phrases, isLoaded } = useContent();
    const { syncTemplatesToCloud, syncPhrasesToCloud, isLoading } = usePastebin();
    const { settings } = useSettings();
    
    // Use refs to track previous states to detect meaningful changes
    // We store unordered JSON to detect content changes (ignoring order)
    const prevTemplatesRef = useRef<string | null>(null);
    const prevPhrasesRef = useRef<string | null>(null);

    useEffect(() => {
        // Skip initial mount and initialization phase
        if (!isLoaded) {
            return;
        }

        // Initialize refs once when data is loaded
        if (prevTemplatesRef.current === null) {
            prevTemplatesRef.current = stringifyUnordered(templates);
        }
        if (prevPhrasesRef.current === null) {
            prevPhrasesRef.current = stringifyUnordered(phrases);
        }

        // Only sync if API is configured
        if (!settings.amazon_pastebin_api_dev_key || !settings.amazon_pastebin_api_user_key) {
            return;
        }

        // Check quota before auto-syncing
        const quota = getSyncQuota();
        if (quota.count >= 18) {
            console.warn('[Auto-Sync] Quota limit approaching. Disabling auto-sync to preserve remaining slots.');
            return;
        }

        // Use unordered stringify to ignore reordering
        const currentTemplatesJson = stringifyUnordered(templates);
        const currentPhrasesJson = stringifyUnordered(phrases);

        // Check if templates or phrases actually changed (ignoring order)
        const templatesChanged = currentTemplatesJson !== prevTemplatesRef.current;
        const phrasesChanged = currentPhrasesJson !== prevPhrasesRef.current;

        if ((templatesChanged || phrasesChanged) && !isLoading) {
            console.log(`[Auto-Sync] Detected content changes (${templatesChanged ? 'Templates' : ''}${templatesChanged && phrasesChanged ? ', ' : ''}${phrasesChanged ? 'Phrases' : ''}), triggering cloud sync...`);
            
            // Update refs immediately to prevent duplicate triggers
            prevTemplatesRef.current = currentTemplatesJson;
            prevPhrasesRef.current = currentPhrasesJson;

            // Trigger sync with a small delay to batch rapid changes if needed
            const timer = setTimeout(() => {
                if (templatesChanged && settings.amazon_auto_sync_templates) {
                    syncTemplatesToCloud().then(res => {
                        if (res.success) console.log('[Auto-Sync] Successfully synced Templates.');
                        else console.warn('[Auto-Sync] Failed to sync Templates:', res.message);
                    });
                }
                
                if (phrasesChanged && settings.amazon_auto_sync_phrases) {
                    syncPhrasesToCloud().then(res => {
                        if (res.success) console.log('[Auto-Sync] Successfully synced Phrases.');
                        else console.warn('[Auto-Sync] Failed to sync Phrases:', res.message);
                    });
                }
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [templates, phrases, isLoaded, settings.amazon_pastebin_api_dev_key, settings.amazon_pastebin_api_user_key, syncTemplatesToCloud, syncPhrasesToCloud, isLoading]);
}
