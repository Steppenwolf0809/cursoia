import React from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const QuoteLarge = ({ contentData }) => {
    return (
        <div className="h-full flex flex-col justify-center items-center p-8 relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-slate-900 z-0" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-3xl -ml-32 -mb-32" />

            <div className="relative z-10 max-w-5xl text-center space-y-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="inline-block p-4 bg-white/10 rounded-full backdrop-blur-sm mb-6"
                >
                    <Quote className="w-12 h-12 text-blue-400 opacity-80" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight"
                >
                    "{contentData.quote}"
                </motion.h2>

                {contentData.author && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-xl text-slate-400 font-bold tracking-widest uppercase"
                    >
                        — {contentData.author}
                    </motion.p>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="h-px w-32 bg-slate-700 mx-auto"
                />

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="text-2xl text-slate-300 font-medium leading-relaxed max-w-3xl mx-auto"
                >
                    {contentData.paragraph}
                </motion.p>

                {contentData.highlight && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 }}
                        className={`inline-block px-10 py-5 rounded-2xl shadow-2xl backdrop-blur-md border border-white/10
                            ${contentData.highlight.type === 'success' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'}
                        `}
                    >
                        <p className="text-2xl font-black tracking-wide">
                            {contentData.highlight.text}
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default QuoteLarge;
