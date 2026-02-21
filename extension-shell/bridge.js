/**
 * Amazon Review Studio - Extension Bridge
 * Polyfills Greasemonkey/Tampermonkey APIs for Chrome Extension context.
 */

(function () {
    'use strict';

    // Standard polyfill for unsafeWindow
    window.unsafeWindow = window;

    // --- Storage APIs (using chrome.storage.local) ---

    // We use a prefix to keep extension-specific data separate if needed
    const STORAGE_KEY = 'ars_userscript_data';

    // Helper to get all data
    async function getInternalStorage() {
        return new Promise((resolve) => {
            chrome.storage.local.get([STORAGE_KEY], (result) => {
                resolve(result[STORAGE_KEY] || {});
            });
        });
    }

    // Helper to set all data
    async function setInternalStorage(data) {
        return new Promise((resolve) => {
            chrome.storage.local.set({ [STORAGE_KEY]: data }, () => {
                resolve();
            });
        });
    }

    window.GM_addStyle = function (css) {
        const style = document.createElement('style');
        style.textContent = css;
        (document.head || document.documentElement).appendChild(style);
        return style;
    };

    window.GM_getValue = function (key, defaultValue) {
        if (window.__ars_storage_cache && key in window.__ars_storage_cache) {
            return window.__ars_storage_cache[key];
        }
        return defaultValue;
    };

    window.GM_setValue = async function (key, value) {
        const data = await getInternalStorage();
        data[key] = value;
        await setInternalStorage(data);
        if (window.__ars_storage_cache) window.__ars_storage_cache[key] = value;
    };

    window.GM_deleteValue = async function (key) {
        const data = await getInternalStorage();
        delete data[key];
        await setInternalStorage(data);
        if (window.__ars_storage_cache) delete window.__ars_storage_cache[key];
    };

    window.GM_listValues = async function () {
        const data = await getInternalStorage();
        return Object.keys(data);
    };

    // --- Network APIs ---

    /**
     * Determines whether a URL is "external" (i.e. not on any Amazon domain).
     * External requests must be proxied through the background service worker
     * to avoid CORS errors, since content scripts are bound to their host origin.
     */
    function isExternalUrl(url) {
        try {
            const { hostname } = new URL(url);
            return !hostname.match(/\bamazon\.[a-z.]+$/i);
        } catch {
            return false; // Relative URL — treat as same-origin
        }
    }

    window.GM_xmlhttpRequest = function (details) {
        const { method = 'GET', url, headers, data, onload, onerror } = details;

        if (isExternalUrl(url)) {
            // Route through the background service worker; it has host_permissions
            // for external URLs (e.g. pastebin.com) and is NOT subject to CORS.
            chrome.runtime.sendMessage(
                { type: 'EXTERNAL_FETCH', method, url, data, headers: headers || {} },
                (response) => {
                    if (chrome.runtime.lastError) {
                        if (onerror) onerror(new Error(chrome.runtime.lastError.message));
                        return;
                    }
                    if (!response) {
                        if (onerror) onerror(new Error('No response from background'));
                        return;
                    }
                    if (response.error) {
                        if (onerror) onerror(new Error(response.error));
                        return;
                    }
                    if (onload) {
                        onload({
                            status: response.status,
                            statusText: response.statusText,
                            responseText: response.responseText,
                            headers: {},
                            finalUrl: url,
                        });
                    }
                }
            );
        } else {
            // Same-origin (Amazon) requests can use fetch directly.
            fetch(url, { method, headers: headers || {}, body: data })
                .then(async (response) => {
                    const text = await response.text();
                    if (onload) onload({
                        status: response.status,
                        statusText: response.statusText,
                        responseText: text,
                        headers: Object.fromEntries(response.headers.entries()),
                        finalUrl: response.url,
                    });
                })
                .catch((err) => {
                    if (onerror) onerror(err);
                });
        }

        return { abort: () => { } }; // Dummy abort
    };

    console.log('[Review Studio] Extension Bridge Loaded');
})();
