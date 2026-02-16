import { AppSettings, DEFAULT_SETTINGS, ReviewTemplate } from '../types';

class SettingsService {
    /**
     * Retrieves a setting value from localStorage, falling back to the default.
     * Handles type conversion for numbers and booleans.
     */
    get<K extends keyof AppSettings>(key: K): AppSettings[K] {
        const rawValue = localStorage.getItem(key);

        if (rawValue === null) {
            return DEFAULT_SETTINGS[key];
        }

        const defaultValue = DEFAULT_SETTINGS[key];
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
     * Saves a setting value to localStorage.
     */
    set<K extends keyof AppSettings>(key: K, value: AppSettings[K]): void {
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
            settings[key] = this.get(key);
        });
        return settings;
    }
}

export const settingsService = new SettingsService();
