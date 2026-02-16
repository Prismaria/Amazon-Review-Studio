import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSettings } from '../../hooks/useSettings';
import { Maximize2 } from 'lucide-react';

interface ScalingWrapperProps {
    children: React.ReactNode;
}

export const ScalingWrapper: React.FC<ScalingWrapperProps> = ({ children }) => {
    const { settings, setSetting } = useSettings();
    const [isResizing, setIsResizing] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef<{ startX: number; startScale: number; unscaledWidth: number } | null>(null);
    const scale = settings.amazon_ui_scale ?? 1.0;

    const startResize = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        dragRef.current = {
            startX: e.clientX,
            startScale: scale,
            unscaledWidth: rect.width / scale
        };
        setIsResizing(true);
    }, [scale]);

    useEffect(() => {
        if (!isResizing || !dragRef.current) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { startX, startScale, unscaledWidth } = dragRef.current!;

            // Calculate change in pixels
            const deltaX = e.clientX - startX;

            // newScale = startScale + (deltaX / unscaledWidth)
            let newScale = startScale + (deltaX / unscaledWidth);

            // Constraints
            newScale = Math.max(0.5, Math.min(1.0, newScale));
            newScale = Math.round(newScale * 100) / 100;

            if (newScale !== scale) {
                setSetting('amazon_ui_scale', newScale);
            }
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            dragRef.current = null;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing, scale, setSetting]);

    // Calculate height compensation to avoid extra space at the bottom
    // This is tricky because scale() doesn't affect document flow height.
    // However, if we're in a relative container, we can use margin-bottom to pull up the rest.
    // But better yet, we can set the wrapper height to match the scaled content.
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
            className={`ars-scaling-wrapper ${isResizing ? 'is-resizing' : ''}`}
            style={{
                height: compHeight || 'auto',
                width: '100%',
                position: 'relative'
            }}
        >
            <div
                className="ars-scaling-content"
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'top center',
                    width: '100%',
                    position: 'relative'
                }}
            >
                {/* 
                    This inner container wraps the app tightly so the handle 
                    stays glued to the visual bottom-right corner of the app card.
                */}
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
                        onDoubleClick={() => setSetting('amazon_ui_scale', 1.0)}
                        title="Drag to scale down, double-click to reset"
                    />
                </div>
            </div>
        </div>
    );
};
