import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
    icon?: React.ReactNode;
    tooltipPlacement?: 'top' | 'left' | 'right' | 'bottom';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, icon, children, disabled, title, tooltipPlacement, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    'ars-button',
                    `ars-button--${variant}`,
                    `ars-button--${size}`,
                    isLoading && 'ars-button--loading',
                    title && 'ars-tooltip',
                    title && tooltipPlacement && `ars-tooltip-${tooltipPlacement}`,
                    className
                )}
                disabled={disabled || isLoading}
                data-tooltip={title}
                {...props}
            >
                {isLoading && <Loader2 className="ars-button__loader" size={16} />}
                {!isLoading && icon && <span className="ars-button__icon">{icon}</span>}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
