import { AppSettings, DEFAULT_SETTINGS, ReviewTemplate } from '../types';

class SettingsService {
    /**
     * Retrieves a setting value from GM_getValue (extension bridge), localStorage, or default.
     * Handles type conversion and merging with extension popup settings.
     */
    get<K extends keyof AppSettings>(key: K): AppSettings[K] {
        const defaultValue = DEFAULT_SETTINGS[key];

        // 1. Try Extension Bridge (Cached in loader.js)
        if (typeof GM_getValue !== 'undefined') {
            const gmValue = GM_getValue(key);
            if (gmValue !== undefined && gmValue !== null) return gmValue as AppSettings[K];

            // 2. Check if it's inside the merged 'arsSettings' from popup
            const arsSettings = GM_getValue('arsSettings');
            if (arsSettings && typeof arsSettings === 'object' && (key in arsSettings)) {
                return arsSettings[key] as AppSettings[K];
            }
        }

        // 3. Fallback to localStorage
        const rawValue = localStorage.getItem(key);
        if (rawValue === null) {
            return defaultValue;
        }

        const type = typeof defaultValue;
        if (type === 'number') {
            const num = Number(rawValue);
            return (Number.isNaN(num) ? defaultValue : num) as AppSettings[K];
        }

        if (type === 'boolean') {
            return (rawValue === 'true') as AppSettings[K];
        }

        if (key === 'amazon_review_templates' || key === 'amazon_review_phrases') {
            try {
                return JSON.parse(rawValue) as AppSettings[K];
            } catch (e) {
                console.warn(`Failed to parse setting ${key}:`, e);
                return defaultValue;
            }
        }

        return rawValue as AppSettings[K];
    }

    /**
     * Saves a setting value.
     */
    set<K extends keyof AppSettings>(key: K, value: AppSettings[K]): void {
        // 1. Save to GM_setValue if available
        if (typeof GM_setValue !== 'undefined') {
            GM_setValue(key, value);
        }

        // 2. Save to localStorage for persistence inside the page
        if (typeof value === 'object' && value !== null) {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.setItem(key, String(value));
        }
    }

    /**
     * Retrieves all settings as a single object.
     */
    getAll(): AppSettings {
        const settings = { ...DEFAULT_SETTINGS };
        (Object.keys(DEFAULT_SETTINGS) as Array<keyof AppSettings>).forEach((key) => {
            (settings as any)[key] = this.get(key);
        });
        return settings;
    }
}

export const settingsService = new SettingsService();
