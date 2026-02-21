import React, { useState } from 'react';
import { Star } from 'lucide-react';

function cn(...classes: (string | undefined | null | false)[]) {
    return classes.filter(Boolean).join(' ');
}

export interface StarRatingProps {
    value: number;
    onChange: (rating: number) => void;
    className?: string;
    hideClear?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({ value, onChange, className, hideClear }) => {
    const [hoverValue, setHoverValue] = useState(0);

    const displayValue = hoverValue || value;

    return (
        <div className={cn('flex items-center gap-1', className)}>
            <div
                className="flex items-center gap-0.5"
                onMouseLeave={() => setHoverValue(0)}
            >
                {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                        key={rating}
                        type="button"
                        className={cn(
                            'p-0.5 transition-colors',
                            rating <= displayValue ? 'text-amber-400' : 'text-zinc-600 hover:text-zinc-400'
                        )}
                        onClick={() => onChange(rating)}
                        onMouseEnter={() => setHoverValue(rating)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                onChange(rating);
                            }
                        }}
                        aria-label={`${rating} star${rating > 1 ? 's' : ''}`}
                        aria-pressed={rating <= value}
                    >
                        <Star size={20} strokeWidth={1.5} fill={rating <= displayValue ? 'currentColor' : 'none'} />
                    </button>
                ))}
            </div>
            {!hideClear && value > 0 && (
                <button
                    type="button"
                    className="text-[10px] text-zinc-500 hover:text-zinc-400 ml-2 transition-colors"
                    onClick={() => onChange(0)}
                    tabIndex={0}
                >
                    Clear
                </button>
            )}
        </div>
    );
};
