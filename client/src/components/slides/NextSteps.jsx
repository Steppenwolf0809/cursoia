import React, { useState } from 'react';
import { Calendar, Trophy, ChevronRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NextSteps = ({ contentData }) => {
    const [expandedStep, setExpandedStep] = useState(0);

    return (
        <div className="h-full flex flex-col justify-center p-8 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h2 className="text-5xl font-black text-slate-800 tracking-tight">
                    {contentData.heading}
                </h2>
            </motion.div>

            {/* Timeline */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
                {contentData.steps.map((step, index) => {
                    const isExpanded = expandedStep === index;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            onClick={() => setExpandedStep(index)}
                            className={`
                                relative rounded-[2rem] p-8 cursor-pointer transition-all duration-500 overflow-hidden
                                ${isExpanded
                                    ? 'bg-slate-900 text-white shadow-2xl scale-105 z-10'
                                    : 'bg-white border border-slate-200 shadow-lg hover:shadow-xl hover:-translate-y-1'}
                            `}
                        >
                            <div className="flex flex-col h-full relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <span className={`text-sm font-bold uppercase tracking-widest px-3 py-1 rounded-full ${isExpanded ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'}`}>
                                        {step.day}
                                    </span>
                                    {isExpanded ? <ChevronDown className="text-white/50" /> : <ChevronRight className="text-slate-300" />}
                                </div>

                                <h3 className={`text-2xl font-black mb-4 leading-tight ${isExpanded ? 'text-white' : 'text-slate-800'}`}>
                                    {step.action}
                                </h3>

                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="mt-auto pt-6 border-t border-white/10"
                                        >
                                            <p className="text-blue-200 font-medium leading-relaxed italic">
                                                "{step.tip}"
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {!isExpanded && (
                                    <p className="mt-auto text-slate-400 font-medium text-sm">
                                        Click para ver detalles
                                    </p>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Challenge Banner */}
            {contentData.challenge && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8 shadow-xl text-white flex items-center justify-center gap-6 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full -mr-20 -mt-20 blur-3xl group-hover:bg-white/30 transition-colors" />

                    <Trophy size={48} className="flex-shrink-0 animate-bounce" />
                    <p className="text-2xl md:text-3xl font-black italic tracking-wide text-center relative z-10">
                        {contentData.challenge}
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default NextSteps;
