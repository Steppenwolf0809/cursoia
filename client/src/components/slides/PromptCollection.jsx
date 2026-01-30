import React, { useState } from 'react';
import { Copy, Check, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const PromptCollection = ({ contentData }) => {
    // Array to track copied state for each card individually
    const [copiedStates, setCopiedStates] = useState({});

    const handleCopy = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedStates({ ...copiedStates, [index]: true });

        setTimeout(() => {
            setCopiedStates(prev => ({ ...prev, [index]: false }));
        }, 2000);
    };

    return (
        <div className="h-full flex flex-col justify-center p-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
            >
                <h2 className="text-4xl font-black text-slate-800">
                    {contentData.heading}
                </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 items-stretch">
                {contentData.prompts.map((prompt, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 pb-2">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                    <MessageSquare size={18} className="text-blue-500" />
                                    {prompt.title}
                                </h3>
                                <span className="text-xs font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-1 rounded-md uppercase tracking-wider">
                                    {prompt.useCase}
                                </span>
                            </div>
                        </div>

                        {/* Code Block */}
                        <div className="flex-1 p-6 pt-0">
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 font-mono text-sm text-slate-600 leading-relaxed mb-4 relative group-hover:bg-blue-50/30 transition-colors">
                                {prompt.prompt}
                            </div>
                        </div>

                        {/* Footer / Copy Button */}
                        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
                            <button
                                onClick={() => handleCopy(prompt.prompt, index)}
                                className={`
                                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all
                                    ${copiedStates[index]
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:border-blue-300 hover:text-blue-600 shadow-sm'}
                                `}
                            >
                                {copiedStates[index] ? <Check size={16} /> : <Copy size={16} />}
                                {copiedStates[index] ? 'Copiado!' : 'Copiar Prompt'}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default PromptCollection;
