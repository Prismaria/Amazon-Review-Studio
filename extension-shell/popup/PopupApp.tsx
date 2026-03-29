import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { ShoppingBag, Star, LayoutDashboard, Settings, ExternalLink, RefreshCw, Clock, Globe, ChevronDown, ChevronUp, Sun, Moon, GripVertical } from 'lucide-react';
import { RandomReviewReminder } from './RandomReviewReminder';
import Swal from 'sweetalert2';

type UserRole = 'regular' | 'vine' | null;
type Theme = 'light' | 'dark' | 'black';

interface VineStats {
    pendingReviews: number;
    completedReviews: number;
    totalOrders: number;
    requestsUsed: number;
    maxRequests: number;
    tier: string;
    lastUpdated: number;
    error?: string | null;
    // Eval performance
    evalTotalReviews?: number | null;
    evalTotalReviewsProgress?: number | null;
    evalReviewRatio?: number | null;
    evalInsightfulness?: string | null;
    evalMediaPct?: number | null;
    evalDaysRemaining?: number | null;
}

const REGIONS = [
    { label: 'United States', tld: '.com' },
    { label: 'Canada', tld: '.ca' },
    { label: 'United Kingdom', tld: '.co.uk' },
    { label: 'Germany', tld: '.de' },
    { label: 'France', tld: '.fr' },
    { label: 'Italy', tld: '.it' },
    { label: 'Spain', tld: '.es' },
    { label: 'Japan', tld: '.co.jp' },
    { label: 'India', tld: '.in' },
    { label: 'Australia', tld: '.com.au' },
];

