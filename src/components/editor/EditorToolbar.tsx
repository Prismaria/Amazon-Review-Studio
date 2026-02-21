import { useState, useRef, useEffect } from 'react';
import { Bold, Italic, Underline, Strikethrough, Layout, MessageSquare, Cloud, Save, Download, RefreshCw, Settings, Trash2, ExternalLink, BarChart2, Clipboard, Link2, List, ListOrdered, Eraser } from 'lucide-react';
import { Button } from '../common/Button';
import { UnicodeStyle } from '../../services/textFormatting';
import { TemplateManager } from '../content/TemplateManager';
import { PhraseManager } from '../content/PhraseManager';
import { TemplateSelector } from '../content/TemplateSelector';
import { useSettings } from '../../hooks/useSettings';
import { usePastebin } from '../../hooks/usePastebin';
import { SettingsDashboard } from '../settings/SettingsDashboard';
import Swal from 'sweetalert2';

export interface EditorToolbarProps {
    onStyleToggle: (style: UnicodeStyle) => void;
    activeStyles: Set<UnicodeStyle>;
    onInsert: (text: string) => void;
    onReplace: (text: string) => void;
    onClearStyles?: () => void;
    showUtilities?: boolean;
    currentValue?: string;
    onListToggle?: (type: 'bullet' | 'number') => void;
    productName?: string;
    asin?: string;
}

