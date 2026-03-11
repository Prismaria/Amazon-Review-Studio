import React from 'react';
import { useReviewCandidates } from './hooks/useReviewCandidates';
import { ReviewCandidateCard } from './components/ReviewCandidateCard';
import { SortFilterTabs } from './components/SortFilterTabs';
import { SettingsDashboard } from '../../components/settings/SettingsDashboard';
import { SettingsProvider } from '../../context/SettingsContext';
import { useSettings as useAppSettings } from '../../hooks/useSettings';
import { AlertProvider } from '../../context/AlertContext';
import { ProfileSection } from '../../components/review/ProfileSection';
import { AutoSyncWatcher } from '../../components/common/AutoSyncWatcher';
import { Moon, Settings, CheckCircle2, Loader2, LayoutGrid, List, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutMode } from './types';
import { ScalingWrapper } from '../../components/common/ScalingWrapper';
import { useAmazonForm } from '../../hooks/useAmazonForm';

const StarsIcon = ({ size = 22, className = "" }: { size?: number, className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="currentColor"
        className={className}
    >
        {/* Large center star — outlined like Moon icon */}
        <path d="M45,17 L52,37 L73,38 L57,51 L63,72 L45,60 L27,72 L33,51 L17,38 L38,37 Z" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinejoin="round" className="ars-twinkle-1" />
        {/* Medium upper-right star */}
        <path d="M80,8 L83,17 L93,17 L85,23 L88,32 L80,26 L72,32 L75,23 L67,17 L77,17 Z" className="ars-twinkle-2" />
        {/* Small lower-left star */}
        <path d="M22,68 L25,76 L34,76 L27,81 L30,90 L22,85 L14,90 L17,81 L10,76 L19,76 Z" className="ars-twinkle-3" />
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
    const amazon = useAmazonForm();
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
        <div className="w-full max-w-[1200px] mx-auto">
            <motion.div
                className={`rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden pb-12 bg-white border-gray-100 border w-full`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >

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
                            className={`p-2.5 rounded-xl transition-all ars-tooltip ars-tooltip-left ${settings.amazon_ui_lights_off
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
                            data-tooltip={settings.dark_mode ? "Dark Mode On (Long Press to Toggle)" : "Lights Off (Long Press for Dark Mode)"}
                        >
                            {settings.dark_mode ? <StarsIcon size={20} /> : <Moon size={20} />}
                        </button>
                        <button
                            type="button"
                            className="p-2.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-xl transition-all ars-tooltip ars-tooltip-left"
                            onClick={() => setIsSettingsOpen(true)}
                            data-tooltip="Settings"
                        >
                            <Settings size={20} />
                        </button>
                    </div>
                </div>

                {/* Amazon Error Message */}
                <AnimatePresence>
                    {amazon.error && (
                        <motion.div
                            className="px-10 pt-10"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <div className="ars-amazon-error-banner !m-0">
                                <AlertCircle size={20} />
                                <div className="ars-error-text" dangerouslySetInnerHTML={{ __html: amazon.error.message }} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

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
                            <div className={`rounded-3xl p-8 flex items-start gap-6 border shadow-lg bg-gradient-to-br from-green-50 to-emerald-50/50 border-green-200/50 w-fit mx-auto dark:from-gray-700 dark:to-gray-800 dark:border-gray-600`}>
                                <motion.div
                                    className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 bg-green-100 dark:bg-green-900`}
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                                >
                                    <CheckCircle2 className="text-green-600 dark:text-green-300" size={32} strokeWidth={2} />
                                </motion.div>
                                <div>
                                    <motion.h3
                                        className={`text-2xl mb-2 text-green-800 dark:text-green-200`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                    >
                                        <span className="font-black tracking-tight">Review Submitted</span>
                                    </motion.h3>
                                    <motion.p
                                        className={`text-lg mb-3 text-green-700 dark:text-green-300`}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                    >
                                        <span className="font-light">Awesome! </span>
                                        <span className="font-bold">Thank you for helping other shoppers!</span>
                                    </motion.p>
                                    <motion.p
                                        className={`text-sm text-green-600/70 dark:text-green-400/70`}
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
                <main className="px-10 py-6 min-h-[400px] w-full">
                    {/* Layout Toggle Switch */}
                    {!isLoading && candidates.length > 0 && (
                        <div className="flex justify-end mb-6">
                            <div className={`p-1 rounded-xl flex items-center gap-1 border shadow-sm bg-gray-50 border-gray-100`}>
                                <button
                                    onClick={() => setLayoutMode('grid')}
                                    className={`p-1.5 rounded-lg transition-all ars-tooltip ${layoutMode === 'grid'
                                        ? 'bg-amber-600 text-white shadow-sm shadow-amber-900/20'
                                        : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                    data-tooltip="Grid View"
                                >
                                    <LayoutGrid size={16} />
                                </button>
                                <button
                                    onClick={() => setLayoutMode('list')}
                                    className={`p-1.5 rounded-lg transition-all ars-tooltip ${layoutMode === 'list'
                                        ? 'bg-amber-600 text-white shadow-sm shadow-amber-900/20'
                                        : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                    data-tooltip="List View"
                                >
                                    <List size={16} />
                                </button>
                            </div>
                        </div>
                    )}

                    {isLoading && candidates.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center w-full">
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
                        <div className="flex flex-col items-center justify-center py-24 text-center w-full">
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
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                style={{ contain: 'layout' }}
                                className={layoutMode === 'grid'
                                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full"
                                    : "flex flex-col gap-3 w-full"
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
            </motion.div>

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
            <AlertProvider>
                <AutoSyncWatcher />
                <ScalingWrapper>
                    <ReviewPurchasesContent />
                </ScalingWrapper>
            </AlertProvider>
        </SettingsProvider>
    );
};
