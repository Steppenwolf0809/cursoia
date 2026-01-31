import React, { useEffect, useMemo, useState } from 'react';
import { ChevronRight, FileDown, Save, StickyNote, Trash2, PencilLine, RefreshCw, X } from 'lucide-react';
import SlideRenderer from '../SlideRenderer';
import AnimatedSlide from '../AnimatedSlide';

const AppLayout = ({ modules, activeModuleId, activeSlideId, onNavigate, children, rightPanel, participant, onLogout, isAdmin, sessionState, onToggleFreeMode }) => {
    const [isNotesOpen, setIsNotesOpen] = useState(false);
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [editDraft, setEditDraft] = useState({ moduleTitle: '', slideTitle: '' });
    const [saveStatus, setSaveStatus] = useState('idle');
    const [notes, setNotes] = useState(() => {
        try {
            const stored = localStorage.getItem('course_notes');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            return [];
        }
    });

    const safeModules = modules?.length ? modules : [];
    const activeModule = safeModules.find(m => m.id === activeModuleId) || safeModules[0];
    const activeSlideIndex = activeModule?.slides?.findIndex(s => s.id === activeSlideId) ?? -1;
    const safeSlideIndex = activeSlideIndex >= 0 ? activeSlideIndex : 0;
    const activeSlide = activeModule?.slides?.[safeSlideIndex];

    // Progress calculation
    const totalSlides = activeModule?.slides?.length || 0;
    const progress = totalSlides ? ((safeSlideIndex + 1) / totalSlides) * 100 : 0;

    // Calculate next slide logic
    const handleNext = () => {
        if (!activeModule || !activeModule.slides?.length) return;
        if (safeSlideIndex < totalSlides - 1) {
            onNavigate(activeModuleId, activeModule.slides[safeSlideIndex + 1].id);
        } else if (isAdmin) {
            // Solo el admin puede pasar al siguiente módulo
            const currentModuleIndex = safeModules.indexOf(activeModule);
            if (currentModuleIndex < safeModules.length - 1) {
                const nextModule = safeModules[currentModuleIndex + 1];
                onNavigate(nextModule.id, nextModule.slides[0].id);
            }
        }
        // En modo libre, el estudiante no puede pasar al siguiente módulo
    };

    const handlePrev = () => {
        if (!activeModule || !activeModule.slides?.length) return;
        if (safeSlideIndex > 0) {
            onNavigate(activeModuleId, activeModule.slides[safeSlideIndex - 1].id);
        }
    };

    useEffect(() => {
        try {
            localStorage.setItem('course_notes', JSON.stringify(notes));
        } catch (error) {
            // Ignore storage errors (private mode or full storage)
        }
    }, [notes]);

    const notesPayload = useMemo(() => {
        return {
            participantId: participant?.id || null,
            participantName: participant?.name || 'Estudiante',
            exportedAt: new Date().toISOString(),
            notes
        };
    }, [notes, participant]);

    const handleAddNote = () => {
        if (!activeModule || !activeSlide) return;
        setNotes(prevNotes => {
            const lastEntry = prevNotes[0];
            const isSameSlide = lastEntry?.moduleId === activeModule.id && lastEntry?.slideId === activeSlide.id;
            if (isSameSlide && !lastEntry?.text?.trim()) {
                return prevNotes;
            }
            const newEntry = {
                id: `${activeModule.id}-${activeSlide.id}-${Date.now()}`,
                moduleId: activeModule.id,
                moduleTitle: activeModule.title,
                moduleIndex: safeModules.indexOf(activeModule) + 1,
                slideId: activeSlide.id,
                slideTitle: activeSlide.title,
                text: ''
            };
            return [newEntry, ...prevNotes];
        });
        setIsNotesOpen(true);
    };

    const handleNoteChange = (noteId, value) => {
        setNotes(prevNotes => prevNotes.map(note => (note.id === noteId ? { ...note, text: value } : note)));
    };

    const handleDeleteNote = (noteId) => {
        setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
        if (editingNoteId === noteId) {
            setEditingNoteId(null);
        }
    };

    const handleEditNote = (note) => {
        setEditingNoteId(note.id);
        setEditDraft({ moduleTitle: note.moduleTitle, slideTitle: note.slideTitle });
    };

    const handleCancelEdit = () => {
        setEditingNoteId(null);
        setEditDraft({ moduleTitle: '', slideTitle: '' });
    };

    const handleSaveEdit = (noteId) => {
        setNotes(prevNotes => prevNotes.map(note => (
            note.id === noteId
                ? { ...note, moduleTitle: editDraft.moduleTitle.trim() || note.moduleTitle, slideTitle: editDraft.slideTitle.trim() || note.slideTitle }
                : note
        )));
        handleCancelEdit();
    };

    const handleUpdateToCurrent = (noteId) => {
        if (!activeModule || !activeSlide) return;
        setNotes(prevNotes => prevNotes.map(note => (
            note.id === noteId
                ? {
                    ...note,
                    moduleId: activeModule.id,
                    moduleTitle: activeModule.title,
                    moduleIndex: safeModules.indexOf(activeModule) + 1,
                    slideId: activeSlide.id,
                    slideTitle: activeSlide.title
                }
                : note
        )));
    };

    const handleDownloadNotes = () => {
        if (!notes.length) return;
        const content = `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>${notes
            .map(note => (`
                <h2>${note.moduleTitle} / ${note.slideTitle}</h2>
                <p>${(note.text || '').replace(/\n/g, '<br />')}</p>
            `))
            .join('')}
        </body></html>`;
        const blob = new Blob([content], { type: 'application/msword;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'mis-notas-curso.doc';
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
    };

    const handleSaveNotes = async () => {
        if (!notes.length || saveStatus === 'saving') return;
        setSaveStatus('saving');
        try {
            const response = await fetch('/api/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(notesPayload)
            });
            if (!response.ok) {
                throw new Error('Error al guardar');
            }
            setSaveStatus('saved');
        } catch (error) {
            setSaveStatus('error');
        } finally {
            setTimeout(() => setSaveStatus('idle'), 2500);
        }
    };

    if (!activeModule || !activeSlide) {
        return null;
    }

    return (
        <div className="flex h-screen bg-slate-100 overflow-hidden font-sans text-slate-900 selection:bg-secondary selection:text-white">

            {/* Sidebar - Fixed width */}
            <aside className="w-72 bg-primary text-white flex flex-col shadow-2xl z-20 flex-shrink-0">
                <div className="p-6 border-b border-blue-800/50 bg-blue-900/50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent to-yellow-600 rounded-xl flex items-center justify-center shadow-lg border border-yellow-400/20">
                            <span className="font-bold text-2xl text-white">IA</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-lg leading-tight tracking-tight">Curso IA</h1>
                            <p className="text-blue-300 text-xs font-medium uppercase tracking-wide opacity-80">Curso introductorio</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-transparent">
                    {modules.map(module => {
                        const isActive = module.id === activeModuleId;
                        const Icon = module.icon;
                        // Estudiantes solo pueden hacer clic en el módulo libre específico habilitado
                        const isFreeModule = sessionState?.isFreeMode && sessionState?.freeModuleId === module.id;
                        const canClick = isAdmin || isFreeModule;
                        return (
                            <button
                                key={module.id}
                                onClick={() => canClick && onNavigate(module.id, module.slides[0].id)}
                                disabled={!canClick}
                                className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300 group relative overflow-hidden 
                                    ${isActive
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20 ring-1 ring-blue-500/50'
                                        : canClick
                                            ? 'text-blue-200 hover:bg-white/5 hover:text-white cursor-pointer'
                                            : 'text-blue-400/50 cursor-not-allowed opacity-60'
                                    }`}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-0 h-full w-1 bg-accent" />
                                )}
                                <Icon className={`w-5 h-5 flex-shrink-0 transition-colors ${isActive ? 'text-accent' : canClick ? 'text-blue-400 group-hover:text-blue-200' : 'text-blue-500/40'}`} />
                                <span className={`font-medium text-sm text-left truncate transition-transform ${isActive ? 'translate-x-1' : ''}`}>{module.title}</span>
                                {isActive && <ChevronRight className="w-4 h-4 ml-auto text-blue-300" />}
                                {isFreeModule && !isAdmin && (
                                    <span className="ml-auto text-[10px] text-emerald-400 font-medium uppercase tracking-wide">Libre</span>
                                )}
                            </button>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-blue-800/50 bg-blue-900/30">
                    <div className="flex items-center gap-3 px-2 py-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center font-bold text-sm border border-blue-600/50 text-blue-100 shadow-inner">
                            {isAdmin ? 'ADM' : (participant?.name?.slice(0, 2).toUpperCase() || 'WT')}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-medium text-sm truncate">
                                {isAdmin ? 'Administrador' : (participant?.name || 'Participante')}
                            </p>
                            <p className="text-xs text-blue-300 truncate">
                                {isAdmin ? 'Control Total' : 'Estudiante'}
                            </p>
                        </div>
                        <button
                            onClick={onLogout}
                            className="p-1.5 text-blue-300 hover:text-white hover:bg-blue-800 rounded-lg transition-colors"
                            title="Salir"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content + Right Panel wrapper to handle layout */}
            <div className="flex-1 flex flex-col xl:flex-row min-w-0">

                {/* Main Content - Flexible */}
                <main className="flex-1 flex flex-col relative bg-slate-50/50">
                    {/* Progress Bar */}
                    <div className="h-1 bg-slate-200 w-full">
                        <div
                            className="h-full bg-accent transition-all duration-700 ease-out shadow-[0_0_10px_rgba(214,158,46,0.5)]"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex-1 overflow-y-auto w-full">
                        <div className="max-w-3xl mx-auto p-8 lg:p-12 pb-32">
                            <AnimatedSlide slideKey={activeSlide.id}>
                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100/80 text-primary text-xs font-bold tracking-wider mb-6 border border-blue-200 uppercase">
                                    Módulo {safeModules.indexOf(activeModule) + 1}
                                </span>

                                <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 mb-8 leading-tight tracking-tight">
                                    {activeSlide.title}
                                </h2>

                                <div className="h-1.5 w-24 bg-gradient-to-r from-accent to-yellow-300 rounded-full mb-10"></div>

                                <SlideRenderer slide={activeSlide} isAdmin={isAdmin} sessionState={sessionState} moduleId={activeModuleId} />
                            </AnimatedSlide>
                        </div>
                    </div>

                    {!isAdmin && (
                        <button
                            type="button"
                            onClick={handleAddNote}
                            className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-primary text-white px-5 py-3 shadow-2xl shadow-blue-900/30 hover:bg-blue-800 transition-all active:scale-95 ${isNotesOpen ? 'translate-x-[-420px] md:translate-x-[-360px]' : ''}`}
                        >
                            <StickyNote className="w-4 h-4" />
                            Tomar notas
                        </button>
                    )}

                    {/* Footer Navigation - For Admins always, for students when free mode is active */}
                    {(isAdmin || (sessionState?.isFreeMode && sessionState?.freeModuleId === activeModule?.id)) && (
                        <div className={`${isAdmin ? 'absolute z-10' : 'fixed z-50'} bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-slate-200 p-4 px-8 flex items-center justify-between`}>
                            <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider hidden sm:block">
                                {activeSlideIndex + 1} <span className="text-slate-300">/</span> {totalSlides}
                                {!isAdmin && sessionState?.isFreeMode && (
                                    <span className="ml-3 text-emerald-600 text-xs font-bold">● Modo libre activo</span>
                                )}
                            </div>
                            <div className="flex gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                <button
                                    onClick={handlePrev}
                                    disabled={activeSlideIndex === 0}
                                    className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 hover:border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                                >
                                    Anterior
                                </button>
                                {isAdmin && activeSlideIndex === totalSlides - 1 && (
                                    <button
                                        onClick={() => onToggleFreeMode?.(activeModule?.id)}
                                        className={`px-6 py-2.5 rounded-xl border font-medium transition-all active:scale-95 ${sessionState?.isFreeMode && sessionState?.freeModuleId === activeModule?.id
                                            ? 'border-emerald-200 text-emerald-700 bg-emerald-50'
                                            : 'border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300'}`}
                                    >
                                        {sessionState?.isFreeMode && sessionState?.freeModuleId === activeModule?.id
                                            ? 'Desactivar modo libre'
                                            : 'Activar modo libre'}
                                    </button>
                                )}
                                <button
                                    onClick={handleNext}
                                    disabled={!isAdmin && activeSlideIndex === totalSlides - 1}
                                    className="px-8 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-blue-800 shadow-lg shadow-blue-900/20 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {safeSlideIndex < totalSlides - 1 ? 'Siguiente' : (isAdmin ? 'Siguiente Módulo' : 'Fin del módulo')}
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </main>

                {/* Right Panel - Fixed width but responsive on smaller screens if needed */}
                {/* No mostrar panel derecho para gallery-view (la galería va en el área principal) */}
                {(activeSlide.type === 'poll' || (activeSlide.interaction && activeSlide.type !== 'gallery-view')) && (
                    <aside className="w-full xl:w-[420px] bg-white border-t xl:border-t-0 xl:border-l border-slate-200 flex flex-col shadow-xl z-10 flex-shrink-0 order-first xl:order-last h-[400px] xl:h-auto">
                        <div className="p-6 bg-slate-50 border-b border-slate-100">
                            <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                                Interacción
                            </h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/30">
                            {rightPanel}
                        </div>
                    </aside>
                )}

                {!isAdmin && (
                    <>
                        <aside
                            className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white border-l border-slate-200 shadow-2xl z-50 transform transition-transform duration-300 ${isNotesOpen ? 'translate-x-0' : 'translate-x-full'}`}
                            aria-hidden={!isNotesOpen}
                        >
                            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Notas del estudiante</p>
                                    <p className="text-sm text-slate-600">Guarda tus ideas por módulo</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsNotesOpen(false)}
                                    className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
                                    aria-label="Cerrar notas"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200">
                                <span className="text-xs text-slate-400">{notes.length} entradas</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={handleAddNote}
                                        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-primary"
                                        title="Crea una nota con el módulo y la diapositiva que ves ahora"
                                    >
                                        <StickyNote className="w-4 h-4" />
                                        Nuevo
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleDownloadNotes}
                                        className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-blue-800"
                                    >
                                        <FileDown className="w-4 h-4" />
                                        Descargar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleSaveNotes}
                                        className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                                    >
                                        <Save className="w-4 h-4" />
                                        {saveStatus === 'saving' ? 'Guardando...' : 'Guardar'}
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto p-5 space-y-4">
                                {notes.length === 0 ? (
                                    <div className="border border-dashed border-slate-200 rounded-2xl p-6 text-center text-slate-400 text-sm">
                                        Presiona “Tomar notas” para guardar ideas del módulo y la diapositiva actual.
                                    </div>
                                ) : (
                                    notes.map(note => (
                                        <div key={note.id} className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                                            <div className="px-4 py-3 border-b border-slate-100">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div>
                                                        <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">{note.moduleTitle}</p>
                                                        <p className="text-sm font-semibold text-slate-700">{note.slideTitle}</p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleUpdateToCurrent(note.id)}
                                                            className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-blue-50"
                                                            title="Actualizar al tema actual"
                                                        >
                                                            <RefreshCw className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleEditNote(note)}
                                                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                                                            title="Editar tema manualmente"
                                                        >
                                                            <PencilLine className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeleteNote(note.id)}
                                                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50"
                                                            title="Eliminar nota"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                                {editingNoteId === note.id && (
                                                    <div className="mt-3 space-y-2">
                                                        <input
                                                            type="text"
                                                            value={editDraft.moduleTitle}
                                                            onChange={(event) => setEditDraft(prev => ({ ...prev, moduleTitle: event.target.value }))}
                                                            placeholder="Editar módulo"
                                                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={editDraft.slideTitle}
                                                            onChange={(event) => setEditDraft(prev => ({ ...prev, slideTitle: event.target.value }))}
                                                            placeholder="Editar diapositiva"
                                                            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
                                                        />
                                                        <div className="flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleSaveEdit(note.id)}
                                                                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary text-white"
                                                            >
                                                                Guardar
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={handleCancelEdit}
                                                                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 text-slate-500"
                                                            >
                                                                Cancelar
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <textarea
                                                value={note.text}
                                                onChange={event => handleNoteChange(note.id, event.target.value)}
                                                placeholder="Escribe tus apuntes aquí..."
                                                className="w-full min-h-[140px] resize-none px-4 py-3 text-sm text-slate-700 focus:outline-none"
                                            />
                                        </div>
                                    ))
                                )}
                            </div>
                        </aside>
                    </>
                )}

            </div>
        </div>
    );
};

export default AppLayout;
