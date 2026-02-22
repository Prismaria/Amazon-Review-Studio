import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ReviewPurchasesPage } from './pages/ReviewPurchases/ReviewPurchasesPage';
import style from './index.css?inline';
import { settingsService } from './services/settings';

const MOUNT_ID = 'amazon-review-studio-root';

/** CSS to hide native Amazon UI early to prevent flicker */
const HIDE_CSS = `
    #react-app.ryp__desktop, 
    .in-context-ryp__container, 
    [data-testid="in-context-ryp-form"],
    #in-context-ryp-form {
        display: none !important;
    }
    #amazon-review-studio-root {
        display: block !important;
    }
`;

/** Inject hiding style as soon as possible */
function injectHidingStyle() {
    const debugUnhide = settingsService.get('debug_unhide_native');
    const existing = document.getElementById('ars-anti-flicker');

    // If unhide is enabled, ensure we DON'T have the hiding style
    if (debugUnhide) {
        if (existing) {
            console.log('[Amazon Review Studio] Debug Unhide active, removing anti-flicker style.');
            existing.remove();
        }
        return;
    }

    // If unhide is disabled and style doesn't exist, add it
    if (!existing) {
        const styleEl = document.createElement('style');
        styleEl.id = 'ars-anti-flicker';
        styleEl.textContent = HIDE_CSS;
        (document.head || document.documentElement).appendChild(styleEl);
    }
}

// Run immediately
injectHidingStyle();

/** Selectors for Amazon's review container */
const CONTAINER_SELECTORS = [
    '#react-app.ryp__desktop',
    '#react-app',
    '.in-context-ryp__container',
    '[data-testid="in-context-ryp-form"]',
    '.ryp__review-candidates-list-container__container', // For Thank You page
] as const;

function detectPageType(): 'listing' | 'review' {
    const path = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    const hasAsin = searchParams.has('asin');

    // Check for standard "Thank You" pages OR the "Review Your Purchases" listing.
    // Note: thankyou pages often have ASIN in URL, but should still show the grid
    const isThankYouPage = path.toLowerCase().includes('thankyou');
    const isListingPage = path.includes('/listing');
    const isReviewPurchasesWithoutEdit = path.includes('/review-your-purchases') && !hasAsin && !path.includes('/edit');
    const hasDOMIndicators = !!document.querySelector('.in-context-ryp__thankyou-container-desktop') ||
        !!document.querySelector('.ryp__review-candidates-list-container__container');

    const shouldShowListing = isThankYouPage || isListingPage || isReviewPurchasesWithoutEdit || hasDOMIndicators;

    return shouldShowListing ? 'listing' : 'review';
}

function findAmazonReviewContainer(): Element | null {
    for (const sel of CONTAINER_SELECTORS) {
        const el = document.querySelector(sel);
        if (el) {
            console.log(`[Amazon Review Studio] Container found via selector: ${sel}`);
            return el;
        }
    }
    return null;
}

function hideAmazonReviewUI(container: Element) {
    const debugUnhide = settingsService.get('debug_unhide_native');
    const sideBySide = settingsService.get('debug_native_side_by_side');

    // Select all potential Amazon form elements to ensure children are also shown/hidden
    const allContainers = document.querySelectorAll(CONTAINER_SELECTORS.join(', '));

    allContainers.forEach((el) => {
        const htmlEl = el as HTMLElement;
        if (debugUnhide) {
            // Force visibility on ALL found Amazon form elements
            htmlEl.style.setProperty('display', 'block', 'important');

            if (sideBySide) {
                htmlEl.style.setProperty('opacity', '1', 'important');
                htmlEl.style.setProperty('margin-top', '0', 'important');
                // Only apply flex to the main container being moved/wrapped
                if (htmlEl === container) {
                    htmlEl.style.setProperty('flex', '1', 'important');
                    htmlEl.style.setProperty('min-width', '0', 'important');
                    htmlEl.style.setProperty('max-width', 'none', 'important');
                }
            } else {
                // Default dimmed look
                htmlEl.style.setProperty('opacity', '0.5', 'important');
                // Only push the top-level container down
                if (htmlEl === container) {
                    htmlEl.style.setProperty('margin-top', '600px', 'important');
                }
            }
        } else {
            htmlEl.style.setProperty('display', 'none', 'important');
        }
    });

    // Special case for a common deeply nested Amazon form ID that might not be in the top list
    const rypForm = document.getElementById('in-context-ryp-form');
    if (rypForm) {
        if (debugUnhide) {
            rypForm.style.setProperty('display', 'block', 'important');
            rypForm.style.setProperty('opacity', '1', 'important');
        } else {
            rypForm.style.setProperty('display', 'none', 'important');
        }
    }
}

