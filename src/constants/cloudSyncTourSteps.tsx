import React from 'react';
import { TourStep } from './tourSteps';

export const CLOUD_SYNC_TOUR_STEPS: TourStep[] = [
    {
        id: 'sync-intro',
        targetSelector: '#ars-sync-heading',
        title: 'Back Up Your Work Across Devices',
        placement: 'bottom',
        spotlightPadding: 10,
        content: (
            <div className="ars-tour-content">
                <p>
                    <strong>Cloud Sync</strong> uses your free Pastebin account to store your
                    Templates and Phrases in the cloud. Once set up, any device running Review Studio
                    can restore your entire content library in one click.
                </p>
                <p style={{ marginTop: '10px' }}>
                    This quick guide will walk you through the setup — it takes about 2 minutes.
                </p>
            </div>
        ),
    },
    {
        id: 'sync-dev-key',
        targetSelector: '#ars-pastebin-creds-group',
        title: 'Step 1 — Get Your API Dev Key',
        placement: 'right',
        spotlightPadding: 8,
        content: (
            <div className="ars-tour-content">
                <p>
                    An <strong>API Dev Key</strong> is a free token that lets Review Studio communicate
                    with Pastebin on your behalf. To get one:
                </p>
                <ul className="ars-tour-list" style={{ marginTop: '10px' }}>
                    <li>Go to <strong>pastebin.com</strong> and log in (or sign up — it's free).</li>
                    <li>Visit <strong>pastebin.com/doc_api</strong> → your <strong>Unique Developer API Key</strong> is shown at the top.</li>
                    <li>Copy it and paste it into the <strong>API Dev Key</strong> field here.</li>
                </ul>
            </div>
        ),
    },
    {
        id: 'sync-generate-key',
        targetSelector: '#ars-pastebin-auth-actions',
        title: 'Step 2 — Link Your Account',
        placement: 'top',
        spotlightPadding: 8,
        content: (
            <div className="ars-tour-content">
                <p>
                    Enter your <strong>Pastebin username</strong> and <strong>password</strong>.
                    These are used only once to generate a session token (User Key) and are never stored.
                </p>
                <p style={{ marginTop: '10px' }}>
                    Click <strong>"Generate User Key"</strong>. Once your key appears, click
                    <strong>"Test Connection"</strong> to verify everything is working.
                </p>
            </div>
        ),
    },
    {
        id: 'sync-recovery',
        targetSelector: '#ars-recovery-section',
        title: 'Step 3 — Multi-Device Sync (Optional)',
        placement: 'top',
        spotlightPadding: 8,
        content: (
            <div className="ars-tour-content">
                <p>
                    While you can always regenerate a key with your credentials, sharing a single
                    <strong> User Key</strong> across all your devices ensures they stay in perfect sync.
                </p>
                <ul className="ars-tour-list" style={{ marginTop: '10px' }}>
                    <li>
                        <strong>"Backup User Key to Cloud"</strong> creates a private rescue paste
                        and gives you a <strong>Paste ID</strong>.
                    </li>
                    <li>
                        On any other device, simply enter that ID and click <strong>"Fetch Key"</strong>.
                        This is easier than re-entering credentials and keeps your session active everywhere.
                    </li>
                </ul>
            </div>
        ),
    },
    {
        id: 'sync-autosync',
        targetSelector: '#ars-autosync-prefs',
        title: 'Set It and Forget It',
        placement: 'bottom',
        spotlightPadding: 8,
        content: (
            <div className="ars-tour-content">
                <p>
                    With credentials set up, you can enable <strong>automatic background sync</strong>:
                </p>
                <ul className="ars-tour-list" style={{ marginTop: '8px' }}>
                    <li><strong>Auto-Sync Templates</strong> — backs up templates whenever you change them.</li>
                    <li><strong>Auto-Sync Phrases</strong> — same, for your saved phrases.</li>
                </ul>
                <p style={{ marginTop: '10px', fontSize: '12px', color: 'var(--ars-color-text-secondary)' }}>
                    You can also trigger a manual sync at any time via the <strong>Cloud</strong> button
                    in the editor toolbar.
                </p>
            </div>
        ),
    },
];
