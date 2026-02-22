import { useState, useEffect, useCallback, useRef } from 'react';
import { imageStorage } from '../services/imageStorage';
import { useSettings } from './useSettings';

/** Amazon form element selectors */
const SELECTORS = {
    container: '#react-app, .in-context-ryp__container, [data-testid="in-context-ryp-form"]',
    form: '#in-context-ryp-form, form.in-context-ryp-form-desktop, form.ryp__review-form',
    textarea: '#reviewText, textarea[name="reviewText"], textarea[name="reviewBody"]',
    title: '#reviewTitle, input[name="reviewTitle"]',
    media: '#media, input[name="media"][type="file"]',
    thumbnails: '.in-context-ryp__form-field__thumbnails',
    thumbnailWrapper: '.in-context-ryp__form-field__thumbnail-wrapper',
    thumbnailImage: '.in-context-ryp__form-field___thumbnails--image, .in-context-ryp__form-field___thumbnails--video',
    mediaDelete: '.in-context-ryp__media-delete',
    starRating: '.in-context-ryp__form-field--starRating',
    starClear: '.in-context-ryp__form-field--starRating--clear',
    profile: '.ryp__profile__info, [data-hook="ryp-profile-info"]',
    profileAvatar: '.a-profile-avatar img, .ryp__profile__info img',
    profileName: '.a-profile-name, .ryp__profile__info .a-profile-content span',
    profileEditLink: '#ryp__profile__edit-link, [data-hook="ryp-profile-edit-link"]',
    productHeader: '.in-context-ryp__product-header, [data-testid="in-context-ryp__product-header"]',
    productImage: '.in-context-ryp__product-header img',
    productTitle: '.in-context-ryp__product-title',
    productName: '.in-context-ryp__product-name, .ryp__product-title',
    submitBtn: '.ryp-submit-button-desktop input[type="submit"], .ryp__submit-button input[type="submit"]',
} as const;

/** Scoped query - searches within container first, then document */
function query<T extends Element>(selector: string, root: Document | Element = document): T | null {
    return root.querySelector(selector) as T | null;
}

function queryAll<T extends Element>(selector: string, root: Document | Element = document): T[] {
    return Array.from(root.querySelectorAll(selector)) as T[];
}

export interface AmazonFormState {
    reviewText: string;
    reviewTitle: string;
    starRating: number;
    mediaThumbnails: string[];
}

export interface AmazonFormElements {
    form: HTMLFormElement | null;
    textarea: HTMLTextAreaElement | null;
    titleInput: HTMLInputElement | null;
    mediaInput: HTMLInputElement | null;
    submitBtn: HTMLInputElement | null;
}

export type SyncStatus = 'idle' | 'saving' | 'saved' | 'error';

export interface UseAmazonFormResult {
    /** Whether Amazon form elements were found */
    isReady: boolean;
    /** Scraped profile data */
    profile: { avatarSrc: string; name: string; editLinkHref: string };
    /** Scraped product data */
    product: { imageSrc: string; title: string; name: string; productUrl: string };
    /** Form state - controlled by our UI */
    state: AmazonFormState;
    /** Update review text and sync to Amazon */
    setReviewText: (value: string) => void;
    /** Update review title and sync to Amazon */
    setReviewTitle: (value: string) => void;
    /** Set star rating (1-5) and sync to Amazon */
    setStarRating: (rating: number) => void;
    /** Trigger media file picker */
    triggerMediaUpload: () => void;
    /** Get all current media thumbnails as Blobs (transformed to full resolution) */
    getMediaBlobs: () => Promise<File[]>;
    /** Upload a set of files to Amazon's media field */
    setMediaFiles: (files: File[] | FileList) => void;
    /** Remove a media item by index */
    removeMedia: (index: number) => void;
    /** Paste image from clipboard into media upload. Optional event = use from paste event. Returns ok | no_image | denied | error */
    pasteImageFromClipboard: (pasteEvent?: ClipboardEvent) => Promise<'ok' | 'no_image' | 'denied' | 'error'>;
    /** Sync all state to Amazon and submit */
    submit: () => void;
    /** Raw form elements for advanced use */
    elements: AmazonFormElements;
    /** Current draft sync status */
    syncStatus: SyncStatus;
    /** Timestamp of last successful local save */
    lastSaved: Date | null;
}

