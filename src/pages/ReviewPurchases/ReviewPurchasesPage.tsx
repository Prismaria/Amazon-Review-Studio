import React from 'react';
import { useReviewCandidates } from './hooks/useReviewCandidates';
import { ReviewCandidateCard } from './components/ReviewCandidateCard';
import { SortFilterTabs } from './components/SortFilterTabs';
import { SettingsDashboard } from '../../components/settings/SettingsDashboard';
import { SettingsProvider, useSettings } from '../../context/SettingsContext';
import { useSettings as useAppSettings } from '../../hooks/useSettings';
import { ProfileSection } from '../../components/review/ProfileSection';
import { AutoSyncWatcher } from '../../components/common/AutoSyncWatcher';
import { Moon, Settings, CheckCircle2, Loader2, LayoutGrid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutMode } from './types';
import { ScalingWrapper } from '../../components/common/ScalingWrapper';

const StarsIcon = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        {/* Large Crescent Moon at Bottom Left - Adjusted to fit 24x24 */}
        <path d="M11 21c-4.97 0-9-4.03-9-9s4.03-9 9-9c.83 0 1.62.11 2.37.32-2.18 1.39-3.62 3.8-3.62 6.5s1.44 5.11 3.62 6.5c-.75.21-1.54.32-2.37.32z" />

        {/* Sprinkled Stars */}
        <circle cx="18" cy="5" r="1.2" />
        <circle cx="21" cy="9" r="0.8" />
        <circle cx="15" cy="4" r="0.6" />
        <circle cx="22" cy="3" r="0.5" />
        <circle cx="17" cy="11" r="0.7" />
        <circle cx="20" cy="16" r="0.6" />

        {/* 4-pointed sparkles */}
        <path d="M19 14l.3 1.1 1.1.3-1.1.3-.3 1.1-.3-1.1-1.1-.3 1.1-.3z" />
        <path d="M12 7l.2.8.8.2-.8.2-.2.8-.2-.8-.8-.2.8-.2z" />
    </svg>
);


