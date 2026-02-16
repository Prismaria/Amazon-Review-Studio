import React, { useState, useEffect } from 'react';
import { Sparkles, Settings, Send, ClipboardCheck } from 'lucide-react';
import { Button } from './common/Button';
import { Card } from './common/Card';
import { Input } from './common/Input';
import { RichEditor } from './editor/RichEditor';
import { AIModal } from './ai/AIModal';
import { SettingsDashboard } from './settings/SettingsDashboard';
export const ReviewStudio: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [productName, setProductName] = useState('');
    const [asin, setAsin] = useState<string | null>(null);

    const [isAIModalOpen, setIsAIModalOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    // Scrape product name from the host page
    useEffect(() => {
        const titleElement = document.querySelector('#productTitle, .ryp__product-title');
        if (titleElement) {
            setProductName(titleElement.textContent?.trim() || '');
        }

        const asinMatch = window.location.href.match(/[?&]asin=([A-Z0-9]{10})|\/dp\/([A-Z0-9]{10})|\/gp\/product\/([A-Z0-9]{10})/);
        const foundAsin = asinMatch ? (asinMatch[1] ?? asinMatch[2] ?? asinMatch[3]) : null;
        if (foundAsin) {
            setAsin(foundAsin);
        }
    }, []);

    const handleApplyToAmazon = () => {
        // Logic to push content into the real Amazon textarea
        const amazonTextarea = document.querySelector('textarea#reviewText') as HTMLTextAreaElement;
        const amazonTitle = document.querySelector('input#reviewTitle') as HTMLInputElement;

        if (amazonTextarea) {
            amazonTextarea.value = content;
            amazonTextarea.dispatchEvent(new Event('input', { bubbles: true }));
        }
        if (amazonTitle) {
            amazonTitle.value = title;
            amazonTitle.dispatchEvent(new Event('input', { bubbles: true }));
        }

        // Optional notification
        console.log('[Review Studio] Applied content to Amazon form.');
    };

    return (
        <div className="ars-studio-container">
            <header className="ars-studio-header">
                <div className="ars-title-group">
                    <Sparkles className="ars-logo" size={24} />
                    <h1>Review Studio</h1>
                </div>
                <div className="ars-header-actions">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsSettingsOpen(true)}
                    >
                        <Settings size={20} />
                    </Button>
                </div>
            </header>

            <main className="ars-studio-main">
                <section className="ars-form-section">
                    <Input
                        label="Review Headline"
                        placeholder="What's most important to know?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="ars-headline-input"
                    />

                    <div className="ars-editor-label-row">
                        <label>Review Body</label>
                        <Button
                            variant="outline"
                            size="sm"
                            icon={<Sparkles size={14} />}
                            onClick={() => setIsAIModalOpen(true)}
                            className="ars-ai-trigger"
                        >
                            AI Assistant
                        </Button>
                    </div>

                    <RichEditor
                        value={content}
                        onChange={setContent}
                        placeholder="Write your review here... formatting tools are available above."
                    />
                </section>

                <section className="ars-actions-section">
                    <Button
                        variant="primary"
                        size="lg"
                        className="ars-apply-btn"
                        onClick={handleApplyToAmazon}
                        icon={<ClipboardCheck size={20} />}
                    >
                        Push to Amazon
                    </Button>
                    <p className="ars-hint text-center">This will fill the review form below with your current draft.</p>
                </section>
            </main>

            {/* Modals */}
            <AIModal
                isOpen={isAIModalOpen}
                onClose={() => setIsAIModalOpen(false)}
                onInsert={(text) => setContent(prev => prev + (prev ? '\n\n' : '') + text)}
                productTitle={productName}
                asin={asin}
                starRating={undefined}
            />
            <SettingsDashboard
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
            />
        </div>
    );
};