export const PopupApp: React.FC = () => {
    const [role, setRole] = useState<UserRole>(null);
    const [region, setRegion] = useState<string>('.com');
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<VineStats | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [theme, setTheme] = useState<Theme>('black');
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [arsSettings, setArsSettings] = useState({
        masterEnable: true,
        autoFocus: false,
        vine_showReminder: true,
        vine_showEval: true,
        vine_evalAlwaysExpanded: false,
        vine_showStats: true,
        showGreeting: true,
        dashboardOrder: ['greeting', 'evalCountdown', 'stats', 'reminders', 'evalPerformance', 'navigation', 'syncStatus'],
    });

    // Load theme from storage and apply it
    useEffect(() => {
        const loadTheme = () => {
            if (typeof chrome !== 'undefined' && chrome.storage) {
                chrome.storage.local.get(['popupTheme'], (result) => {
                    let savedTheme = result.popupTheme;

                    // If no saved theme, detect browser preference
                    if (!savedTheme) {
                        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                        savedTheme = prefersDark ? 'dark' : 'light';
                    }

                    setTheme(savedTheme);
                    applyTheme(savedTheme);
                });
            } else {
                // Dev context - apply default
                applyTheme('black');
            }
        };

        loadTheme();
    }, []);

    // Load other data
    useEffect(() => {
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.local.get(['userRole', 'amazonRegion', 'vineStats', 'arsSettings'], (result) => {
                setRole(result.userRole || null);
                setRegion(result.amazonRegion || '.com');
                setStats(result.vineStats || null);
                if (result.arsSettings) {
                    setArsSettings(prev => ({ ...prev, ...result.arsSettings }));
                }
                setLoading(false);
            });
        } else {
            // Dev context
            setLoading(false);
        }
    }, []);

    // Apply theme to document
    const applyTheme = (newTheme: Theme) => {
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    // Toggle theme: light -> dark -> black -> light
    const toggleTheme = () => {
        const themeOrder: Theme[] = ['light', 'dark', 'black'];
        const currentIndex = themeOrder.indexOf(theme);
        const nextTheme = themeOrder[(currentIndex + 1) % themeOrder.length];

        setTheme(nextTheme);
        applyTheme(nextTheme);

        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.local.set({ popupTheme: nextTheme });
        }
    };

    // Get theme icon
    const getThemeIcon = () => {
        switch (theme) {
            case 'light':
                return <Sun className="w-4 h-4" />;
            case 'dark':
                return <Moon className="w-4 h-4" />;
            case 'black':
                return <span className="text-xs font-bold">⬛</span>;
        }
    };

    // Get theme label for tooltip
    const getThemeLabel = () => {
        switch (theme) {
            case 'light':
                return 'Light Theme';
            case 'dark':
                return 'Dark Theme';
            case 'black':
                return 'Black Theme';
        }
    };

    const updateRegion = (newRegion: string) => {
        setRegion(newRegion);
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.local.set({ amazonRegion: newRegion });
        }
    };

    const selectRole = (newRole: UserRole) => {
        setRole(newRole);
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.local.set({ userRole: newRole });
        }
    };

    const handleRefresh = () => {
        setIsRefreshing(true);
        chrome.runtime.sendMessage({ type: 'REFRESH_STATS' }, (response) => {
            if (response) setStats(response);
            setIsRefreshing(false);
            // Trigger random review reminder refresh
            setRefreshTrigger(prev => prev + 1);
        });
    };

    const updateArsSetting = (key: string, value: any) => {
        const newSettings = { ...arsSettings, [key]: value };
        setArsSettings(newSettings);
        if (typeof chrome !== 'undefined' && chrome.storage) {
            chrome.storage.local.set({ arsSettings: newSettings });
        }
    };

    const handleMasterToggle = async (enabled: boolean) => {
        if (!enabled) {
            // @ts-ignore
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "Disabling the app means you will lose Templates and all Review Studio UI enhancements. You will revert to Amazon's native review form.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#ef4444',
                cancelButtonColor: 'var(--bg-secondary)',
                confirmButtonText: 'Yes, disable it',
                background: 'var(--bg-main)',
                color: 'var(--text-primary)'
            });

            if (!result.isConfirmed) return;
        }

        updateArsSetting('masterEnable', enabled);
    };

    const handleClearData = async () => {
        const result = await Swal.fire({
            title: 'Clear All Data?',
            text: "This will reset all settings, roles, and cached stats. This action cannot be undone.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Yes, clear everything',
            background: 'var(--bg-main)',
            color: 'var(--text-primary)'
        });

        if (result.isConfirmed) {
            chrome.storage.local.clear(() => {
                window.location.reload();
            });
        }
    };

    if (loading) return (
        <div className="flex flex-col h-full min-h-[650px] font-sans overflow-hidden" style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-primary)' }}>
            <div className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>Loading Studio...</div>
        </div>
    );

    return (
        <div className="flex flex-col h-full min-h-[650px] font-sans overflow-hidden transition-colors duration-300" style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-primary)' }}>
            <header
                className="p-4 flex items-center justify-between backdrop-blur-md sticky top-0 z-10 w-full transition-all duration-300"
                style={{
                    background: theme === 'dark' ? 'var(--header-gradient)' : 'var(--bg-secondary)',
                    borderBottom: '1px solid var(--border-color)'
                }}
            >
                <div className="flex items-center gap-2">
                    <img
                        src={(theme === 'dark' || theme === 'black') ? '../icons/logo_small_dark.png' : '../icons/logo_small_light.png'}
                        className="w-8 h-8 object-contain"
                        alt="Logo"
                    />
                    <span className="font-bold tracking-tight text-lg">Review Studio</span>
                </div>
                <div className="flex items-center gap-1">
                    {/* Theme Toggle Button */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full transition-all hover:opacity-80"
                        style={{ color: 'var(--text-secondary)' }}
                        title={getThemeLabel()}
                    >
                        {getThemeIcon()}
                    </button>
                    {role === 'vine' && (
                        <button
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                            className={`p-2 rounded-full transition-all hover:opacity-80 ${isRefreshing ? 'animate-spin' : ''}`}
                            style={{ color: isRefreshing ? 'var(--accent-blue)' : 'var(--text-secondary)' }}
                            title="Refresh Stats"
                        >
                            <RefreshCw className="w-4 h-4" />
                        </button>
                    )}
                    {role && (
                        <button
                            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                            className={`p-2 rounded-full transition-all hover:opacity-80 ${isSettingsOpen ? 'bg-white/10' : ''}`}
                            style={{ color: isSettingsOpen ? 'var(--accent-primary)' : 'var(--text-secondary)' }}
                            title="Settings"
                        >
                            <Settings className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </header>

            <main className="flex-1 p-6 flex flex-col relative overflow-y-auto w-full">
                <AnimatePresence mode="wait">
                    {!role ? (
                        <Onboarding key="onboarding" region={region} updateRegion={updateRegion} selectRole={selectRole} />
                    ) : isSettingsOpen ? (
                        <SettingsView
                            key="settings"
                            role={role}
                            region={region}
                            settings={arsSettings}
                            onUpdateSetting={updateArsSetting}
                            onMasterToggle={handleMasterToggle}
                            updateRegion={updateRegion}
                            selectRole={selectRole}
                            onClearData={handleClearData}
                        />
                    ) : (
                        <Dashboard role={role} stats={stats} region={region} refreshTrigger={refreshTrigger} settings={arsSettings} />
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

const RoleButton: React.FC<{
    onClick: () => void;
    icon: React.ReactNode;
    title: string;
    description: string;
    hoverColor: string;
}> = ({ onClick, icon, title, description, hoverColor }) => (
    <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`flex flex-col items-center justify-center p-5 rounded-2xl border ${hoverColor} transition-all group`}
        style={{
            backgroundColor: 'var(--bg-card)',
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)'
        }}
    >
        <div className="mb-3 p-3 rounded-xl transition-colors" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            {icon}
        </div>
        <h3 className="font-bold text-sm mb-0.5">{title}</h3>
        <p className="text-[10px] text-center leading-tight" style={{ color: 'var(--text-muted)' }}>{description}</p>
    </motion.button>
);

const Onboarding: React.FC<{ region: string, updateRegion: (r: string) => void, selectRole: (role: UserRole) => void }> = ({ region, updateRegion, selectRole }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        className="w-full flex flex-col gap-8 my-auto"
    >
        <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                Welcome 👋
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Let's personalize your experience</p>
        </div>

        <div className="space-y-4">
            <label className="block">
                <span className="text-[10px] font-bold uppercase tracking-widest block mb-2 px-1" style={{ color: 'var(--text-muted)' }}>Primary Region</span>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors group-focus-within:text-[var(--accent-blue)]" style={{ color: 'var(--text-muted)' }}>
                        <Globe size={16} />
                    </div>
                    <select
                        value={region}
                        onChange={(e) => updateRegion(e.target.value)}
                        className="block w-full pl-10 pr-4 py-3 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm font-medium border"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            color: 'var(--text-primary)',
                            borderColor: 'var(--border-color)'
                        }}
                    >
                        {REGIONS.map(r => (
                            <option key={r.tld} value={r.tld} style={{ backgroundColor: 'var(--bg-main)' }}>{r.label} ({r.tld})</option>
                        ))}
                    </select>
                </div>
            </label>

            <div>
                <span className="text-[10px] font-bold uppercase tracking-widest block mb-2 px-1" style={{ color: 'var(--text-muted)' }}>Your Role</span>
                <div className="grid grid-cols-2 gap-4">
                    <RoleButton
                        onClick={() => selectRole('regular')}
                        icon={<ShoppingBag className="w-8 h-8" />}
                        title="Regular"
                        description="Order tools"
                        hoverColor="hover:border-blue-500/50"
                    />
                    <RoleButton
                        onClick={() => selectRole('vine')}
                        icon={<Star className="w-8 h-8 text-amber-400" />}
                        title="Vine"
                        description="Vine toolkit"
                        hoverColor="hover:border-amber-500/50"
                    />
                </div>
            </div>
        </div>
    </motion.div>
);

const DASHBOARD_SECTION_LABELS: Record<string, string> = {
    greeting: 'Greeting Message',
    evalCountdown: 'Evaluation Countdown',
    stats: 'Quick Stats Grid',
    reminders: 'Review Reminders',
    evalPerformance: 'Evaluation Performance',
    navigation: 'Quick Links',
    syncStatus: 'Sync Timestamp'
};

const SettingsView: React.FC<{
    role: UserRole,
    region: string,
    settings: any,
    onUpdateSetting: (k: string, v: any) => void,
    onMasterToggle: (v: boolean) => void,
    updateRegion: (r: string) => void,
    selectRole: (r: UserRole) => void,
    onClearData: () => void
}> = ({ role, region, settings, onUpdateSetting, onMasterToggle, updateRegion, selectRole, onClearData }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full flex flex-col gap-6"
        >
            <div className="space-y-1">
                <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Settings</h2>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Configure your Studio experience</p>
            </div>

            <div className="space-y-4">
                <section className="space-y-3">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>General Preferences</h3>
                    <div className="space-y-2">
                        <SettingToggle
                            label="Enable Review Studio App"
                            description="Master toggle for React enhancements"
                            enabled={settings.masterEnable}
                            onChange={onMasterToggle}
                        />
                        <SettingToggle
                            label="Auto-Focus Editor"
                            description="Automatically focus text area on load"
                            enabled={settings.autoFocus}
                            onChange={(v) => onUpdateSetting('autoFocus', v)}
                        />
                        <SettingToggle
                            label="Show Greeting Message"
                            description="Display personalized dashboard greeting"
                            enabled={settings.showGreeting}
                            onChange={(v) => onUpdateSetting('showGreeting', v)}
                        />
                    </div>
                </section>

                {role === 'vine' && (
                    <section className="space-y-3">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Vine Features</h3>
                        <div className="space-y-2">
                            <SettingToggle
                                label="Show Review Reminder"
                                description="Display random unreviewed items"
                                enabled={settings.vine_showReminder}
                                onChange={(v) => onUpdateSetting('vine_showReminder', v)}
                            />
                            <SettingToggle
                                label="Show Evaluation Metrics"
                                description="Display Vine account stats & evaluations"
                                enabled={settings.vine_showEval}
                                onChange={(v) => onUpdateSetting('vine_showEval', v)}
                            />
                            {settings.vine_showEval && (
                                <>
                                    <SettingToggle
                                        label="Show Quick Stats Grid"
                                        description="Display the To Review / Reviewed / Total / Quota cards"
                                        enabled={settings.vine_showStats !== false}
                                        onChange={(v) => onUpdateSetting('vine_showStats', v)}
                                    />
                                    <SettingToggle
                                        label="Always Expand Eval Performance"
                                        description="Show full metrics by default"
                                        enabled={settings.vine_evalAlwaysExpanded}
                                        onChange={(v) => onUpdateSetting('vine_evalAlwaysExpanded', v)}
                                    />
                                </>
                            )}
                        </div>
                    </section>
                )}

                <section className="space-y-3">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Dashboard Layout</h3>
                    <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Drag to reorganize your sections</p>
                    <Reorder.Group
                        axis="y"
                        values={settings.dashboardOrder}
                        onReorder={(v) => onUpdateSetting('dashboardOrder', v)}
                        className="space-y-2"
                    >
                        {settings.dashboardOrder.map((sectionId: string) => (
                            <Reorder.Item
                                key={sectionId}
                                value={sectionId}
                                dragListener={true}
                                className="relative"
                            >
                                <div
                                    className="flex items-center justify-between p-3 rounded-xl border transition-colors"
                                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
                                >
                                    <div className="flex items-center gap-3">
                                        <GripVertical size={14} className="text-zinc-500 cursor-grab active:cursor-grabbing" />
                                        <span className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>
                                            {DASHBOARD_SECTION_LABELS[sectionId] || sectionId}
                                        </span>
                                    </div>
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-primary)', opacity: 0.3 }} />
                                </div>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                </section>

                <section className="space-y-3">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Account & Region</h3>
                    <div className="p-4 rounded-xl space-y-4" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                        <div>
                            <span className="text-[11px] font-bold mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>Primary Region</span>
                            <div className="relative group">
                                <select
                                    value={region}
                                    onChange={(e) => updateRegion(e.target.value)}
                                    className="block w-full px-3 py-2 rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all text-xs border"
                                    style={{
                                        backgroundColor: 'var(--bg-secondary)',
                                        color: 'var(--text-primary)',
                                        borderColor: 'var(--border-color)'
                                    }}
                                >
                                    {REGIONS.map(r => (
                                        <option key={r.tld} value={r.tld} style={{ backgroundColor: 'var(--bg-main)' }}>{r.label} ({r.tld})</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <span className="text-[11px] font-bold mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>User Type</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => selectRole('regular')}
                                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all border ${role === 'regular' ? 'opacity-100 shadow-sm' : 'opacity-40 hover:opacity-60'}`}
                                    style={{
                                        backgroundColor: role === 'regular' ? 'var(--bg-secondary)' : 'transparent',
                                        borderColor: role === 'regular' ? 'var(--accent-blue)' : 'var(--border-color)',
                                        color: 'var(--text-primary)'
                                    }}
                                >
                                    Regular
                                </button>
                                <button
                                    onClick={() => selectRole('vine')}
                                    className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all border ${role === 'vine' ? 'opacity-100 shadow-sm' : 'opacity-40 hover:opacity-60'}`}
                                    style={{
                                        backgroundColor: role === 'vine' ? 'var(--bg-secondary)' : 'transparent',
                                        borderColor: role === 'vine' ? 'var(--accent-amber)' : 'var(--border-color)',
                                        color: 'var(--text-primary)'
                                    }}
                                >
                                    Vine
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="space-y-3 pt-2">
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--error)' }}>Danger Zone</h3>
                    <div className="space-y-2">
                        <button
                            onClick={() => selectRole(null)}
                            className="w-full flex items-center justify-between p-4 rounded-xl transition-all hover:bg-red-500/10 border group"
                            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
                        >
                            <div className="text-left">
                                <div className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Reset App Role</div>
                                <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Return to onboarding screen</div>
                            </div>
                            <RefreshCw className="w-4 h-4 text-red-500 group-hover:rotate-180 transition-transform duration-500" />
                        </button>
                        <button
                            onClick={onClearData}
                            className="w-full flex items-center justify-between p-4 rounded-xl transition-all hover:bg-red-500/10 border group"
                            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
                        >
                            <div className="text-left">
                                <div className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Clear All Local Data</div>
                                <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Wipe all settings and start fresh</div>
                            </div>
                            <Star className="w-4 h-4 text-red-500 group-hover:scale-125 transition-transform" />
                        </button>
                    </div>
                </section>
            </div>

            <div className="pt-4 text-center">
                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Review Studio v2.0.9</span>
            </div>
        </motion.div>
    );
};

const SettingToggle: React.FC<{ label: string, description: string, enabled: boolean, onChange: (v: boolean) => void }> = ({ label, description, enabled, onChange }) => (
    <div className="flex items-center justify-between p-4 rounded-xl transition-colors duration-300"
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold transition-colors" style={{ color: 'var(--text-primary)' }}>{label}</span>
            <span className="text-[10px] transition-colors" style={{ color: 'var(--text-muted)' }}>{description}</span>
        </div>
        <button
            onClick={() => onChange(!enabled)}
            className={`w-10 h-5 rounded-full relative transition-all duration-300 ${enabled ? 'bg-amber-500' : 'bg-zinc-700'}`}
        >
            <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 ${enabled ? 'left-6' : 'left-1'}`} />
        </button>
    </div>
);

const Dashboard: React.FC<{ role: UserRole, stats: VineStats | null, region: string, refreshTrigger: number, settings: any }> = ({ role, stats, region, refreshTrigger, settings }) => {
    const isVine = role === 'vine';
    const baseUrl = `https://www.amazon${region}`;

    const renderSection = (id: string) => {
        switch (id) {
            case 'greeting':
                return settings.showGreeting && <Greeting isVine={isVine} stats={stats} />;
            case 'evalCountdown':
                return isVine && settings.vine_showEval && stats?.evalDaysRemaining != null && (
                    <EvalCountdown days={stats.evalDaysRemaining} />
                );
            case 'stats':
                return isVine && settings.vine_showEval && settings.vine_showStats !== false && (
                    <div className="grid grid-cols-4 gap-2">
                        <StatCard label="To Review" value={stats ? stats.pendingReviews : '...'} icon={<Clock size={12} className="text-amber-400" />} />
                        <StatCard label="Reviewed" value={stats ? stats.completedReviews : '...'} icon={<Star size={12} className="text-emerald-400" />} />
                        <StatCard label="Total" value={stats ? stats.totalOrders : '...'} icon={<ShoppingBag size={12} className="text-purple-400" />} />
                        <StatCard label="Quota" value={stats ? `${stats.requestsUsed}/${stats.maxRequests}` : '...'} icon={<Star size={12} className="text-blue-400" />} />
                    </div>
                );
            case 'reminders':
                return settings.vine_showReminder && <RandomReviewReminder region={region} refreshTrigger={refreshTrigger} />;
            case 'evalPerformance':
                return isVine && settings.vine_showEval && stats && (
                    stats.evalTotalReviews != null || stats.evalReviewRatio != null || stats.evalInsightfulness != null || stats.evalMediaPct != null
                ) && <EvalPerformance stats={stats} alwaysExpanded={settings.vine_evalAlwaysExpanded} />;
            case 'navigation':
                return (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between px-1">
                            <h2 className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Navigation</h2>
                            <div className="flex items-center gap-1.5 text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>
                                <Globe size={10} />
                                <span>{REGIONS.find(r => r.tld === region)?.label || region} {isVine && stats?.tier && `(${stats.tier})`}</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {isVine ? (
                                <>
                                    <ShortcutLink icon={<Star size={14} />} label="Vine Reviews" href={`${baseUrl}/vine/vine-reviews`} compact />
                                    <ShortcutLink icon={<ShoppingBag size={14} />} label="Vine Orders" href={`${baseUrl}/vine/orders`} compact />
                                    <ShortcutLink icon={<Star size={14} />} label="Review Your Purchases" href={`${baseUrl}/review/review-your-purchases/listing`} compact />
                                    <ShortcutLink icon={<LayoutDashboard size={14} />} label="Amazon Orders" href={`${baseUrl}/gp/css/order-history`} compact />
                                </>
                            ) : (
                                <>
                                    <ShortcutLink icon={<Star size={14} />} label="Review Your Purchases" href={`${baseUrl}/review/review-your-purchases/listing`} compact />
                                    <ShortcutLink icon={<ShoppingBag size={14} />} label="Order History" href={`${baseUrl}/gp/css/order-history`} compact />
                                </>
                            )}
                        </div>
                    </div>
                );
            case 'syncStatus':
                return isVine && settings.vine_showEval && stats?.lastUpdated && (
                    <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px]" style={{ color: 'var(--text-muted)' }}>
                        <Clock size={10} />
                        <span>Last synced: {new Date(stats.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full flex flex-col gap-6"
        >
            {settings.dashboardOrder.map((sectionId: string) => (
                <React.Fragment key={sectionId}>
                    {renderSection(sectionId)}
                </React.Fragment>
            ))}
        </motion.div>
    );
};

const StatCard: React.FC<{ label: string, value: string | number, icon: React.ReactNode, className?: string }> = ({ label, value, icon, className = "" }) => (
    <div className={`p-2 rounded-xl flex flex-col items-center justify-center gap-1 aspect-square text-center transition-colors duration-300 ${className}`}
        style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
        <div className="flex items-center justify-center p-1 rounded-lg mb-0.5" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            {icon}
        </div>
        <div className="flex flex-col items-center gap-0">
            <div className="text-base font-bold tracking-tight leading-none transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>{value}</div>
            <div className="text-[7.5px] font-bold uppercase tracking-widest mt-1 transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>{label}</div>
        </div>
    </div>
);

const Greeting: React.FC<{ isVine: boolean, stats: VineStats | null }> = ({ isVine, stats }) => {
    if (!isVine || !stats) {
        return (
            <div className="space-y-1">
                <h2 className="text-xl font-bold transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>Hey there!</h2>
                <p className="text-sm leading-relaxed transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>
                    {!isVine ? "Checking in on your latest orders?" : "Ready to knock out some Vine reviews today?"}
                </p>
            </div>
        );
    }

    const { pendingReviews: count } = stats;

    const getGreeting = (count: number): { title: string; message: React.ReactNode } => {
        const n = <strong style={{ color: 'var(--text-primary)' }}>{count}</strong>;
        if (count === 0) return {
            title: "Clean Slate Protocol 🌟",
            message: <span><strong style={{ color: 'var(--text-primary)' }}>0</strong> items to review. You have reached the summit of Mt. Done. Breathe it in.</span>
        };
        if (count === 1) return {
            title: "Just the One! ☝️",
            message: <span>Only <strong style={{ color: 'var(--text-primary)' }}>1</strong> item left sitting there. Looking lonely. Finish it off?</span>
        };
        if (count <= 5) return {
            title: "Easy Street 🏖️",
            message: <span>Just {n} items on the dock. A light snack for a pro like you.</span>
        };
        if (count <= 10) return {
            title: "Single Digits... Barely 🤏",
            message: <span>You've got {n} reviews pending. Manageable? Yes. Ignorable? Maybe not...</span>
        };
        if (count <= 20) return {
            title: "The Pile Grows 📚",
            message: <span>{n} items waiting. It's not a mountain yet, but it's definitely a hill.</span>
        };
        if (count <= 30) return {
            title: "Getting Serious 🧐",
            message: <span>Clocking in at {n} reviews. Let's turn that 'later' pile into 'now'.</span>
        };
        if (count <= 40) return {
            title: "Warning Signs ⚠️",
            message: <span>{n} items?! Get that sh*t done fam!</span>
        };
        if (count <= 50) return {
            title: "Half a Hundred 😬",
            message: <span>You hit {n} items. That's 50 shades of "I really need to catch up!"</span>
        };
        if (count <= 75) return {
            title: "Review Debt Crisis 📉",
            message: <span>{n} items?! We might need to declare reviewing bankruptcy soon.</span>
        };
        if (count < 100) return {
            title: "Certified Hoarder 📦",
            message: <span>{n} items??!! You are officially a hoarder of unreviewed goods.</span>
        };
        if (count < 200) return {
            title: "The Century Club 💯",
            message: <span>🎉 YOU DID IT! <strong style={{ color: 'var(--text-primary)' }}>{count} items</strong> to review! We'd throw a party but we're afraid you'd order the decorations and never review those either.</span>
        };
        // 200 and beyond
        return {
            title: "Vine Jail Imminent 👮",
            message: <span>{n} items?! Do you even live there anymore or is it just cardboard boxes?</span>
        };
    };

    const { title, message } = getGreeting(count);

    return (
        <div className="space-y-1">
            <h2 className="text-xl font-bold transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>{title}</h2>
            <p className="text-sm leading-relaxed transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>{message}</p>
        </div>
    );
};

const ShortcutLink: React.FC<{ icon: React.ReactNode, label: string, href: string, compact?: boolean }> = ({ icon, label, href, compact }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center rounded-xl transition-all group ${compact ? 'gap-1.5 px-2.5 py-2' : 'justify-between p-3.5 gap-3'}`}
        style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)'
        }}
    >
        <div className={`flex items-center group-hover:text-blue-400 transition-colors ${compact ? 'gap-1.5' : 'gap-3'}`}
            style={{ color: 'var(--text-muted)' }}>
            {icon}
            <span className={compact ? 'text-xs font-medium whitespace-nowrap' : 'text-sm font-medium'} style={{ color: 'var(--text-secondary)' }}>{label}</span>
        </div>
        {!compact && <ExternalLink size={14} className="group-hover:text-zinc-400 transition-colors" style={{ color: 'var(--text-muted)' }} />}
    </a>
)

const EvalCountdown: React.FC<{ days: number }> = ({ days }) => {
    const color = days >= 60
        ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
        : days >= 30
            ? 'text-amber-400 bg-amber-400/10 border-amber-400/20'
            : 'text-red-400 bg-red-400/10 border-red-400/20';

    return (
        <div className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-semibold ${color} self-start mx-auto`}>
            <Clock size={11} />
            <span>{days} days before Eval</span>
        </div>
    );
};

// --- Helpers for EvalPerformance ---
const MiniProgressBar: React.FC<{ value: number, target?: number }> = ({ value, target }) => {
    const onTrack = target == null || value >= target;
    const near = target != null && value >= target - 15 && value < target;
    const fill = onTrack ? 'bg-emerald-500' : near ? 'bg-amber-500' : 'bg-red-500';
    return (
        <div className="w-full h-1 rounded-full bg-white/[0.08] overflow-hidden mt-1">
            <div
                className={`h-full rounded-full transition-all ${fill}`}
                style={{ width: `${Math.min(value, 100)}%` }}
            />
        </div>
    );
};

const InsightfulnessPips: React.FC<{ score: string }> = ({ score }) => {
    const levels = ['Poor', 'Fair', 'Good', 'Excellent'];
    const active = levels.indexOf(score);
    const colors = ['bg-red-500', 'bg-amber-500', 'bg-blue-500', 'bg-emerald-500'];
    return (
        <div className="flex gap-1 mt-1.5">
            {levels.map((_, i) => (
                <div
                    key={i}
                    className={`flex-1 h-1 rounded-full ${i <= active ? colors[active] : 'bg-white/[0.08]'}`}
                />
            ))}
        </div>
    );
};

const EvalPerformance: React.FC<{ stats: VineStats, alwaysExpanded?: boolean }> = ({ stats, alwaysExpanded }) => {
    const [isExpanded, setIsExpanded] = useState(alwaysExpanded || false);

    useEffect(() => {
        if (alwaysExpanded) setIsExpanded(true);
    }, [alwaysExpanded]);

    const metrics = [
        {
            label: 'Total Reviews',
            value: stats.evalTotalReviews != null ? String(stats.evalTotalReviews) : null,
            bar: stats.evalTotalReviewsProgress != null
                ? <MiniProgressBar value={stats.evalTotalReviewsProgress} target={100} />
                : null,
            sub: 'Target: 80+ orders',
        },
        {
            label: 'Review Rate',
            value: stats.evalReviewRatio != null ? `${stats.evalReviewRatio}%` : null,
            bar: stats.evalReviewRatio != null
                ? <MiniProgressBar value={stats.evalReviewRatio} target={90} />
                : null,
            sub: 'Target: ≥90% for Gold',
        },
        {
            label: 'Insightfulness',
            value: stats.evalInsightfulness ?? null,
            bar: stats.evalInsightfulness
                ? <InsightfulnessPips score={stats.evalInsightfulness} />
                : null,
            sub: 'Target: Excellent',
        },
        {
            label: 'Media Rate',
            value: stats.evalMediaPct != null ? `${stats.evalMediaPct}%` : null,
            bar: stats.evalMediaPct != null
                ? <MiniProgressBar value={stats.evalMediaPct} />
                : null,
            sub: 'Photos/videos help',
        },
    ].filter(m => m.value != null);

    if (metrics.length === 0) return null;

    return (
        <div className="space-y-2">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-baseline justify-between px-1 rounded-lg transition-colors group"
                style={{ backgroundColor: 'transparent' }}
            >
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] group-hover:opacity-80 transition-opacity" style={{ color: 'var(--text-muted)' }}>Eval Performance</h2>
                {!alwaysExpanded && (
                    <div className="flex items-center gap-2">
                        <span className="text-[9px]" style={{ color: 'var(--text-muted)' }}>{isExpanded ? 'Hide' : 'Show'}</span>
                        {isExpanded ? (
                            <ChevronUp size={12} className="transition-colors" style={{ color: 'var(--text-muted)' }} />
                        ) : (
                            <ChevronDown size={12} className="transition-colors" style={{ color: 'var(--text-muted)' }} />
                        )}
                    </div>
                )}
            </button>
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="grid grid-cols-2 gap-2 pt-1">
                            {metrics.map(m => (
                                <div
                                    key={m.label}
                                    className="p-2.5 rounded-xl flex flex-col gap-0.5 transition-colors duration-300"
                                    style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
                                >
                                    <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{m.label}</span>
                                    <span className="text-sm font-bold leading-none transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>{m.value}</span>
                                    {m.bar}
                                    <span className="text-[8.5px] mt-0.5 transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>{m.sub}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
