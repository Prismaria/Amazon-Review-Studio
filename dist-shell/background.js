/**
 * Amazon Review Studio - Background Scraper
 * Silently fetches Vine statistics to populate the popup dashboard.
 */

const ALARM_NAME = 'vine-stats-refresh';
const SCRAPE_INTERVAL_MINS = 30; // 30 minutes

chrome.runtime.onInstalled.addListener(() => {
    console.log('[ARS Background] Installed. Setting up alarms and CORS rules...');
    chrome.alarms.create(ALARM_NAME, { periodInMinutes: SCRAPE_INTERVAL_MINS });

    // Help bypass CORS for Catbox by stripping Origin/Referer headers
    if (chrome.declarativeNetRequest) {
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: [1],
            addRules: [{
                id: 1,
                priority: 1,
                action: {
                    type: 'modifyHeaders',
                    requestHeaders: [
                        { header: 'origin', operation: 'remove' },
                        { header: 'referer', operation: 'remove' }
                    ]
                },
                condition: {
                    urlFilter: '|https://catbox.moe/*',
                    resourceTypes: ['xmlhttprequest', 'other']
                }
            }]
        });
    }

    refreshVineStats();
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === ALARM_NAME) {
        console.log('[ARS Background] Scheduled stats refresh starting...');
        refreshVineStats();
    }
});

// Listen for manual refresh requests from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'REFRESH_STATS') {
        refreshVineStats().then(stats => sendResponse(stats));
        return true; // Keep channel open for async response
    }
    if (request.type === 'GET_RANDOM_CANDIDATE') {
        chrome.storage.local.get(['reviewCandidates'], (result) => {
            const candidates = result.reviewCandidates || [];
            if (candidates.length === 0) {
                sendResponse({ candidate: null });
                return;
            }
            const randomIndex = Math.floor(Math.random() * candidates.length);
            const candidate = candidates[randomIndex];
            // Convert ISO string back to Date if present
            if (candidate.purchaseDate) {
                candidate.purchaseDate = new Date(candidate.purchaseDate);
            }
            sendResponse({ candidate });
        });
        return true; // Keep channel open for async response
    }
    // Route cross-origin fetch requests from the content script through the background
    // worker to bypass CORS restrictions. The content script (running on amazon.com)
    // cannot directly call external APIs like pastebin.com due to CORS, but the
    // background service worker can, provided host_permissions are declared.
    if (request.type === 'EXTERNAL_FETCH') {
        const { method = 'GET', url, data, headers = {} } = request;

        const performFetch = async (bodyData) => {
            const options = {
                method,
                headers,
            };
            if (bodyData) {
                options.body = bodyData;
            }
            try {
                const response = await fetch(url, options);
                const text = await response.text();
                sendResponse({
                    status: response.status,
                    statusText: response.statusText,
                    responseText: text,
                    ok: response.ok,
                });
            } catch (err) {
                sendResponse({ error: err.message || String(err) });
            }
        };

        if (data && typeof data === 'string' && data.startsWith('data:')) {
            fetch(data).then(res => res.blob()).then(blob => performFetch(blob));
        } else {
            performFetch(data);
        }
        return true;
    }

    if (request.type === 'EXTERNAL_UPLOAD') {
        const { url, fields = {}, files = [] } = request;

        const formData = new FormData();
        Object.entries(fields).forEach(([key, val]) => formData.append(key, val));

        const filePromises = files.map(async (f) => {
            const res = await fetch(f.base64);
            const blob = await res.blob();
            formData.append(f.field, blob, f.name);
        });

        Promise.all(filePromises).then(() => {
            fetch(url, { method: 'POST', body: formData })
                .then(async (response) => {
                    const text = await response.text();
                    sendResponse({
                        status: response.status,
                        statusText: response.statusText,
                        responseText: text,
                        ok: response.ok,
                    });
                })
                .catch((err) => {
                    sendResponse({ error: err.message || String(err) });
                });
        });
        return true;
    }

    if (request.type === 'FETCH_IMAGE') {
        fetch(request.url)
            .then(async (response) => {
                const blob = await response.blob();
                const reader = new FileReader();
                reader.onloadend = () => {
                    sendResponse({ dataUrl: reader.result });
                };
                reader.readAsDataURL(blob);
            })
            .catch((err) => {
                sendResponse({ error: err.message || String(err) });
            });
        return true;
    }
});


