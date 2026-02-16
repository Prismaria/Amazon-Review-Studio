import { ReviewCandidate } from '../types';

const CACHE_KEY = 'ars_product_details_cache';
const CACHE_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface CachedData {
    timestamp: number;
    details: {
        [asin: string]: {
            purchaseDate?: string; // ISO string
            category?: string;
            description?: string;
            reviews?: string[];
        };
    };
}

// Singleton cache to avoid race conditions and redundant JSON parsing
let memoizedCache: CachedData | null = null;

const getCache = (): CachedData => {
    if (memoizedCache) return memoizedCache;

    try {
        const data = localStorage.getItem(CACHE_KEY);
        if (data) {
            memoizedCache = JSON.parse(data);
            return memoizedCache!;
        }
    } catch (e) {
        console.warn('[ARS] Failed to read cache', e);
    }

    memoizedCache = { timestamp: Date.now(), details: {} };
    return memoizedCache;
};

const saveCache = (data: CachedData) => {
    try {
        // Update timestamp on every write to keep the rolling cache alive
        data.timestamp = Date.now();
        memoizedCache = data;
        localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch (e) {
        console.warn('[ARS] Failed to save cache', e);
    }
};

export const getCachedInfo = (asin: string): { purchaseDate?: Date; category?: string; description?: string; reviews?: string[] } | null => {
    const cache = getCache();
    const item = cache.details[asin];

    // We want the cache to be per-item ideally, but for now we check the global timestamp.
    // Since we update the timestamp on every write, this effectively becomes a rolling cache.
    const isCacheValid = (Date.now() - cache.timestamp) < CACHE_EXPIRY_MS;

    if (item && isCacheValid) {
        return {
            purchaseDate: item.purchaseDate ? new Date(item.purchaseDate) : undefined,
            category: item.category,
            description: item.description,
            reviews: item.reviews
        };
    }
    return null;
};

const fetchPageSource = async (url: string): Promise<string | null> => {
    try {
        const response = await fetch(url);
        return await response.text();
    } catch (e) {
        console.error('[ARS] Failed to fetch page source', url, e);
        return null;
    }
};

const decodeHtmlEntities = (text: string): string => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    return tempDiv.textContent || tempDiv.innerText || '';
};

