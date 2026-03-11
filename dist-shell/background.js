/**
 * Amazon Review Studio - Background Scraper
 * Silently fetches Vine statistics to populate the popup dashboard.
 */

const ALARM_NAME = 'vine-stats-refresh';
const SCRAPE_INTERVAL_MINS = 30; // 30 minutes
const OPTIONS_MENU_ID = 'ars-open-options';

chrome.runtime.onInstalled.addListener(() => {
    console.log('[ARS Background] Installed. Setting up alarms, context menus, and CORS rules...');
    chrome.alarms.create(ALARM_NAME, { periodInMinutes: SCRAPE_INTERVAL_MINS });

    // Create context menu for the extension icon
    chrome.contextMenus.create({
        id: OPTIONS_MENU_ID,
        title: "Open Dashboard",
        contexts: ["action"]
    });

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

    // Set initial icon theme from stored popupTheme
    chrome.storage.local.get(['popupTheme'], (result) => {
        const isDark = (result.popupTheme === 'dark' || result.popupTheme === 'black');
        updateIconTheme(isDark);
    });

    refreshVineStats();
});

chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.popupTheme) {
        const newTheme = changes.popupTheme.newValue;
        const isDark = (newTheme === 'dark' || newTheme === 'black');
        updateIconTheme(isDark);
    }
});

/**
 * Updates the extension toolbar icon based on theme.
 * @param {boolean} isDark 
 */
function updateIconTheme(isDark) {
    const suffix = isDark ? 'dark' : 'light';

    const details = {
        path: {
            "16": `icons/logo_small_${suffix}.png`,
            "48": `icons/logo_small_${suffix}.png`
        }
    };

    chrome.action.setIcon(details, () => {
        if (chrome.runtime.lastError) {
            // Silently fallback if the object map fails
            chrome.action.setIcon({ path: `icons/logo_small_${suffix}.png` }).catch(() => { });
        }
    });
}

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === ALARM_NAME) {
        console.log('[ARS Background] Scheduled stats refresh starting...');
        refreshVineStats();
    }
});

// Listen for manual refresh requests from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'SET_ICON_THEME') {
        updateIconTheme(request.isDark);
        sendResponse({ success: true });
        return;
    }
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


// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === OPTIONS_MENU_ID) {
        chrome.runtime.openOptionsPage();
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

        // Count requests used today (Requests Used) using 3 AM EST reset threshold
        const threshold = getQuotaResetThreshold();
        console.log(`[ARS Background] Daily quota threshold: ${new Date(threshold).toISOString()} (${threshold})`);

        const timestampRegex = /data-order-timestamp="(\d+)"/g;
        let tsMatch;
        let foundCount = 0;

        while ((tsMatch = timestampRegex.exec(ordersHtml)) !== null) {
            const ts = parseInt(tsMatch[1], 10);
            if (ts >= threshold) {
                foundCount++;
            }
        }

        if (foundCount === 0 && ordersHtml.includes('vvp-orders-table--row')) {
            console.log(`[ARS Background] No orders found since reset, but rows exist. Checking first order for context:`);
            const rowIndex = ordersHtml.indexOf('vvp-orders-table--row');
            console.log(`[ARS Debug] First order row context:`, ordersHtml.substring(rowIndex, rowIndex + 1000));
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

/**
 * Calculates the UTC timestamp (ms) for the start of the current "Quota Day" (3 AM ET).
 * This is "timezone agnostic" as it anchors to ET regardless of user location.
 */
function getQuotaResetThreshold() {
    const now = new Date();

    // Get the current time in New York
    const nyTimeString = now.toLocaleString("en-US", { timeZone: "America/New_York", hour12: false });
    // String format: "M/D/YYYY, HH:MM:SS" (e.g., "3/1/2026, 03:13:37")
    const [datePart, timePart] = nyTimeString.split(", ");
    const [month, day, year] = datePart.split("/");
    const [hour] = timePart.split(":");

    // Create a Date object representing 3 AM ET on the CURRENT day in NY
    const et3AMToday = new Date(new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/New_York',
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        hour12: false
    }).format(now).replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+):(\d+)/, '$3-$1-$2T03:00:00'));

    // If it's currently earlier than 3 AM in New York, the threshold is 3 AM YESTERDAY.
    if (parseInt(hour, 10) < 3) {
        et3AMToday.setDate(et3AMToday.getDate() - 1);
    }

    return et3AMToday.getTime();
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
