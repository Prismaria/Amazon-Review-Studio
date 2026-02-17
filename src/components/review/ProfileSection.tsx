import React from 'react';
import { cn } from '../../utils';
import { useSettings } from '../../hooks/useSettings';

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
    const { settings } = useSettings();

    const displayAvatar = settings.demo_enabled && settings.demo_pfp_url ? settings.demo_pfp_url : avatarSrc;
    const displayName = settings.demo_enabled && settings.demo_name ? settings.demo_name : name;

    return (
        <div className={cn('ars-profile-section', className)}>
            <div className="ars-profile-container">
                <div className="ars-profile-info">
                    <div className="ars-profile-avatar-wrapper">
                        <a href="/gp/profile" className="ars-profile-avatar" target="_blank" rel="noopener noreferrer">
                            {displayAvatar ? (
                                <img src={displayAvatar} alt="" />
                            ) : (
                                <span className="ars-profile-avatar-placeholder">
                                    {displayName.charAt(0).toUpperCase() || '?'}
                                </span>
                            )}
                        </a>
                    </div>
                    <span className="ars-profile-name">{displayName}</span>
                </div>
            </div>
        </div>
    );
};
