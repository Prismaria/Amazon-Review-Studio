import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Settings, Send } from 'lucide-react';
import { useAmazonForm } from '../../hooks/useAmazonForm';
import { ProfileSection } from './ProfileSection';
import { ProductHeader } from './ProductHeader';
import { StarRating } from './StarRating';
import { MediaUpload } from './MediaUpload';
import { RichEditor } from '../editor/RichEditor';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { AIModal } from '../ai/AIModal';
import { SettingsDashboard } from '../settings/SettingsDashboard';
import { Check, Cloud, Loader2, AlertCircle } from 'lucide-react';
import { SyncStatus } from '../../hooks/useAmazonForm';
import { useSettings } from '../../hooks/useSettings';
import { Moon } from 'lucide-react';
import { aiService } from '../../services/ai';

const SaveIndicator: React.FC<{ status: SyncStatus }> = ({ status }) => {
    if (status === 'idle') return null;

    const config = {
        saving: { icon: <Loader2 size={12} className="animate-spin" />, text: 'Saving draft...', color: 'text-gray-500' },
        saved: { icon: <Check size={12} />, text: 'Draft saved', color: 'text-green-600' },
        error: { icon: <AlertCircle size={12} />, text: 'Save failed', color: 'text-red-500' },
    }[status];

    if (!config) return null;

    return (
        <div className={`ars-save-indicator flex items-center gap-1.5 text-xs font-medium transition-opacity duration-300 ${config.color}`}>
            {config.icon}
            <span>{config.text}</span>
        </div>
    );
};
export const ReviewFormShell: React.FC = () => {
    const amazon = useAmazonForm();
    const { settings, setSetting } = useSettings();
    const [isAIModalOpen, setIsAIModalOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [showPasteFeedback, setShowPasteFeedback] = useState(false);

    useEffect(() => {
        const styleId = 'ars-lights-off-global';
        if (settings.amazon_ui_lights_off) {
            if (!document.getElementById(styleId)) {
                const styleEl = document.createElement('style');
                styleEl.id = styleId;
                styleEl.textContent = `
                    #amazon-review-studio-root {
                        position: relative !important;
                        z-index: 1000000 !important;
                    }
                    #navbar-main {
                        position: relative !important;
                        z-index: 1000001 !important;
                        pointer-events: auto !important;
                    }
                    body::after {
                        content: '';
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.85);
                        z-index: 999999;
                        pointer-events: none;
                        transition: opacity 0.4s ease;
                        animation: ars-fade-in 0.4s ease forwards;
                    }
                    @keyframes ars-fade-in {
                        from { opacity: 0; }
                        to { opacity: 1; }
                    }
                `;
                document.head.appendChild(styleEl);
            }
        } else {
            const el = document.getElementById(styleId);
            if (el) el.remove();
        }
        return () => {
            const el = document.getElementById(styleId);
            if (el) el.remove();
        };
    }, [settings.amazon_ui_lights_off]);

    useEffect(() => {
        if (!showPasteFeedback) return;
        const t = setTimeout(() => setShowPasteFeedback(false), 2000);
        return () => clearTimeout(t);
    }, [showPasteFeedback]);

    const handlePasteSuccess = () => setShowPasteFeedback(true);

    const globalPasteRef = useRef<(e: ClipboardEvent) => void | null>(null);
    globalPasteRef.current = (e: ClipboardEvent) => {
        const el = document.activeElement as HTMLElement | null;
        const isInput = el?.tagName === 'INPUT' || el?.tagName === 'TEXTAREA' || el?.isContentEditable;
        if (isInput) return;
        const hasImage = Array.from(e.clipboardData?.items ?? []).some((item) => item.type.startsWith('image/'));
        if (!hasImage) return;
        e.preventDefault();
        amazon.pasteImageFromClipboard(e).then((result) => {
            if (result === 'ok') setShowPasteFeedback(true);
        });
    };

    useEffect(() => {
        const handler = (e: ClipboardEvent) => globalPasteRef.current?.(e);
        document.addEventListener('paste', handler, true);
        return () => document.removeEventListener('paste', handler, true);
    }, []);

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (amazon.state.reviewText.trim().length > 0) {
                e.preventDefault();
                e.returnValue = ''; // Standard way to trigger the browser's confirmation dialog
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [amazon.state.reviewText]);

    const handleInsertAI = (text: string) => {
        const prev = amazon.state.reviewText;
        amazon.setReviewText(prev + (prev ? '\n\n' : '') + text);
    };

    const [isGeneratingTitle, setIsGeneratingTitle] = useState(false);
    const handleGenerateTitle = async () => {
        const reviewText = amazon.state.reviewText.trim();
        if (!reviewText) {
            alert('Please write some review content first before generating a title.');
            return;
        }

        setIsGeneratingTitle(true);
        try {
            const response = await aiService.generateTitle(
                reviewText,
                amazon.product.name,
                amazon.state.starRating
            );
            if (response.text && !response.error) {
                amazon.setReviewTitle(response.text.trim());
            } else if (response.error) {
                alert(`Title Generation Error: ${response.error}`);
            }
        } catch (err) {
            console.error('Title Generation Error:', err);
        } finally {
            setIsGeneratingTitle(false);
        }
    };

    if (!amazon.isReady) {
        return (
            <div className="ars-review-shell ars-review-shell--loading" key="loading">
                <p>Loading review form...</p>
            </div>
        );
    }

    return (
        <div className="ars-review-shell" key="ready">
            {/* Profile section */}
            <ProfileSection
                avatarSrc={amazon.profile.avatarSrc}
                name={amazon.profile.name}
            />

            {/* Product section */}
            <form className="ars-review-form-container" autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                {/* Autofill Honeypot */}
                <input type="text" style={{ display: 'none' }} tabIndex={-1} aria-hidden="true" value="" readOnly autoComplete="false" />

                <ProductHeader
                    imageSrc={amazon.product.imageSrc}
                    title={amazon.product.title}
                    name={amazon.product.name}
                    productUrl={amazon.product.productUrl || undefined}
                />

                {/* Form fields */}
                <div className="ars-review-form-fields">
                    {/* Star rating */}
                    <div className="ars-form-field">
                        <StarRating
                            value={amazon.state.starRating}
                            onChange={amazon.setStarRating}
                        />
                    </div>

                    {/* Review text */}
                    <div className="ars-form-field">
                        <div className="ars-form-field-label-row">
                            <div className="flex items-center gap-3">
                                <label className="ars-form-label">Write a review</label>
                                <SaveIndicator status={amazon.syncStatus} />
                            </div>
                            {settings.amazon_ai_enabled && (
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setIsAIModalOpen(true)}
                                    className="ars-ai-trigger"
                                >
                                    <Sparkles size={14} />
                                    AI Assistant
                                </Button>
                            )}
                        </div>
                        <RichEditor
                            value={amazon.state.reviewText}
                            onChange={amazon.setReviewText}
                            placeholder="What should other customers know?"
                            autoResize={settings.amazon_editor_auto_resize}
                            onAutoResizeChange={(enabled) => setSetting('amazon_editor_auto_resize', enabled)}
                        />
                    </div>

                    {/* Media upload */}
                    <div className="ars-form-field">
                        <label className="ars-form-label">Share a video or photo</label>
                        <MediaUpload
                            onTrigger={amazon.triggerMediaUpload}
                            onPasteFromClipboard={amazon.pasteImageFromClipboard}
                            onPasteSuccess={handlePasteSuccess}
                            onFilesDropped={amazon.setMediaFiles}
                            thumbnails={amazon.state.mediaThumbnails}
                            onRemove={amazon.removeMedia}
                            showPasteFeedback={showPasteFeedback}
                            placeholder="Drag-and-drop or Crtl+V your images here!"
                        />
                    </div>

                    {/* Review title */}
                    <div className="ars-form-field">
                        <Input
                            label="Title your review (required)"
                            placeholder="What's most important to know?"
                            value={amazon.state.reviewTitle}
                            onChange={(e) => amazon.setReviewTitle(e.target.value)}
                            name="ars-review-title"
                            autoComplete="off-title"
                            spellCheck={false}
                            autoCorrect="off"
                            autoCapitalize="off"
                            suffix={settings.amazon_ai_enabled && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleGenerateTitle();
                                    }}
                                    style={{ pointerEvents: 'auto', background: 'white' }}
                                    isLoading={isGeneratingTitle}
                                    className="ars-ai-trigger"
                                    title="Generate title from review body"
                                >
                                    {!isGeneratingTitle && <Sparkles size={14} />}
                                </Button>
                            )}
                        />
                    </div>
                </div>
            </form>

            {/* Footer Actions */}
            <div className="ars-review-submit">
                <div className="flex items-center gap-4">
                    {amazon.lastSaved && (
                        <div className="text-xs text-gray-500 font-medium">
                            Draft saved {amazon.lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    )}
                </div>

                <div className="ars-submit-group">
                    <SaveIndicator status={amazon.syncStatus} />
                    <Button
                        variant="outline"
                        size="md"
                        onClick={() => {
                            const hasContent = amazon.state.reviewText.trim().length > 0;
                            if (hasContent) {
                                if (window.confirm("You have unsaved changes in your review. Are you sure you want to go back?")) {
                                    window.location.href = "https://www.amazon.ca/review/review-your-purchases/listing";
                                }
                            } else {
                                window.location.href = "https://www.amazon.ca/review/review-your-purchases/listing";
                            }
                        }}
                        className="ars-back-button"
                        icon={
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                        }
                    >
                        Back
                    </Button>
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={amazon.submit}
                        icon={<Send size={20} />}
                        type="button"
                    >
                        Submit
                    </Button>
                </div>
            </div>

            <AIModal
                isOpen={isAIModalOpen}
                onClose={() => setIsAIModalOpen(false)}
                onInsert={handleInsertAI}
                productTitle={amazon.product.name}
                asin={amazon.product.asin}
                starRating={amazon.state.starRating}
            />
            <SettingsDashboard
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />

            {/* Footer Actions / Corner Controls */}
            <div className="ars-header-actions">
                <button
                    type="button"
                    className={`ars-action-button ${settings.amazon_ui_lights_off ? 'active' : ''}`}
                    onClick={() => setSetting('amazon_ui_lights_off', !settings.amazon_ui_lights_off)}
                    aria-label="Lights Off"
                    title="Lights Off"
                >
                    <Moon size={18} />
                </button>
                <button
                    type="button"
                    className="ars-action-button"
                    onClick={() => setIsSettingsOpen(true)}
                    aria-label="Settings"
                >
                    <Settings size={18} />
                </button>
            </div>
        </div >
    );
};
