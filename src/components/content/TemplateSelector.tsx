import React, { useState } from 'react';
import { Layout, FileText, Plus, Settings, Save, RefreshCw, Check } from 'lucide-react';
import { Button } from '../common/Button';
import { useContent, Template } from '../../hooks/useContent';
import { usePastebin } from '../../hooks/usePastebin';

interface TemplateSelectorProps {
    onInsert: (content: string) => void;
    onManage: () => void;
    onClose: () => void;
    currentBody: string;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
    onInsert,
    onManage,
    onClose,
    currentBody
}) => {
    const { templates, addTemplate } = useContent();
    const { syncTemplatesToCloud } = usePastebin();
    const [isSaving, setIsSaving] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [syncState, setSyncState] = useState<'idle' | 'syncing' | 'synced'>('idle');

    const handleSync = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (syncState === 'syncing') return;

        setSyncState('syncing');
        const result = await syncTemplatesToCloud();
        
        if (result.success) {
            setSyncState('synced');
            // State will naturally reset when the popover closes/unmounts
        } else {
            setSyncState('idle'); // Or error state if we had one
            alert(result.message);
        }
    };

    const handleSaveAsTemplate = () => {
        if (!currentBody.trim()) {
            alert('Review body is empty. Type something first!');
            return;
        }
        setIsSaving(true);
    };

    const confirmSave = () => {
        if (!newTitle.trim()) return;

        addTemplate({
            title: newTitle.trim(),
            content: currentBody
        });

        setNewTitle('');
        setIsSaving(false);
    };

    return (
        <div className="ars-template-selector" style={{ width: '300px', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Layout size={16} /> Templates
                </h3>
                
                {/* Sync Pill Badge */}
                <div 
                    onClick={handleSync}
                    className={`
                        flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-semibold cursor-pointer transition-all border
                        ${syncState === 'synced' 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                        }
                    `}
                    title="Sync Templates to Cloud"
                >
                    {syncState === 'syncing' ? (
                        <RefreshCw size={10} className="animate-spin text-orange-500" />
                    ) : syncState === 'synced' ? (
                        <Check size={10} className="text-green-600" />
                    ) : (
                        <RefreshCw size={10} />
                    )}
                    
                    <span>
                        {syncState === 'syncing' ? 'Syncing...' : syncState === 'synced' ? 'Synced' : 'Sync'}
                    </span>
                </div>
            </div>

            <div className="ars-template-list" style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                {templates.map(t => (
                    <div
                        key={t.id}
                        className="ars-template-item"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0.625rem',
                            backgroundColor: 'var(--ars-color-bg-secondary)',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease'
                        }}
                        onClick={() => { onInsert(t.content); onClose(); }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--ars-color-bg-tertiary)')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--ars-color-bg-secondary)')}
                    >
                        <FileText size={16} style={{ marginRight: '0.75rem', color: 'var(--ars-color-text-secondary)', flexShrink: 0 }} />
                        <span style={{
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            {t.title}
                        </span>
                    </div>
                ))}
                {templates.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--ars-color-text-secondary)', fontSize: '0.875rem' }}>
                        No templates saved.
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--ars-color-border)', paddingTop: '1rem' }}>
                {isSaving ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <input
                            type="text"
                            placeholder="Template name..."
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            autoFocus
                            style={{
                                width: '100%',
                                padding: '0.5rem',
                                borderRadius: '4px',
                                border: '1px solid var(--ars-color-border)',
                                fontSize: '0.875rem',
                                outline: 'none'
                            }}
                        />
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            <Button size="sm" variant="ghost" onClick={() => setIsSaving(false)}>Cancel</Button>
                            <Button size="sm" variant="primary" onClick={confirmSave}>Create</Button>
                        </div>
                    </div>
                ) : (
                    <Button
                        variant="secondary"
                        size="sm"
                        icon={<Save size={14} />}
                        onClick={handleSaveAsTemplate}
                        style={{ width: '100%', justifyContent: 'flex-start' }}
                    >
                        Save Current as Template
                    </Button>
                )}

                <Button
                    variant="ghost"
                    size="sm"
                    icon={<Settings size={14} />}
                    onClick={() => { onManage(); onClose(); }}
                    style={{ width: '100%', justifyContent: 'flex-start' }}
                >
                    Manage Templates...
                </Button>
            </div>
        </div>
    );
};
