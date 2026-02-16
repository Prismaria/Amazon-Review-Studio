import React from 'react';
import { cn } from '../../utils';

export interface ProfileSectionProps {
    avatarSrc: string;
    name: string;
    className?: string;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
    avatarSrc,
    name,
    className,
}) => {
    return (
        <div className={cn('ars-profile-section', className)}>
            <div className="ars-profile-container">
                <div className="ars-profile-info">
                    <div className="ars-profile-avatar-wrapper">
                        <a href="/gp/profile" className="ars-profile-avatar" target="_blank" rel="noopener noreferrer">
                            {avatarSrc ? (
                                <img src={avatarSrc} alt="" />
                            ) : (
                                <span className="ars-profile-avatar-placeholder">
                                    {name.charAt(0).toUpperCase() || '?'}
                                </span>
                            )}
                        </a>
                    </div>
                    <span className="ars-profile-name">{name}</span>
                </div>
            </div>
        </div>
    );
};
