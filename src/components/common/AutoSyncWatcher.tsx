import React from 'react';
import { useAutoSync } from '../../hooks/useAutoSync';

/**
 * Headless component that activates the auto-sync hook.
 * Place this inside SettingsProvider to enable background cloud syncing.
 */
export const AutoSyncWatcher: React.FC = () => {
    useAutoSync();
    return null;
};