const emptyProfile = { avatarSrc: '', name: '', editLinkHref: '#' };
const emptyProduct = { imageSrc: '', title: 'How was the item?', name: '', productUrl: '' };

/** Get Amazon site origin (e.g. https://www.amazon.com) */
function getAmazonBaseUrl(): string {
    try {
        const url = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href
            ?? window.location.href;
        return new URL(url).origin;
    } catch {
        return window.location.origin;
    }
}

/** Get product URL from current page (review/create-review often has asin in URL or DOM) */
function getProductUrlFromPage(root: Document | Element): string {
    const doc = root instanceof Document ? root : root.ownerDocument ?? document;
    const win = doc.defaultView ?? window;

    // PRIORITY 1: ASIN from current URL
    const asinFromUrl = win.location.href.match(/[?&]asin=([A-Z0-9]{10})|\/dp\/([A-Z0-9]{10})|\/gp\/product\/([A-Z0-9]{10})/);
    if (asinFromUrl) {
        const asin = asinFromUrl[1] ?? asinFromUrl[2] ?? asinFromUrl[3];
        if (asin) return `${getAmazonBaseUrl()}/dp/${asin}`;
    }

    // PRIORITY 2: Canonical or product link in DOM
    const canonical = doc.querySelector<HTMLLinkElement>('link[rel="canonical"][href*="/dp/"]');
    if (canonical?.href) return canonical.href.split('?')[0];

    const productLink = doc.querySelector<HTMLAnchorElement>('a[href*="/dp/"][href*="amazon"]');
    if (productLink?.href) return productLink.href.split('?')[0];

    const ogUrl = doc.querySelector<HTMLMetaElement>('meta[property="og:url"][content*="/dp/"]');
    if (ogUrl?.content) return ogUrl.content.split('?')[0];

    return '';
}

/** Get ASIN from product URL or current page */
function getAsinFromPage(): string | null {
    const asinMatch = window.location.href.match(/[?&]asin=([A-Z0-9]{10})|\/dp\/([A-Z0-9]{10})|\/gp\/product\/([A-Z0-9]{10})/);
    return asinMatch ? (asinMatch[1] ?? asinMatch[2] ?? asinMatch[3]) : null;
}

const nativeValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set;
const nativeTextareaSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set;

/** Sync value to element and dispatch events for Amazon's JS */
function syncToElement(el: HTMLInputElement | HTMLTextAreaElement | null, value: string) {
    if (!el) return;

    // Force React to notice the change by calling the native setter
    const setter = el instanceof HTMLTextAreaElement ? nativeTextareaSetter : nativeValueSetter;

    if (setter && value !== el.value) {
        setter.call(el, value);
    } else {
        el.value = value;
    }

    el.dispatchEvent(new Event('input', { bubbles: true }));
    el.dispatchEvent(new Event('change', { bubbles: true }));

    // Dispatch key events just in case validation relies on them
    el.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true }));
    el.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true }));
    el.dispatchEvent(new Event('blur', { bubbles: true }));
}

