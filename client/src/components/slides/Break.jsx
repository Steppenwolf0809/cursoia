import React, { useEffect, useState } from 'react';
import { Coffee, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Break = ({ contentData }) => {
    // Optional: Simple countdown timer logic could go here if needed
    // For now we stick to the provided data structure

    return (
        <div className="h-full flex flex-col items-center justify-center p-8 relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 -z-10" />

            <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl -ml-32 -mb-32" />

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="w-40 h-40 bg-white rounded-full shadow-2xl flex items-center justify-center mb-10 ring-8 ring-amber-100/50"
            >
                <Coffee className="w-20 h-20 text-amber-600" strokeWidth={1.5} />
            </motion.div>

            <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-6xl font-black text-slate-800 mb-6 text-center tracking-tight"
            >
                {contentData.heading}
            </motion.h2>

            <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl text-slate-600 font-medium text-center max-w-2xl mb-16 leading-relaxed"
            >
                {contentData.message}
            </motion.p>

            {contentData.nextPreview && (
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col items-center gap-3"
                >
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                        A continuación
                    </span>
                    <div className="flex items-center gap-3 px-6 py-3 bg-white/60 backdrop-blur-sm rounded-full border border-slate-200 shadow-sm text-slate-700 font-bold">
                        {contentData.nextPreview}
                        <ArrowRight className="w-5 h-5 text-accent" />
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default Break;
