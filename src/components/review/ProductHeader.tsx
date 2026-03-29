import React from 'react';
import { cn } from '../../utils';

export interface ProductHeaderProps {
    imageSrc: string;
    title: string;
    name: string;
    productUrl?: string;
    purchaseDate?: string;
    className?: string;
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({
    imageSrc,
    title,
    name,
    productUrl,
    className,
    purchaseDate,
}) => {
    const imageNode = imageSrc ? (
        <img
            className="ars-product-image"
            src={imageSrc}
            alt=""
            width={64}
            height={64}
        />
    ) : null;

    return (
        <div className={cn('ars-product-header', className)}>
            {imageNode && (productUrl ? (
                <a href={productUrl} target="_blank" rel="noopener noreferrer" className="ars-product-image-link">
                    {imageNode}
                </a>
            ) : (
                imageNode
            ))}
            <div className="ars-product-info">
                <div className="ars-product-title-row">
                    <span className="ars-product-title">{title}</span>
                    {purchaseDate && (
                        <span className="ars-purchase-badge">
                            Purchased: {purchaseDate}
                        </span>
                    )}
                </div>
                <span className="ars-product-name">{name}</span>
            </div>
        </div>
    );
};