function mount() {
    if (document.getElementById(MOUNT_ID)) return;

    const container = findAmazonReviewContainer();
    if (!container) {
        return;
    }

    console.log('[Amazon Review Studio] Found review container, replacing with Review Studio...');

    // Hide Amazon's native UI but keep form elements in DOM for our bridge
    hideAmazonReviewUI(container);

    // Create our React host
    const host = document.createElement('div');
    host.id = MOUNT_ID;

    // Check settings for side-by-side mode
    const debugUnhide = settingsService.get('debug_unhide_native');
    const sideBySide = settingsService.get('debug_native_side_by_side');

    Object.assign(host.style, {
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        minHeight: '600px', // Maintain vertical space during load
        paddingTop: (debugUnhide && sideBySide) ? '0' : '40px', // Remove top padding in side-by-side mode
        paddingLeft: '24px',
        paddingRight: '24px',
        boxSizing: 'border-box',
    });

    // Insert our host as sibling after the hidden container so it takes its visual place
    const parent = container.parentNode;

    if (parent) {
        if (debugUnhide && sideBySide) {
            // Create a wrapper for side-by-side layout
            const wrapper = document.createElement('div');
            wrapper.id = 'ars-side-by-side-wrapper';
            Object.assign(wrapper.style, {
                display: 'flex',
                gap: '24px',
                alignItems: 'flex-start',
                width: '100%',
                maxWidth: '100%',
            });

            // Insert wrapper before the container
            parent.insertBefore(wrapper, container);

            // Move both host and container into wrapper (Review Studio on left, native form on right)
            wrapper.appendChild(host);
            wrapper.appendChild(container);

            // Adjust host styling for side-by-side
            Object.assign(host.style, {
                flex: '1',
                minWidth: '0',
                width: 'auto',
            });
        } else {
            // Default: insert host BEFORE the container so it appears on top
            parent.insertBefore(host, container);
        }
    } else {
        document.body.appendChild(host);
    }

    // Use shadow DOM for style isolation
    const shadow = host.attachShadow({ mode: 'open' });

    // Inject styles via a simple style tag for best compatibility
    const styleEl = document.createElement('style');
    styleEl.textContent = style;
    shadow.appendChild(styleEl);

    // Create a container for React inside the shadow root
    const rootContainer = document.createElement('div');
    rootContainer.className = 'ars-root-container';
    shadow.appendChild(rootContainer);

    const pageType = detectPageType();

    console.log('[Amazon Review Studio] Rendering React tree...', `Component: ${pageType === 'listing' ? 'ReviewPurchasesPage' : 'App'}`);
    const root = ReactDOM.createRoot(rootContainer);
    root.render(
        pageType === 'listing' ? <ReviewPurchasesPage /> : <App />
    );

    // Store the current page type and root for remounting
    (window as any).__arsCurrentPageType = pageType;
    (window as any).__arsReactRoot = { root, rootContainer };
}

function remountIfNeeded() {
    const currentPageType = (window as any).__arsCurrentPageType;
    const newPageType = detectPageType();

    if (currentPageType && currentPageType !== newPageType) {
        console.log('[Amazon Review Studio] Page type changed, remounting...', { from: currentPageType, to: newPageType });

        // Get the root container info
        const rootInfo = (window as any).__arsReactRoot;
        if (rootInfo?.root) {
            // Re-render using the existing root to ensure proper unmounting/cleanup
            rootInfo.root.render(
                newPageType === 'listing' ? <ReviewPurchasesPage /> : <App />
            );
            (window as any).__arsCurrentPageType = newPageType;
        }
    }
}

function watchAndMount() {
    injectHidingStyle(); // Ensure hiding style respects current settings

    if (document.getElementById(MOUNT_ID)) {
        // If already mounted, still ensure the container is hidden/visible correctly
        const container = findAmazonReviewContainer();
        if (container) hideAmazonReviewUI(container);
        return;
    }

    if (findAmazonReviewContainer()) {
        mount();
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', watchAndMount);
} else {
    watchAndMount();
}

// Amazon may load the review form dynamically
const observer = new MutationObserver(() => {
    watchAndMount();
    remountIfNeeded(); // Check if URL changed and we need to remount
});

// Observe documentElement if body isn't ready, to catch earliest possible container injection
observer.observe(document.documentElement, { childList: true, subtree: true });

// Listen for URL changes (SPA navigation)
let lastUrl = window.location.href;
const urlObserver = new MutationObserver(() => {
    const currentUrl = window.location.href;
    if (currentUrl !== lastUrl) {
        console.log('[Amazon Review Studio] URL changed:', { from: lastUrl, to: currentUrl });
        lastUrl = currentUrl;
        remountIfNeeded();
    }
});

// Observe URL changes
urlObserver.observe(document, { subtree: true, childList: true });

// Also listen for popstate (back/forward button)
window.addEventListener('popstate', () => {
    console.log('[Amazon Review Studio] Popstate detected');
    remountIfNeeded();
});
