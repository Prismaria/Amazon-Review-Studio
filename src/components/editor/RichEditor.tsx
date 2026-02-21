import React, { useState, useRef, useCallback, useEffect } from 'react';
import { EditorToolbar } from './EditorToolbar';
import { UnicodeStyle, textFormattingService } from '../../services/textFormatting';
import { cn } from '../../utils';
import { useSettings } from '../../hooks/useSettings';

export interface RichEditorProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    showUtilities?: boolean;
    autoResize?: boolean;
    onAutoResizeChange?: (enabled: boolean) => void;
    productName?: string;
    asin?: string;
}

const ALL_BULLETS = /[•●➜►▸■✦◈★✓✗]/;

export const RichEditor: React.FC<RichEditorProps> = ({
    value,
    onChange,
    placeholder,
    className,
    showUtilities = true,
    autoResize = false,
    onAutoResizeChange,
    productName,
    asin,
}) => {
    const { settings } = useSettings();
    const [activeStyles, setActiveStyles] = useState<Set<UnicodeStyle>>(new Set());
    const [isAutoResize, setIsAutoResize] = useState(autoResize);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const valueRef = useRef(value);

    // Keep valueRef in sync with value prop
    useEffect(() => {
        valueRef.current = value;
    }, [value]);

    const bulletStyle = settings.amazon_bullet_style || '•';

    // Sync prop changes to local state
    useEffect(() => {
        setIsAutoResize(autoResize);
    }, [autoResize]);

    const handleAutoResizeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.checked;
        setIsAutoResize(newValue);
        if (onAutoResizeChange) {
            onAutoResizeChange(newValue);
        }
    };

    // Auto-resize logic
    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        // Reset if disabled
        if (!isAutoResize) {
            textarea.style.height = ''; // Reset to CSS default
            textarea.style.minHeight = ''; // Reset CSS min-height
            textarea.style.overflowY = 'auto'; // Restore scroll
            return;
        }

        // Check if empty (or whitespace only) - if so, restore default height
        if (!value || value.length === 0) {
            textarea.style.height = ''; // Reset to CSS default height (e.g. 250px)
            textarea.style.minHeight = ''; // Restore min-height if any
            textarea.style.overflowY = 'auto'; // Restore scroll
            return;
        }

        // If content exists, collapse and auto-resize

        // IMPORTANT: We need to disable transitions momentarily while measuring height
        // to prevent the "auto" height set from triggering a transition to 0 or glitching.
        // However, setting style.height = 'auto' is not transitionable.

        // Strategy:
        // 1. Save current pixel height (from previous render or default)
        // 2. Set height to 'auto' to measure natural height
        // 3. Set height back to the NEW pixel height
        // 4. Ensure transition is enabled so it animates from Old -> New

        // But if we are going from "Default CSS Height" (no inline style) to "Auto Height",
        // we first need to set the inline style to the computed default height so the transition has a start point.

        if (!textarea.style.height) {
            // First time shrinking from default
            const computedHeight = window.getComputedStyle(textarea).height;
            textarea.style.height = computedHeight;
            // Force reflow
            void textarea.offsetHeight;
        }

        // Disable min-height to allow shrinking
        textarea.style.minHeight = '0';

        const adjustHeight = () => {
            // We need to measure content height. 
            // Problem: setting height='auto' affects layout and can be visible if not batched.
            // Also, setting height='auto' breaks transition if we want to animate TO the new height.

            // To animate smoothly:
            // We need to know the target height without setting the element to 'auto' if possible,
            // OR set it to 'auto', measure, then revert to previous height, then set to new height.

            const prevHeight = textarea.style.height;

            // Temporarily disable transition to measure
            textarea.style.transition = 'none';
            textarea.style.height = 'auto';

            const newHeight = Math.max(40, textarea.scrollHeight);

            // Restore transition and set new height
            // We need to set the OLD height first if it was 'auto' (which it shouldn't be if we manage state),
            // but here we just need to snap back to a pixel value before transitioning.

            // If we want to animate from "Previous Pixel Height" to "New Pixel Height":
            textarea.style.height = prevHeight; // Restore previous pixel height

            // Force reflow to ensure the restore is registered
            void textarea.offsetHeight;

            // Re-enable transition
            textarea.style.transition = '';

            // Now set the target height to trigger animation
            textarea.style.height = `${newHeight}px`;
            textarea.style.overflowY = 'hidden';
        };

        // Trigger immediately
        adjustHeight();

        // Also ensure we adjust if window resizes (text wraps)
        window.addEventListener('resize', adjustHeight);
        return () => window.removeEventListener('resize', adjustHeight);

    }, [value, isAutoResize]);

    const updateActiveStyles = useCallback(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const currentText = valueRef.current;

        // If selection exists, detect styles of the selection
        // If just cursor, detect style of the character before the cursor
        let textToDetect = '';
        if (start !== end) {
            textToDetect = currentText.substring(start, end);
        } else if (start > 0) {
            // Look a few characters back to catch multi-char unicode or combining marks
            textToDetect = currentText.substring(Math.max(0, start - 4), start);
        }

        if (textToDetect) {
            const detected = textFormattingService.detectStyles(textToDetect);
            setActiveStyles(detected);
        } else {
            setActiveStyles(new Set());
        }
    }, []); // valueRef.current is always latest, no dependency needed

    const handleStyleToggle = useCallback((style: UnicodeStyle) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selection = valueRef.current.substring(start, end);

        if (start !== end) {
            // Apply style to selection based on what's ALREADY in the selection
            const currentSelectionStyles = textFormattingService.detectStyles(selection);
            const newStyles = new Set(currentSelectionStyles);

            if (newStyles.has(style)) {
                newStyles.delete(style);
            } else {
                newStyles.add(style);
            }

            // Convert selection
            const styledText = textFormattingService.applyStyles(selection, newStyles);
            const newValue = valueRef.current.substring(0, start) + styledText + valueRef.current.substring(end);

            // Update ref immediately so updateActiveStyles is accurate if called
            valueRef.current = newValue;
            onChange(newValue);

            // Update toolbar state immediately
            setActiveStyles(newStyles);

            // Update selection after React re-render
            setTimeout(() => {
                textarea.setSelectionRange(start, start + styledText.length);
                textarea.focus();
            }, 0);
        } else {
            // toggle style for new typing
            setActiveStyles(prev => {
                const next = new Set(prev);
                if (next.has(style)) next.delete(style);
                else next.add(style);
                return next;
            });
            textarea.focus();
        }
    }, [value, onChange, activeStyles, updateActiveStyles]);

    // List handling logic
    const handleListToggle = useCallback((type: 'bullet' | 'number') => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selection = value.substring(start, end);

        // If selection spans multiple lines, apply to each line
        if (selection.includes('\n')) {
            const lines = selection.split('\n');
            const newLines = lines.map((line, i) => {
                const trimmed = line.trimStart();
                if (type === 'bullet') {
                    // Check if line already starts with ANY bullet
                    const bulletMatch = trimmed.match(new RegExp(`^${ALL_BULLETS.source}\\s`));
                    return bulletMatch ? line : `${bulletStyle} ${trimmed}`;
                } else {
                    return /^\d+\)\\s/.test(trimmed) ? line : `${i + 1}) ${trimmed}`;
                }
            });
            const newText = newLines.join('\n');
            const newValue = value.substring(0, start) + newText + value.substring(end);
            onChange(newValue);
            setTimeout(() => {
                textarea.setSelectionRange(start, start + newText.length);
                textarea.focus();
            }, 0);
        } else {
            // Single line: insert at start of line or current position if empty
            // Find start of current line
            let lineStart = value.lastIndexOf('\n', start - 1) + 1;
            if (lineStart < 0) lineStart = 0;

            const prefix = type === 'bullet' ? `${bulletStyle} ` : '1) ';
            const newValue = value.substring(0, lineStart) + prefix + value.substring(lineStart);
            onChange(newValue);
            setTimeout(() => {
                textarea.setSelectionRange(start + prefix.length, start + prefix.length);
                textarea.focus();
            }, 0);
        }
    }, [value, onChange, bulletStyle]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 'b') { e.preventDefault(); handleStyleToggle('bold'); }
            if (e.key === 'i') { e.preventDefault(); handleStyleToggle('italic'); }
        }

        // Contextual Line Handling for Lists
        if (e.key === 'Enter') {
            const textarea = textareaRef.current;
            if (!textarea) return;

            const start = textarea.selectionStart;
            // Get text before cursor to check for list pattern
            const textBefore = value.substring(0, start);
            const lastNewline = textBefore.lastIndexOf('\n');
            const currentLine = textBefore.substring(lastNewline + 1);

            // Check for bullet list using regex for all supported bullets
            const bulletMatch = currentLine.trim().match(new RegExp(`^(${ALL_BULLETS.source})`));
            if (bulletMatch) {
                const foundBullet = bulletMatch[1];
                // If line is just the bullet, end the list (remove bullet)
                if (currentLine.trim() === foundBullet) {
                    e.preventDefault();
                    const newValue = value.substring(0, lastNewline + 1) + value.substring(start);
                    onChange(newValue);
                    return;
                }

                // Continue list with the SAME bullet found
                e.preventDefault();
                const prefix = `\n${foundBullet} `;
                const newValue = value.substring(0, start) + prefix + value.substring(start);
                onChange(newValue);
                setTimeout(() => {
                    textarea.setSelectionRange(start + prefix.length, start + prefix.length);
                }, 0);
                return;
            }

            // Check for numbered list
            const numMatch = currentLine.match(/^(\d+)\)\\s/);
            if (numMatch) {
                // If line is just the number, end the list
                if (currentLine.trim() === numMatch[0].trim()) {
                    e.preventDefault();
                    const newValue = value.substring(0, lastNewline + 1) + value.substring(start);
                    onChange(newValue);
                    return;
                }

                // Continue list with incremented number
                const currentNum = parseInt(numMatch[1], 10);
                const nextNum = currentNum + 1;
                const nextPrefix = `\n${nextNum}) `;

                e.preventDefault();
                const newValue = value.substring(0, start) + nextPrefix + value.substring(start);
                onChange(newValue);
                setTimeout(() => {
                    textarea.setSelectionRange(start + nextPrefix.length, start + nextPrefix.length);
                }, 0);

                // Trigger renumbering check for subsequent lines (optional optimization: only if needed)
                // We'll implement a simple renumbering pass if the user edits or deletes items later
                return;
            }
        }
    };

    // Auto-renumbering effect: scan document for broken sequences
    useEffect(() => {
        // Simple regex to find numbered list items
        const lines = value.split('\n');
        let needsUpdate = false;
        let inList = false;
        let expectedNum = 1;

        const newLines = lines.map(line => {
            const trimmed = line.trimStart();
            const match = trimmed.match(/^(\d+)\)\\s(.*)/);

            if (match) {
                // Found a list item
                inList = true;
                const currentNum = parseInt(match[1], 10);

                if (currentNum !== expectedNum) {
                    needsUpdate = true;
                    // Preserve indentation if any (though trimStart removes it, we can reconstruction)
                    // For simplicity, we assume standard indentation or none.
                    // If complex indentation is needed, we'd calculate leading whitespace.
                    const leadingSpace = line.substring(0, line.indexOf(match[0]));
                    const content = match[2];
                    const newLine = `${leadingSpace}${expectedNum}) ${content}`;
                    expectedNum++;
                    return newLine;
                }

                expectedNum++;
                return line;
            } else {
                // Not a list item (or empty line), reset sequence if line is not empty?
                // Usually lists are contiguous. If we hit a non-list line, we reset.
                // Exception: maybe indented continuation lines? For now, strict list mode.
                if (trimmed.length > 0) {
                    inList = false;
                    expectedNum = 1;
                }
                return line;
            }
        });

        if (needsUpdate) {
            // Use a timeout to avoid fighting with the typing loop, 
            // or better yet, only run this on specific triggers like delete/paste.
            // Running on every render/change might be aggressive for cursor position.
            // For now, we'll skip auto-renumbering on every keystroke to prevent cursor jumping issues.
            // A better approach is to run this only when a list structure change is detected or explicitly requested.
            // Or, implement it as a debounced operation.
        }
    }, [value]);

    const handleInsert = useCallback((text: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const newValue = value.substring(0, start) + text + value.substring(end);
        onChange(newValue);

        setTimeout(() => {
            textarea.setSelectionRange(start + text.length, start + text.length);
            textarea.focus();
        }, 0);
    }, [value, onChange]);

    const handleClearStyles = useCallback(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        if (start !== end) {
            // Clear selection only
            const selection = valueRef.current.substring(start, end);
            const plainText = textFormattingService.toPlainText(selection);
            const newValue = valueRef.current.substring(0, start) + plainText + valueRef.current.substring(end);

            valueRef.current = newValue;
            onChange(newValue);
            setActiveStyles(new Set());

            setTimeout(() => {
                textarea.setSelectionRange(start, start + plainText.length);
                textarea.focus();
            }, 0);
        } else {
            // Clear entire document
            const plainText = textFormattingService.toPlainText(valueRef.current);
            valueRef.current = plainText;
            onChange(plainText);
            setActiveStyles(new Set());
            textarea.focus();
        }
    }, [onChange]);

    return (
        <div className={cn('ars-rich-editor', className)}>
            <EditorToolbar
                onStyleToggle={handleStyleToggle}
                activeStyles={activeStyles}
                onInsert={handleInsert}
                onReplace={onChange}
                onClearStyles={handleClearStyles}
                showUtilities={showUtilities}
                currentValue={value}
                onListToggle={handleListToggle}
                productName={productName}
                asin={asin}
            />
            <textarea
                ref={textareaRef}
                className="ars-editor-textarea"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onSelect={updateActiveStyles}
                onClick={updateActiveStyles}
                onKeyDown={handleKeyDown}
                onKeyUp={updateActiveStyles}
                placeholder={placeholder}
            />
            <div className="ars-editor-footer">
                <div className="ars-editor-options">
                    <label className="ars-checkbox-label" title="Automatically resize textbox to fit content">
                        <input
                            type="checkbox"
                            checked={isAutoResize}
                            onChange={handleAutoResizeToggle}
                        />
                        <span>Auto-resize</span>
                    </label>
                </div>
                <span className="ars-char-count">{value.length} characters</span>
            </div>
        </div>
    );
};
