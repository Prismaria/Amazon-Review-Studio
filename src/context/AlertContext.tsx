import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertOptions {
    title: string;
    text?: string;
    html?: string;
    icon?: AlertType;
    showCancelButton?: boolean;
    confirmButtonText?: string;
    cancelButtonText?: string;
    confirmButtonColor?: string;
    cancelButtonColor?: string;
}

interface AlertState extends AlertOptions {
    id: string;
    resolve: (value: { isConfirmed: boolean }) => void;
}

interface AlertContextType {
    alert: (options: AlertOptions | string) => Promise<{ isConfirmed: boolean }>;
    confirm: (options: AlertOptions | string) => Promise<{ isConfirmed: boolean }>;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [alerts, setAlerts] = useState<AlertState[]>([]);

    const showAlert = useCallback((options: AlertOptions | string, showCancel: boolean = false) => {
        return new Promise<{ isConfirmed: boolean }>((resolve) => {
            const id = Math.random().toString(36).substring(2, 9);
            const alertOptions: AlertOptions = typeof options === 'string'
                ? { title: options, icon: 'info' }
                : options;

            const newAlert: AlertState = {
                ...alertOptions,
                id,
                showCancelButton: alertOptions.showCancelButton ?? showCancel,
                resolve: (result) => {
                    setAlerts((prev) => prev.filter((a) => a.id !== id));
                    resolve(result);
                },
            };

            setAlerts((prev) => [...prev, newAlert]);
        });
    }, []);

    const alert = useCallback((options: AlertOptions | string) => showAlert(options, false), [showAlert]);
    const confirm = useCallback((options: AlertOptions | string) => showAlert(options, true), [showAlert]);

    return (
        <AlertContext.Provider value={{ alert, confirm }}>
            {children}
            <AlertPortal alerts={alerts} />
        </AlertContext.Provider>
    );
};

// Internal Portal Component
import { AlertPortal } from '../components/common/AlertPortal';
