import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../utils';

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
        <div className={cn('ars-star-rating', className)}>
            <div
                className="ars-star-rating-stars"
                onMouseLeave={() => setHoverValue(0)}
            >
                {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                        key={rating}
                        type="button"
                        className={cn(
                            'ars-star-button',
                            rating <= displayValue && 'ars-star-button--filled'
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
                        <Star size={28} strokeWidth={1.5} fill="currentColor" />
                    </button>
                ))}
            </div>
            {!hideClear && (
                <button
                    type="button"
                    className="ars-star-clear"
                    onClick={() => onChange(0)}
                    tabIndex={0}
                >
                    Clear
                </button>
            )}
        </div>
    );
};
