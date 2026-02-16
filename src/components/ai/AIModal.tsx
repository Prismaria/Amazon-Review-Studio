import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, Send, Copy, Check, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';
import { aiService } from '../../services/ai';
import { textFormattingService } from '../../services/textFormatting';
import { useSettings } from '../../hooks/useSettings';
import { fetchProductContext } from '../../pages/ReviewPurchases/services/productDetailsFetcher';
import { getUploadedImages } from '../../utils/imageExtractor';
import { Image as ImageIcon, Loader2 } from 'lucide-react';

export interface AIModalProps {
    isOpen: boolean;
    onClose: () => void;
    onInsert: (text: string) => void;
    productTitle?: string;
    asin?: string | null;
    starRating?: number;
    existingReviewText?: string;
}

export const AIModal: React.FC<AIModalProps> = ({ isOpen, onClose, onInsert, productTitle = "", asin, starRating, existingReviewText = "" }) => {
    const { settings, setSetting } = useSettings();
    const [userThoughts, setUserThoughts] = useState('');
    const [useExistingReview, setUseExistingReview] = useState(false);
    const [reviewLength, setReviewLength] = useState<'short' | 'normal' | 'long' | 'detailed'>('normal');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedText, setGeneratedText] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Data states
    const [productContext, setProductContext] = useState<{ description?: string, reviews?: string[] } | null>(null);
    const [contextFetched, setContextFetched] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [includeImages, setIncludeImages] = useState(settings.amazon_ai_include_images_default);
    const [visionStatus, setVisionStatus] = useState<string | null>(null);

    // Fetch product context
    useEffect(() => {
        if (isOpen && asin && !contextFetched) {
            const fetchContext = async () => {
                try {
                    const details = await fetchProductContext(asin);
                    setProductContext({
                        description: details.description,
                        reviews: details.reviews
                    });
                } catch (e) {
                    console.error('Failed to fetch product context:', e);
                } finally {
                    setContextFetched(true);
                }
            };
            fetchContext();
        }
    }, [isOpen, asin, contextFetched]);

    // Reset context fetched state when modal closes or asin changes
    useEffect(() => {
        if (!isOpen) {
            // Optional reset
        }
    }, [isOpen]);

    // If asin changes, allow refetch
    useEffect(() => {
        setContextFetched(false);
        setProductContext(null);
    }, [asin]);

    // Construct the final prompt dynamically
    const finalPrompt = useMemo(() => {
        let lengthInstruction = '';
        let markdownInstruction = '';

        switch (reviewLength) {
            case 'short':
                lengthInstruction = 'Keep it concise and to the point (approx 100 words).';
                break;
            case 'normal':
                lengthInstruction = 'Write a standard length review (approx 250 words).';
                break;
            case 'long':
                lengthInstruction = 'Write a comprehensive review (approx 500 words).';
                markdownInstruction = `
Formatting Instructions:
- Use Markdown for formatting.
- Use # for the main title.
- Use ## for section headers.
- Use **bold** for emphasis.
- Use *italics* for subtle emphasis.
- Use - or * for bullet points.`;
                break;
            case 'detailed':
                lengthInstruction = 'Write an extensive, in-depth review (approx 750+ words).';
                markdownInstruction = `
Formatting Instructions:
- Use Markdown for formatting.
- Use # for the main title.
- Use ## for section headers.
- Use **bold** for emphasis.
- Use *italics* for subtle emphasis.
- Use - or * for bullet points.`;
                break;
        }

        let p = `Write a helpful product review for: ${productTitle || 'this product'}.
        
IMPORTANT: Output ONLY the review content. Do not include any introductory or concluding remarks like "Here is a review" or "I hope this helps". Start directly with the review title or body.

${lengthInstruction}
${markdownInstruction}`;

        if (productContext?.description) {
            const desc = productContext.description.slice(0, 500) + (productContext.description.length > 500 ? '...' : '');
            p += `\n\n[Product Description]\n${desc}`;
        }

        if (productContext?.reviews && productContext.reviews.length > 0) {
            p += `\n\n[Top Reviews Summary]\n${productContext.reviews.map(r => '- ' + r.slice(0, 150) + '...').join('\n')}`;
        }

        if (starRating && starRating > 0) {
            p += `\n\nThe user has rated this product ${starRating} out of 5 stars.`;
        }

        const currentThoughts = useExistingReview ? existingReviewText : userThoughts;

        if (currentThoughts.trim()) {
            p += `\n\nUser's Initial Thoughts / Specific Points to Cover:\n${currentThoughts}`;
        }

        return p;
    }, [productTitle, productContext, starRating, userThoughts, existingReviewText, useExistingReview, reviewLength]);

    const handleGenerate = async () => {
        setIsGenerating(true);
        setError(null);
        setVisionStatus(null);

        try {
            let images: string[] = [];
            if (includeImages) {
                setVisionStatus('Extracting and compressing images...');
                images = await getUploadedImages();
                if (images.length > 0) {
                    setVisionStatus(`Analyzed ${images.length} image(s) for context.`);
                } else {
                    setVisionStatus('No images found to analyze.');
                }
            }

            const response = await aiService.generateReview(finalPrompt, images);
            if (!response.error) {
                // Convert Markdown to Unicode if setting is enabled OR if requested via length
                const shouldConvert = settings.amazon_ai_convert_markdown;

                const finalText = shouldConvert
                    ? textFormattingService.convertMarkdownToUnicode(response.text)
                    : response.text;

                setGeneratedText(finalText);
            } else {
                setError(response.error || "Failed to generate review");
            }
        } catch (err) {
            setError("An unexpected error occurred");
            console.error(err);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleInsert = () => {
        onInsert(generatedText);
        onClose();
    };

    const footer = (
        <>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button
                variant="primary"
                onClick={handleInsert}
                disabled={!generatedText || isGenerating}
            >
                <Copy size={16} style={{ marginRight: 8 }} />
                Insert into Review
            </Button>
        </>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="AI Review Assistant"
            width="700px"
            footer={footer}
        >
            <div className="ars-ai-modal-body">
                <div className="ars-ai-settings-compact">
                    <Card padding="sm" className="ars-ai-provider-card">
                        <span className="ars-label">Provider:</span>
                        <select
                            value={settings.amazon_ai_provider}
                            onChange={(e) => setSetting('amazon_ai_provider', e.target.value as any)}
                            className="ars-select"
                        >
                            <option value="gemini">Google Gemini</option>
                            <option value="local">Local LLM (LM Studio/Ollama)</option>
                        </select>
                    </Card>

                    <Card padding="sm" className="ars-ai-length-card">
                        <span className="ars-label">Length:</span>
                        <div className="ars-ai-length-selector">
                            {(['short', 'normal', 'long', 'detailed'] as const).map((len) => (
                                <button
                                    key={len}
                                    className={`ars-ai-length-btn ${reviewLength === len ? 'active' : ''}`}
                                    onClick={() => setReviewLength(len)}
                                    title={`${len.charAt(0).toUpperCase() + len.slice(1)} Review`}
                                >
                                    {len.charAt(0).toUpperCase() + len.slice(1)}
                                </button>
                            ))}
                        </div>
                    </Card>

                    <Card padding="sm" className="ars-ai-vision-card">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={includeImages}
                                onChange={(e) => setIncludeImages(e.target.checked)}
                                className="ars-checkbox"
                            />
                            <span className="ars-label mb-0 flex items-center gap-1">
                                <ImageIcon size={14} />
                                Include Images
                            </span>
                        </label>
                    </Card>
                </div>

                <div className="ars-ai-prompt-section">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-3">
                            <label className="ars-label mb-0">Your Initial Thoughts (Required - 300+ chars):</label>
                            {existingReviewText.length >= 300 && (
                                <label className="flex items-center gap-1 text-xs cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={useExistingReview}
                                        onChange={(e) => setUseExistingReview(e.target.checked)}
                                        className="ars-checkbox"
                                    />
                                    <span style={{ color: useExistingReview ? 'var(--ars-color-primary)' : 'inherit' }}>
                                        Use existing review content
                                    </span>
                                </label>
                            )}
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPreview(!showPreview)}
                            className="text-xs h-6 px-2"
                            icon={showPreview ? <EyeOff size={12} /> : <Eye size={12} />}
                        >
                            {showPreview ? 'Hide Full Prompt' : 'Preview Full Prompt'}
                        </Button>
                    </div>

                    <div style={{ position: 'relative' }}>
                        <textarea
                            className="ars-ai-prompt-input"
                            placeholder="Enter your opinion, pros/cons, or specific points you want the AI to cover (min. 300 characters)..."
                            value={useExistingReview ? existingReviewText : userThoughts}
                            onChange={(e) => !useExistingReview && setUserThoughts(e.target.value)}
                            style={{
                                minHeight: '120px',
                                opacity: useExistingReview ? 0.6 : 1,
                                cursor: useExistingReview ? 'not-allowed' : 'text',
                                backgroundColor: useExistingReview ? '#f9fafb' : 'white'
                            }}
                            disabled={useExistingReview}
                        />
                        {!useExistingReview && userThoughts.length > 0 && userThoughts.length < 300 && (
                            <div className="absolute bottom-2 right-3 text-[10px] text-red-500 font-medium">
                                {userThoughts.length} / 300
                            </div>
                        )}
                        {!useExistingReview && userThoughts.length >= 300 && (
                            <div className="absolute bottom-2 right-3 text-[10px] text-green-500 font-medium">
                                {userThoughts.length} characters
                            </div>
                        )}
                    </div>

                    {showPreview && (
                        <div className="ars-ai-prompt-preview mt-2 p-3 bg-gray-50 border rounded text-xs font-mono text-gray-600 overflow-y-auto max-h-40 whitespace-pre-wrap">
                            {finalPrompt}
                        </div>
                    )}

                    <Button
                        className="ars-generate-btn mt-3"
                        onClick={handleGenerate}
                        isLoading={isGenerating}
                        disabled={isGenerating || (useExistingReview ? existingReviewText.length < 300 : userThoughts.length < 300)}
                        icon={<Sparkles size={18} />}
                    >
                        Generate Review
                    </Button>

                    {visionStatus && (
                        <div className="ars-ai-vision-status mt-2 text-xs text-blue-600 flex items-center gap-1">
                            {isGenerating && includeImages && visionStatus.includes('Extracting') ? (
                                <Loader2 size={12} className="animate-spin" />
                            ) : (
                                <ImageIcon size={12} />
                            )}
                            {visionStatus}
                        </div>
                    )}
                </div>

                {error && (
                    <div className="ars-ai-error">
                        {error}
                    </div>
                )}

                <div className="ars-ai-result-section">
                    <label className="ars-label">Generated Review:</label>
                    <div className="ars-ai-result-container">
                        {generatedText ? (
                            <p className="ars-ai-result-text">{generatedText}</p>
                        ) : (
                            <div className="ars-ai-placeholder">
                                Your generated review will appear here...
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
};
