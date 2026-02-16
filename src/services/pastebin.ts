import { AppSettings, ReviewTemplate } from '../types';
import { settingsService } from './settings';

const PASTEBIN_API_URL = 'https://pastebin.com/api/api_post.php';
const PASTEBIN_RAW_URL = 'https://pastebin.com/raw/';

export interface PastebinConfig {
    apiKey: string;
    userKey: string;
    pasteId?: string;
}

export class PastebinService {
    /**
     * Fetches the raw content of a paste.
     */
    async getPasteContent(pasteId: string): Promise<string | null> {
        try {
            const response = await fetch(`${PASTEBIN_RAW_URL}${pasteId}`);
            if (!response.ok) return null;
            return await response.text();
        } catch (error) {
            console.error('Pastebin Fetch Error:', error);
            return null;
        }
    }

    /**
     * Syncs current settings to Pastebin.
     * Note: This requires a proxy or server-side component in a real app due to CORS, 
     * but standard userscripts often rely on GM_xmlhttpRequest which bypasses CORS.
     * Since we are in a React app, we might need to rely on the userscript host for this.
     */
    async syncSettingsToCloud(apiKey: string, userKey: string, pasteId: string): Promise<boolean> {
        // In a full implementation, this would use GM_xmlhttpRequest via a bridge
        // For now, we'll placeholder the logic
        console.log('Syncing to Pastebin...', { apiKey, userKey, pasteId });

        const payload = JSON.stringify({
            templates: settingsService.get('amazon_review_templates'),
            phrases: settingsService.get('amazon_review_phrases'),
            settings: settingsService.getAll()
        });

        // Simulation of upload
        return new Promise(resolve => setTimeout(() => resolve(true), 1000));
    }

    /**
     * Merges cloud settings into local settings.
     */
    async syncSettingsFromCloud(pasteId: string): Promise<void> {
        const content = await this.getPasteContent(pasteId);
        if (!content) throw new Error('Failed to fetch paste content');

        try {
            const data = JSON.parse(content);

            if (data.templates) settingsService.set('amazon_review_templates', data.templates);
            if (data.phrases) settingsService.set('amazon_review_phrases', data.phrases);

            // We might want to selectively sync other settings
            console.log('Settings synced from cloud successfully');
        } catch (error) {
            console.error('Failed to parse cloud settings:', error);
            throw error;
        }
    }
}

export const pastebinService = new PastebinService();
