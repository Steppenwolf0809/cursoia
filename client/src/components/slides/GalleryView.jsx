import React, { useState } from 'react';
import GalleryDisplay from '../GalleryDisplay'; // Ensure path is correct relative to slides/
import { Users, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const GalleryView = ({ contentData, moduleId }) => {
    const exerciseId = contentData?.exerciseId || null;
    const [showHighlightedOnly, setShowHighlightedOnly] = useState(true);
    console.log('[GalleryView] Rendering with moduleId:', moduleId, 'exerciseId:', exerciseId);

    return (
        <div className="h-full flex flex-col p-4 sm:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 sm:mb-10 pb-4 sm:pb-6 border-b border-slate-100 gap-4 sm:gap-6">
                <div className="min-w-0">
                    <h2 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight mb-2 flex items-center gap-2 sm:gap-4">
                        <Users className="text-blue-500 flex-shrink-0" size={32} />
                        <span className="break-words">{contentData.heading}</span>
                    </h2>
                    <p className="text-base sm:text-xl text-slate-500 font-medium">
                        {contentData.description}
                    </p>
                </div>

                {/* Filters */}
                <div className="flex gap-2 bg-slate-100 p-1.5 rounded-xl flex-shrink-0">
                    <button
                        onClick={() => setShowHighlightedOnly(true)}
                        className={`px-3 sm:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all ${showHighlightedOnly
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Destacados
                    </button>
                    <button
                        onClick={() => setShowHighlightedOnly(false)}
                        className={`px-3 sm:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all ${!showHighlightedOnly
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Todos
                    </button>
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 -mr-2">
                <GalleryDisplay
                    showAll={!showHighlightedOnly}
                    showHighlighted={true}
                    exerciseId={exerciseId}
                    moduleId={moduleId}
                />
            </div>
        </div>
    );
};

export default GalleryView;
