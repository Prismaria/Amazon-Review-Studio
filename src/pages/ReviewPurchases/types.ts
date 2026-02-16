export interface ReviewCandidate {
    asin: string;
    title: string;
    imageUrl: string;
    reviewUrl: string;
    currentRating?: number; // If the user already clicked a star on this page
    isVideoRequired: boolean; // bannerType=NEEDS_VIDEO_BANNER

    // Enriched data (fetched later)
    purchaseDate?: Date;
    category?: string;
    price?: string; // Optional, might not be available easily
}

export type SortMode = 'date' | 'category' | 'alpha' | 'default';
export type LayoutMode = 'grid' | 'list';

export interface ReviewPurchasesState {
    candidates: ReviewCandidate[];
    dismissedAsins: string[];
    sortMode: SortMode;
    searchQuery: string;
    isLoading: boolean;
}
