import React, { useEffect } from 'react';

/**
 * Intelligent Tooltip Positioner
 * 
 * Watches for mouseover events on elements with the '.ars-tooltip' class
 * and dynamically adjusts their positioning classes to prevent them from
 * being cut off at the edges of the application container.
 */
export const TooltipPositioner: React.FC = () => {
    useEffect(() => {
        const handleMouseOver = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest('.ars-tooltip') as HTMLElement;
            if (!target) return;

            // Get viewport and container dimensions
            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const container = target.closest('.ars-scaling-wrapper');
            const cRect = container
                ? container.getBoundingClientRect()
                : { left: 0, top: 0, right: vw, bottom: vh };

            // Get element position
            const rect = target.getBoundingClientRect();

            // Tooltip estimated dimensions
            const tooltipWidth = 220;
            const tooltipHeight = 60;

            // Reset dynamic positioning classes
            const classesToRemove = [
                'ars-tooltip-bottom',
                'ars-tooltip-left',
                'ars-tooltip-right',
                'ars-tooltip-align-left',
                'ars-tooltip-align-right',
                'ars-tooltip-top'
            ];
            classesToRemove.forEach(c => target.classList.remove(c));

            // Default strategy: Prefer Top, then Bottom, then Sides

            const spaceAbove = rect.top - cRect.top;
            const spaceBelow = cRect.bottom - rect.bottom;
            const spaceLeft = rect.left - cRect.left;
            const spaceRight = cRect.right - rect.right;

            // 1. Vertical Decision
            let verticalPlacement: 'top' | 'bottom' | 'side' = 'top';

            if (spaceAbove < tooltipHeight) {
                if (spaceBelow > tooltipHeight) {
                    verticalPlacement = 'bottom';
                } else {
                    verticalPlacement = 'side';
                }
            }

            if (verticalPlacement === 'bottom') {
                target.classList.add('ars-tooltip-bottom');
            } else if (verticalPlacement === 'side') {
                if (spaceRight > tooltipWidth) {
                    target.classList.add('ars-tooltip-right');
                } else if (spaceLeft > tooltipWidth) {
                    target.classList.add('ars-tooltip-left');
                } else {
                    target.classList.add('ars-tooltip-bottom');
                }
            } else {
                target.classList.add('ars-tooltip-top');
            }

            // 2. Horizontal Alignment (only if Top or Bottom)
            if (verticalPlacement !== 'side') {
                const centerX = rect.left + rect.width / 2;
                const halfWidth = tooltipWidth / 2;

                // Check relative to viewport as well, to avoid off-screen cutoffs
                if (centerX - halfWidth < Math.max(cRect.left, 15)) {
                    target.classList.add('ars-tooltip-align-left');
                } else if (centerX + halfWidth > Math.min(cRect.right, vw - 15)) {
                    target.classList.add('ars-tooltip-align-right');
                }
            }
        };

        // Use capture phase to catch events early
        document.addEventListener('mouseover', handleMouseOver, true);
        return () => document.removeEventListener('mouseover', handleMouseOver, true);
    }, []);

    return null;
};
