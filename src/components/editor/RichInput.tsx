import React, { useState, useRef, useCallback, useEffect } from 'react';
import { EditorToolbar } from './EditorToolbar';
import { UnicodeStyle, textFormattingService } from '../../services/textFormatting';
import { cn } from '../../utils';

export interface RichInputProps {
    id?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    label?: string;
    suffix?: React.ReactNode;
    spellCheck?: boolean;
    autoComplete?: string;
    autoCorrect?: string;
    autoCapitalize?: string;
    [key: string]: any;
}

export const RichInput: React.FC<RichInputProps> = ({
    id,
    value,
    onChange,
    placeholder,
    className,
    label,
    suffix,
    spellCheck,
    autoComplete,
    autoCorrect,
    autoCapitalize,
    ...rest
}) => {
    const [activeStyles, setActiveStyles] = useState<Set<UnicodeStyle>>(new Set());
    const inputRef = useRef<HTMLInputElement>(null);
    const valueRef = useRef(value);

    // Keep valueRef in sync with value prop
    useEffect(() => {
        valueRef.current = value;
    }, [value]);

    const updateActiveStyles = useCallback(() => {
        const input = inputRef.current;
        if (!input) return;

        const start = input.selectionStart ?? 0;
        const end = input.selectionEnd ?? 0;
        const currentText = valueRef.current;

        let textToDetect = '';
        if (start !== end) {
            textToDetect = currentText.substring(start, end);
        } else if (start > 0) {
            textToDetect = currentText.substring(Math.max(0, start - 4), start);
        }

        if (textToDetect) {
            const detected = textFormattingService.detectStyles(textToDetect);
            setActiveStyles(detected);
        } else {
            setActiveStyles(new Set());
        }
    }, []);

    const handleStyleToggle = useCallback((style: UnicodeStyle) => {
        const input = inputRef.current;
        if (!input) return;

        const start = input.selectionStart ?? 0;
        const end = input.selectionEnd ?? 0;
        const selection = valueRef.current.substring(start, end);

        if (start !== end) {
            // Apply style to selection
            const currentSelectionStyles = textFormattingService.detectStyles(selection);
            const newStyles = new Set(currentSelectionStyles);

            if (newStyles.has(style)) {
                newStyles.delete(style);
            } else {
                newStyles.add(style);
            }

            const styledText = textFormattingService.applyStyles(selection, newStyles);
            const newValue = valueRef.current.substring(0, start) + styledText + valueRef.current.substring(end);

            valueRef.current = newValue;
            onChange(newValue);
            setActiveStyles(newStyles);

            setTimeout(() => {
                input.setSelectionRange(start, start + styledText.length);
                input.focus();
            }, 0);
        } else {
            // Toggle style for new typing
            setActiveStyles(prev => {
                const next = new Set(prev);
                if (next.has(style)) next.delete(style);
                else next.add(style);
                return next;
            });
            input.focus();
        }
    }, [onChange]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 'b') { e.preventDefault(); handleStyleToggle('bold'); }
            if (e.key === 'i') { e.preventDefault(); handleStyleToggle('italic'); }
        }

        // Prevent enter key from submitting forms if used inside a form
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };

    const handleClearStyles = useCallback(() => {
        const input = inputRef.current;
        if (!input) return;

        const start = input.selectionStart ?? 0;
        const end = input.selectionEnd ?? 0;

        if (start !== end) {
            const selection = valueRef.current.substring(start, end);
            const plainText = textFormattingService.toPlainText(selection);
            const newValue = valueRef.current.substring(0, start) + plainText + valueRef.current.substring(end);

            valueRef.current = newValue;
            onChange(newValue);
            setActiveStyles(new Set());

            setTimeout(() => {
                input.setSelectionRange(start, start + plainText.length);
                input.focus();
            }, 0);
        } else {
            const plainText = textFormattingService.toPlainText(valueRef.current);
            valueRef.current = plainText;
            onChange(plainText);
            setActiveStyles(new Set());
            input.focus();
        }
    }, [onChange]);

    const handleInsert = useCallback((text: string) => {
        const input = inputRef.current;
        if (!input) return;

        const start = input.selectionStart ?? 0;
        const end = input.selectionEnd ?? 0;

        const newValue = value.substring(0, start) + text + value.substring(end);
        onChange(newValue);

        setTimeout(() => {
            input.setSelectionRange(start + text.length, start + text.length);
            input.focus();
        }, 0);
    }, [value, onChange]);

    return (
        <div className={cn('ars-rich-input-group', className)}>
            {label && <label className="ars-form-label mb-1.5 block">{label}</label>}

            <div className="ars-rich-input-container">
                <EditorToolbar
                    onStyleToggle={handleStyleToggle}
                    activeStyles={activeStyles}
                    onInsert={handleInsert}
                    onReplace={onChange}
                    onClearStyles={handleClearStyles}
                    showUtilities={false} // Keep title toolbar simple
                    currentValue={value}
                />

                <div className="ars-input-wrapper">
                    <input
                        id={id}
                        ref={inputRef}
                        type="text"
                        className="ars-input ars-rich-input"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        onSelect={updateActiveStyles}
                        onClick={updateActiveStyles}
                        onKeyDown={handleKeyDown}
                        onKeyUp={updateActiveStyles}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        spellCheck={spellCheck}
                        autoCorrect={autoCorrect}
                        autoCapitalize={autoCapitalize}
                        {...rest}
                    />
                    {suffix && <div className="ars-input-suffix">{suffix}</div>}
                </div>
            </div>
        </div>
    );
};
