import { useState, useEffect, useCallback, useRef } from 'react';
import { ReviewCandidate, SortMode } from '../types';
import { fetchProductDetails, getCachedInfo } from '../services/productDetailsFetcher';

export const useReviewCandidates = () => {
    const [candidates, setCandidates] = useState<ReviewCandidate[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortMode, setSortMode] = useState<SortMode>('default');
    const [searchQuery, setSearchQuery] = useState('');
    const [dismissedAsins, setDismissedAsins] = useState<string[]>([]);
    const [thankYouHtml, setThankYouHtml] = useState<string | null>(null);
    const [profile, setProfile] = useState<{ name: string; avatarSrc: string }>({ name: '', avatarSrc: '' });

    // Track asins being enriched to avoid duplicate work
    const enrichedAsins = useRef<Set<string>>(new Set());

    // Load dismissed items from local storage
    useEffect(() => {
        const stored = localStorage.getItem('rstudio_dismissed_asins');
        if (stored) {
            setDismissedAsins(JSON.parse(stored));
        }
    }, []);

    // Fast Scrape Function
    const scrapePage = useCallback(() => {
        const items: ReviewCandidate[] = [];

        // Scrape Thank You Message if present
        const thankYouContainer = document.querySelector('.in-context-ryp__thankyou-container-desktop');
        if (thankYouContainer) {
            setThankYouHtml(thankYouContainer.innerHTML);
        }

        // Scrape Profile Info
        const profileEl = document.querySelector('[data-hook="ryp-profile-info"]');
        if (profileEl) {
            const name = profileEl.querySelector('.a-profile-name')?.textContent || '';
            const avatarSrc = profileEl.querySelector('img')?.getAttribute('src') || '';
            setProfile({ name, avatarSrc });
        }

        // Scrape Candidates
        const candidateElements = document.querySelectorAll('.ryp__review-candidate');
        candidateElements.forEach((el) => {
            const titleEl = el.querySelector('.ryp__review-candidate__product-title');
            const imgEl = el.querySelector('.ryp__review-candidate__product-image');
            const linkEl = el.querySelector('a[href*="asin="], a[href*="/dp/"]');
            const videoBanner = el.querySelector('[data-banner-type="NEEDS_VIDEO_BANNER"]');

            if (titleEl && imgEl) {
                const title = titleEl.textContent?.trim() || 'Unknown Product';
                const imageUrl = imgEl.getAttribute('src') || '';
                const href = linkEl?.getAttribute('href') || '';

                let asin = '';
                const urlParams = new URLSearchParams(href.split('?')[1]);
                asin = urlParams.get('asin') || '';

                if (!asin) {
                    const dpMatch = href.match(/\/dp\/([A-Z0-9]{10})/);
                    if (dpMatch) asin = dpMatch[1];
                }

                if (asin) {
                    // APPLY CACHE IMMEDIATELY
                    const cached = getCachedInfo(asin);

                    items.push({
                        asin,
                        title,
                        imageUrl,
                        reviewUrl: href,
                        isVideoRequired: !!videoBanner,
                        currentRating: 0,
                        ...(cached || {})
                    });

                    // If it was in cache, don't enrich it again
                    if (cached) {
                        enrichedAsins.current.add(asin);
                    }
                }
            }
        });

        if (items.length > 0) {
            setCandidates(prev => {
                const prevMap = new Map(prev.map(c => [c.asin, c]));
                let hasChanges = prev.length !== items.length;

                const merged = items.map(newItem => {
                    const existing = prevMap.get(newItem.asin);
                    if (existing) {
                        return {
                            ...newItem,
                            purchaseDate: existing.purchaseDate || newItem.purchaseDate,
                            category: existing.category || newItem.category,
                            currentRating: existing.currentRating || newItem.currentRating
                        };
                    }
                    hasChanges = true;
                    return newItem;
                });

                return hasChanges ? merged : prev;
            });
            setIsLoading(false);
            return true;
        }
        return false;
    }, []);

    // Initial Detection & MutationObserver
    useEffect(() => {
        // Try immediately
        const found = scrapePage();

        // If not found or potentially more coming, watch for additions
        const observer = new MutationObserver(() => {
            if (scrapePage()) {
                // Once we have items, we can stop the aggressive polling if we want,
                // but Amazon might load them in chunks, so keep watching?
                // Actually, RYP usually loads one big chunk.
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // Backup interval for cases where MutationObserver might miss (rare on desktop)
        const interval = setInterval(() => {
            if (scrapePage()) {
                // If found, we can slow down or stop interval
            }
        }, 500);

        return () => {
            observer.disconnect();
            clearInterval(interval);
        };
    }, [scrapePage]);

    // Progressive Enrichment in Batches
    useEffect(() => {
        if (candidates.length === 0) return;

        const enrichInParallel = async () => {
            const batchSize = 5;
            const unenriched = candidates.filter(c => !enrichedAsins.current.has(c.asin));

            if (unenriched.length === 0) return;

            // Mark as processing to avoid redundant loops
            unenriched.forEach(c => enrichedAsins.current.add(c.asin));

            // Process in batches
            for (let i = 0; i < unenriched.length; i += batchSize) {
                const batch = unenriched.slice(i, i + batchSize);

                await Promise.all(batch.map(async (candidate) => {
                    try {
                        const details = await fetchProductDetails(candidate);
                        if (details.purchaseDate || details.category) {
                            setCandidates(prev => prev.map(c =>
                                c.asin === candidate.asin ? { ...c, ...details } : c
                            ));
                        }
                    } catch (err) {
                        console.warn(`[ARS] Failed to enrich ${candidate.asin}`, err);
                    }
                }));

                // Short delay between batches to be nice to Amazon
                if (i + batchSize < unenriched.length) {
                    await new Promise(r => setTimeout(r, 200));
                }
            }
        };

        enrichInParallel();
    }, [candidates.length]);

    // Sync candidates to chrome.storage.local for extension popup access
    useEffect(() => {
        if (candidates.length > 0 && typeof chrome !== 'undefined' && chrome.storage) {
            // Convert Date objects to ISO strings for storage
            const serializableCandidates = candidates.map(c => ({
                ...c,
                purchaseDate: c.purchaseDate ? c.purchaseDate.toISOString() : undefined
            }));
            chrome.storage.local.set({ reviewCandidates: serializableCandidates });
        }
    }, [candidates]);

    const dismissCandidate = useCallback((asin: string) => {
        const newDismissed = [...dismissedAsins, asin];
        setDismissedAsins(newDismissed);
        localStorage.setItem('rstudio_dismissed_asins', JSON.stringify(newDismissed));
    }, [dismissedAsins]);

    const filteredCandidates = candidates.filter(c => {
        if (dismissedAsins.includes(c.asin)) return false;
        if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        return true;
    });

    const sortedCandidates = [...filteredCandidates].sort((a, b) => {
        if (sortMode === 'date') {
            const dateA = a.purchaseDate ? new Date(a.purchaseDate).getTime() : 0;
            const dateB = b.purchaseDate ? new Date(b.purchaseDate).getTime() : 0;
            // Newest first
            if (dateA && dateB) return dateB - dateA;
            if (dateA) return -1;
            if (dateB) return 1;
            return 0;
        }
        if (sortMode === 'category') {
            const catA = a.category || 'Uncategorized';
            const catB = b.category || 'Uncategorized';
            if (catA === 'Uncategorized' && catB !== 'Uncategorized') return 1;
            if (catB === 'Uncategorized' && catA !== 'Uncategorized') return -1;
            return catA.localeCompare(catB);
        }
        if (sortMode === 'alpha') return a.title.localeCompare(b.title);
        return 0;
    });

    return {
        candidates: sortedCandidates,
        isLoading,
        sortMode,
        setSortMode,
        searchQuery,
        setSearchQuery,
        dismissCandidate,
        thankYouHtml,
        profile
    };
};