/** Attempt to set star rating via Amazon's star elements */
function setAmazonStarRating(rating: number, container: Document | Element) {
    // Handle rating 0 (Clear)
    if (rating === 0) {
        console.log('[ARS] Clearing star rating...');
        const clearBtn = query<HTMLElement>(SELECTORS.starClear, container);
        if (clearBtn) {
            console.log('[ARS] Clicking native clear button:', clearBtn);
            clearBtn.click();
            // Sometimes it needs a click on the inner span or mouse events
            const mouseEventProps = { bubbles: true, cancelable: true, view: window };
            clearBtn.dispatchEvent(new MouseEvent('mousedown', mouseEventProps));
            clearBtn.dispatchEvent(new MouseEvent('mouseup', mouseEventProps));
            clearBtn.querySelector('span')?.click();
        } else {
            console.warn('[ARS] Native clear button not found');
        }
        return;
    }

    // Try to find the wrapper first
    const wrapper = query<HTMLElement>(SELECTORS.starRating, container)
        || query<HTMLElement>('.in-context-ryp__form-field--starRating', container);

    if (!wrapper) {
        console.warn('[ARS] Star rating wrapper not found');
        return;
    }

    // Check if rating is already set correctly - if so, skip clicking
    const currentRating = getAmazonStarRating(container);
    if (currentRating === rating) {
        console.log(`[ARS] Star rating already set to ${rating}, skipping click`);
        return;
    }

    console.log(`[ARS] Setting star rating to ${rating}...`);

    // Amazon implementation: span > img
    // We want to click the span or the image
    const starSpans = queryAll<HTMLElement>(
        '.in-context-ryp__form-field--starRating-single',
        wrapper
    );

    if (starSpans.length >= rating) {
        const targetSpan = starSpans[rating - 1];
        console.log('[ARS] Clicking star span:', targetSpan);
        targetSpan.click();

        // Sometimes valid click requires mousedown/up
        const mouseEventProps = { bubbles: true, cancelable: true, view: window };
        targetSpan.dispatchEvent(new MouseEvent('mousedown', mouseEventProps));
        targetSpan.dispatchEvent(new MouseEvent('mouseup', mouseEventProps));

        // Also try clicking the image inside just to be safe
        const img = targetSpan.querySelector('img');
        if (img) {
            img.click();
            img.dispatchEvent(new MouseEvent('mousedown', mouseEventProps));
            img.dispatchEvent(new MouseEvent('mouseup', mouseEventProps));
        }
        return;
    }

    // Fallback for older/other implementations
    const stars = queryAll<HTMLElement>(
        '[data-rating], [aria-label*="star"], button, span[role="button"], .a-icon',
        wrapper
    );

    if (stars.length >= rating) {
        const target = stars[rating - 1];
        target?.click();
        return;
    }

    console.warn('[ARS] Could not find star element to click for rating:', rating);
}

/** Scrape star rating from Amazon's native component */
function getAmazonStarRating(container: Document | Element): number {
    const wrapper = query('.in-context-ryp__form-field--starRating', container);
    if (!wrapper) return 0;

    // Check for "filled" stars in data-testid
    const filledStars = wrapper.querySelectorAll('[data-testid$="-filled"]').length;
    if (filledStars > 0) return filledStars;

    return 0;
}

/**
 * Hook to read and sync with Amazon's review form DOM.
 * Keeps our React state and hidden Amazon form elements in lockstep.
 * Always searches document (page DOM) for Amazon's form elements.
 */