async function refreshVineStats() {
    console.log('[ARS Background] Refreshing Vine stats...');

    try {
        const stats = {
            lastUpdated: Date.now(),
            tier: 'Silver',
            maxRequests: 3,
            requestsUsed: 0,
            pendingReviews: 0,
            completedReviews: 0,
            totalOrders: 0,
            error: null
        };

        const tld = await detectAmazonTLD();
        const baseUrl = `https://www.amazon${tld}`;

        // 1. Fetch Tier, Max Requests, and Eval Metrics from /vine/account
        const accountHtml = await fetchHtml(`${baseUrl}/vine/account`);
        if (accountHtml.includes('id="vvp-amazon-vine-gold"') || accountHtml.includes('vvp-amazon-vine-gold') || accountHtml.includes('<b>Gold</b>')) {
            stats.tier = 'Gold';
            stats.maxRequests = 8;
        }

        // --- Eval Performance Metrics (parsed from the same accountHtml) ---

        // Total Reviews count
        const totalReviewsMatch = accountHtml.match(
            /vvp-num-reviewed-metric-display[\s\S]*?a-size-extra-large[^>]*>\s*([\d.]+)/
        );
        stats.evalTotalReviews = totalReviewsMatch ? parseInt(totalReviewsMatch[1], 10) : null;

        // Total Reviews progress bar %
        const totalReviewsProgressMatch = accountHtml.match(
            /vvp-num-reviewed-metric-display[\s\S]*?data-progress="([\d.]+)"/
        );
        stats.evalTotalReviewsProgress = totalReviewsProgressMatch ? parseFloat(totalReviewsProgressMatch[1]) : null;

        // Review-to-order ratio %
        const reviewRatioMatch = accountHtml.match(
            /vvp-perc-reviewed-metric-display[\s\S]*?a-size-extra-large[^>]*>\s*([\d.]+)/
        );
        stats.evalReviewRatio = reviewRatioMatch ? parseFloat(reviewRatioMatch[1]) : null;

        // Insightfulness score (text label)
        const insightfulnessMatch = accountHtml.match(
            /vvp-num-review-insightfulness-score-metric-display[\s\S]*?a-size-extra-large[^>]*>\s*([A-Za-z]+)/
        );
        stats.evalInsightfulness = insightfulnessMatch ? insightfulnessMatch[1].trim() : null;

        // Reviews with media %
        const mediaPctMatch = accountHtml.match(
            /vvp-review-with-media-metric-display[\s\S]*?a-size-extra-large[^>]*>\s*([\d.]+)/
        );
        stats.evalMediaPct = mediaPctMatch ? parseFloat(mediaPctMatch[1]) : null;

        // Days remaining in eval period
        const daysRemainingMatch = accountHtml.match(/\((\d+) days remaining\)/);
        stats.evalDaysRemaining = daysRemainingMatch ? parseInt(daysRemainingMatch[1], 10) : null;

        console.log('[ARS Background] Eval metrics:', {
            evalTotalReviews: stats.evalTotalReviews,
            evalTotalReviewsProgress: stats.evalTotalReviewsProgress,
            evalReviewRatio: stats.evalReviewRatio,
            evalInsightfulness: stats.evalInsightfulness,
            evalMediaPct: stats.evalMediaPct,
            evalDaysRemaining: stats.evalDaysRemaining,
        });


        // 2. Fetch Orders & Daily Quota from /vine/orders
        const ordersHtml = await fetchHtml(`${baseUrl}/vine/orders`);

        // Extract Total Orders: "Orders (x)"
        const totalOrdersMatch = ordersHtml.match(/<h3[^>]*class="[^"]*vine-heading-fade[^"]*"[^>]*>Orders\s*\((\d+)\)<\/h3>/i)
            || ordersHtml.match(/Orders\s*\((\d+)\)/i);
        stats.totalOrders = totalOrdersMatch ? parseInt(totalOrdersMatch[1], 10) : 0;

        // Count requests used today (Requests Used)
        // We check varied date formats because the background fetch might receive different
        // locale formatting (e.g. "Feb 18, 2026" vs "2026-02-18") than the browser tab.
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const shortYear = String(yyyy).slice(-2);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthStr = monthNames[today.getMonth()]; // "Feb"

        // Formats to check: YYYY-MM-DD, DD/MM/YYYY, MM/DD/YYYY, Text formats
        const possibleDates = [
            `${yyyy}-${mm}-${dd}`,       // 2026-02-18 (ISO/Canada)
            `${mm}/${dd}/${yyyy}`,       // 02/18/2026 (US)
            `${dd}/${mm}/${yyyy}`,       // 18/02/2026 (Europe)
            `${monthStr} ${dd}, ${yyyy}`,// Feb 18, 2026 (US Text)
            `${dd} ${monthStr} ${yyyy}`, // 18 Feb 2026 (EU Text)
            `${monthStr} ${parseInt(dd)}, ${yyyy}`, // Feb 18, 2026 (No padding)
        ];

        console.log(`[ARS Background] Checking for today's date formats:`, possibleDates);

        let foundCount = 0;

        // We look for >DATE< to ensure we are matching the table cell content
        // We combine counts from all matching formats (though usually only one format is present)
        possibleDates.forEach(dateStr => {
            const regex = new RegExp(`>\\s*${dateStr}\\s*<`, 'gi');
            const matches = ordersHtml.match(regex);
            if (matches) {
                console.log(`[ARS Background] Found match for format "${dateStr}": ${matches.length}`);
                foundCount = matches.length; // Use the count from the matching format
            }
        });

        // Strategy 2: Check for data-order-timestamp attributes (more robust)
        const timestampRegex = /data-order-timestamp="(\d+)"/g;
        let tsMatch;
        let tsCount = 0;

        while ((tsMatch = timestampRegex.exec(ordersHtml)) !== null) {
            const ts = parseInt(tsMatch[1], 10);
            const date = new Date(ts);

            // Check if this timestamp is from "today" (local time)
            if (date.getFullYear() === today.getFullYear() &&
                date.getMonth() === today.getMonth() &&
                date.getDate() === today.getDate()) {
                tsCount++;
            }
        }

        if (tsCount > 0) {
            console.log(`[ARS Background] Found ${tsCount} orders via data-order-timestamp.`);
            foundCount = Math.max(foundCount, tsCount);
        } else {
            const rowIndex = ordersHtml.indexOf('vvp-orders-table--row');
            if (rowIndex !== -1) {
                // Extended lookahead to find the timestamp in case it's further down
                console.log(`[ARS Debug] First order row context (extended):`, ordersHtml.substring(rowIndex, rowIndex + 1500));
            } else {
                console.warn(`[ARS Debug] No 'vvp-orders-table--row' found! Is the table empty?`);
            }
        }

        stats.requestsUsed = foundCount;

        // 3. Fetch Pending Reviews from /vine/vine-reviews
        const reviewsHtml = await fetchHtml(`${baseUrl}/vine/vine-reviews`);
        const pendingMatch = reviewsHtml.match(/Reviews\s*\((\d+)\)/i);
        stats.pendingReviews = pendingMatch ? parseInt(pendingMatch[1], 10) : 0;

        // 4. Fetch Completed Reviews from /vine/vine-reviews?review-type=completed
        const completedHtml = await fetchHtml(`${baseUrl}/vine/vine-reviews?review-type=completed`);
        const completedMatch = completedHtml.match(/Reviews\s*\((\d+)\)/i);
        stats.completedReviews = completedMatch ? parseInt(completedMatch[1], 10) : 0;

        console.log('[ARS Background] Stats updated successfully:', stats);
        await chrome.storage.local.set({ vineStats: stats });
        return stats;

    } catch (err) {
        console.error('[ARS Background] Error refreshing stats:', err);
        const errorStats = { error: err.message, lastUpdated: Date.now() };
        await chrome.storage.local.set({ vineStats: errorStats });
        return errorStats;
    }
}

