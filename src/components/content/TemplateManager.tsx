import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Save, FileText, Layout, GripVertical } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';
import { useContent, Template } from '../../hooks/useContent';
import { RichEditor } from '../editor/RichEditor';

interface TemplateManagerProps {
    isOpen: boolean;
    onClose: () => void;
    onInsert: (content: string) => void;
}

export const TemplateManager: React.FC<TemplateManagerProps> = ({ isOpen, onClose, onInsert }) => {
    const { templates, addTemplate, updateTemplate, deleteTemplate, reorderTemplates } = useContent();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [isDirty, setIsDirty] = useState(false);
    
    // Drag and drop state
    const [draggedId, setDraggedId] = useState<string | null>(null);
    const [dragOverId, setDragOverId] = useState<string | null>(null);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen && templates.length > 0 && !selectedId) {
            setSelectedId(templates[0].id);
        }
    }, [isOpen, templates]);

    // Load selected template into editor
    useEffect(() => {
        if (selectedId) {
            const template = templates.find(t => t.id === selectedId);
            if (template) {
                setEditTitle(template.title);
                setEditContent(template.content);
                setIsDirty(false);
            }
        }
        // NOTE: We do NOT clear the form if selectedId becomes null here, 
        // because that might mean we are in "Create New" mode.
    }, [selectedId, templates]);

    const handleSave = () => {
        if (!editTitle.trim()) return;

        if (selectedId) {
            updateTemplate(selectedId, {
                title: editTitle,
                content: editContent
            });
            setIsDirty(false);
        } else {
            // Should not happen in normal flow, but just in case
            const newId = crypto.randomUUID();
            addTemplate({
                title: editTitle,
                content: editContent
            });
            setSelectedId(newId);
        }
    };

    const handleCreateNew = () => {
        // Just clear selection and form to allow creating a new one
        // We DO NOT add it to the list yet. We wait for Save.
        setSelectedId(null);
        setEditTitle('New Template');
        setEditContent('');
        setIsDirty(true); // Mark as dirty so "Save" is enabled
    };

    // Improved Create: Immediately select the new template by ID if we generated it here? 
    // The hook generates the ID. Let's look at the hook again. 
    // Hook: addTemplate({ ...template, id: crypto.randomUUID() })
    // We can't know the ID unless we change the hook or generate ID here.
    // Let's change the handleCreateNew logic to generate ID here if we want to select it immediately.

    const handleDelete = (id: string) => {
        if (window.confirm('Are you sure you want to delete this template?')) {
            deleteTemplate(id);
            if (selectedId === id) {
                setSelectedId(null);
            }
        }
    };

    const handleInsert = () => {
        if (selectedId) {
            onInsert(editContent);
            onClose();
        }
    };

    // Drag and drop handlers
    const handleDragStart = (e: React.DragEvent, id: string) => {
        setDraggedId(id);
        e.dataTransfer.effectAllowed = 'move';
        // Set a ghost image or data
        e.dataTransfer.setData('text/plain', id);
    };

    const handleDragOver = (e: React.DragEvent, id: string) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (draggedId && draggedId !== id) {
            setDragOverId(id);
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        setDragOverId(null);
    };

    const handleDrop = (e: React.DragEvent, targetId: string) => {
        e.preventDefault();
        setDragOverId(null);
        
        if (!draggedId || draggedId === targetId) {
            setDraggedId(null);
            return;
        }

        // Reorder templates
        const draggedIndex = templates.findIndex(t => t.id === draggedId);
        const targetIndex = templates.findIndex(t => t.id === targetId);
        
        if (draggedIndex === -1 || targetIndex === -1) {
            setDraggedId(null);
            return;
        }

        // Create new order by moving dragged item to target position
        const newTemplates = [...templates];
        const [removed] = newTemplates.splice(draggedIndex, 1);
        newTemplates.splice(targetIndex, 0, removed);
        
        // Update order via the hook
        reorderTemplates(newTemplates.map(t => t.id));
        setDraggedId(null);
    };

    const handleDragEnd = () => {
        setDraggedId(null);
        setDragOverId(null);
    };

    // Intercept close to check for unsaved changes
    const handleClose = () => {
        if (isDirty) {
            if (window.confirm('You have unsaved changes. Do you want to save them before exiting?')) {
                handleSave();
                onClose();
            } else {
                // User chose not to save, discard changes
                setIsDirty(false); 
                // Force a reset of the content to the last saved state to prevent persistence
                if (selectedId) {
                    const originalTemplate = templates.find(t => t.id === selectedId);
                    if (originalTemplate) {
                        setEditTitle(originalTemplate.title);
                        setEditContent(originalTemplate.content);
                    }
                }
                onClose();
            }
        } else {
            onClose();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Template Manager"
            width="850px"
        >
            <div className="ars-template-manager" style={{ display: 'flex', height: '600px', gap: '1.5rem', padding: '1.5rem' }}>
                {/* Sidebar */}
                <div className="ars-tm-sidebar" style={{ width: '240px', borderRight: '1px solid var(--ars-color-border)', paddingRight: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                    <div className="ars-tm-header" style={{ marginBottom: '1rem' }}>
                        <Button
                            variant="primary"
                            size="sm"
                            style={{ width: '100%' }}
                            onClick={handleCreateNew}
                            icon={<Plus size={16} />}
                        >
                            New Template
                        </Button>
                    </div>
                    <div className="ars-tm-list" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {templates.map(t => (
                            <div
                                key={t.id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, t.id)}
                                onDragOver={(e) => handleDragOver(e, t.id)}
                                onDragLeave={handleDragLeave}
                                onDrop={(e) => handleDrop(e, t.id)}
                                onDragEnd={handleDragEnd}
                                className={`ars-tm-item ${selectedId === t.id ? 'active' : ''} ${draggedId === t.id ? 'dragging' : ''} ${dragOverId === t.id ? 'drag-over' : ''}`}
                                onClick={() => setSelectedId(t.id)}
                                style={{
                                    padding: '0.875rem 1rem',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    backgroundColor: dragOverId === t.id 
                                        ? 'var(--ars-color-bg-secondary)' 
                                        : selectedId === t.id 
                                            ? 'var(--ars-color-bg-secondary)' 
                                            : 'transparent',
                                    border: dragOverId === t.id
                                        ? '2px dashed var(--ars-color-primary)'
                                        : selectedId === t.id 
                                            ? '1px solid var(--ars-color-primary)' 
                                            : '1px solid transparent',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    opacity: draggedId === t.id ? 0.5 : 1,
                                    transition: 'all 0.15s ease'
                                }}
                                title="Drag to reorder"
                            >
                                {/* Drag Handle */}
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'grab',
                                        color: 'var(--ars-color-text-secondary)',
                                        padding: '0.25rem',
                                        borderRadius: '4px',
                                    }}
                                    onMouseDown={(e) => e.stopPropagation()}
                                >
                                    <GripVertical size={16} />
                                </div>
                                
                                {/* Template Info */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden', flex: 1 }}>
                                    <FileText size={16} color="var(--ars-color-text-secondary)" />
                                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 500 }}>
                                        {t.title}
                                    </span>
                                </div>
                            </div>
                        ))}
                        {templates.length === 0 && (
                            <div style={{ padding: '1rem', textAlign: 'center', color: 'var(--ars-color-text-secondary)', fontSize: '0.875rem' }}>
                                No templates yet. Create one to get started!
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="ars-tm-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Always show editor if we have a selection OR if we are in "Create Mode" (selectedId is null but we have a dirty title/content implying creation) 
                        Actually, let's use a clearer state for "creating". 
                        But for now, checking if we have editTitle set by "New Template" is a decent heuristic or just allow editing when null?
                        Let's simplify: If selectedId is null, we are in "Create Mode" IF editTitle is not empty.
                    */}
                    {(selectedId || editTitle) ? (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Input
                                    value={editTitle}
                                    onChange={(e) => {
                                        setEditTitle(e.target.value);
                                        setIsDirty(true);
                                    }}
                                    placeholder="Template Name"
                                    style={{ fontSize: '1.25rem', fontWeight: 600, border: 'none', padding: '0.5rem 0', background: 'transparent' }}
                                />
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    {selectedId && (
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleDelete(selectedId)}
                                            title="Delete Template"
                                            style={{ color: 'var(--ars-color-error)' }}
                                        >
                                            <Trash2 size={18} />
                                        </Button>
                                    )}
                                    <Button
                                        variant={isDirty ? 'primary' : 'secondary'}
                                        onClick={handleSave}
                                        disabled={!isDirty}
                                        icon={<Save size={16} />}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>

                            <RichEditor
                                value={editContent}
                                onChange={(value) => {
                                    setEditContent(value);
                                    setIsDirty(true);
                                }}
                                placeholder="Enter your review template structure here..."
                                showUtilities={false}
                                className="ars-tm-editor"
                            />

                            <div style={{ borderTop: '1px solid var(--ars-color-border)', paddingTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="primary"
                                    onClick={handleInsert}
                                    icon={<Layout size={16} />}
                                >
                                    Insert Template
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--ars-color-text-secondary)' }}>
                            <Layout size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                            <p>Select a template to edit or create a new one.</p>
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};
