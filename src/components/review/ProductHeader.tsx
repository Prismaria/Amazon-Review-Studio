import React from 'react';
import { cn } from '../../utils';

export interface ProductHeaderProps {
    imageSrc: string;
    title: string;
    name: string;
    productUrl?: string;
    className?: string;
}

export const ProductHeader: React.FC<ProductHeaderProps> = ({
    imageSrc,
    title,
    name,
    productUrl,
    className,
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
                <span className="ars-product-title">{title}</span>
                <span className="ars-product-name">{name}</span>
            </div>
        </div>
    );
};
