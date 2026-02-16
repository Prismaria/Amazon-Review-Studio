import React, { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
    suffix?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon, suffix, id, ...props }, ref) => {
        const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

        return (
            <div className={cn('ars-input-group', className)}>
                {label && (
                    <label htmlFor={inputId} className="ars-input-label">
                        {label}
                    </label>
                )}
                <div className="ars-input-wrapper">
                    {icon && <span className="ars-input-icon">{icon}</span>}
                    <input
                        ref={ref}
                        id={inputId}
                        className={cn(
                            'ars-input',
                            icon && 'ars-input--has-icon',
                            suffix && 'ars-input--has-suffix',
                            error && 'ars-input--error'
                        )}
                        {...props}
                    />
                    {suffix && <div className="ars-input-suffix">{suffix}</div>}
                </div>
                {error && <span className="ars-input-error">{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';
