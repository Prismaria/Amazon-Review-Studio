import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, BookOpen, Save } from 'lucide-react';
import { TourStep } from '../../constants/tourSteps';
import { useSettings } from '../../hooks/useSettings';
import './TourGuide.css';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SpotlightRect {
    x: number;
    y: number;
    width: number;
    height: number;
    radius: number;
}

interface TooltipPos {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
}

// ─── Welcome Modal ────────────────────────────────────────────────────────────

interface WelcomeModalProps {
    onStart: () => void;
    onSkip: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onStart, onSkip }) => (
    <AnimatePresence>
        <motion.div
            className="ars-tour-welcome-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
        >
            <motion.div
                className="ars-tour-welcome-modal"
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: 'spring', damping: 26, stiffness: 300, delay: 0.05 }}
            >
                {/* Header */}
                <div className="ars-tour-welcome-header">
                    <div className="ars-tour-welcome-icon">✨</div>
                    <h2 className="ars-tour-welcome-title">Welcome to Review Studio</h2>
                    <p className="ars-tour-welcome-subtitle">
                        The Amazon review form, completely reimagined.
                    </p>
                </div>

                {/* Body */}
                <div className="ars-tour-welcome-body">
                    <div className="ars-tour-welcome-autosave">
                        <div className="ars-tour-welcome-autosave-icon">
                            <Save size={18} />
                        </div>
                        <div className="ars-tour-welcome-autosave-text">
                            <strong>Your draft is already being saved.</strong>
                            <p>
                                Every character you type is saved locally. If you accidentally close the tab,
                                your draft, title, and uploaded images will be waiting when you return.
                            </p>
                        </div>
                    </div>
                    <p className="ars-tour-welcome-intro">
                        Take a quick 30-second tour to discover the most powerful features.
                    </p>
                </div>

                {/* Footer */}
                <div className="ars-tour-welcome-footer">
                    <button className="ars-tour-btn-start" onClick={onStart}>
                        <BookOpen size={16} />
                        Start Tour
                        <ArrowRight size={16} />
                    </button>
                    <button className="ars-tour-btn-start-skip" onClick={onSkip}>
                        Skip — I'll explore on my own
                    </button>
                </div>
            </motion.div>
        </motion.div>
    </AnimatePresence>
);

// ─── Main TourGuide ───────────────────────────────────────────────────────────

interface TourGuideProps {
    steps: TourStep[];
    onComplete: () => void;
    /** When true, skips the Welcome Modal and goes straight to step 1. Use for in-context tours (e.g., inside Settings modal). */
    skipWelcome?: boolean;
}

const TOOLTIP_GAP = 16; // px between spotlight edge and tooltip
const TOOLTIP_W = 340;

