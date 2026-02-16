import { compressImage } from './imageResizer';

/**
 * Scrapes uploaded images from the Amazon review editor.
 * Returns an array of compressed data URLs.
 */
export async function getUploadedImages(): Promise<string[]> {
    try {
        // Thumbnail images are inside the ryp form
        const nodes = Array.from(document.querySelectorAll(
            '.in-context-ryp__form-field__thumbnails .in-context-ryp__form-field___thumbnails--image'
        ));

        if (nodes.length === 0) return [];

        const urls = nodes
            .map(n => (n.getAttribute('style') || ''))
            .map(style => {
                // style like: background-image: url("data:image/jpeg;base64,...");
                const match = style.match(/background-image:\s*url\(("|')?(.*?)("|')?\)/i);
                return match ? match[2] : null;
            })
            .filter(Boolean) as string[];

        // Deduplicate
        const uniqueUrls = Array.from(new Set(urls));

        // Helper for blob -> dataURL conversion
        async function blobToDataUrl(blobUrl: string): Promise<string> {
            try {
                const res = await fetch(blobUrl);
                const blob = await res.blob();
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result as string);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });
            } catch (e) {
                console.warn('[ARS] Failed to convert blob to dataUrl', e);
                return '';
            }
        }

        const dataUrls: string[] = [];
        // Cap to 5 images for performance/cost
        const targets = uniqueUrls.slice(0, 5);

        for (const url of targets) {
            let base64 = '';
            if (url.startsWith('data:image/')) {
                base64 = url;
            } else if (url.startsWith('blob:')) {
                base64 = await blobToDataUrl(url);
            } else {
                // Try to fetch external images (unlikely but possible for tiny thumbnails)
                try {
                    const res = await fetch(url, { mode: 'cors' });
                    const blob = await res.blob();
                    base64 = await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result as string);
                        reader.readAsDataURL(blob);
                    });
                } catch (e) {
                    console.warn('[ARS] Failed to fetch external image', url, e);
                }
            }

            if (base64) {
                // Compress it before returning
                try {
                    const compressed = await compressImage(base64);
                    dataUrls.push(compressed);
                } catch (e) {
                    console.error('[ARS] Compression failed', e);
                    dataUrls.push(base64); // Fallback to raw if compression fails
                }
            }
        }

        return dataUrls;
    } catch (e) {
        console.error('[ARS] Image extraction failed', e);
        return [];
    }
}