export const fetchProductContext = async (asin: string): Promise<{ purchaseDate?: Date; category?: string; description?: string; reviews?: string[] }> => {
    const cache = getCache();
    const cachedItem = cache.details[asin];

    const isCacheValid = (Date.now() - cache.timestamp) < CACHE_EXPIRY_MS;

    if (isCacheValid && cachedItem) {
        return {
            purchaseDate: cachedItem.purchaseDate ? new Date(cachedItem.purchaseDate) : undefined,
            category: cachedItem.category,
            description: cachedItem.description,
            reviews: cachedItem.reviews
        };
    }

    // Fetch fresh data
    const url = `/dp/${asin}`;
    const html = await fetchPageSource(url);

    if (!html) return {};

    let purchaseDate: Date | undefined;
    let category: string | undefined;
    let description: string | undefined;
    let reviews: string[] = [];

    // 1. Scrape Date: "You last purchased this item on..."
    const dateMatch = html.match(/class="a-size-medium">\s*You last purchased this item on ([^<]+)</i);
    if (dateMatch) {
        const dateStr = dateMatch[1].trim();
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
            purchaseDate = date;
        }
    }

    // 2. Scrape Category: BSR or Breadcrumbs
    const bsrRowMatch = html.match(/<tr[^>]*>\s*<th[^>]*>\s*Best Sellers Rank[\s\S]*?<\/tr>/i);
    if (bsrRowMatch) {
        const bsrRowHtml = bsrRowMatch[0];
        const categoryMatches: string[] = [];
        const bsrItemRegex = /<span[^>]*class="a-list-item"[^>]*>([\s\S]*?)<\/span>/gi;
        let match: RegExpExecArray | null;

        while ((match = bsrItemRegex.exec(bsrRowHtml)) !== null) {
            const htmlText = match[1];

            const anchorMatch = htmlText.match(/#\d+[\d,]* in\s*<a[^>]*>([^<]+)<\/a>/i);
            if (anchorMatch?.[1]) {
                categoryMatches.push(decodeHtmlEntities(anchorMatch[1].trim()));
                continue;
            }

            const text = htmlText.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
            const rankCat = text.match(/#\d+[\d,]* in ([^\(\n]+)/i);
            if (rankCat?.[1]) {
                categoryMatches.push(decodeHtmlEntities(rankCat[1].trim()));
            }
        }

        if (categoryMatches.length > 0) {
            category = categoryMatches[0];
        }
    }

    if (!category) {
        const breadcrumbMatch = html.match(/<div[^>]*id="wayfinding-breadcrumbs_feature_div"[^>]*>([\s\S]*?)<\/div>/i);
        if (breadcrumbMatch) {
            const breadcrumbHtml = breadcrumbMatch[1];
            const breadcrumbLinks = breadcrumbHtml.match(/<a[^>]*>([^<]+)<\/a>/gi);
            if (breadcrumbLinks) {
                const breadcrumbCategories = breadcrumbLinks
                    .map(link => decodeHtmlEntities(link.replace(/<[^>]+>/g, '').trim()))
                    .filter(text => text && !text.includes('Amazon') && !text.includes('Home'));

                if (breadcrumbCategories.length > 0) {
                    category = breadcrumbCategories[0];
                }
            }
        }
    }

    // 3. Scrape Description (Bullets)
    const bulletsMatch = html.match(/<div[^>]*id="feature-bullets"[^>]*>([\s\S]*?)<\/div>/i);
    if (bulletsMatch) {
        const bulletsHtml = bulletsMatch[1];
        const bullets = bulletsHtml.match(/<span[^>]*class="a-list-item"[^>]*>([\s\S]*?)<\/span>/gi);
        if (bullets) {
            description = bullets
                .map(b => decodeHtmlEntities(b.replace(/<[^>]+>/g, '').trim()))
                .filter(t => t.length > 0)
                .join('\n');
        }
    }

    // Fallback to paragraph description if no bullets
    if (!description) {
        const descMatch = html.match(/<div[^>]*id="productDescription"[^>]*>([\s\S]*?)<\/div>/i);
        if (descMatch) {
            description = decodeHtmlEntities(descMatch[1].replace(/<[^>]+>/g, '').trim());
        }
    }

    // 4. Scrape Top Reviews
    // Look for review bodies. This is a simple regex approach; a DOM parser would be robust but we have string HTML.
    // Review bodies are often in <span data-hook="review-body" ...><span>...</span></span>
    const reviewBodyRegex = /data-hook="review-body"[^>]*>[\s\S]*?<span[^>]*>([\s\S]*?)<\/span>/gi;
    let reviewMatch: RegExpExecArray | null;
    let count = 0;

    // We create a temporary DOM element to parse the whole HTML to avoid complex regex issues with nested tags
    // But since we are in a browser environment (userscript), we can use DOMParser!
    // However, `fetchPageSource` returns text.
    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const reviewElements = doc.querySelectorAll('[data-hook="review-body"] span');
        reviewElements.forEach((el) => {
            if (count < 3) {
                const text = el.textContent?.trim();
                if (text && text.length > 20) { // Filter out empty or very short reviews
                    reviews.push(text);
                    count++;
                }
            }
        });
    } catch (e) {
        console.warn('[ARS] DOMParser failed, using regex fallback', e);
        while ((reviewMatch = reviewBodyRegex.exec(html)) !== null && count < 3) {
            const text = decodeHtmlEntities(reviewMatch[1].replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').trim());
            if (text.length > 20) {
                reviews.push(text);
                count++;
            }
        }
    }

    // Update cache
    cache.details[asin] = {
        purchaseDate: purchaseDate?.toISOString(),
        category: category || 'Uncategorized',
        description: description,
        reviews: reviews
    };
    saveCache(cache);

    return { purchaseDate, category: category || 'Uncategorized', description, reviews };
};

export const fetchProductDetails = async (candidate: ReviewCandidate): Promise<{ purchaseDate?: Date; category?: string }> => {
    const details = await fetchProductContext(candidate.asin);
    return {
        purchaseDate: details.purchaseDate,
        category: details.category
    };
};
