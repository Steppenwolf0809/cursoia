import React, { useState } from 'react';
import GallerySubmit from '../GallerySubmit';
import { Timer, CheckSquare, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ExerciseInteractive = ({ contentData, interaction }) => {
    const [showExample, setShowExample] = useState(false);

    return (
        <div className="h-full p-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-stretch">

            {/* Left Column: Instructions */}
            <div className={`
                flex flex-col h-full bg-white rounded-[2rem] p-8 border border-slate-100 shadow-lg overflow-y-auto custom-scrollbar
                ${interaction ? 'md:w-1/2' : 'w-full'}
            `}>
                <div className="mb-6">
                    <div className="flex justify-between items-start mb-4">
                        <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-xs uppercase tracking-widest">
                            Ejercicio
                        </span>
                        <div className="flex items-center gap-2 text-slate-500 font-bold bg-slate-50 px-3 py-1 rounded-lg">
                            <Timer size={16} />
                            <span className="text-sm">{contentData.duration}</span>
                        </div>
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-black text-slate-800 leading-tight mb-4">
                        {contentData.heading}
                    </h2>

                    <p className="text-xl text-slate-600 font-medium leading-relaxed">
                        {contentData.instructions}
                    </p>
                </div>

                {/* Steps */}
                <div className="space-y-4 mb-8">
                    {contentData.steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-blue-50/50 hover:border-blue-100 transition-colors"
                        >
                            <div className="mt-0.5">
                                <CheckSquare className="w-5 h-5 text-blue-500" />
                            </div>
                            <span className="text-slate-700 font-bold text-lg">
                                {step}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* Sample Input (Collapsible) */}
                {contentData.sampleInput && (
                    <div className="mb-6">
                        <button
                            onClick={() => setShowExample(!showExample)}
                            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm uppercase tracking-wider transition-colors"
                        >
                            {showExample ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            {showExample ? 'Ocultar Ejemplo' : 'Ver Ejemplo'}
                        </button>

                        <AnimatePresence>
                            {showExample && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="mt-3 p-4 bg-slate-100 rounded-xl border border-slate-200 text-slate-600 text-sm font-mono whitespace-pre-wrap leading-relaxed shadow-inner">
                                        {contentData.sampleInput}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                {/* Tip/Challenge */}
                <div className="mt-auto space-y-4">
                    {contentData.challenge && (
                        <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 p-5 rounded-2xl flex gap-4">
                            <span className="text-2xl">🏆</span>
                            <div>
                                <span className="block text-xs font-bold text-orange-400 uppercase tracking-widest mb-1">Reto</span>
                                <p className="text-orange-800 font-bold">
                                    {contentData.challenge}
                                </p>
                            </div>
                        </div>
                    )}

                    {contentData.tip && (
                        <div className="bg-yellow-50 border border-yellow-100 p-5 rounded-2xl flex gap-4">
                            <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                            <p className="text-yellow-800 font-medium italic">
                                "{contentData.tip}"
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column: Interaction */}
            {interaction && (
                <div className="md:w-1/2 h-full">
                    {interaction.type === 'GallerySubmit' && (
                        <GallerySubmit
                            exerciseId={interaction.data.exerciseId}
                            promptLabel={interaction.data.promptLabel}
                            resultLabel={interaction.data.resultLabel}
                            allowImage={interaction.data.allowImage}
                        />
                    )}
                    {/* Extend here for other interaction types if needed */}
                </div>
            )}
        </div>
    );
};

export default ExerciseInteractive;
