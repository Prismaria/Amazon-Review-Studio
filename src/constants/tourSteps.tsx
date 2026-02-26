import React from 'react';

export type TourPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TourStep {
    id: string;
    /** CSS selector to spotlight. null = fullscreen Welcome modal with no spotlight. */
    targetSelector: string | null;
    title: string;
    content: React.ReactNode;
    placement: TourPlacement;
    /** Extra px of padding around the spotlight cutout. Default: 8 */
    spotlightPadding?: number;
    /** Optional action to perform when the step becomes active */
    action?: (setSetting: (key: string, value: any) => void) => void;
    /** Optional cleanup to perform when leaving the step */
    onLeave?: (setSetting: (key: string, value: any) => void) => void;
}

export const TOUR_STEPS: TourStep[] = [
    {
        id: 'toolbar-formatting',
        targetSelector: '.ars-editor-toolbar .ars-toolbar-group:first-child',
        title: 'Style Like a Word Processor',
        placement: 'bottom',
        spotlightPadding: 6,
        content: (
            <div className="ars-tour-content">
                <p>
                    Amazon only allows plain text, but Review Studio uses <strong>Unicode</strong> behind
                    the scenes — so your styles actually render on the live site.
                </p>
                <p style={{ marginTop: '10px' }}>
                    Use the toolbar buttons, or keyboard shortcuts just like any word processor:
                </p>
                <ul className="ars-tour-list">
                    <li><kbd>Ctrl</kbd> + <kbd>B</kbd> → <strong>Bold</strong></li>
                    <li><kbd>Ctrl</kbd> + <kbd>I</kbd> → <em>Italic</em></li>
                </ul>
                <p style={{ marginTop: '10px', fontSize: '12px', color: 'var(--ars-color-text-secondary)' }}>
                    Select existing text then click a style to toggle it. The <strong>eraser</strong> button strips all formatting.
                </p>
            </div>
        ),
    },
    {
        id: 'toolbar-templates',
        targetSelector: '.ars-toolbar-btn[data-tooltip="Templates"]',
        title: 'Never Start from Scratch',
        placement: 'bottom',
        spotlightPadding: 10,
        content: (
            <div className="ars-tour-content">
                <p>
                    <strong>Templates</strong> are reusable review blueprints. Write a structure once —
                    like sections for Build Quality, Performance, and Value — then load it in a single click
                    for every future review.
                </p>
                <p style={{ marginTop: '10px' }}>
                    Click this button to browse saved templates, or open the Template Manager to create and
                    reorder your own.
                </p>
            </div>
        ),
    },
    {
        id: 'toolbar-phrases',
        targetSelector: '.ars-toolbar-btn[data-tooltip="Insert Phrase"]',
        title: 'Your Personal Snippet Library',
        placement: 'bottom',
        spotlightPadding: 10,
        content: (
            <div className="ars-tour-content">
                <p>
                    <strong>Saved Phrases</strong> are quick-insert text snippets for things you write
                    over and over. Things like:
                </p>
                <ul className="ars-tour-list" style={{ marginTop: '8px' }}>
                    <li><em>"The packaging was minimal and eco-friendly."</em></li>
                    <li><em>"Here are the pros and cons:"</em></li>
                </ul>
                <p style={{ marginTop: '10px' }}>
                    Add, edit, and remove phrases directly from the popover that appears when you click this button.
                </p>
            </div>
        ),
    },
    {
        id: 'media-upload',
        targetSelector: '.ars-media-upload-wrapper',
        title: 'No More Browse Dialogs',
        placement: 'top',
        spotlightPadding: 8,
        content: (
            <div className="ars-tour-content">
                <p>Uploading photos just got way easier:</p>
                <ul className="ars-tour-list" style={{ marginTop: '8px' }}>
                    <li><strong>Drag & drop</strong> files directly onto the drop zone.</li>
                    <li>Copy a screenshot and press <kbd>Ctrl</kbd> + <kbd>V</kbd> anywhere on the page to paste it instantly.</li>
                    <li>Open your <strong>Google Photos</strong> or <strong>iCloud</strong> library via the buttons below the drop zone.</li>
                </ul>
            </div>
        ),
    },
    {
        id: 'lights-out',
        targetSelector: '#ars-lights-toggle',
        title: 'Lights Out',
        placement: 'left',
        spotlightPadding: 10,
        action: (setSetting) => {
            // Showcase dimming then dark mode
            setTimeout(() => setSetting('amazon_ui_lights_off', true), 800);
            setTimeout(() => {
                setSetting('amazon_ui_lights_off', false);
                setSetting('dark_mode', true);
            }, 2400);
        },
        onLeave: (setSetting) => {
            setSetting('amazon_ui_lights_off', false);
            setSetting('dark_mode', false);
        },
        content: (
            <div className="ars-tour-content">
                <p>
                    <strong>Moon icon</strong> — Two powerful ways to reduce eye strain:
                </p>
                <ul className="ars-tour-list" style={{ marginTop: '8px' }}>
                    <li>
                        <strong>Short-click</strong> to dim the Amazon page and spotlight your review (Lights Out).
                    </li>
                    <li>
                        <strong>Long-press</strong> to toggle full <strong>Dark Mode</strong> for the Studio.
                    </li>
                </ul>
                <p style={{ marginTop: '10px', fontSize: '12px' }}>
                    Watch as we showcase these states now!
                </p>
            </div>
        ),
    },
    {
        id: 'ui-scale',
        targetSelector: '.ars-resize-handle',
        title: 'Perfect Fit',
        placement: 'left',
        spotlightPadding: 12,
        content: (
            <div className="ars-tour-content">
                <p>
                    <strong>Resize handle</strong> — Found at the bottom-right corner of the panel.
                </p>
                <ul className="ars-tour-list" style={{ marginTop: '8px' }}>
                    <li>
                        <strong>Drag left/right</strong> to scale the entire studio UI up or down.
                    </li>
                    <li>
                        <strong>Double-click</strong> the handle to instantly reset to 100% scale.
                    </li>
                </ul>
            </div>
        ),
    },
    {
        id: 'settings',
        targetSelector: '#ars-settings-toggle',
        title: 'Settings',
        placement: 'left',
        spotlightPadding: 10,
        content: (
            <div className="ars-tour-content">
                <p>
                    Click the <strong>gear icon</strong> to open the Settings dashboard. From here you can:
                </p>
                <ul className="ars-tour-list" style={{ marginTop: '8px' }}>
                    <li>Set up <strong>Cloud Sync</strong> with Pastebin to back up your templates &amp; phrases across devices.</li>
                    <li>Enable the optional <strong>AI Title Generation</strong> for generating review titles.</li>
                </ul>
            </div>
        ),
    },
    {
        id: 'conclusion',
        targetSelector: '#ars-settings-toggle',
        title: "You're all set!",
        placement: 'left',
        content: (
            <div className="space-y-3">
                <p>Most elements have tooltips for extra clarity.</p>
                <p>If you find them annoying, you can turn them off anytime in the Settings dashboard.</p>
                <div className="pt-2 border-t border-indigo-100 mt-2 text-indigo-600 font-medium">
                    Happy Reviewing! ✨
                </div>
            </div>
        ),
    }
];
