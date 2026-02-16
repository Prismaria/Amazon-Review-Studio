import React, { useState } from 'react';
import { Settings, Cpu, Cloud, Info, ShieldCheck, Key, RefreshCw, DownloadCloud, HelpCircle, Edit2, Search, Trash2, Bug } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';
import { useSettings } from '../../hooks/useSettings';
import { usePastebin } from '../../hooks/usePastebin';
export interface SettingsDashboardProps {
    isOpen: boolean;
    onClose: () => void;
    initialTab?: Tab;
}

type Tab = 'ai' | 'sync' | 'about' | 'debug';

import Swal from 'sweetalert2';

export const SettingsDashboard: React.FC<SettingsDashboardProps> = ({ isOpen, onClose, initialTab = 'ai' }) => {
    const { settings, setSetting } = useSettings();
    const [activeTab, setActiveTab] = useState<Tab>(initialTab);
    const { generateUserKey, fetchUserKeyFromCloud, testConnection, findRecoveryPasteID, saveUserKeyToCloud, clearCloudData, isLoading } = usePastebin();
    const [syncStatus, setSyncStatus] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isUserKeyEditable, setIsUserKeyEditable] = useState(false);

    const handleGenerateKey = async () => {
        try {
            setSyncStatus({ type: 'info', message: 'Authenticating...' });
            await generateUserKey();
            setSyncStatus({ type: 'success', message: 'Successfully authenticated!' });
        } catch (error: any) {
            setSyncStatus({ type: 'error', message: error.message });
        }
    };

    const handleTestConnection = async () => {
        setSyncStatus({ type: 'info', message: 'Testing connection...' });
        const result = await testConnection();
        setSyncStatus({ type: result.success ? 'success' : 'error', message: result.message });
    };

    const handleFindRecoveryPaste = async () => {
        setSyncStatus({ type: 'info', message: 'Searching for recovery paste...' });
        const result = await findRecoveryPasteID();
        if (result.success) {
            setSyncStatus({ type: 'success', message: `Found recovery paste: ${result.pasteId}` });
        } else {
            setSyncStatus({ type: 'error', message: result.message });
        }
    };

    const handleFetchKey = async () => {
        try {
            setSyncStatus({ type: 'info', message: 'Attempting key recovery...' });
            await fetchUserKeyFromCloud();
            setSyncStatus({ type: 'success', message: 'API User Key successfully recovered!' });
        } catch (error: any) {
            setSyncStatus({ type: 'error', message: error.message });
        }
    };

    const handleClearCloud = async () => {
        if (!confirm('This will delete all synced templates and review backups from Pastebin. Continue?')) return;
        setSyncStatus({ type: 'info', message: 'Clearing cloud data...' });
        const result = await clearCloudData();
        setSyncStatus({ type: result.success ? 'success' : 'error', message: result.message });
    };

    const handleSaveUserKeyToCloud = async () => {
        setSyncStatus({ type: 'info', message: 'Creating recovery paste...' });
        const result = await saveUserKeyToCloud();
        if (result.success) {
            setSyncStatus({ type: 'success', message: `Recovery paste created: ${result.pasteId}` });
        } else {
            setSyncStatus({ type: 'error', message: result.message });
        }
    };

    const handleSaveAndClose = () => {
        setIsSaving(true);
        // Explicitly show a "Saved" state before closing for feedback
        setTimeout(() => {
            setIsSaving(false);
            onClose();
        }, 300);
    };

    const handleManualSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 2000);
    };

    const handleAIEnabledChange = async (enabled: boolean) => {
        if (enabled) {
            // Check if user has already accepted the ToS
            if (!settings.amazon_ai_tos_accepted) {
                const result = await Swal.fire({
                    title: 'ATTENTION!',
                    text: 'This feature has the potential to be abused to generate reviews without any user input. By enabling this feature, you agree to write your own review first. Do you accept?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yeah sure, whatever.',
                    cancelButtonText: 'No! Get me outta here!',
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                });

                if (result.isConfirmed) {
                    setSetting('amazon_ai_tos_accepted', true);
                    setSetting('amazon_ai_enabled', true);
                }
            } else {
                // Already accepted, just enable
                setSetting('amazon_ai_enabled', true);
            }
        } else {
            setSetting('amazon_ai_enabled', false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Amazon Review Studio Settings"
            width="740px"
        >
            <div className="ars-settings-layout p-2">
                {/* Sidebar Tabs */}
                <aside className="ars-settings-sidebar">
                    <Button
                        variant={activeTab === 'sync' ? 'secondary' : 'ghost'}
                        className="ars-tab-btn"
                        onClick={() => setActiveTab('sync')}
                        icon={<Cloud size={18} />}
                    >
                        Cloud Sync
                    </Button>
                    <Button
                        variant={activeTab === 'ai' ? 'secondary' : 'ghost'}
                        className="ars-tab-btn"
                        onClick={() => setActiveTab('ai')}
                        icon={<Cpu size={18} />}
                    >
                        AI Configuration
                    </Button>
                    <Button
                        variant={activeTab === 'about' ? 'secondary' : 'ghost'}
                        className="ars-tab-btn"
                        onClick={() => setActiveTab('about')}
                        icon={<Info size={18} />}
                    >
                        About
                    </Button>
                    <Button
                        variant={activeTab === 'debug' ? 'secondary' : 'ghost'}
                        className="ars-tab-btn"
                        onClick={() => setActiveTab('debug')}
                        icon={<Bug size={18} />}
                    >
                        Debug
                    </Button>
                </aside>

                {/* Content Area */}
                <main className="ars-settings-content">
                    {activeTab === 'ai' && (
                        <div className="ars-settings-section">
                            <h3>AI Engine Settings</h3>

                            <div className="ars-setting-group border border-indigo-100 bg-indigo-50/30 p-4 rounded-xl mb-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg ${settings.amazon_ai_enabled ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                            <Cpu size={20} />
                                        </div>
                                        <div>
                                            <label className="font-semibold text-gray-900 block cursor-pointer select-none" htmlFor="ai-toggle">
                                                AI Features
                                            </label>
                                            <p className="text-xs text-gray-500">Enable automated content generation</p>
                                        </div>
                                    </div>
                                    <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                                        <input
                                            id="ai-toggle"
                                            type="checkbox"
                                            className="peer absolute w-full h-full opacity-0 z-10 cursor-pointer"
                                            checked={settings.amazon_ai_enabled}
                                            onChange={(e) => handleAIEnabledChange(e.target.checked)}
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                    </div>
                                </div>
                            </div>

                            <div 
                                className={`transition-all duration-500 ease-in-out ${settings.amazon_ai_enabled ? 'opacity-100' : 'opacity-40 pointer-events-none grayscale'}`}
                            >
                                <div className="ars-setting-group border border-gray-100 bg-white p-5 rounded-xl shadow-sm mb-6">
                                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Provider Configuration</h4>
                                    
                                    <div className="grid gap-6">
                                        <div className="ars-setting-item">
                                            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Primary AI Provider</label>
                                            <div className="relative">
                                                <select
                                                    value={settings.amazon_ai_provider}
                                                    onChange={(e) => setSetting('amazon_ai_provider', e.target.value as any)}
                                                    className="ars-select w-full pl-10 pr-12 h-10 bg-gray-50 border-gray-200 focus:bg-white transition-colors appearance-none leading-normal"
                                                    disabled={!settings.amazon_ai_enabled}
                                                >
                                                    <option value="gemini">Google Gemini (Recommended)</option>
                                                    <option value="local">Local LLM Server</option>
                                                </select>
                                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                                                    {settings.amazon_ai_provider === 'gemini' ? <Cloud size={16} /> : <Cpu size={16} />}
                                                </div>
                                            </div>
                                        </div>

                                        {settings.amazon_ai_provider === 'gemini' ? (
                                            <div className="space-y-5 animate-in fade-in slide-in-from-top-2">
                                                <div className="ars-setting-item">
                                                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Model Selection</label>
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative flex-1 min-w-0">
                                                            <select
                                                                value={settings.amazon_ai_gemini_model}
                                                                onChange={(e) => setSetting('amazon_ai_gemini_model', e.target.value)}
                                                                className="ars-select w-full pl-3 pr-12 h-10 bg-gray-50 border-gray-200 focus:bg-white leading-normal"
                                                                disabled={!settings.amazon_ai_enabled}
                                                            >
                                                                <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
                                                                <option value="gemini-3-flash-preview">Gemini 3 Flash Preview</option>
                                                            </select>
                                                        </div>
                                                        {settings.amazon_ai_gemini_model === 'gemini-2.5-flash' && (
                                                            <span className="shrink-0 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 shadow-sm flex items-center gap-1">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                                                Faster & Stable
                                                            </span>
                                                        )}
                                                        {settings.amazon_ai_gemini_model === 'gemini-3-flash-preview' && (
                                                            <span className="shrink-0 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100 shadow-sm flex items-center gap-1">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                                                                Smarter
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="ars-setting-item">
                                                    <Input
                                                        label="API Key"
                                                        type="text"
                                                        placeholder="Paste your Gemini API key here..."
                                                        value={settings.amazon_ai_gemini_key}
                                                        onChange={(e) => setSetting('amazon_ai_gemini_key', e.target.value)}
                                                        icon={<Key size={16} className="text-gray-400" />}
                                                        disabled={!settings.amazon_ai_enabled}
                                                        className="font-mono text-sm"
                                                        autoComplete="off"
                                                    />
                                                    <p className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                                                        <Info size={12} />
                                                        Get a free key from <a href="https://aistudio.google.com/" target="_blank" className="text-indigo-600 hover:text-indigo-700 hover:underline font-medium">Google AI Studio</a>.
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-5 animate-in fade-in slide-in-from-top-2">
                                                <div className="ars-setting-item">
                                                    <Input
                                                        label="Local Server URL"
                                                        placeholder="http://localhost:1234/v1"
                                                        value={settings.amazon_ai_llm_server_url}
                                                        onChange={(e) => setSetting('amazon_ai_llm_server_url', e.target.value)}
                                                        disabled={!settings.amazon_ai_enabled}
                                                        icon={<RefreshCw size={16} className="text-gray-400" />}
                                                    />
                                                    <p className="mt-2 text-xs text-gray-500">
                                                        Compatible with LM Studio, Ollama, or LocalAI API endpoints.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'sync' && (
                        <div className="ars-settings-section">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">Cloud Sync Settings</h3>
                                    {syncStatus && (
                                        <div className={`mt-2 text-xs px-3 py-1.5 rounded-md font-medium inline-block animate-in fade-in slide-in-from-top-1 ${syncStatus.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' :
                                            syncStatus.type === 'success' ? 'bg-green-50 text-green-600 border border-green-100' :
                                                'bg-blue-50 text-blue-600 border border-blue-100'
                                            }`}>
                                            {syncStatus.message}
                                        </div>
                                    )}
                                </div>
                                <Button variant="ghost" className="text-red-500 hover:bg-red-50" onClick={handleClearCloud} icon={<Trash2 size={16} />}>
                                    Clear Cloud
                                </Button>
                            </div>

                            {/* Public Review Note */}
                            {!settings.amazon_pastebin_api_user_key && (
                                <div className="mb-6 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
                                    <Info size={18} className="text-amber-600 shrink-0 mt-0.5" />
                                    <div className="text-sm text-amber-800">
                                        <p className="font-semibold mb-1">Important Privacy Note:</p>
                                        <p>
                                            Due to Pastebin limits on private pastes, all <strong>reviews</strong> saved to the cloud will be created as <strong>Public</strong>. 
                                            Templates and Phrases will remain <strong>Private</strong>.
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-6">
                                {/* Auto-Sync Settings Group */}
                                <div className="ars-setting-group border border-gray-100 bg-white p-5 rounded-xl shadow-sm">
                                    <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Auto-Sync Preferences</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <label className="font-medium text-gray-900">Auto-Sync Templates</label>
                                                <p className="text-xs text-gray-500">Automatically backup templates when modified</p>
                                            </div>
                                            <div className="relative inline-block w-10 h-5 transition duration-200 ease-in-out rounded-full cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="peer absolute w-full h-full opacity-0 z-10 cursor-pointer"
                                                    checked={settings.amazon_auto_sync_templates}
                                                    onChange={(e) => setSetting('amazon_auto_sync_templates', e.target.checked)}
                                                />
                                                <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <label className="font-medium text-gray-900">Auto-Sync Phrases</label>
                                                <p className="text-xs text-gray-500">Automatically backup phrases when modified</p>
                                            </div>
                                            <div className="relative inline-block w-10 h-5 transition duration-200 ease-in-out rounded-full cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="peer absolute w-full h-full opacity-0 z-10 cursor-pointer"
                                                    checked={settings.amazon_auto_sync_phrases}
                                                    onChange={(e) => setSetting('amazon_auto_sync_phrases', e.target.checked)}
                                                />
                                                <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Account Credentials Group */}
                                <div className="ars-setting-group border border-gray-100 bg-gray-50/30 p-4 rounded-xl space-y-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Key size={16} className="text-orange-500" />
                                        <span className="text-sm font-semibold text-gray-700">Pastebin Credentials</span>
                                    </div>

                                    <Input
                                        label="API Dev Key"
                                        placeholder="Enter your Pastebin API Dev Key"
                                        value={settings.amazon_pastebin_api_dev_key}
                                        onChange={(e) => setSetting('amazon_pastebin_api_dev_key', e.target.value)}
                                    />

                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            label="Pastebin Username"
                                            placeholder="Username"
                                            value={settings.amazon_pastebin_api_user_name}
                                            onChange={(e) => setSetting('amazon_pastebin_api_user_name', e.target.value)}
                                        />
                                        <Input
                                            label="Pastebin Password"
                                            type="password"
                                            placeholder="Password"
                                            value={settings.amazon_pastebin_api_user_password}
                                            onChange={(e) => setSetting('amazon_pastebin_api_user_password', e.target.value)}
                                        />
                                    </div>

                                    <div className="flex gap-3 pt-2">
                                        <Button
                                            onClick={handleGenerateKey}
                                            variant="secondary"
                                            disabled={isLoading || !settings.amazon_pastebin_api_dev_key || !settings.amazon_pastebin_api_user_name || !settings.amazon_pastebin_api_user_password}
                                            className="flex-1"
                                            icon={isLoading ? <RefreshCw size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
                                        >
                                            Generate User Key
                                        </Button>
                                        <Button
                                            onClick={handleTestConnection}
                                            variant="outline"
                                            disabled={isLoading || !settings.amazon_pastebin_api_dev_key || !settings.amazon_pastebin_api_user_key}
                                            className="flex-1"
                                            icon={<RefreshCw size={16} />}
                                        >
                                            Test Connection
                                        </Button>
                                    </div>

                                    <p className="ars-help-text">
                                        Get your key from the <a href="https://pastebin.com/doc_api" target="_blank" className="text-blue-600 hover:underline">Pastebin API documentation</a>.
                                    </p>
                                </div>

                                {/* Key & Recovery Management Group */}
                                <div className="ars-setting-group border border-gray-100 bg-gray-50/30 p-4 rounded-xl space-y-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <ShieldCheck size={16} className="text-blue-500" />
                                        <span className="text-sm font-semibold text-gray-700">Key & Recovery Management</span>
                                    </div>

                                    {/* User Key Section */}
                                    <div className="relative">
                                        <Input
                                            label="API User Key (Auto-generated)"
                                            value={settings.amazon_pastebin_api_user_key}
                                            onChange={(e) => setSetting('amazon_pastebin_api_user_key', e.target.value)}
                                            placeholder="Will be generated automatically"
                                            readOnly={!isUserKeyEditable}
                                            className={!isUserKeyEditable ? "bg-gray-50 text-gray-500 cursor-not-allowed" : ""}
                                            icon={<ShieldCheck size={16} className="text-gray-400" />}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setIsUserKeyEditable(!isUserKeyEditable)}
                                            className="absolute right-3 top-[34px] text-gray-400 hover:text-blue-600 transition-colors"
                                            title="Edit User Key manually"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <p className="ars-help-text mt-2">Generated from your credentials or recovered from cloud.</p>
                                    </div>

                                    {/* Recovery Section */}
                                    <div className="pt-4 border-t border-gray-100 mt-2">
                                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                                            Recovery Paste ID
                                            <HelpCircle size={14} className="text-gray-400 cursor-help" title="Your User Key can be stored in a rescue paste, allowing multi-device sync." />
                                        </label>
                                        <div className="flex gap-2">
                                            <Input
                                                value={settings.amazon_pastebin_recovery_id}
                                                onChange={(e) => setSetting('amazon_pastebin_recovery_id', e.target.value)}
                                                placeholder="e.g. QweRTy12"
                                                className="font-mono flex-1"
                                            />
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={handleFindRecoveryPaste}
                                                disabled={isLoading}
                                                icon={<Search size={14} />}
                                                className="whitespace-nowrap px-3 text-[11px] h-[38px]"
                                            >
                                                Find ID
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                size="sm"
                                                onClick={handleFetchKey}
                                                disabled={isLoading || !settings.amazon_pastebin_recovery_id}
                                                icon={<DownloadCloud size={14} />}
                                                className="whitespace-nowrap px-3 text-[11px] h-[38px]"
                                            >
                                                Fetch Key
                                            </Button>
                                        </div>
                                        <p className="ars-help-text mt-1.5">Recover your key from another device, or search for an existing recovery paste.</p>

                                        <Button
                                            onClick={handleSaveUserKeyToCloud}
                                            variant="ghost"
                                            size="sm"
                                            className="w-full text-blue-600 hover:bg-blue-50 text-[11px] mt-4"
                                            disabled={isLoading || !settings.amazon_pastebin_api_user_key}
                                        >
                                            Backup User Key to Cloud (Create Recovery Paste)
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'about' && (
                        <div className="ars-settings-section ars-about-section">
                            <div className="ars-brand">
                                <Settings size={48} className="ars-brand-icon" />
                                <h1>Amazon Review Studio</h1>
                                <span className="ars-version">v2.0.0-react</span>
                            </div>
                            <p>A premium userscript for Amazon reviewers.</p>
                            <Card padding="md">
                                <p>Designed for power users who want professional formatting and AI-assisted content creation directly within the Amazon review form.</p>
                            </ Card>
                        </div>
                    )}

                    {activeTab === 'debug' && (
                        <div className="ars-settings-section">
                            <h3>Troubleshooting</h3>
                            <div className="ars-setting-group border border-red-100 bg-red-50/30 p-4 rounded-xl space-y-4">
                                <p className="text-sm text-gray-700">
                                    Tools to help diagnose issues with form submission or injection.
                                </p>

                                <div className="ars-setting-item checkbox-row">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.amazon_ai_convert_markdown}
                                            onChange={(e) => setSetting('amazon_ai_convert_markdown', e.target.checked)}
                                        />
                                        <span>Convert AI Markdown to Unicode</span>
                                    </label>
                                    <p className="ars-help-text ml-7">
                                        Automatically formats AI-generated headers and lists with unicode styles.
                                        Disable if you prefer raw text output.
                                    </p>
                                </div>

                                <div className="ars-setting-item checkbox-row">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.debug_mode}
                                            onChange={(e) => setSetting('debug_mode', e.target.checked)}
                                        />
                                        <span>Enable Verbose Logging (Console)</span>
                                    </label>
                                </div>

                                <div className="ars-setting-item checkbox-row">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.debug_unhide_native}
                                            onChange={(e) => {
                                                setSetting('debug_unhide_native', e.target.checked);
                                                // Reload page prompt? Or just let them save.
                                            }}
                                        />
                                        <span>Unhide Native Amazon Form (Requires Refresh)</span>
                                    </label>
                                    <p className="ars-help-text ml-7">
                                        Reveals the original Amazon review form below the Studio interface.
                                        Useful to check if data is syncing correctly.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </Modal>
    );
};