const ReviewPurchasesContent: React.FC = () => {
    const {
        candidates,
        isLoading,
        sortMode,
        setSortMode,
        searchQuery,
        setSearchQuery,
        thankYouHtml,
        profile
    } = useReviewCandidates();

    const { settings, setSetting } = useAppSettings();
    const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
    const [layoutMode, setLayoutMode] = React.useState<LayoutMode>('grid');

    // Long press logic for Dark Mode
    const pressTimer = React.useRef<NodeJS.Timeout | null>(null);
    const isLongPress = React.useRef(false);

    const handleLightsPressStart = () => {
        isLongPress.current = false;
        pressTimer.current = setTimeout(() => {
            isLongPress.current = true;
            setSetting('dark_mode', !settings.dark_mode);
        }, 600);
    };

    const handleLightsPressEnd = () => {
        if (pressTimer.current) {
            clearTimeout(pressTimer.current);
            pressTimer.current = null;
        }

        if (!isLongPress.current) {
            // Normal click: Toggle Lights Off
            setSetting('amazon_ui_lights_off', !settings.amazon_ui_lights_off);
        }
    };

    React.useEffect(() => {
        const styleId = 'ars-lights-off-global';
        if (settings.amazon_ui_lights_off) {
            if (!document.getElementById(styleId)) {
                const styleEl = document.createElement('style');
                styleEl.id = styleId;
                styleEl.textContent = `
                    #amazon-review-studio-root {
                        position: relative !important;
                        z-index: 1000000 !important;
                    }
                    #navbar-main {
                        position: relative !important;
                        z-index: 1000001 !important;
                        pointer-events: auto !important;
                    }
                    body::after {
                        content: '';
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.85);
                        z-index: 999999;
                        pointer-events: none;
                        transition: opacity 0.4s ease;
                        animation: ars-fade-in 0.4s ease forwards;
                    }
                    @keyframes ars-fade-in {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                `;
                document.head.appendChild(styleEl);
            }
        } else {
            const el = document.getElementById(styleId);
            if (el) el.remove();
        }
        return () => {
            const el = document.getElementById(styleId);
            if (el) el.remove();
        };
    }, [settings.amazon_ui_lights_off]);

    return (
        <div className="max-w-[1200px] mx-auto transition-all duration-500">
            <div className={`rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden pb-12 bg-white border-gray-100 border`}>

                {/* Header Area */}
                <div className="relative">
                    <ProfileSection
                        avatarSrc={profile.avatarSrc}
                        name={profile.name || 'Amazon Shopper'}
                    />

                    {/* Floating Header Actions */}
                    <div className="absolute top-1/2 -translate-y-1/2 right-8 flex items-center gap-2">
                        <button
                            type="button"
                            className={`p-2.5 rounded-xl transition-all ${settings.amazon_ui_lights_off
                                ? 'bg-amber-500/10 text-amber-500 font-bold'
                                : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
                                } ${settings.dark_mode ? '!text-yellow-400' : ''}`}
                            onMouseDown={handleLightsPressStart}
                            onMouseUp={handleLightsPressEnd}
                            onMouseLeave={() => {
                                if (pressTimer.current) {
                                    clearTimeout(pressTimer.current);
                                    pressTimer.current = null;
                                }
                            }}
                            onTouchStart={handleLightsPressStart}
                            onTouchEnd={handleLightsPressEnd}
                            title={settings.dark_mode ? "Dark Mode On (Long Press to Toggle)" : "Lights Off (Long Press for Dark Mode)"}
                        >
                            {settings.dark_mode ? <StarsIcon size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            type="button"
                            className="p-2.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-xl transition-all"
                            onClick={() => setIsSettingsOpen(true)}
                            title="Settings"
                        >
                            <Settings size={20} />
                        </button>
                    </div>
                </div>

                {/* Thank You Message - Enhanced with Animations */}
                <AnimatePresence>
                    {thankYouHtml && (
                        <motion.div
                            className="px-10 pt-10"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <div className={`rounded-3xl p-8 flex items-start gap-6 border shadow-lg bg-gradient-to-br from-green-50 to-emerald-50/50 border-green-200/50`}>
                                <motion.div
                                    className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 bg-green-100`}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                                >
                                    <CheckCircle2 className="text-green-600" size={32} strokeWidth={2} />
                                </motion.div>
                                <div className="flex-1">
                                    <motion.h3
                                        className={`text-2xl mb-2 text-green-800`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                    >
                                        <span className="font-black tracking-tight">Review Submitted</span>
                                    </motion.h3>
                                    <motion.p
                                        className={`text-lg mb-3 text-green-700`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                    >
                                        <span className="font-light">Awesome! </span>
                                        <span className="font-bold">Thank you for helping other shoppers!</span>
                                    </motion.p>
                                    <motion.p
                                        className={`text-sm text-green-600/70`}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.5 }}
                                    >
                                        <span className="font-light italic">Your feedback helps </span>
                                        <span className="font-bold">millions of shoppers</span>
                                    </motion.p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Controls Section - Always visible */}
                <div className="pt-10 pb-6 px-4">
                    <SortFilterTabs
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                        sortMode={sortMode}
                        onSortChange={setSortMode}
                        totalItems={candidates.length}
                        isLoading={isLoading}
                    />
                </div>

                {/* Main Content Area */}
                <main className="px-10 py-6 min-h-[400px]">
                    {/* Layout Toggle Switch */}
                    {!isLoading && candidates.length > 0 && (
                        <div className="flex justify-end mb-6">
                            <div className={`p-1 rounded-xl flex items-center gap-1 border shadow-sm bg-gray-50 border-gray-100`}>
                                <button
                                    onClick={() => setLayoutMode('grid')}
                                    className={`p-1.5 rounded-lg transition-all ${layoutMode === 'grid'
                                        ? 'bg-amber-600 text-white shadow-sm shadow-amber-900/20'
                                        : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                    title="Grid View"
                                >
                                    <LayoutGrid size={16} />
                                </button>
                                <button
                                    onClick={() => setLayoutMode('list')}
                                    className={`p-1.5 rounded-lg transition-all ${layoutMode === 'list'
                                        ? 'bg-amber-600 text-white shadow-sm shadow-amber-900/20'
                                        : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                    title="List View"
                                >
                                    <List size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {isLoading && candidates.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <motion.div
                                className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-8 bg-gray-50`}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            >
                                <Loader2 className="text-amber-600" size={32} />
                            </motion.div>
                            <h3 className={`text-xl font-black tracking-tight text-gray-900`}>Syncing Studio</h3>
                            <p className={`font-bold uppercase tracking-widest text-[9px] mt-2 text-gray-400`}>
                                Finding your recent purchases...
                            </p>
                        </div>
                    ) : candidates.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <div className={`w-24 h-24 rounded-2xl flex items-center justify-center mb-8 bg-gray-50`}>
                                <svg className={`w-12 h-12 text-gray-200`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h3 className={`text-xl font-black tracking-tight text-gray-900`}>No Items to Review</h3>
                            <p className={`font-bold uppercase tracking-widest text-[9px] mt-2 text-gray-400`}>
                                {searchQuery ? "Try refining your search query" : "Your review queue is currently empty"}
                            </p>
                        </div>
                    ) : (
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`${layoutMode}-${sortMode}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className={layoutMode === 'grid'
                                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                                    : "flex flex-col gap-3"
                                }
                            >
                                {sortMode === 'category' ? (() => {
                                    const groups: Record<string, typeof candidates> = {};
                                    candidates.forEach(c => {
                                        const cat = c.category || 'Uncategorized';
                                        if (!groups[cat]) groups[cat] = [];
                                        groups[cat].push(c);
                                    });

                                    return Object.entries(groups).map(([category, items]) => (
                                        <React.Fragment key={category}>
                                            <div className={`col-span-full pt-6 pb-2 border-b mb-2 flex items-center gap-3 border-gray-100`}>
                                                <h3 className={`text-sm font-black uppercase tracking-[0.2em] text-amber-600`}>
                                                    {category}
                                                </h3>
                                                <div className={`h-px flex-1 bg-gray-100/50`}></div>
                                                <span className={`text-[10px] font-bold text-gray-400`}>
                                                    {items.length} {items.length === 1 ? 'Item' : 'Items'}
                                                </span>
                                            </div>
                                            {items.map(candidate => (
                                                <ReviewCandidateCard
                                                    key={candidate.asin}
                                                    candidate={candidate}
                                                    layoutMode={layoutMode}
                                                />
                                            ))}
                                        </React.Fragment>
                                    ));
                                })() : (
                                    candidates.map(candidate => (
                                        <ReviewCandidateCard
                                            key={candidate.asin}
                                            candidate={candidate}
                                            layoutMode={layoutMode}
                                        />
                                    ))
                                )}
                            </motion.div>
                        </AnimatePresence>
                    )}
                </main>

                {/* Footer Tag */}
                <div className="px-12 pt-8 flex items-center justify-center gap-3">
                    <div className={`h-px flex-1 bg-gray-100`}></div>
                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] text-gray-300`}>Powered by Review Studio</span>
                    <div className={`h-px flex-1 bg-gray-100`}></div>
                </div>
            </div>

            <SettingsDashboard
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
        </div>
    );
};

// Wrapper with Provider
export const ReviewPurchasesPage: React.FC = () => {
    return (
        <SettingsProvider>
            <AutoSyncWatcher />
            <ScalingWrapper>
                <ReviewPurchasesContent />
            </ScalingWrapper>
        </SettingsProvider>
    );
};