/** Helper: Simple fetch for background worker */
async function fetchHtml(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.text();
}

/** Utility: Extract number from strings like "Reviews (12)" */
function extractCount(str) {
    const match = str.match(/\((\d+)\)/);
    return match ? parseInt(match[1], 10) : 0;
}

/** Utility: Extract "3/8" from request messages */
function extractRequests(str) {
    const match = str.match(/(\d+\/\d+)/);
    return match ? match[1] : null;
}

/** Utility: Figure out which Amazon site the user is on */
async function detectAmazonTLD() {
    // Check storage first for a manual override
    const storage = await new Promise(resolve => chrome.storage.local.get(['amazonRegion'], resolve));
    if (storage.amazonRegion) return storage.amazonRegion;

    // Fallback to active tab detection if no storage set
    // Chrome does not support wildcards in the TLD for tabs.query patterns
    const supportedDomains = [
        "amazon.com", "amazon.ca", "amazon.co.uk", "amazon.de",
        "amazon.fr", "amazon.it", "amazon.es", "amazon.co.jp",
        "amazon.in", "amazon.com.au"
    ];

    return new Promise((resolve) => {
        // Query for all tabs and filter manually to avoid invalid pattern errors
        chrome.tabs.query({}, (tabs) => {
            const amazonTab = tabs.find(tab =>
                tab.url && supportedDomains.some(d => tab.url.includes(d))
            );

            if (amazonTab) {
                const url = new URL(amazonTab.url);
                const hostname = url.hostname;
                // Extract TLD: e.g. "www.amazon.co.uk" -> ".co.uk"
                const match = hostname.match(/amazon(\.[a-z.]+)/i);
                const tld = match ? match[1] : '.com';

                // Save it for future use if it's the first time
                chrome.storage.local.set({ amazonRegion: tld });
                resolve(tld);
            } else {
                resolve('.com'); // Default fallback
            }
        });
    });
}
