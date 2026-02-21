/**
 * Amazon Review Studio - Extension Loader
 * Pre-loads data and prepares the environment for the userscript.
 */

(async function () {
    'use strict';

    const STORAGE_KEY = 'ars_userscript_data';

    // Pre-fetch storage to make GM_getValue "synchronous" for the userscript initialization
    const result = await new Promise((resolve) => {
        chrome.storage.local.get([STORAGE_KEY], (res) => {
            resolve(res[STORAGE_KEY] || {});
        });
    });

    window.__ars_storage_cache = result;

    console.log('[Review Studio] Loader ready, storage cached.');
})();
