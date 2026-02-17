import React, { useState } from 'react';
import { ReviewCandidate, LayoutMode } from '../types';
import { Calendar, Tag, ChevronRight, RotateCcw } from 'lucide-react';
import { StarRating } from '../../../components/review/StarRating';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
    candidate: ReviewCandidate;
    layoutMode: LayoutMode;
}

export const ReviewCandidateCard: React.FC<Props> = ({ candidate, layoutMode }) => {
    const [rating, setRating] = useState(0);

    const productUrl = `/dp/${candidate.asin}`;

    const handleRatingChange = (newRating: number) => {
        setRating(newRating);

        // SYNC WITH NATIVE DOM: Find the native Amazon card for this ASIN
        const nativeCard = Array.from(document.querySelectorAll('.ryp__review-candidate'))
            .find(el => {
                const link = el.querySelector('a[href*="asin="], a[href*="/dp/"]');
                const href = link?.getAttribute('href') || '';
                return href.includes(candidate.asin);
            });

        if (nativeCard) {
            if (newRating > 0) {
                const nativeStars = nativeCard.querySelectorAll('button[data-hook="ryp-star"]');
                if (nativeStars && nativeStars.length >= newRating) {
                    const targetStar = nativeStars[newRating - 1] as HTMLButtonElement;
                    targetStar.click();
                }
            } else {
                // CLEAR RATING: Find the native clear button
                const clearBtn = nativeCard.querySelector('.in-context-ryp__form-field--starRating--clear, [class*="starRating--clear"], [aria-label="Clear"]') as HTMLElement | null;
                if (clearBtn) {
                    console.log('[ARS] Clicking native clear button in card');
                    clearBtn.click();
                    // Sometimes need inner span or mouse events
                    clearBtn.querySelector('span')?.click();
                    const mouseEventProps = { bubbles: true, cancelable: true, view: window };
                    clearBtn.dispatchEvent(new MouseEvent('mousedown', mouseEventProps));
                    clearBtn.dispatchEvent(new MouseEvent('mouseup', mouseEventProps));
                }
            }
        }
    };

    const handleReset = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleRatingChange(0);
    };

    if (layoutMode === 'list') {
        return (
            <div className={`rounded-xl border overflow-hidden flex flex-row items-center gap-4 px-4 py-1.5 group transition-all duration-300 bg-white border-gray-100 hover:shadow-md h-14`}>
                {/* Small Image - Linked to Product */}
                <a
                    href={productUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 shrink-0 flex items-center justify-center"
                    title="View Product Page"
                >
                    <img
                        src={candidate.imageUrl}
                        alt={candidate.title}
                        className="w-full h-full object-contain mix-blend-multiply"
                    />
                </a>

                {/* Title and Metadata - Expanded */}
                <div className="flex-1 min-w-0">
                    <h3 className={`text-[11px] font-bold truncate leading-tight text-gray-900`}>
                        {candidate.title}
                    </h3>
                    <div className={`flex items-center gap-3 mt-0.5 text-[8px] font-bold uppercase tracking-wider text-gray-400`}>
                        {candidate.purchaseDate && (
                            <div className="flex items-center gap-1">
                                <Calendar size={8} />
                                <span>{candidate.purchaseDate.toLocaleDateString()}</span>
                            </div>
                        )}
                        {candidate.category && (
                            <div className="flex items-center gap-1">
                                <Tag size={8} />
                                <span>{candidate.category}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Rating - Middle Right */}
                <div className="flex items-center gap-2">
                    <div className="scale-[0.55] origin-right">
                        <StarRating
                            value={rating}
                            onChange={handleRatingChange}
                            hideClear
                        />
                    </div>
                    {rating > 0 && (
                        <button
                            onClick={handleReset}
                            className={`p-1 rounded-lg transition-colors text-gray-400 hover:text-gray-600`}
                        >
                            <RotateCcw size={10} />
                        </button>
                    )}
                </div>

                {/* Always Visible Review Button */}
                <div className="w-28 shrink-0 flex justify-end">
                    <a
                        href={candidate.reviewUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`flex items-center justify-center gap-1 w-full py-1.5 rounded-lg text-[9px] font-black transition-all duration-300 uppercase tracking-widest ${rating > 0
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-200/50 active:scale-95'
                            : 'bg-gray-100 text-gray-300 cursor-not-allowed opacity-50'
                            }`}
                        onClick={(e) => rating === 0 && e.preventDefault()}
                    >
                        Review
                        <ChevronRight size={10} className="ml-0.5" />
                    </a>
                </div>
            </div>
        );
    }

    // Grid Layout
    return (
        <div className={`rounded-xl border overflow-hidden flex flex-row relative group shadow-sm hover:shadow-md transition-all duration-300 h-30 bg-white border-gray-100`}>

            {/* Product Image Area - Left (Linked to Product) */}
            <a
                href={productUrl}
                target="_blank"
                rel="noreferrer"
                className="w-28 shrink-0 p-2 flex items-center justify-center"
                title="View Product Page"
            >
                <div className="w-full h-full relative">
                    <img
                        src={candidate.imageUrl}
                        alt={candidate.title}
                        className="w-full h-full object-contain mix-blend-multiply"
                    />
                    {candidate.isVideoRequired && (
                        <div className="absolute top-0 left-0">
                            <span className="bg-blue-600 text-white text-[7px] font-black px-1.5 py-0.5 rounded shadow-sm">VIDEO</span>
                        </div>
                    )}
                </div>
            </a>

            {/* Content Area - Right */}
            <div className="flex-1 p-2.5 pl-1 flex flex-col items-start min-w-0">
                <div className="w-full">
                    <h3 className={`text-[11px] font-bold line-clamp-3 leading-tight mb-0.5 tracking-tight text-left text-gray-900`}>
                        {candidate.title}
                    </h3>

                    <div className={`flex items-center gap-2 text-[8px] font-bold uppercase tracking-wider text-left text-gray-400`}>
                        {candidate.purchaseDate ? (
                            <div className="flex items-center gap-1">
                                <Calendar size={8} />
                                <span>{candidate.purchaseDate.toLocaleDateString()}</span>
                            </div>
                        ) : candidate.category ? (
                            <div className="flex items-center gap-1">
                                <Tag size={8} />
                                <span className="truncate max-w-[80px]">{candidate.category}</span>
                            </div>
                        ) : null}
                    </div>
                </div>

                {/* Stars - Centered */}
                <div className="mt-0.5 flex items-center justify-center w-full">
                    <div className="inline-flex items-center">
                        <StarRating
                            value={rating}
                            onChange={handleRatingChange}
                            className="scale-[0.7] origin-center"
                            hideClear
                        />
                    </div>
                </div>

                {/* Bottom Section: Pop-up Buttons */}
                <div className="mt-auto w-full px-1 mb-0.5">
                    <AnimatePresence>
                        {rating > 0 && (
                            <motion.div
                                className="flex items-center gap-1.5"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                transition={{ type: "spring", damping: 15, stiffness: 200 }}
                            >
                                <motion.a
                                    href={candidate.reviewUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={`flex-1 flex items-center justify-center gap-1 py-1 rounded-lg text-[9px] font-black transition-all duration-300 uppercase tracking-widest shadow-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-amber-200/50`}
                                >
                                    Review
                                    <ChevronRight size={10} />
                                </motion.a>

                                <button
                                    onClick={handleReset}
                                    className={`p-1.5 rounded-lg transition-colors flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700`}
                                    title="Reset Rating"
                                >
                                    <RotateCcw size={14} />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
