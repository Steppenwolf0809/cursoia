import React from 'react';
import { Tv, Printer, Cable, Settings, Search, AlertTriangle, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';

const ICON_MAP = {
    Tv,
    Printer,
    Cable,
    Settings,
    Search,
    AlertTriangle,
    Smartphone
};

const FeatureShowcase = ({ contentData }) => {
    return (
        <div className="h-full flex flex-col justify-center p-8 max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl lg:text-5xl font-black text-slate-800 tracking-tight mb-4">
                    {contentData.heading}
                </h2>
                <p className="text-2xl text-slate-500 font-medium max-w-3xl mx-auto">
                    {contentData.paragraph}
                </p>
            </motion.div>

            {/* Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {contentData.useCases.map((useCase, index) => {
                    const Icon = ICON_MAP[useCase.icon] || Settings;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg flex flex-col items-center text-center group hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Decorative Blob */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-blue-100 transition-colors" />

                            <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-700 flex items-center justify-center mb-6 shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 relative z-10">
                                <Icon size={32} />
                            </div>

                            <h3 className="text-xl font-black text-slate-800 mb-3 relative z-10">
                                {useCase.title}
                            </h3>

                            <p className="text-slate-600 font-medium leading-normal relative z-10">
                                {useCase.example}
                            </p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Warning */}
            {contentData.warning && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="max-w-2xl mx-auto bg-amber-50 border border-amber-200 rounded-full px-8 py-4 flex items-center gap-4 shadow-sm"
                >
                    <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 text-amber-600">
                        <Smartphone size={20} />
                    </div>
                    <p className="text-amber-900 font-bold text-lg">
                        {contentData.warning}
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default FeatureShowcase;
