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
    if (document.getElementById('ars-anti-flicker')) return;

    // Respect debug setting to unhide native UI
    const debugUnhide = settingsService.get('debug_unhide_native');
    if (debugUnhide) return;

    const styleEl = document.createElement('style');
    styleEl.id = 'ars-anti-flicker';
    styleEl.textContent = HIDE_CSS;
    (document.head || document.documentElement).appendChild(styleEl);
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
    if (debugUnhide) {
        (container as HTMLElement).style.display = 'block';
        (container as HTMLElement).style.opacity = '0.5'; // dimmed to show it's "background"
        (container as HTMLElement).style.marginTop = '600px'; // Push it down below our app
    } else {
        (container as HTMLElement).style.display = 'none';
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

    Object.assign(host.style, {
        position: 'relative',
        width: '100%',
        maxWidth: '100%',
        minHeight: '600px', // Maintain vertical space during load
        paddingTop: '40px',
        paddingLeft: '24px',
        paddingRight: '24px',
        boxSizing: 'border-box',
    });

    // Insert our host as sibling after the hidden container so it takes its visual place
    const parent = container.parentNode;
    if (parent) {
        parent.insertBefore(host, container.nextSibling);
    } else {
        document.body.appendChild(host);
    }

    // Use shadow DOM for style isolation
    const shadow = host.attachShadow({ mode: 'open' });
    const styleSheet = new CSSStyleSheet();
    styleSheet.replaceSync(style);
    shadow.adoptedStyleSheets = [styleSheet];

    const path = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);
    const hasAsin = searchParams.has('asin');

    // Check for standard "Thank You" pages OR the "Review Your Purchases" listing.
    const isReviewPurchasesListing =
        path.toLowerCase().includes('thankyou') ||
        path.includes('/listing') ||
        (path.includes('/review-your-purchases') && !hasAsin && !path.includes('/edit')) ||
        !!document.querySelector('.in-context-ryp__thankyou-container-desktop') ||
        !!document.querySelector('.ryp__review-candidates-list-container__container');

    ReactDOM.createRoot(shadow).render(
        <React.StrictMode>
            {isReviewPurchasesListing ? <ReviewPurchasesPage /> : <App />}
        </React.StrictMode>
    );
}

function watchAndMount() {
    if (document.getElementById(MOUNT_ID)) return;
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
});

// Observe documentElement if body isn't ready, to catch earliest possible container injection
observer.observe(document.documentElement, { childList: true, subtree: true });
