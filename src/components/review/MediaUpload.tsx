import React, { useEffect, useState } from 'react';
import { Camera, ClipboardPaste, X, Image, Cloud, UploadCloud, AlertTriangle } from 'lucide-react';
import { cn } from '../../utils';

export interface Thumbnail {
    src: string;
    progress?: number; // 0-100
    isUploading?: boolean;
    duration?: string; // For video duration (e.g., "0:12")
}

export interface MediaUploadProps {
    onTrigger: () => void;
    onPasteFromClipboard?: () => Promise<'ok' | 'no_image' | 'denied' | 'error'>;
    onPasteSuccess?: () => void;
    onFilesDropped?: (files: FileList) => void;
    thumbnails?: Thumbnail[];
    onRemove?: (index: number) => void;
    showPasteFeedback?: boolean;
    placeholder?: string;
    className?: string;
    validationAlert?: string | null;
}

const PreviewThumbnail: React.FC<{ thumbnail: Thumbnail; onRemove: () => void }> = ({ thumbnail, onRemove }) => (
    <div className="ars-media-thumbnail">
        <div
            className="ars-media-thumbnail-image"
            style={{ backgroundImage: `url(${thumbnail.src})` }}
        >
            {thumbnail.duration && (
                <div data-testid="in-context-ryp__media-duration-container" className="a-section in-context-ryp__media-duration-container">
                    <img alt="" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDkgMTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEgMC41OTk5OThWOS40TDcuNjMwMjcgNUwxIDAuNTk5OTk4WiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4=" data-a-hires="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSIxMCIgdmlld0JveD0iMCAwIDkgMTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zz4KICAgIDxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMSAwLjU5OTk5OFY5LjRMNy42MzAyNyA1TDEgMC41OTk5OThaIiBzdHJva2U9IndoaXRlIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPg==" />
                    <span className="in-context-ryp__media-duration-label">{thumbnail.duration}</span>
                </div>
            )}
            {thumbnail.isUploading && thumbnail.progress !== undefined && (
                <div className="ars-media-upload-progress-overlay">
                    <svg className="ars-media-upload-progress" width="40" height="40">
                        <circle
                            id="ryp__progress-bar__bottom-circle"
                            stroke="#000000"
                            cx="20"
                            cy="20"
                            r="15"
                            strokeWidth="10"
                            fillOpacity="0"
                            strokeOpacity="0.5"
                        ></circle>
                        <circle
                            id="ryp__progress-bar__upper-circle"
                            stroke="#dbdbdb"
                            cx="20"
                            cy="20"
                            r="15"
                            strokeWidth="10"
                            fillOpacity="0"
                            strokeDasharray="94.24777960769379"
                            strokeDashoffset={94.24777960769379 * (1 - (thumbnail.progress || 0) / 100)}
                            transform="rotate(-90 20 20)"
                            className="ryp__progress-bar__animated-transition"
                        ></circle>
                    </svg>
                    <span className="ars-media-upload-progress-text">{Math.round(thumbnail.progress)}%</span>
                </div>
            )}
        </div>
        <button
            type="button"
            className="ars-media-thumbnail-remove ars-tooltip"
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            data-tooltip="Remove media"
        >
            <X size={14} />
        </button>
        {thumbnail.isUploading && thumbnail.progress !== undefined && (
            <div className="ars-media-upload-progress-overlay">
                <svg className="ars-media-upload-progress" width="40" height="40">
                    <circle
                        id="ryp__progress-bar__bottom-circle"
                        stroke="#000000"
                        cx="20"
                        cy="20"
                        r="15"
                        strokeWidth="10"
                        fillOpacity="0"
                        strokeOpacity="0.5"
                    ></circle>
                    <circle
                        id="ryp__progress-bar__upper-circle"
                        stroke="#dbdbdb"
                        cx="20"
                        cy="20"
                        r="15"
                        strokeWidth="10"
                        fillOpacity="0"
                        strokeDasharray="94.24777960769379"
                        strokeDashoffset={94.24777960769379 * (1 - (thumbnail.progress || 0) / 100)}
                        transform="rotate(-90 20 20)"
                        className="ryp__progress-bar__animated-transition"
                    ></circle>
                </svg>
                <span className="ars-media-upload-progress-text">{Math.round(thumbnail.progress)}%</span>
            </div>
        )}
    </div>
);

