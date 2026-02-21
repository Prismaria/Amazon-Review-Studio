import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ReviewCandidate {
    asin: string;
    title: string;
    imageUrl: string;
    reviewUrl: string;
    currentRating?: number;
    isVideoRequired: boolean;
    purchaseDate?: Date | string;
    category?: string;
}

interface RandomReviewReminderProps {
    region: string;
    refreshTrigger?: number;
}

const REMINDER_MESSAGES = [
    "Hope you didn't forget about this one...",
    "Look what the cat dragged in...",
    "Hey look, an unreviewed item!",
    "Well, what are you waiting for?",
    "Review it like your life depends on it!",
    "How about just one more, eh?",
    "What do you think about this item?",
    "Got any opinions to share about this item?",
    "Anything noteworthy about this item?",
    "This item is waiting for your expert opinion...",
    "Your review skills are getting rusty...",
    "Don't leave this one hanging!",
    "Time to be the hero this product deserves!",
    "Your review awaits its champion...",
    "Almost forgot, didn't you?",
    "Here's your chance to help others!",
    "Your thoughts matter - share them!",
    "A review a day keeps the regret away!",
    "This item believes in you!",
    "Don't keep this product waiting...",
    "Ready to share your experience?",
    "This one's been sitting around too long...",
    "Your wisdom is needed here!"
];

export const RandomReviewReminder: React.FC<RandomReviewReminderProps> = ({ region, refreshTrigger = 0 }) => {
    const [candidate, setCandidate] = useState<ReviewCandidate | null>(null);
    const [loading, setLoading] = useState(true);
    const [theme, setTheme] = useState<string>('black');
    const [reminderText] = useState(() => 
        REMINDER_MESSAGES[Math.floor(Math.random() * REMINDER_MESSAGES.length)]
    );

    // Detect current theme
    useEffect(() => {
        const detectTheme = () => {
            const htmlTheme = document.documentElement.getAttribute('data-theme');
            if (htmlTheme) {
                setTheme(htmlTheme);
            } else {
                // Fallback to checking chrome storage
                if (typeof chrome !== 'undefined' && chrome.storage) {
                    chrome.storage.local.get(['popupTheme'], (result) => {
                        setTheme(result.popupTheme || 'black');
                    });
                }
            }
        };
        
        detectTheme();
        
        // Listen for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'data-theme') {
                    detectTheme();
                }
            });
        });
        
        observer.observe(document.documentElement, { attributes: true });
        
        return () => observer.disconnect();
    }, []);

    const fetchRandomCandidate = () => {
        setLoading(true);
        if (typeof chrome !== 'undefined' && chrome.runtime) {
            chrome.runtime.sendMessage({ type: 'GET_RANDOM_CANDIDATE' }, (response) => {
                if (response && response.candidate) {
                    setCandidate(response.candidate);
                } else {
                    setCandidate(null);
                }
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRandomCandidate();
    }, [refreshTrigger]);

    const handleReviewClick = () => {
        if (!candidate) return;
        
        // Use candidate's reviewUrl if available, otherwise construct it
        const baseUrl = `https://www.amazon${region}`;
        let reviewUrl = candidate.reviewUrl;
        
        // If reviewUrl is relative, make it absolute
        if (reviewUrl && !reviewUrl.startsWith('http')) {
            // Check if it starts with /, if not add it
            if (!reviewUrl.startsWith('/')) {
                reviewUrl = `/${reviewUrl}`;
            }
            reviewUrl = baseUrl + reviewUrl;
        }
        
        // Ensure ASIN is in the URL
        if (!reviewUrl.includes('asin=')) {
            const separator = reviewUrl.includes('?') ? '&' : '?';
            reviewUrl = `${reviewUrl}${separator}asin=${candidate.asin}`;
        }
        
        // Open in new tab
        if (typeof chrome !== 'undefined' && chrome.tabs) {
            chrome.tabs.create({ url: reviewUrl });
        } else {
            window.open(reviewUrl, '_blank');
        }
    };

    if (loading) {
        return (
            <div className="p-4 rounded-xl transition-colors duration-300" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <div className="text-center text-sm" style={{ color: 'var(--text-muted)' }}>Loading random item...</div>
            </div>
        );
    }

    if (!candidate) {
        return (
            <div className="p-4 rounded-xl transition-colors duration-300" style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}>
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--text-muted)' }}>
                    Random Review Reminder
                </h3>
                <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
                    No items to review. Visit your review purchases page to see items.
                </p>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl space-y-3 transition-colors duration-300"
            style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
        >
            <h3 className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)', fontWeight: 900, fontFamily: 'Rubik, sans-serif' }}>
                {reminderText}
            </h3>

            {/* Image and Title Row */}
            <div className="flex items-start gap-3">
                {/* Product Image */}
                <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden flex items-center justify-center transition-colors duration-300" 
                     style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                    <img
                        src={candidate.imageUrl}
                        alt={candidate.title}
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Product Title and Review Button */}
                <div className="flex-1 min-w-0 flex items-start justify-between gap-2">
                    <h4 className="text-xs font-medium line-clamp-4 leading-tight flex-1 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                        {candidate.title}
                    </h4>
                    <motion.button
                        onClick={handleReviewClick}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        className={`shine-button shrink-0 w-16 h-16 rounded-lg text-white font-black uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-0 relative overflow-hidden group ${
                            theme === 'light' 
                                ? 'bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-600 hover:to-amber-500' 
                                : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
                        }`}
                        style={{
                            animation: 'pulseGlow 2s ease-in-out infinite',
                            textShadow: '0 1px 2px rgba(0,0,0,0.3), 0 0 1px rgba(0,0,0,0.5)',
                            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)'
                        }}
                    >
                        <style>{`
                            @keyframes pulseGlow {
                                0%, 100% {
                                    box-shadow: 0 0 15px ${theme === 'light' ? 'rgba(251, 191, 36, 0.5)' : 'rgba(245, 158, 11, 0.4)'}, 0 0 25px ${theme === 'light' ? 'rgba(251, 191, 36, 0.3)' : 'rgba(245, 158, 11, 0.25)'};
                                }
                                50% {
                                    box-shadow: 0 0 20px ${theme === 'light' ? 'rgba(251, 191, 36, 0.6)' : 'rgba(245, 158, 11, 0.5)'}, 0 0 30px ${theme === 'light' ? 'rgba(251, 191, 36, 0.4)' : 'rgba(245, 158, 11, 0.35)'};
                                }
                            }
                            .shine-button:hover .shine-effect {
                                transform: translateX(100%) !important;
                            }
                            .shine-button:hover {
                                transform: translateY(-2px);
                                box-shadow: 0 8px 25px rgba(245, 158, 11, 0.5);
                            }
                        `}</style>
                        {/* Shine effect overlay */}
                        <span 
                            className="shine-effect absolute inset-0 w-full h-full pointer-events-none"
                            style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                transform: 'translateX(-100%)',
                                transition: 'transform 0.5s ease'
                            }}
                        />
                        <span className="text-xs leading-none relative z-10" style={{ fontFamily: 'Rubik, sans-serif', fontWeight: 800, letterSpacing: '0.02em' }}>Review</span>
                        <span className="text-xs leading-none relative z-10" style={{ fontFamily: 'Rubik, sans-serif', fontWeight: 800, letterSpacing: '0.02em' }}>Now!</span>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};
