import React from 'react';
import { SortMode } from '../types';
import { Search, Loader2 } from 'lucide-react';
import { useSettings } from '../../../hooks/useSettings';

interface Props {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    sortMode: SortMode;
    onSortChange: (mode: SortMode) => void;
    totalItems: number;
    isLoading?: boolean;
}

export const SortFilterTabs: React.FC<Props> = ({
    searchQuery,
    onSearchChange,
    sortMode,
    onSortChange,
    totalItems,
    isLoading
}) => {
    const tabs: { id: SortMode; label: string }[] = [
        { id: 'default', label: 'Unsorted' },
        { id: 'date', label: 'Recent' },
        { id: 'category', label: 'Category' },
        { id: 'alpha', label: 'A-Z' },
    ];

    return (
        <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col items-center gap-6 py-2">

                {/* Centered Pills */}
                <div className="flex items-center justify-center w-full">
                    <div className={`flex items-center gap-1 p-1 rounded-2xl bg-gray-100`}>
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => onSortChange(tab.id)}
                                className={`
                                    whitespace-nowrap px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200
                                    ${sortMode === tab.id
                                        ? 'bg-white text-amber-600 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'}
                                `}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Search & Stats Row - Centered */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Search your purchases..."
                            className={`w-full pl-10 pr-4 py-2 border rounded-2xl text-sm focus:ring-2 focus:ring-amber-500/20 placeholder-gray-400 transition-all font-medium text-center bg-gray-50 border-gray-100 text-gray-900`}
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <Search size={16} />
                        </div>
                        {isLoading && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-500">
                                <Loader2 size={16} className="animate-spin" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Small item count */}
                <div className={`text-[10px] uppercase tracking-widest font-bold text-gray-400`}>
                    {totalItems} Available Products
                </div>
            </div>
        </div>
    );
};
