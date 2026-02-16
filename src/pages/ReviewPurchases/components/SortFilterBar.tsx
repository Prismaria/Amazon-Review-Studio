import React from 'react';
import { SortMode } from '../types';

interface Props {
    searchQuery: string;
    onSearchChange: (query: string) => void;
    sortMode: SortMode;
    onSortChange: (mode: SortMode) => void;
    totalItems: number;
}

export const SortFilterBar: React.FC<Props> = ({
    searchQuery,
    onSearchChange,
    sortMode,
    onSortChange,
    totalItems
}) => {
    return (
        <div className="bg-white dark:bg-zinc-800 shadow-sm border-b border-gray-200 dark:border-zinc-700 sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">

                {/* Title & Count */}
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        Review Your Purchases
                        <span className="bg-amber-100 text-amber-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-amber-900 dark:text-amber-300">
                            {totalItems} Items
                        </span>
                    </h1>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    {/* Search */}
                    <div className="relative flex-1 sm:max-w-xs">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-3 pr-10 py-1.5 border border-gray-300 dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-700 text-sm focus:ring-amber-500 focus:border-amber-500 dark:text-white"
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                        />
                        {searchQuery && (
                            <button
                                onClick={() => onSearchChange('')}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </button>
                        )}
                    </div>

                    {/* Sort */}
                    <select
                        value={sortMode}
                        onChange={(e) => onSortChange(e.target.value as SortMode)}
                        className="block pl-3 pr-8 py-1.5 text-sm border-gray-300 dark:border-zinc-600 focus:outline-none focus:ring-amber-500 focus:border-amber-500 rounded-md bg-white dark:bg-zinc-700 dark:text-white"
                    >
                        <option value="default">Default Order</option>
                        <option value="date">Newest First</option>
                        <option value="alpha">A-Z Name</option>
                        <option value="category">Category</option>
                    </select>
                </div>
            </div>
        </div>
    );
};
