/**
 * Lightweight wrapper for IndexedDB to store review image drafts.
 * IndexedDB is used because localStorage has a ~5MB limit, while
 * IndexedDB can store GiBs of binary data (Blobs).
 */

const DB_NAME = 'AmazonReviewStudio';
const DB_VERSION = 1;
const STORE_NAME = 'image_drafts';

export interface ImageDraft {
    asin: string;
    images: Blob[];
    timestamp: number;
}

class ImageStorage {
    private db: IDBDatabase | null = null;

    private async getDB(): Promise<IDBDatabase> {
        if (this.db) return this.db;

        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onupgradeneeded = (e: any) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    db.createObjectStore(STORE_NAME, { keyPath: 'asin' });
                }
            };

            request.onsuccess = (e: any) => {
                this.db = e.target.result;
                resolve(this.db!);
            };

            request.onerror = () => reject('IndexedDB failed to open: ' + (request.error?.message || 'unknown error'));
        });
    }

    /** Save image blobs for a specific ASIN */
    async saveImages(asin: string, images: Blob[]): Promise<void> {
        if (!asin) return;
        const db = await this.getDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);

            const draft: ImageDraft = {
                asin,
                images,
                timestamp: Date.now()
            };

            const request = store.put(draft);
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    /** Load image blobs for a specific ASIN */
    async loadImages(asin: string): Promise<Blob[]> {
        if (!asin) return [];
        const db = await this.getDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(asin);

            request.onsuccess = () => {
                const result = request.result as ImageDraft;
                resolve(result ? result.images : []);
            };
            request.onerror = () => reject(request.error);
        });
    }

    /** Delete image draft for an ASIN */
    async deleteImages(asin: string): Promise<void> {
        if (!asin) return;
        const db = await this.getDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(asin);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }

    /** Clear drafts older than X days */
    async cleanup(daysOld: number = 7): Promise<void> {
        const db = await this.getDB();
        const cutoff = Date.now() - (daysOld * 24 * 60 * 60 * 1000);

        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.openCursor();

            request.onsuccess = (e: any) => {
                const cursor = e.target.result;
                if (cursor) {
                    const draft = cursor.value as ImageDraft;
                    if (draft.timestamp < cutoff) {
                        cursor.delete();
                    }
                    cursor.continue();
                } else {
                    resolve();
                }
            };
            request.onerror = () => reject(request.error);
        });
    }
}

export const imageStorage = new ImageStorage();
