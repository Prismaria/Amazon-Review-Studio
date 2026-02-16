import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AppSettings, ReviewTemplate } from '../types';
import { settingsService } from '../services/settings';
import { Template, Phrase } from '../hooks/useContent';

interface SettingsContextType {
    settings: AppSettings;
    setSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
    templates: Template[];
    phrases: Phrase[];
    isLoaded: boolean;
    setTemplates: (templates: Template[]) => void;
    setPhrases: (phrases: Phrase[]) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const DEFAULT_PHRASES: Phrase[] = [
    { id: 'p1', label: 'Highly Recommended', content: 'I highly recommend this product!' },
    { id: 'p2', label: 'Game Changer', content: 'This item is a total game changer.' },
    { id: 'p3', label: 'Good Value', content: 'Great quality for the price.' },
    { id: 'p4', label: 'Pros/Cons Intro', content: 'Here are the pros and cons based on my experience:' },
];

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [settings, setSettingsState] = useState<AppSettings>(settingsService.getAll());
    const [templates, setTemplatesState] = useState<Template[]>([]);
    const [phrases, setPhrasesState] = useState<Phrase[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Initial load
        const savedT = localStorage.getItem('amazon_review_templates');
        if (savedT) setTemplatesState(JSON.parse(savedT));

        const savedP = localStorage.getItem('amazon_review_phrases');
        if (savedP) {
            setPhrasesState(JSON.parse(savedP));
        } else {
            setPhrasesState(DEFAULT_PHRASES);
            localStorage.setItem('amazon_review_phrases', JSON.stringify(DEFAULT_PHRASES));
        }
        
        setIsLoaded(true);

        const handleStorageChange = () => {
            setSettingsState(settingsService.getAll());
            const updatedT = localStorage.getItem('amazon_review_templates');
            if (updatedT) setTemplatesState(JSON.parse(updatedT));
            const updatedP = localStorage.getItem('amazon_review_phrases');
            if (updatedP) setPhrasesState(JSON.parse(updatedP));
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const setSetting = useCallback(<K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
        settingsService.set(key, value);
        setSettingsState((prev) => ({ ...prev, [key]: value }));
    }, []);

    const setTemplates = useCallback((t: Template[]) => {
        localStorage.setItem('amazon_review_templates', JSON.stringify(t));
        setTemplatesState(t);
    }, []);

    const setPhrases = useCallback((p: Phrase[]) => {
        localStorage.setItem('amazon_review_phrases', JSON.stringify(p));
        setPhrasesState(p);
    }, []);

    return (
        <SettingsContext.Provider value={{
            settings,
            setSetting,
            templates,
            phrases,
            isLoaded,
            setTemplates,
            setPhrases
        }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettingsContext = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettingsContext must be used within a SettingsProvider');
    }
    return context;
};
