import React from 'react';
import { cn } from '../../utils';
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
    className,
    children,
    padding = 'md',
    ...props
}) => {
    return (
        <div
            className={cn('ars-card', `ars-card--p-${padding}`, className)}
            {...props}
        >
            {children}
        </div>
    );
};
