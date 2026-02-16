import React, { useState } from 'react';
import { Plus, X, MessageSquare, Trash2, RefreshCw, Check } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { useContent, Phrase } from '../../hooks/useContent';
import { usePastebin } from '../../hooks/usePastebin';

interface PhraseManagerProps {
    onInsert: (content: string) => void;
    onClose: () => void;
}

export const PhraseManager: React.FC<PhraseManagerProps> = ({ onInsert, onClose }) => {
    const { phrases, addPhrase, deletePhrase } = useContent();
    const { syncPhrasesToCloud } = usePastebin();
    const [isAdding, setIsAdding] = useState(false);
    const [newLabel, setNewLabel] = useState('');
    const [newContent, setNewContent] = useState('');
    const [syncState, setSyncState] = useState<'idle' | 'syncing' | 'synced'>('idle');

    const handleSync = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (syncState === 'syncing') return;

        setSyncState('syncing');
        const result = await syncPhrasesToCloud();
        
        if (result.success) {
            setSyncState('synced');
            // State will naturally reset when the popover closes/unmounts
        } else {
            setSyncState('idle'); // Or error state if we had one
            alert(result.message);
        }
    };

    const handleAdd = () => {
        if (!newContent.trim()) return;

        addPhrase({
            label: newLabel.trim() || undefined,
            content: newContent.trim()
        });

        setNewLabel('');
        setNewContent('');
        setIsAdding(false);
    };

    return (
        <div className="ars-phrase-manager" style={{ width: '300px', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ margin: 0, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <MessageSquare size={16} /> Saved Phrases
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
                    title="Sync Phrases to Cloud"
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

            <div className="ars-phrase-list" style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                {phrases.map(p => (
                    <div
                        key={p.id}
                        className="ars-phrase-item"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '0.5rem',
                            backgroundColor: 'var(--ars-color-bg-secondary)',
                            borderRadius: '4px'
                        }}
                    >
                        <div
                            style={{ flex: 1, cursor: 'pointer', overflow: 'hidden' }}
                            onClick={() => { onInsert(p.content); onClose(); }}
                            title={p.content}
                        >
                            <span style={{ fontWeight: 500, display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {p.label || p.content}
                            </span>
                            {p.label && (
                                <span style={{ fontSize: '0.75rem', color: 'var(--ars-color-text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block' }}>
                                    {p.content}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); deletePhrase(p.id); }}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--ars-color-text-secondary)',
                                cursor: 'pointer',
                                padding: '4px',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                            title="Delete phrase"
                        >
                            <Trash2 size={14} />
                        </button>
                    </div>
                ))}
                {phrases.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '1rem', color: 'var(--ars-color-text-secondary)', fontSize: '0.875rem' }}>
                        No saved phrases.
                    </div>
                )}
            </div>

            {isAdding ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--ars-color-border)', paddingTop: '1rem' }}>
                    <Input
                        placeholder="Label (Optional)"
                        value={newLabel}
                        onChange={(e) => setNewLabel(e.target.value)}
                        autoFocus
                    />
                    <Input
                        placeholder="Phrase content..."
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                    />
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        <Button size="sm" variant="ghost" onClick={() => setIsAdding(false)}>Cancel</Button>
                        <Button size="sm" variant="primary" onClick={handleAdd}>Add</Button>
                    </div>
                </div>
            ) : (
                <Button
                    variant="secondary"
                    size="sm"
                    style={{ width: '100%' }}
                    onClick={() => setIsAdding(true)}
                    icon={<Plus size={14} />}
                >
                    Add New Phrase
                </Button>
            )}
        </div>
    );
};
