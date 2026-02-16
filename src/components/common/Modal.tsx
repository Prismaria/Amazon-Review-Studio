import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './Button';
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    width?: string | number;
    footer?: React.ReactNode;
}

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0 }
};

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    width = '600px',
    footer
}) => {
    // Handle ESC key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
        }
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="ars-modal-overlay-container">
                    {/* Backdrop */}
                    <motion.div
                        className="ars-modal-backdrop"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                    />

                    {/* Modal Container */}
                    <div className="ars-modal-wrapper">
                        <motion.div
                            className="ars-modal"
                            style={{ width, maxWidth: '90vw' }}
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            role="dialog"
                            aria-modal="true"
                        >
                            <div className="ars-modal-header">
                                {title && <h2 className="ars-modal-title">{title}</h2>}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={onClose}
                                    className="ars-modal-close"
                                    aria-label="Close modal"
                                >
                                    <X size={20} />
                                </Button>
                            </div>

                            <div className="ars-modal-content">
                                {children}
                            </div>

                            {footer && (
                                <div className="ars-modal-footer">
                                    {footer}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};
