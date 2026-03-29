import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSettings } from '../../hooks/useSettings';
import { Maximize2 } from 'lucide-react';
import { TooltipPositioner } from './TooltipPositioner';

interface ScalingWrapperProps {
    children: React.ReactNode;
}

export const ScalingWrapper: React.FC<ScalingWrapperProps> = ({ children }) => {
    const { settings, setSetting } = useSettings();
    const [isResizing, setIsResizing] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef<{ startX: number; startScale: number; unscaledWidth: number } | null>(null);
    const scale = settings.amazon_ui_scale ?? 1.0;

    const clickRef = useRef({ count: 0, last: 0, timer: null as any, unlocked: false });

    const startResize = useCallback((e: React.MouseEvent) => {
        const now = Date.now();
        const c = clickRef.current;
        
        // Reset count if too much time passed
        if (now - c.last > 400) c.count = 0;
        c.count++;
        c.last = now;

        if (c.count === 2) {
            // Double click detected - wait to see if it's held
            const startX = e.clientX;
            const startScale = scale;
            const rect = containerRef.current?.getBoundingClientRect();
            const unscaledWidth = rect ? rect.width / scale : 0;

            
            c.timer = setTimeout(() => {
                c.unlocked = true;
                dragRef.current = { startX, startScale, unscaledWidth };
                setIsResizing(true);
            }, 300);
        } else {
            // Normal drag (single click or triple etc)
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            dragRef.current = {
                startX: e.clientX,
                startScale: scale,
                unscaledWidth: rect.width / scale
            };
            setIsResizing(true);
        }
    }, [scale]);

    useEffect(() => {
        if (!isResizing || !dragRef.current) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { startX, startScale, unscaledWidth } = dragRef.current!;
            const deltaX = e.clientX - startX;
            let newScale = startScale + (deltaX / unscaledWidth);

            // Secret gesture logic: 
            // Only allow > 1.0 if unlocked via double-click-hold
            const max = clickRef.current.unlocked ? 1.5 : 1.0;
            newScale = Math.max(0.5, Math.min(max, newScale));
            newScale = Math.round(newScale * 100) / 100;

            if (newScale !== scale) {
                setSetting('amazon_ui_scale', newScale);
            }
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            dragRef.current = null;
            if (clickRef.current.timer) clearTimeout(clickRef.current.timer);
            clickRef.current.unlocked = false;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, scale, setSetting]);

    // ... height compensation code ...
    const [compHeight, setCompHeight] = useState<number | string>('auto');
    const [compWidth, setCompWidth] = useState<number | string>('auto');
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current) return;

        const updateDimensions = () => {
            if (contentRef.current) {
                setCompHeight(contentRef.current.offsetHeight * scale);
                setCompWidth(contentRef.current.offsetWidth * scale);
            }
        };

        const observer = new ResizeObserver(updateDimensions);
        observer.observe(contentRef.current);
        updateDimensions();

        return () => observer.disconnect();
    }, [scale]);

    return (
        <div
            ref={containerRef}
            className={`ars-scaling-wrapper ${isResizing ? 'is-resizing' : ''} ${settings.dark_mode ? 'ars-dark-mode' : ''} ${!settings.amazon_ui_show_tooltips ? 'ars-tooltips-disabled' : ''}`}
            style={{
                height: compHeight || 'auto',
                width: '100%',
                position: 'relative'
            }}
        >
            <TooltipPositioner />
            <div
                className="ars-scaling-content"
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'top center',
                    width: '100%',
                    position: 'relative'
                }}
            >
                <div style={{
                    position: 'relative',
                    width: 'fit-content',
                    margin: '0 auto',
                    maxWidth: '100%'
                }}>
                    <div ref={contentRef}>
                        {children}
                    </div>

                    <div
                        className="ars-resize-handle"
                        onMouseDown={startResize}
                        onDoubleClick={(e) => {
                            if (clickRef.current.timer) clearTimeout(clickRef.current.timer);
                            setSetting('amazon_ui_scale', 1.0);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
