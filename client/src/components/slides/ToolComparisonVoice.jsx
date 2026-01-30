import React, { useState } from 'react';
import { Mic, Sparkles, MessageSquare, Plus, Minus, ExternalLink, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ICON_MAP = {
    Mic,
    Sparkles,
    MessageSquare
};

const ToolComparisonVoice = ({ contentData }) => {
    const [expandedIndex, setExpandedIndex] = useState(0);

    return (
        <div className="h-full flex flex-col justify-center p-8 max-w-7xl mx-auto">
            <h2 className="text-4xl font-black text-slate-800 text-center mb-12">
                {contentData.heading}
            </h2>

            <div className="flex flex-col lg:flex-row gap-6 items-stretch justify-center h-[60vh]">
                {contentData.tools.map((tool, index) => {
                    const isExpanded = expandedIndex === index;
                    const Icon = ICON_MAP[tool.icon] || Mic;

                    return (
                        <motion.div
                            key={index}
                            layout
                            onClick={() => setExpandedIndex(index)}
                            className={`
                                relative rounded-3xl overflow-hidden cursor-pointer transition-shadow duration-500
                                ${isExpanded ? 'flex-[2] bg-white ring-4 ring-primary/20 shadow-2xl z-10' : 'flex-1 bg-slate-50 border border-slate-200 hover:bg-white hover:shadow-xl'}
                            `}
                        >
                            <div className="p-8 h-full flex flex-col relative z-10">
                                {/* Header */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`
                                        w-12 h-12 rounded-xl flex items-center justify-center transition-colors
                                        ${isExpanded ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}
                                    `}>
                                        <Icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className={`font-black text-2xl ${isExpanded ? 'text-primary' : 'text-slate-700'}`}>
                                            {tool.name}
                                        </h3>
                                        {isExpanded && (
                                            <p className="text-slate-500 text-sm font-medium">{tool.description}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Content only visible when expanded */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: 0.1 }}
                                            className="flex-1 flex flex-col space-y-6 overflow-y-auto custom-scrollbar"
                                        >
                                            {/* Pros */}
                                            <div className="space-y-3 bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                                                <h4 className="text-xs font-black text-emerald-800 uppercase tracking-widest flex items-center gap-2">
                                                    <Check size={14} strokeWidth={4} /> Ventajas
                                                </h4>
                                                <ul className="space-y-2">
                                                    {tool.pros.map((pro, i) => (
                                                        <li key={i} className="text-sm font-bold text-emerald-900 flex items-start gap-2">
                                                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                                                            {pro}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Cons */}
                                            <div className="space-y-3 bg-red-50 rounded-2xl p-4 border border-red-100">
                                                <h4 className="text-xs font-black text-red-800 uppercase tracking-widest flex items-center gap-2">
                                                    <X size={14} strokeWidth={4} /> Limitaciones
                                                </h4>
                                                <ul className="space-y-2">
                                                    {tool.cons.map((con, i) => (
                                                        <li key={i} className="text-sm font-bold text-red-900 flex items-start gap-2">
                                                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                                                            {con}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Best For */}
                                            <div className="mt-auto pt-4 border-t border-slate-100">
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Ideal para</span>
                                                <p className="text-lg font-black text-slate-800 leading-tight">
                                                    {tool.bestFor}
                                                </p>
                                            </div>

                                            {/* Action Button */}
                                            {/* <a 
                                                href={tool.url.startsWith('http') ? tool.url : `https://${tool.url}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-4 flex items-center justify-center gap-2 text-white bg-slate-900 hover:bg-slate-800 py-3 rounded-xl font-bold transition-all"
                                                onClick={(e) => e.stopPropagation()} // Prevent card collapse
                                            >
                                                Probar ahora <ExternalLink size={16} />
                                            </a> */}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Collapsed State Hint */}
                                {!isExpanded && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/0 opacity-0 hover:bg-white/50 hover:opacity-100 transition-all duration-300">
                                        <div className="bg-white px-4 py-2 rounded-full shadow-lg text-primary font-bold text-sm">
                                            Click para ver detalles
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Decorative Background */}
                            <div className={`absolute bottom-0 right-0 p-8 opacity-5 transition-transform duration-500 ${isExpanded ? 'scale-150' : 'scale-100'}`}>
                                <Icon size={200} />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default ToolComparisonVoice;
