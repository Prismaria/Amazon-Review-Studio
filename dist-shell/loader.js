/**
 * Amazon Review Studio - Extension Loader
 * Pre-loads data and prepares the environment for the userscript.
 */

(async function () {
    'use strict';

    const STORAGE_KEY = 'ars_userscript_data';

    // Pre-fetch storage to make settings available to the userscript initialization
    const result = await new Promise((resolve) => {
        chrome.storage.local.get([STORAGE_KEY, 'arsSettings', 'userRole', 'amazonRegion'], (res) => {
            const data = res[STORAGE_KEY] || {};
            // Inject top-level settings into the cache so GM_getValue can find them
            data.arsSettings = res.arsSettings || {};
            data.userRole = res.userRole || null;
            data.amazonRegion = res.amazonRegion || '.com';
            resolve(data);
        });
    });

    window.__ars_storage_cache = result;

    console.log('[Review Studio] Loader ready, storage cached.');
})();