export const TourGuide: React.FC<TourGuideProps> = ({ steps, onComplete, skipWelcome = false }) => {
    const [phase, setPhase] = useState<'welcome' | 'tour' | 'done'>(skipWelcome ? 'tour' : 'welcome');
    const [stepIndex, setStepIndex] = useState(0);
    const [spotlight, setSpotlight] = useState<SpotlightRect | null>(null);
    const [tooltipPos, setTooltipPos] = useState<TooltipPos>({ top: 0, left: 0 });
    const [arrowStyle, setArrowStyle] = useState<React.CSSProperties>({});
    const rafRef = useRef<number>(0);
    const overlayRef = useRef<HTMLDivElement>(null);
    const { setSetting } = useSettings();

    const currentStep = steps[stepIndex];
    const totalSteps = steps.length;

    // ── Find element inside shadow root ──────────────────────────────────────
    const findTarget = useCallback((selector: string): Element | null => {
        const shadowRoot = document.getElementById('amazon-review-studio-root')?.shadowRoot;
        return (shadowRoot?.querySelector(selector)) ?? document.querySelector(selector) ?? null;
    }, []);

    // ── Measure and position ─────────────────────────────────────────────────
    const measure = useCallback(() => {
        if (phase !== 'tour' || !currentStep) return;

        const selector = currentStep.targetSelector;
        if (!selector) {
            setSpotlight(null);
            return;
        }

        const el = findTarget(selector);
        if (!el) {
            // Element not found — skip step silently
            setSpotlight(null);
            return;
        }

        const rect = el.getBoundingClientRect();
        const overlayRect = overlayRef.current?.getBoundingClientRect() || { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        const pad = currentStep.spotlightPadding ?? 8;

        const sr: SpotlightRect = {
            x: rect.left - overlayRect.left - pad,
            y: rect.top - overlayRect.top - pad,
            width: rect.width + pad * 2,
            height: rect.height + pad * 2,
            radius: 10,
        };
        setSpotlight(sr);

        // ── Compute tooltip position ──────────────────────────────────────
        const vw = overlayRect.width;
        const vh = overlayRect.height;
        const placement = currentStep.placement;
        const tooltipH = 280; // rough estimate
        const pos: TooltipPos = {};
        const arrow: React.CSSProperties = {};

        if (placement === 'bottom') {
            let left = sr.x + sr.width / 2 - TOOLTIP_W / 2;
            left = Math.max(12, Math.min(left, vw - TOOLTIP_W - 12));
            pos.top = sr.y + sr.height + TOOLTIP_GAP;
            pos.left = left;
            arrow.bottom = '100%';
            arrow.left = (sr.x + sr.width / 2 - left) + 'px';
            arrow.borderTopWidth = 0;
            arrow.borderLeftWidth = 0;
        } else if (placement === 'top') {
            let left = sr.x + sr.width / 2 - TOOLTIP_W / 2;
            left = Math.max(12, Math.min(left, vw - TOOLTIP_W - 12));
            let top = sr.y - tooltipH - TOOLTIP_GAP;
            if (top < 12) top = sr.y + sr.height + TOOLTIP_GAP;
            pos.top = top;
            pos.left = left;
            arrow.top = '100%';
            arrow.left = (sr.x + sr.width / 2 - left) + 'px';
            arrow.borderBottomWidth = 0;
            arrow.borderRightWidth = 0;
        } else if (placement === 'left') {
            let left = sr.x - TOOLTIP_W - TOOLTIP_GAP;
            if (left < 12) left = sr.x + sr.width + TOOLTIP_GAP;
            let top = sr.y + sr.height / 2 - tooltipH / 2;
            top = Math.max(12, Math.min(top, vh - tooltipH - 12));
            pos.top = top;
            pos.left = left;
            arrow.top = (sr.y + sr.height / 2 - top - 6) + 'px';
            arrow.left = '100%';
            arrow.borderTopWidth = 0;
            arrow.borderRightWidth = 0;
        } else { // right
            let left = sr.x + sr.width + TOOLTIP_GAP;
            left = Math.min(left, vw - TOOLTIP_W - 12);
            let top = sr.y + sr.height / 2 - tooltipH / 2;
            top = Math.max(12, Math.min(top, vh - tooltipH - 12));
            pos.top = top;
            pos.left = left;
            arrow.top = (sr.y + sr.height / 2 - top - 6) + 'px';
            arrow.right = '100%';
            arrow.borderBottomWidth = 0;
            arrow.borderLeftWidth = 0;
        }

        setTooltipPos(pos);
        setArrowStyle(arrow);
    }, [phase, currentStep, findTarget]);

    // ── Run measurement when step changes ────────────────────────────────────
    useEffect(() => {
        if (phase !== 'tour') return;

        // Scroll target into view, then measure after a brief settle
        const selector = currentStep?.targetSelector;
        if (selector) {
            const el = findTarget(selector);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
            }
        }

        const t = setTimeout(() => {
            measure();
        }, 120);
        return () => clearTimeout(t);
    }, [phase, stepIndex, measure, currentStep, findTarget]);

    // ── Execute Step Hooks ────────────────────────────────────────────────
    useEffect(() => {
        if (phase !== 'tour' || !currentStep) return;

        if (currentStep.action) {
            currentStep.action(setSetting);
        }

        return () => {
            if (currentStep.onLeave) {
                currentStep.onLeave(setSetting);
            }
        };
    }, [phase, stepIndex, currentStep, setSetting]);

    // ── Recalculate on resize ─────────────────────────────────────────────
    useEffect(() => {
        const onResize = () => {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(measure);
        };
        window.addEventListener('resize', onResize);
        window.addEventListener('scroll', onResize, true); // Capture scroll events

        return () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('scroll', onResize, true);
            cancelAnimationFrame(rafRef.current);
        };
    }, [measure]);

    // ── Navigation ────────────────────────────────────────────────────────
    const handleStart = () => setPhase('tour');

    const handleSkip = () => {
        onComplete();
    };

    const handleNext = () => {
        if (stepIndex < totalSteps - 1) {
            setStepIndex(i => i + 1);
        } else {
            onComplete();
        }
    };

    const handleBack = () => {
        if (stepIndex > 0) setStepIndex(i => i - 1);
    };

    // ── SVG Clip Path ─────────────────────────────────────────────────────
    // We build a path: full screen rect minus the spotlight rect (rounded).
    const buildClipPath = (s: SpotlightRect, vw: number, vh: number) => {
        const { x, y, width: w, height: h, radius: r } = s;

        // Full screen clockwise → spotlight counter-clockwise (creates a hole)
        return [
            `M 0 0 H ${vw} V ${vh} H 0 Z`,
            `M ${x + r} ${y}`,
            `H ${x + w - r} Q ${x + w} ${y} ${x + w} ${y + r}`,
            `V ${y + h - r} Q ${x + w} ${y + h} ${x + w - r} ${y + h}`,
            `H ${x + r} Q ${x} ${y + h} ${x} ${y + h - r}`,
            `V ${y + r} Q ${x} ${y} ${x + r} ${y} Z`,
        ].join(' ');
    };

    // ── Render ────────────────────────────────────────────────────────────
    if (phase === 'welcome') {
        return <WelcomeModal onStart={handleStart} onSkip={handleSkip} />;
    }

    if (phase === 'done') return null;

    const overlayRect = overlayRef.current?.getBoundingClientRect();
    const vw = overlayRect?.width || 1920;
    const vh = overlayRect?.height || 1080;

    return (
        <div ref={overlayRef} className="ars-tour-overlay" role="dialog" aria-modal="true" aria-label="Feature tour">
            {/* Spotlight SVG Overlay */}
            <svg className="ars-tour-svg" viewBox={`0 0 ${vw} ${vh}`} preserveAspectRatio="none">
                <defs>
                    <clipPath id="ars-tour-clip">
                        {spotlight && (
                            <path d={buildClipPath(spotlight, vw, vh)} fillRule="evenodd" />
                        )}
                    </clipPath>
                </defs>
                {/* Dark overlay with cutout. If no spotlight, full black. */}
                {spotlight ? (
                    <path
                        d={buildClipPath(spotlight, vw, vh)}
                        fill="rgba(0, 0, 0, 0.62)"
                        fillRule="evenodd"
                    />
                ) : (
                    <rect x="0" y="0" width={vw} height={vh} fill="rgba(0,0,0,0.62)" />
                )}
                {/* Transparent hit area over spotlight so clicks pass through */}
                {spotlight && (
                    <rect
                        className="ars-tour-spotlight-hit"
                        x={spotlight.x}
                        y={spotlight.y}
                        width={spotlight.width}
                        height={spotlight.height}
                        rx={spotlight.radius}
                    />
                )}
            </svg>

            {/* Tooltip */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`step-${stepIndex}`}
                    className="ars-tour-tooltip"
                    style={tooltipPos}
                    initial={{ opacity: 0, scale: 0.94, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -4 }}
                    transition={{ type: 'spring', damping: 22, stiffness: 320 }}
                >
                    {/* Arrow */}
                    {Object.keys(arrowStyle).length > 0 && (
                        <div className="ars-tour-arrow" style={arrowStyle} />
                    )}

                    {/* Header */}
                    <div className="ars-tour-tooltip-header">
                        <div className="ars-tour-tooltip-icon">
                            <BookOpen size={16} />
                        </div>
                        <div className="ars-tour-tooltip-title">{currentStep.title}</div>
                    </div>

                    {/* Body */}
                    <div className="ars-tour-tooltip-body">
                        {currentStep.content}
                    </div>

                    {/* Footer */}
                    <div className="ars-tour-tooltip-footer">
                        <span className="ars-tour-step-counter">
                            {stepIndex + 1} / {totalSteps}
                        </span>
                        <div className="ars-tour-footer-actions">
                            <button
                                className="ars-tour-btn ars-tour-btn-skip"
                                onClick={handleSkip}
                                aria-label="Skip tour"
                            >
                                Skip
                            </button>
                            <button
                                className="ars-tour-btn ars-tour-btn-back"
                                onClick={handleBack}
                                disabled={stepIndex === 0}
                                aria-label="Previous step"
                            >
                                <ArrowLeft size={13} />
                                Back
                            </button>
                            <button
                                className="ars-tour-btn ars-tour-btn-next"
                                onClick={handleNext}
                                aria-label={stepIndex === totalSteps - 1 ? 'Finish tour' : 'Next step'}
                            >
                                {stepIndex === totalSteps - 1 ? 'Finish' : 'Next'}
                                <ArrowRight size={13} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