export const MediaUpload: React.FC<MediaUploadProps> = ({
    onTrigger,
    onPasteFromClipboard,
    onPasteSuccess,
    onFilesDropped,
    thumbnails = [],
    onRemove,
    showPasteFeedback = false,
    placeholder = 'Drag-and-drop or Crtl+V your images here!',
    className,
    validationAlert,
}) => {
    const [showValidationAlert, setShowValidationAlert] = useState(true);

    useEffect(() => {
        // Reset showValidationAlert when validationAlert changes
        setShowValidationAlert(true);
    }, [validationAlert]);

    const [isDragging, setIsDragging] = React.useState(false);

    const handleClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('.ars-media-upload-paste-btn')) return;
        onTrigger();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if ((e.target as HTMLElement).closest('.ars-media-upload-paste-btn')) return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onTrigger();
        }
    };

    const handlePasteClick = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!onPasteFromClipboard) return;
        try {
            const result = await onPasteFromClipboard();
            if (result === 'ok') {
                onPasteSuccess?.();
            } else if (result === 'no_image') {
                window.alert('No image found in clipboard! Please copy an image first.');
            } else if (result === 'denied') {
                window.alert('Clipboard access denied. Please grant clipboard permissions and try again.');
            } else if (result === 'error') {
                window.alert('Clipboard access failed. Please try using Ctrl+V to paste the image.');
            }
        } catch (err) {
            console.error('Paste from clipboard error:', err);
            window.alert('Error processing clipboard image. Please try copying the image again.');
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0 && onFilesDropped) {
            onFilesDropped(files);
        }
    };

    return (
        <div className="ars-media-upload-wrapper">
            <div className="ars-media-thumbnails">
                {thumbnails.map((thumbnail, i) => (
                    <PreviewThumbnail
                        key={`${thumbnail.src}-${i}`}
                        thumbnail={thumbnail}
                        onRemove={() => onRemove?.(i)}
                    />
                ))}

                <div
                    className={cn(
                        'ars-media-upload',
                        thumbnails.length > 0 && 'ars-media-upload--compact',
                        showPasteFeedback && 'ars-media-upload--uploading',
                        isDragging && 'ars-media-upload--dragging',
                        className
                    )}
                    role="button"
                    tabIndex={0}
                    onClick={handleClick}
                    onKeyDown={handleKeyDown}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    aria-label="Share a video or photo"
                >
                    {showPasteFeedback ? (
                        <div className="ars-media-upload-feedback">
                            {thumbnails.length > 0 ? '...' : 'Image pasted! Uploading...'}
                        </div>
                    ) : (
                        <div className="ars-media-upload-content">
                            {isDragging ? (
                                <div className="ars-media-upload-dragging-content">
                                    <Camera size={thumbnails.length > 0 ? 24 : 32} className="ars-media-upload-icon animate-bounce" />
                                    {thumbnails.length === 0 && (
                                        <span className="ars-media-upload-placeholder font-bold">Drop files to upload</span>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <Camera size={thumbnails.length > 0 ? 24 : 32} className="ars-media-upload-icon" />
                                    {thumbnails.length === 0 && (
                                        <span className="ars-media-upload-placeholder">{placeholder}</span>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {showValidationAlert && validationAlert && (
                <div className="ars-media-upload-validation-alert">
                    <div className="a-box a-alert-inline a-alert-inline-error in-context-ryp-validation-alert a-spacing-top-medium">
                        <div className="a-box-inner a-alert-container">
                            <i className="a-icon a-icon-alert"></i>
                            <div className="a-alert-content">
                                <span className="a-size-base">{validationAlert}</span>
                            </div>
                            <button className="ars-alert-dismiss-btn" onClick={() => setShowValidationAlert(false)}>
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="ars-media-upload-actions">
                {onPasteFromClipboard && (
                    <button
                        type="button"
                        className="ars-media-upload-action-btn ars-media-upload-paste-btn"
                        onClick={handlePasteClick}
                    >
                        <ClipboardPaste size={18} />
                        Paste from Clipboard...
                    </button>
                )}
                <a
                    href="https://photos.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ars-media-upload-action-btn ars-media-upload-google-btn"
                >
                    <Image size={18} />
                    Google Photos
                </a>
                <a
                    href="https://www.icloud.com/photos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ars-media-upload-action-btn ars-media-upload-icloud-btn"
                >
                    <Cloud size={18} />
                    iCloud Photos
                </a>
            </div>
        </div>
    );
};
