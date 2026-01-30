import React, { useState } from 'react';
import { Copy, Check, Terminal, ExternalLink, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PromptTemplate = ({ contentData }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(contentData.template);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="h-full flex items-center justify-center p-8">
            <div className="max-w-5xl w-full grid md:grid-cols-12 gap-8 h-full md:h-auto">

                {/* Headers & Info */}
                <div className="md:col-span-4 space-y-6 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex items-center gap-3 mb-4 text-primary">
                            <Terminal className="w-8 h-8" />
                            <span className="font-bold text-lg uppercase tracking-wider">Prompt Template</span>
                        </div>
                        <h2 className="text-4xl font-black text-slate-800 leading-tight mb-4">
                            {contentData.heading}
                        </h2>

                        {contentData.tip && (
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl">
                                <div className="flex gap-3">
                                    <Lightbulb className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                                    <p className="text-yellow-800 text-sm font-medium italic">
                                        "{contentData.tip}"
                                    </p>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-3"
                    >
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                            Ejemplos de uso
                        </span>
                        <div className="flex flex-wrap gap-2">
                            {contentData.examples.map((ex, i) => (
                                <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-sm font-medium border border-slate-200">
                                    {ex}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Code Block */}
                <div className="md:col-span-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="relative group h-full"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl opacity-20 group-hover:opacity-30 transition duration-500 blur"></div>

                        <div className="relative bg-[#1e293b] rounded-xl overflow-hidden shadow-2xl flex flex-col h-full md:h-auto max-h-[70vh]">
                            {/* Toolbar */}
                            <div className="flex items-center justify-between px-4 py-3 bg-[#0f172a] border-b border-slate-700">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                </div>
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
                                >
                                    {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                    {copied ? 'COPIADO' : 'COPIAR PROMPT'}
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 overflow-auto custom-scrollbar">
                                <pre className="font-mono text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                                    <code className="text-blue-200 block">
                                        {contentData.template.split(/(\[.*?\])/g).map((part, i) => (
                                            part.startsWith('[') && part.endsWith(']') ?
                                                <span key={i} className="text-yellow-400 font-bold bg-white/5 rounded px-1">{part}</span> :
                                                <span key={i} className="text-slate-300">{part}</span>
                                        ))}
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default PromptTemplate;