export function useAmazonForm(): UseAmazonFormResult {
    const { settings } = useSettings();
    const [isReady, setIsReady] = useState(false);
    const [profile, setProfile] = useState(emptyProfile);
    const [product, setProduct] = useState(emptyProduct);
    const [state, setState] = useState<AmazonFormState>({
        reviewText: '',
        reviewTitle: '',
        starRating: 0,
        mediaThumbnails: [],
    });

    const elementsRef = useRef<AmazonFormElements>({
        form: null,
        textarea: null,
        titleInput: null,
        mediaInput: null,
        submitBtn: null,
    });

    const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
    const [lastSaved, setLastSaved] = useState<Date | null>(null);
    const saveTimeoutRef = useRef<any>(null);
    const asinRef = useRef<string | null>(null);
    const isInitializedRef = useRef(false);
    const amazonSubmitHandlerRef = useRef<(() => void) | null>(null);

    const stateRef = useRef<AmazonFormState>(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    const rootRef = useRef<Document | Element>(document);

    const getMediaBlobs = useCallback(async (): Promise<File[]> => {
        const thumbnails = stateRef.current.mediaThumbnails;
        if (thumbnails.length === 0) return [];

        const files: File[] = [];

        const fetchImage = (window as any).GM_fetchImage || (async (url: string) => {
            const res = await fetch(url);
            const blob = await res.blob();
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.readAsDataURL(blob);
            });
        });

        for (let i = 0; i < thumbnails.length; i++) {
            try {
                const fullUrl = thumbnails[i].replace(/\._.*?(?=\.[a-z]+$)/i, '');
                const dataUrl = await fetchImage(fullUrl);
                const res = await fetch(dataUrl);
                const blob = await res.blob();
                const ext = fullUrl.split('.').pop() || 'jpg';
                files.push(new File([blob], `image-${i}.${ext}`, { type: blob.type }));
            } catch (e) {
                console.error('[ARS] Failed to fetch media blob:', thumbnails[i], e);
            }
        }
        return files;
    }, []);

    const setMediaFiles = useCallback((files: File[] | FileList) => {
        const mediaInput = elementsRef.current.mediaInput;
        if (!mediaInput) return;

        // If we have multiple files, we should ideally trigger them one by one
        // to ensure Amazon's React state processes each one.
        const fileList = files instanceof FileList ? Array.from(files) : files;

        const uploadNext = (index: number) => {
            if (index >= fileList.length) return;

            const dt = new DataTransfer();
            dt.items.add(fileList[index]);
            mediaInput.files = dt.files;
            mediaInput.dispatchEvent(new Event('change', { bubbles: true }));

            // Short delay before next image to allow Amazon's UI to catch up
            if (index + 1 < fileList.length) {
                setTimeout(() => uploadNext(index + 1), 800);
            }
        };

        uploadNext(0);
    }, []);

    const saveDrafts = useCallback((text: string, title: string, rating: number) => {
        const asin = asinRef.current;
        if (!asin) return;

        setSyncStatus('saving');
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

        saveTimeoutRef.current = setTimeout(() => {
            try {
                localStorage.setItem(`amazon_review_draft_${asin}`, text);
                localStorage.setItem(`amazon_review_title_draft_${asin}`, title);
                localStorage.setItem(`amazon_review_rating_draft_${asin}`, String(rating));
                setSyncStatus('saved');
                setLastSaved(new Date());
                setTimeout(() => setSyncStatus('idle'), 3000);
            } catch (e) {
                console.error('Failed to save draft:', e);
                setSyncStatus('error');
            }
        }, 1000);
    }, []);

    const setStarRating = useCallback((rating: number) => {
        setState((s) => {
            const newState = { ...s, starRating: rating };
            saveDrafts(newState.reviewText, newState.reviewTitle, newState.starRating);
            return newState;
        });
        setAmazonStarRating(rating, rootRef.current);
    }, [saveDrafts]);

    const setReviewText = useCallback((value: string) => {
        setState((s) => {
            const newState = { ...s, reviewText: value };
            saveDrafts(newState.reviewText, newState.reviewTitle, newState.starRating);
            return newState;
        });
        syncToElement(elementsRef.current.textarea, value);
    }, [saveDrafts]);

    const setReviewTitle = useCallback((value: string) => {
        setState((s) => {
            const newState = { ...s, reviewTitle: value };
            saveDrafts(newState.reviewText, newState.reviewTitle, newState.starRating);
            return newState;
        });
        syncToElement(elementsRef.current.titleInput, value);
    }, [saveDrafts]);

    const triggerMediaUpload = useCallback(() => {
        elementsRef.current.mediaInput?.click();
    }, []);



    /** Find and cache Amazon form elements (always in page document) */
    const discover = useCallback(() => {
        const root = document;
        rootRef.current = root;

        const form = query<HTMLFormElement>(SELECTORS.form, root);
        const textarea = query<HTMLTextAreaElement>(SELECTORS.textarea, root);
        const titleInput = query<HTMLInputElement>(SELECTORS.title, root);
        const mediaInput = query<HTMLInputElement>(SELECTORS.media, root);
        const submitBtn = query<HTMLInputElement>(SELECTORS.submitBtn, root);

        if (!submitBtn) {
            console.warn('[ARS] Submit button not found with primary selector. Trying loose search...');
        } else {
            // console.log('[ARS] Submit button found:', submitBtn);
        }

        elementsRef.current = { form, textarea, titleInput, mediaInput, submitBtn };

        // Try to capture Amazon's native submit handler once
        if (submitBtn && !amazonSubmitHandlerRef.current) {
            try {
                const buttonKeys = Object.keys(submitBtn);
                const btnContainer = submitBtn.closest('.a-button');

                // Check __reactProps$... and __reactEvents$... with any suffix  
                for (const key of buttonKeys) {
                    if (key.startsWith('__reactProps') || key.startsWith('__reactEvents')) {
                        const obj = (submitBtn as any)[key];
                        console.log(`[ARS] Checking ${key}:`, obj);
                        if (obj?.onClick) {
                            amazonSubmitHandlerRef.current = obj.onClick.bind(submitBtn);
                            console.log('[ARS] Captured onClick from button via:', key);
                            break;
                        }
                    }
                }

                // Also check the container
                if (!amazonSubmitHandlerRef.current && btnContainer) {
                    const containerKeys = Object.keys(btnContainer);
                    for (const key of containerKeys) {
                        if (key.startsWith('__reactProps') || key.startsWith('__reactEvents')) {
                            const obj = (btnContainer as any)[key];
                            if (obj?.onClick) {
                                amazonSubmitHandlerRef.current = obj.onClick.bind(btnContainer);
                                console.log('[ARS] Captured onClick from container via:', key);
                                break;
                            }
                        }
                    }
                }

                // Also check the form itself
                if (!amazonSubmitHandlerRef.current && form) {
                    const formKeys = Object.keys(form);
                    for (const key of formKeys) {
                        if (key.startsWith('__reactProps') || key.startsWith('__reactEvents')) {
                            const obj = (form as any)[key];
                            if (obj?.onSubmit) {
                                amazonSubmitHandlerRef.current = obj.onSubmit.bind(form);
                                console.log('[ARS] Captured onSubmit from form via:', key);
                                break;
                            }
                        }
                    }
                }
            } catch (e) {
                console.warn('[ARS] Could not capture Amazon submit handler:', e);
            }
        }

        if (form) {
            const asin = getAsinFromPage();
            asinRef.current = asin;

            // Only recover drafts and initial values once
            if (!isInitializedRef.current) {
                console.log('[Amazon Review Studio] Initializing form state and recovering drafts...');

                let reviewText = textarea?.value ?? '';
                let reviewTitle = titleInput?.value ?? '';
                let starRating = getAmazonStarRating(root);

                if (asin) {
                    const textDraft = localStorage.getItem(`amazon_review_draft_${asin}`);
                    const titleDraft = localStorage.getItem(`amazon_review_title_draft_${asin}`);
                    const ratingDraft = localStorage.getItem(`amazon_review_rating_draft_${asin}`);

                    if (textDraft && !reviewText) reviewText = textDraft;
                    if (titleDraft && !reviewTitle) reviewTitle = titleDraft;
                    if (ratingDraft && !starRating) starRating = parseInt(ratingDraft, 10);

                    if (textDraft) syncToElement(textarea, textDraft);
                    if (titleDraft) syncToElement(titleInput, titleDraft);
                    if (starRating) setAmazonStarRating(starRating, root);
                }

                setState(s => ({
                    ...s,
                    reviewText: reviewText || s.reviewText,
                    reviewTitle: reviewTitle || s.reviewTitle,
                    starRating: starRating || s.starRating
                }));

                isInitializedRef.current = true;
            }

            setIsReady(true);
        } else {
            setIsReady(false);
            isInitializedRef.current = false; // Reset if form disappears
        }

        /** Scrape thumbnails periodically or on change */
        const scrapeThumbnails = () => {
            const container = query(SELECTORS.thumbnails, root);
            if (!container) return [];

            const wrappers = queryAll(SELECTORS.thumbnailWrapper, container);
            return wrappers.map(wrapper => {
                const img = query<HTMLElement>(SELECTORS.thumbnailImage, wrapper);
                if (!img) return '';
                // Amazon uses background-image on a div for thumbnails
                const bg = img.style.backgroundImage;
                const match = bg.match(/url\(["']?(.*?)["']?\)/);
                return match ? match[1] : '';
            }).filter(Boolean);
        };

        const currentMedia = scrapeThumbnails();
        const currentStars = getAmazonStarRating(root);

        setState(s => {
            const thumbnailsMatch = s.mediaThumbnails.length === currentMedia.length &&
                s.mediaThumbnails.every((val, index) => val === currentMedia[index]);

            const starsMatch = s.starRating === currentStars;

            // Once initialized, we don't scrape text/title from DOM to avoid undo-loops
            // unless the form was just found
            if (thumbnailsMatch && (starsMatch || currentStars === 0)) return s;

            return {
                ...s,
                mediaThumbnails: currentMedia,
                starRating: currentStars || s.starRating
            };
        });

        // Scrape profile
        const avatarImg = query<HTMLImageElement>(SELECTORS.profileAvatar, root);
        const nameEl = query<HTMLElement>(SELECTORS.profileName, root);
        const editLink = query<HTMLAnchorElement>(SELECTORS.profileEditLink, root);
        setProfile({
            avatarSrc: avatarImg?.src ?? '',
            name: nameEl?.textContent?.trim() ?? '',
            editLinkHref: editLink?.href ?? '#',
        });

        // Scrape product
        const productImg = query<HTMLImageElement>(SELECTORS.productImage, root);
        const titleEl = query<HTMLElement>(SELECTORS.productTitle, root);
        const nameElProduct =
            query<HTMLElement>('.in-context-ryp__product-name', root)
            ?? query<HTMLElement>(SELECTORS.productName, root)
            ?? query<HTMLElement>('#productTitle', root);
        const productUrl = getProductUrlFromPage(root);
        setProduct({
            imageSrc: productImg?.src ?? productImg?.getAttribute?.('data-a-hires') ?? '',
            title: titleEl?.textContent?.trim() ?? 'How was the item?',
            name: nameElProduct?.textContent?.trim() ?? '',
            productUrl,
            asin: getAsinFromPage(),
        });
    }, [settings.amazon_auto_save_images]);

    useEffect(() => {
        discover();
        const observer = new MutationObserver(() => discover());
        observer.observe(document.body, { childList: true, subtree: true });
        const interval = setInterval(discover, 2000);
        return () => {
            observer.disconnect();
            clearInterval(interval);
        };
    }, [discover]);

    // Local Image Restoration Effect - runs once when asin/form is ready
    useEffect(() => {
        if (!isReady || !asinRef.current || !settings.amazon_auto_save_images) return;

        const asin = asinRef.current;
        console.log('[ARS] Checking for local image drafts...');
        imageStorage.loadImages(asin).then(blobs => {
            if (blobs && blobs.length > 0) {
                console.log(`[ARS] Restoring ${blobs.length} images from local storage...`);
                const files = blobs.map((blob, i) => new File([blob], `recovered-${i}.jpg`, { type: blob.type }));
                setMediaFiles(files);
            }
        }).catch(err => console.error('[ARS] Failed to load image drafts:', err));
    }, [isReady, settings.amazon_auto_save_images, setMediaFiles]);


    // Debounced effect to save images to IndexedDB when mediaThumbnails changes
    useEffect(() => {
        if (!settings.amazon_auto_save_images || !isReady || !asinRef.current) return;

        const handler = setTimeout(async () => {
            const asin = asinRef.current;
            const thumbnails = stateRef.current.mediaThumbnails;
            if (asin && thumbnails.length > 0) {
                console.log(`[ARS] Auto-saving ${thumbnails.length} images to IndexedDB for ASIN: ${asin}`);
                try {
                    const blobs = await getMediaBlobs(); // Get full-res blobs
                    await imageStorage.saveImages(asin, blobs);
                    console.log('[ARS] Images saved successfully.');
                } catch (e) {
                    console.error('[ARS] Failed to auto-save images:', e);
                }
            } else if (asin && thumbnails.length === 0) {
                // If all thumbnails are removed, clear the draft images
                console.log(`[ARS] Clearing image drafts for ASIN: ${asin}`);
                imageStorage.deleteImages(asin).catch(e => console.warn('[ARS] Failed to delete image draft:', e));
            }
        }, 1500); // Debounce for 1.5 seconds

        return () => clearTimeout(handler);
    }, [state.mediaThumbnails, isReady, settings.amazon_auto_save_images, getMediaBlobs]);




    const removeMedia = useCallback((index: number) => {
        const root = document;
        const container = query(SELECTORS.thumbnails, root);
        if (!container) return;

        const wrappers = queryAll(SELECTORS.thumbnailWrapper, container);
        const target = wrappers[index];
        if (target) {
            const deleteBtn = query<HTMLElement>(SELECTORS.mediaDelete, target);
            deleteBtn?.click();
        }
    }, []);

    /** Get image file from clipboard: from paste event or navigator.clipboard.read() */
    const getImageFileFromClipboard = useCallback(
        async (pasteEvent?: ClipboardEvent): Promise<File | null> => {
            if (pasteEvent?.clipboardData?.items) {
                for (let i = 0; i < pasteEvent.clipboardData.items.length; i++) {
                    const item = pasteEvent.clipboardData.items[i];
                    if (item.type.startsWith('image/')) {
                        const file = item.getAsFile();
                        if (file) return file;
                    }
                }
                return null;
            }
            const items = await navigator.clipboard.read();
            for (const item of items) {
                if (item.types.includes('image/png') || item.types.includes('image/jpeg')) {
                    const type = item.types.includes('image/png') ? 'image/png' : 'image/jpeg';
                    const blob = await item.getType(type);
                    const ext = type === 'image/png' ? 'png' : 'jpg';
                    return new File([blob], `clipboard-image.${ext}`, { type: blob.type });
                }
            }
            return null;
        },
        []
    );

    const pasteImageFromClipboard = useCallback(
        async (pasteEvent?: ClipboardEvent): Promise<'ok' | 'no_image' | 'denied' | 'error'> => {
            const mediaInput = elementsRef.current.mediaInput;
            if (!mediaInput) return 'error';

            try {
                const file = await getImageFileFromClipboard(pasteEvent);
                if (!file) return 'no_image';

                const dt = new DataTransfer();
                dt.items.add(file);
                mediaInput.files = dt.files;
                mediaInput.dispatchEvent(new Event('change', { bubbles: true }));
                return 'ok';
            } catch (err) {
                const e = err as { name?: string };
                if (e?.name === 'NotAllowedError') return 'denied';
                if (e?.name === 'NotSupportedError') return 'error';
                return 'error';
            }
        },
        [getImageFileFromClipboard]
    );

    const submit = useCallback(async () => {
        const { form, textarea, titleInput, submitBtn } = elementsRef.current;
        const s = stateRef.current;

        console.log('[ARS] Submit triggered. Form found?', !!form, 'Button found?', !!submitBtn);

        if (!form) {
            console.error('[ARS] Cannot submit: Form element not found in DOM.');
            return;
        }

        // Ensure all values are synced before submit
        console.log('[ARS] Syncing values to Amazon DOM before submit...');
        syncToElement(textarea, s.reviewText);
        syncToElement(titleInput, s.reviewTitle);
        setAmazonStarRating(s.starRating, rootRef.current);

        // Clear drafts on successful submit trigger
        const asin = asinRef.current;
        if (asin) {
            localStorage.removeItem(`amazon_review_draft_${asin}`);
            localStorage.removeItem(`amazon_review_title_draft_${asin}`);
            localStorage.removeItem(`amazon_review_rating_draft_${asin}`);
            // Clear IndexedDB image draft
            imageStorage.deleteImages(asin).catch(e => console.warn('[ARS] Failed to delete image draft:', e));
        }

        if (submitBtn) {
            console.log('[ARS] Submit button details:', {
                disabled: submitBtn.disabled,
                type: submitBtn.type,
                name: submitBtn.name,
                value: submitBtn.value,
                form: submitBtn.form === form,
                hasCapturedHandler: !!amazonSubmitHandlerRef.current
            });

            if (submitBtn.disabled) {
                console.warn('[ARS] Native submit button is DISABLED. Form may be invalid.');
            }

            // Strategy 1: Try invoking Amazon's captured handler directly
            if (amazonSubmitHandlerRef.current) {
                console.log('[ARS] Invoking captured Amazon submit handler...');
                try {
                    // Create a fake event object
                    const fakeEvent = {
                        type: 'click',
                        target: submitBtn,
                        currentTarget: submitBtn,
                        preventDefault: () => { },
                        stopPropagation: () => { },
                        nativeEvent: {},
                        isTrusted: true
                    };
                    amazonSubmitHandlerRef.current.call(submitBtn, fakeEvent as any);
                    console.log('[ARS] Successfully invoked captured handler');
                    return; // If this works, we're done
                } catch (e) {
                    console.error('[ARS] Captured handler invocation failed:', e);
                }
            }

            console.log('[ARS] Clicking native submit button with mouse events...');

            // Strategy 2: Try clicking the submit button directly
            const mouseEventProps = { bubbles: true, cancelable: true, view: window };
            submitBtn.dispatchEvent(new MouseEvent('mousedown', mouseEventProps));
            submitBtn.dispatchEvent(new MouseEvent('mouseup', mouseEventProps));
            submitBtn.click();

            // Strategy 3: Try clicking the button container (sometimes the listener is here)
            setTimeout(() => {
                const btnContainer = submitBtn.closest('.a-button');
                if (btnContainer && btnContainer instanceof HTMLElement) {
                    console.log('[ARS] Clicking button container fallback...');
                    btnContainer.dispatchEvent(new MouseEvent('mousedown', mouseEventProps));
                    btnContainer.dispatchEvent(new MouseEvent('mouseup', mouseEventProps));
                    btnContainer.click();
                }
            }, 100);

            // Strategy 4: Try form.requestSubmit() which uses the button as submitter
            setTimeout(() => {
                console.log('[ARS] Trying form.requestSubmit(submitBtn)...');
                try {
                    form.requestSubmit(submitBtn);
                } catch (e) {
                    console.error('[ARS] form.requestSubmit() failed:', e);
                }
            }, 200);

            // Strategy 5: Dispatch submit event on form as last resort
            setTimeout(() => {
                console.log('[ARS] Dispatching submit event on form...');
                form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
            }, 300);

        } else {
            console.log('[ARS] No native button found. Calling form.requestSubmit()...');
            form.requestSubmit();
        }
    }, []);

    return {
        isReady,
        profile,
        product,
        state,
        setReviewText,
        setReviewTitle,
        setStarRating,
        triggerMediaUpload,
        getMediaBlobs,
        setMediaFiles,
        removeMedia,
        pasteImageFromClipboard,
        submit,
        elements: elementsRef.current,
        syncStatus,
        lastSaved,
    };
}