export const EditorToolbar: React.FC<EditorToolbarProps> = ({
    onStyleToggle,
    activeStyles,
    onInsert,
    onReplace,
    onClearStyles,
    showUtilities = true,
    currentValue = '',
    onListToggle,
    productName,
    asin: propAsin,
}) => {
    const [showTemplatePopover, setShowTemplatePopover] = useState(false);
    const [showTemplateManager, setShowTemplateManager] = useState(false);
    const [showPhrases, setShowPhrases] = useState(false);
    const [showCloudPopover, setShowCloudPopover] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [quota, setQuota] = useState<{ count: number; date: string } | null>(null);
    const [showBulletSelector, setShowBulletSelector] = useState(false);

    const { settings, setSetting } = useSettings();
    const {
        saveReviewToCloud,
        fetchReviewFromCloud,
        syncAllToCloud,
        syncTemplatesFromCloud,
        clearCloudData,
        isLoading: isCloudLoading,
        getSyncQuota
    } = usePastebin();

    const bulletOptions = ['•', '●', '➜', '►', '▸', '■', '✦', '◈', '★', '✓', '✗'];

    const handleBulletRightClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowBulletSelector(!showBulletSelector);
    };

    const selectBullet = (bullet: string) => {
        setSetting('amazon_bullet_style', bullet);
        setShowBulletSelector(false);
    };
    const [settingsTab, setSettingsTab] = useState<'ai' | 'sync' | 'about'>('ai');

    const phraseBtnRef = useRef<HTMLButtonElement>(null);
    const phrasePopoverRef = useRef<HTMLDivElement>(null);
    const templateBtnRef = useRef<HTMLButtonElement>(null);
    const templatePopoverRef = useRef<HTMLDivElement>(null);
    const cloudBtnRef = useRef<HTMLButtonElement>(null);
    const cloudPopoverRef = useRef<HTMLDivElement>(null);
    const bulletBtnRef = useRef<HTMLButtonElement>(null);
    const bulletSelectorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (showCloudPopover) {
            setQuota(getSyncQuota());
        }
    }, [showCloudPopover, getSyncQuota]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const path = event.composedPath();

            // Check Phrases Popover
            if (showPhrases) {
                const clickedInsidePhrase =
                    (phrasePopoverRef.current && path.includes(phrasePopoverRef.current)) ||
                    (phraseBtnRef.current && path.includes(phraseBtnRef.current));
                if (!clickedInsidePhrase) setShowPhrases(false);
            }

            // Check Template Popover
            if (showTemplatePopover) {
                const clickedInsideTemplate =
                    (templatePopoverRef.current && path.includes(templatePopoverRef.current)) ||
                    (templateBtnRef.current && path.includes(templateBtnRef.current));
                if (!clickedInsideTemplate) setShowTemplatePopover(false);
            }

            // Check Cloud Popover
            if (showCloudPopover) {
                const clickedInsideCloud =
                    (cloudPopoverRef.current && path.includes(cloudPopoverRef.current)) ||
                    (cloudBtnRef.current && path.includes(cloudBtnRef.current));
                if (!clickedInsideCloud) setShowCloudPopover(false);
            }

            // Check Bullet Selector
            if (showBulletSelector) {
                const clickedInsideBullet =
                    (bulletSelectorRef.current && path.includes(bulletSelectorRef.current)) ||
                    (bulletBtnRef.current && path.includes(bulletBtnRef.current));
                if (!clickedInsideBullet) setShowBulletSelector(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showPhrases, showTemplatePopover, showCloudPopover, showBulletSelector]);

    const handlePrivacyToggle = async () => {
        if (settings.amazon_pastebin_privacy_mode) {
            setSetting('amazon_pastebin_privacy_mode', false);
        } else {
            const isDark = settings.dark_mode || settings.amazon_ui_lights_off;
            const result = await Swal.fire({
                title: 'Enable Privacy Mode?',
                html: 'Privacy Mode encrypts your drafted reviews into a <b>Base64 format</b>.<br><br><span style="color: #d33; font-size: 14px"><b>Warning:</b> Pastebin flags pastes containing encrypted text. There is a small chance your account may be banned. Proceed at your own risk.</span>',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Accept Risk & Enable',
                cancelButtonText: 'Cancel',
                background: isDark ? '#1f2937' : '#fff',
                color: isDark ? '#f3f4f6' : '#545454'
            });

            if (result.isConfirmed) {
                setSetting('amazon_pastebin_privacy_mode', true);
            }
        }
    };

    const getProductInfo = () => {
        // Use props if available (passed from parent component)
        if (productName && productName.trim() !== '') {
            console.log('[ARS Debug] Using productName from props:', productName.substring(0, 50));
            const urlParams = new URLSearchParams(window.location.search);
            let asin = propAsin || urlParams.get('asin');
            if (!asin && window.location.href.includes('/dp/')) {
                const match = window.location.href.match(/\/dp\/([A-Z0-9]{10})/);
                if (match) asin = match[1];
            }
            return { asin: asin || 'UNKNOWN', title: productName.trim() };
        }

        // Fallback: Try to get from URL and DOM scraping
        const urlParams = new URLSearchParams(window.location.search);
        let asin = propAsin || urlParams.get('asin');
        if (!asin && window.location.href.includes('/dp/')) {
            const match = window.location.href.match(/\/dp\/([A-Z0-9]{10})/);
            if (match) asin = match[1];
        }

        // DEBUG: Log all selector attempts
        console.log('[ARS Debug] getProductInfo called - scraping DOM');

        // .ars-product-name is inside our shadow root
        const shadowRoot = document.getElementById('amazon-review-studio-root')?.shadowRoot;
        const arsEl = shadowRoot ? shadowRoot.querySelector('.ars-product-name') : null;

        const inContextEl = document.querySelector('.in-context-ryp__product-name');
        const productTitleEl = document.getElementById('productTitle');
        const wordBreakEl = document.querySelector('.product-title-word-break');
        const h1El = document.querySelector('h1');

        console.log('[ARS Debug] .ars-product-name found:', !!arsEl, arsEl?.textContent?.substring(0, 50));
        console.log('[ARS Debug] .in-context-ryp__product-name found:', !!inContextEl, inContextEl?.textContent?.substring(0, 50));
        console.log('[ARS Debug] #productTitle found:', !!productTitleEl, productTitleEl?.textContent?.substring(0, 50));
        console.log('[ARS Debug] .product-title-word-break found:', !!wordBreakEl, wordBreakEl?.textContent?.substring(0, 50));
        console.log('[ARS Debug] h1 found:', !!h1El, h1El?.textContent?.substring(0, 50));

        // Try to get Title - check ARS product name first (most reliable), then fall back to Amazon selectors
        const titleEl = arsEl || inContextEl || productTitleEl || wordBreakEl || h1El;
        let title = titleEl?.textContent?.trim() || 'Unknown Product';

        // DEBUG: Log what was found
        console.log('[ARS Debug] Selected element:', titleEl?.tagName, titleEl?.className);
        console.log('[ARS Debug] Final title:', title);
        console.log('[ARS Debug] ASIN:', asin);

        return { asin: asin || 'UNKNOWN', title };
    };

    const handleCloudAction = async (action: string) => {
        const { asin, title } = getProductInfo();

        try {
            switch (action) {
                case 'save':
                    if (!currentValue) {
                        alert('Please enter some review text first.');
                        return;
                    }
                    const shadowRoot = document.getElementById('amazon-review-studio-root')?.shadowRoot;
                    const reviewTitleInput = (shadowRoot?.getElementById('reviewTitle') || document.getElementById('reviewTitle')) as HTMLInputElement;
                    const saveRes = await saveReviewToCloud({
                        reviewBody: currentValue,
                        reviewTitle: reviewTitleInput?.value || '',
                        asin,
                        productTitle: title
                    });
                    alert(saveRes.message);
                    break;

                case 'fetch':
                    if (currentValue && !confirm('This will replace your current text. Continue?')) return;
                    const fetchRes = await fetchReviewFromCloud(asin);
                    if (fetchRes.success && fetchRes.data) {
                        const shadowRoot = document.getElementById('amazon-review-studio-root')?.shadowRoot;
                        const titleInput = (shadowRoot?.getElementById('reviewTitle') || document.getElementById('reviewTitle')) as HTMLInputElement;
                        if (titleInput && fetchRes.data.reviewTitle) {
                            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
                            if (nativeInputValueSetter) {
                                nativeInputValueSetter.call(titleInput, fetchRes.data.reviewTitle);
                            } else {
                                titleInput.value = fetchRes.data.reviewTitle;
                            }
                            titleInput.dispatchEvent(new Event('input', { bubbles: true }));
                        }
                        onReplace(fetchRes.data.reviewBody);
                    } else {
                        alert(fetchRes.message);
                    }
                    break;

                case 'create-manual':
                    const exportText = JSON.stringify({ version: '1.0', content: currentValue, asin, productTitle: title }, null, 2);
                    navigator.clipboard.writeText(exportText);
                    window.open('https://pastebin.com/', '_blank');
                    alert('Export data copied to clipboard! Paste it into Pastebin.');
                    break;

                case 'import-manual':
                    const url = prompt('Enter Pastebin URL:');
                    if (url) {
                        const key = url.split('/').pop();
                        if (key) {
                            try {
                                const response = await fetch(`https://pastebin.com/raw/${key}`);
                                const content = await response.text();
                                onInsert(content);
                            } catch (err) {
                                alert('Failed to fetch paste content.');
                            }
                        }
                    }
                    break;

                case 'sync-templates':
                    const pushRes = await syncAllToCloud();
                    alert(pushRes.message);
                    break;

                case 'import-templates':
                    const pullRes = await syncTemplatesFromCloud();
                    alert(pullRes.message);
                    break;

                case 'my-pastebin':
                    const username = settings.amazon_pastebin_api_user_name;
                    window.open(username ? `https://pastebin.com/u/${username}` : 'https://pastebin.com/', '_blank');
                    break;

                case 'status':
                    // In a real app we'd show a modal, for now alert
                    alert(`Sync Service: Connected\nUser: ${settings.amazon_pastebin_api_user_name || 'Anonymous'}\nDev Key: ${settings.amazon_pastebin_api_dev_key ? '✓' : '✗'}\nUser Key: ${settings.amazon_pastebin_api_user_key ? '✓' : '✗'}`);
                    break;

                case 'clear':
                    const clearRes = await clearCloudData();
                    if (clearRes) alert(clearRes.message);
                    break;
            }
        } catch (e: any) {
            alert(`Error: ${e.message}`);
        }
        setShowCloudPopover(false);
    };

    // Custom SVG letter icons matching lucide style (24x24 viewBox, stroke-based)
    const SerifIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <text x="12" y="19" textAnchor="middle" fontSize="25" fontFamily="serif" fontWeight="bold" stroke="none" fill="currentColor">S</text>
        </svg>
    );

    const CursiveIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
            <text x="12" y="19" textAnchor="middle" fontSize="20" fontFamily="cursive" fontWeight="bold" stroke="none" fill="currentColor">C</text>
        </svg>
    );

    const MonospaceIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <text x="12" y="19" textAnchor="middle" fontSize="22" fontFamily="monospace" fontWeight="bold" stroke="none" fill="currentColor">M</text>
        </svg>
    );

    const WideIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 5l6 14 6-10 6 10 6-14" />
        </svg>
    );

    const SuperscriptIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Superscript: "x" base with small raised "S" */}
            <path d="M4 19l7-7" />
            <path d="M11 19l-7-7" />
            <path d="M19 5c0-1-.8-2-2-2s-2 1-2 2c0 2.2 4 1.8 4 4 0 1-1 2-2 2s-2-1-2-2" />
        </svg>
    );


    const tools: { id: UnicodeStyle; icon: React.ReactNode; label: string }[] = [
        { id: 'bold', icon: <Bold size={16} />, label: 'Bold' },
        { id: 'italic', icon: <Italic size={16} />, label: 'Italic' },
        { id: 'serif', icon: <SerifIcon />, label: 'Serif' },
        { id: 'cursive', icon: <CursiveIcon />, label: 'Cursive' },
        { id: 'monospace', icon: <MonospaceIcon />, label: 'Monospace' },
        { id: 'underline', icon: <Underline size={16} />, label: 'Underline' },
        { id: 'strikethrough', icon: <Strikethrough size={16} />, label: 'Strikethrough' },
        { id: 'wide', icon: <WideIcon />, label: 'Wide' },
        { id: 'superscript', icon: <SuperscriptIcon />, label: 'Superscript' },
    ];

    return (
        <div className="ars-editor-toolbar">
            <div className="ars-toolbar-group">
                {tools.map((tool) => (
                    <Button
                        key={tool.id}
                        variant={activeStyles.has(tool.id) ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => onStyleToggle(tool.id)}
                        title={tool.label}
                        className="ars-toolbar-btn"
                    >
                        {tool.icon}
                    </Button>
                ))}

                {onListToggle && (
                    <>
                        <div className="ars-toolbar-divider" />
                        <div className="ars-bullet-btn-wrapper" style={{ position: 'relative' }}>
                            <Button
                                ref={bulletBtnRef}
                                variant="ghost"
                                size="sm"
                                onClick={() => onListToggle('bullet')}
                                onContextMenu={handleBulletRightClick}
                                title={`Bullet List (Right-click to change style: ${settings.amazon_bullet_style})`}
                                className="ars-toolbar-btn ars-bullet-btn"
                            >
                                <List size={16} />
                                <span className="ars-bullet-indicator">{settings.amazon_bullet_style}</span>
                            </Button>

                            {showBulletSelector && (
                                <div
                                    ref={bulletSelectorRef}
                                    className="ars-bullet-selector"
                                >
                                    {bulletOptions.map(bullet => (
                                        <div
                                            key={bullet}
                                            className={`ars-bullet-option ${settings.amazon_bullet_style === bullet ? 'active' : ''}`}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                selectBullet(bullet);
                                            }}
                                        >
                                            {bullet}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onListToggle('number')}
                            title="Numbered List"
                            className="ars-toolbar-btn"
                        >
                            <ListOrdered size={16} />
                        </Button>
                    </>
                )}
                {showUtilities && (
                    <>
                        <div className="ars-toolbar-divider" />
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClearStyles}
                            title="Clear All Styling"
                            className="ars-toolbar-btn hover:bg-red-50"
                        >
                            <Eraser size={16} />
                        </Button>
                    </>
                )}
            </div>

            {showUtilities && (
                <>
                    <div className="ars-toolbar-group">
                        <div style={{ position: 'relative' }}>
                            <Button
                                ref={templateBtnRef}
                                variant={showTemplatePopover ? 'primary' : 'ghost'}
                                size="sm"
                                onClick={() => setShowTemplatePopover(!showTemplatePopover)}
                                title="Templates"
                                className="ars-toolbar-btn"
                            >
                                <Layout size={16} />
                            </Button>

                            {showTemplatePopover && (
                                <div ref={templatePopoverRef} className="ars-phrase-popover">
                                    <TemplateSelector
                                        onInsert={onInsert}
                                        onManage={() => setShowTemplateManager(true)}
                                        onClose={() => setShowTemplatePopover(false)}
                                        currentBody={currentValue}
                                    />
                                </div>
                            )}
                        </div>

                        <div style={{ position: 'relative' }}>
                            <Button
                                ref={phraseBtnRef}
                                variant={showPhrases ? 'primary' : 'ghost'}
                                size="sm"
                                onClick={() => setShowPhrases(!showPhrases)}
                                title="Insert Phrase"
                                className="ars-toolbar-btn"
                            >
                                <MessageSquare size={16} />
                            </Button>

                            {showPhrases && (
                                <div ref={phrasePopoverRef} className="ars-phrase-popover">
                                    <PhraseManager
                                        onInsert={onInsert}
                                        onClose={() => setShowPhrases(false)}
                                    />
                                </div>
                            )}
                        </div>

                        <div style={{ position: 'relative' }}>
                            <Button
                                ref={cloudBtnRef}
                                variant={showCloudPopover ? 'primary' : 'ghost'}
                                size="sm"
                                onClick={() => setShowCloudPopover(!showCloudPopover)}
                                title="Cloud Sync"
                                className="ars-toolbar-btn"
                            >
                                <Cloud size={16} />
                            </Button>

                            {showCloudPopover && (
                                <div ref={cloudPopoverRef} className="ars-phrase-popover" style={{ width: '220px' }}>
                                    <div className="ars-popover-header" style={{ padding: '12px 16px', borderBottom: '1px solid var(--ars-color-border)', marginBottom: '4px' }}>
                                        <h3 style={{ margin: 0, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                                            <Cloud size={16} /> Cloud Sync
                                        </h3>
                                        {quota && (
                                            <div style={{
                                                fontSize: '0.7rem',
                                                fontWeight: 600,
                                                color: quota.count >= 20 ? '#dc2626' : quota.count >= 15 ? '#d97706' : '#6b7280',
                                                marginTop: '4px',
                                                marginLeft: '24px'
                                            }}>
                                                Daily Limit: {quota.count}/20
                                            </div>
                                        )}
                                    </div>
                                    <div className="ars-popover-content">
                                        {!settings.amazon_pastebin_api_user_key ? (
                                            <div className="p-3 text-sm text-gray-500 text-center">
                                                <p className="mb-2">Setup API to sync data</p>
                                                <Button variant="primary" size="sm" onClick={() => { setSettingsTab('sync'); setShowSettings(true); setShowCloudPopover(false); }}>
                                                    Open Settings
                                                </Button>
                                            </div>
                                        ) : (
                                            <>
                                                <button onClick={() => handleCloudAction('save')} className="ars-popover-item w-full text-left flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-sm transition-colors">
                                                    <Save size={14} className="text-blue-500" /> Save Review to Cloud
                                                </button>
                                                <button onClick={() => handleCloudAction('fetch')} className="ars-popover-item w-full text-left flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-sm transition-colors">
                                                    <Download size={14} className="text-green-500" /> Fetch Review from Cloud
                                                </button>
                                                <div className="my-1 border-t border-gray-100"></div>
                                                <button onClick={() => handleCloudAction('create-manual')} className="ars-popover-item w-full text-left flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-sm transition-colors">
                                                    <Clipboard size={14} className="text-gray-500" /> Create Manual Paste
                                                </button>
                                                <button onClick={() => handleCloudAction('import-manual')} className="ars-popover-item w-full text-left flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-sm transition-colors">
                                                    <Link2 size={14} className="text-gray-500" /> Import from Paste URL
                                                </button>
                                                <div className="my-1 border-t border-gray-100"></div>
                                                <button onClick={() => handleCloudAction('sync-templates')} className="ars-popover-item w-full text-left flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-sm transition-colors">
                                                    <RefreshCw size={14} className="text-orange-500" /> Sync Templates/Phrases
                                                </button>
                                                <button onClick={() => handleCloudAction('import-templates')} className="ars-popover-item w-full text-left flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-sm transition-colors">
                                                    <Layout size={14} className="text-purple-500" /> Import Templates/Phrases
                                                </button>
                                                <button onClick={() => handleCloudAction('my-pastebin')} className="ars-popover-item w-full text-left flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-sm transition-colors">
                                                    <ExternalLink size={14} className="text-gray-500" /> My Pastebin
                                                </button>
                                                <div className="my-1 border-t border-gray-100"></div>
                                                <button onClick={() => { setSettingsTab('sync'); setShowSettings(true); setShowCloudPopover(false); }} className="ars-popover-item w-full text-left flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-sm transition-colors">
                                                    <Settings size={14} className="text-gray-500" /> API Settings
                                                </button>
                                                <button onClick={() => handleCloudAction('status')} className="ars-popover-item w-full text-left flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-sm transition-colors">
                                                    <BarChart2 size={14} className="text-gray-500" /> Sync Status
                                                </button>

                                                <div className="ars-popover-item w-full flex items-center justify-between p-2 hover:bg-gray-100 rounded text-sm transition-colors cursor-pointer" onClick={handlePrivacyToggle}>
                                                    <div className="flex items-center gap-2">
                                                        <Settings size={14} className="text-blue-500" />
                                                        <span title="Encrypts review before saving">Privacy Mode {settings.amazon_pastebin_privacy_mode ? '(ON)' : '(OFF)'}</span>
                                                    </div>
                                                    <div className={`w-8 h-4 rounded-full p-0.5 transition-colors ${settings.amazon_pastebin_privacy_mode ? 'bg-blue-500' : 'bg-gray-300'}`}>
                                                        <div className={`bg-white w-3 h-3 rounded-full shadow-sm transform transition-transform ${settings.amazon_pastebin_privacy_mode ? 'translate-x-4' : 'translate-x-0'}`} />
                                                    </div>
                                                </div>

                                                <button onClick={() => handleCloudAction('clear')} className="ars-popover-item w-full text-left flex items-center gap-2 p-2 hover:bg-gray-100 rounded text-sm transition-colors text-red-500 hover:bg-red-50">
                                                    <Trash2 size={14} /> Clear Cloud Data
                                                </button>
                                            </>
                                        )}
                                        {isCloudLoading && <div className="text-xs text-center text-blue-500 py-1">Processing...</div>}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <TemplateManager
                        isOpen={showTemplateManager}
                        onClose={() => setShowTemplateManager(false)}
                        onInsert={onInsert}
                    />

                    {showSettings && (
                        <SettingsDashboard
                            isOpen={showSettings}
                            onClose={() => setShowSettings(false)}
                            initialTab={settingsTab}
                        />
                    )}
                </>
            )}
        </div>
    );
};