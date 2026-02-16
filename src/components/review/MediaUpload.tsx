import React from 'react';
import { Camera, ClipboardPaste, X, Image, Cloud } from 'lucide-react';
import { cn } from '../../utils';

export interface MediaUploadProps {
    onTrigger: () => void;
    onPasteFromClipboard?: () => Promise<'ok' | 'no_image' | 'denied' | 'error'>;
    onPasteSuccess?: () => void;
    onFilesDropped?: (files: FileList) => void;
    thumbnails?: string[];
    onRemove?: (index: number) => void;
    showPasteFeedback?: boolean;
    placeholder?: string;
    className?: string;
}

const PreviewThumbnail: React.FC<{ src: string; onRemove: () => void }> = ({ src, onRemove }) => (
    <div className="ars-media-thumbnail">
        <div
            className="ars-media-thumbnail-image"
            style={{ backgroundImage: `url(${src})` }}
        />
        <button
            type="button"
            className="ars-media-thumbnail-remove"
            onClick={(e) => { e.stopPropagation(); onRemove(); }}
            title="Remove media"
        >
            <X size={14} />
        </button>
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
}) => {
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
                {thumbnails.map((src, i) => (
                    <PreviewThumbnail
                        key={`${src}-${i}`}
                        src={src}
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
            <div className="ars-media-upload-actions">
                {onPasteFromClipboard && (
                    <button
                        type="button"
                        className="ars-media-upload-action-btn ars-media-upload-paste-btn"
                        onClick={handlePasteClick}
                        title="Paste image from clipboard"
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
                    title="Open Google Photos"
                >
                    <Image size={18} />
                    Google Photos
                </a>
                <a
                    href="https://www.icloud.com/photos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ars-media-upload-action-btn ars-media-upload-icloud-btn"
                    title="Open iCloud Photos"
                >
                    <Cloud size={18} />
                    iCloud Photos
                </a>
            </div>
        </div>
    );
};
