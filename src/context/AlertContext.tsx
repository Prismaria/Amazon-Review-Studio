import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface AlertResult {
    isConfirmed: boolean;
    isDenied?: boolean;
}

interface AlertOptions {
    title: string;
    text?: string;
    html?: string;
    icon?: AlertType;
    showCancelButton?: boolean;
    showDenyButton?: boolean;
    confirmButtonText?: string;
    cancelButtonText?: string;
    denyButtonText?: string;
    confirmButtonColor?: string;
    cancelButtonColor?: string;
    denyButtonColor?: string;
}

interface AlertState extends AlertOptions {
    id: string;
    resolve: (value: AlertResult) => void;
}

interface AlertContextType {
    alert: (options: AlertOptions | string) => Promise<AlertResult>;
    confirm: (options: AlertOptions | string) => Promise<AlertResult>;
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
        return new Promise<AlertResult>((resolve) => {
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
