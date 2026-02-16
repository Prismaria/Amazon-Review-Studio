/**
 * Utility to compress and resize images using HTML5 Canvas.
 * This ensures we don't send massive payloads to the AI API.
 */
export async function compressImage(dataUrl: string, maxWidth: number = 1024): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            let width = img.width;
            let height = img.height;

            // Calculate new dimensions
            if (width > maxWidth) {
                height = Math.round((height * maxWidth) / width);
                width = maxWidth;
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
                reject(new Error('Failed to get canvas context'));
                return;
            }

            ctx.drawImage(img, 0, 0, width, height);

            // Convert to JPEG with 0.8 quality
            const compressed = canvas.toDataURL('image/jpeg', 0.8);
            resolve(compressed);
        };
        img.onerror = (e) => reject(e);
        img.src = dataUrl;
    });
}

/**
 * Converts a data URL to the format Gemini expects: 
 * { mimeType: string, data: string (base64 without prefix) }
 */
export function dataUrlToGeminiFormat(dataUrl: string): { mimeType: string; data: string } {
    const [header, data] = dataUrl.split(';base64,');
    const mimeType = header.replace('data:', '');
    return { mimeType, data };
}
