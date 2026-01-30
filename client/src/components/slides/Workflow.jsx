import React from 'react';
import { ArrowRight, Search, FileText, Wand2, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

const ICON_MAP = {
    Search,
    FileText,
    Wand2,
};

const Workflow = ({ contentData }) => {
    return (
        <div className="h-full flex flex-col justify-center p-8 max-w-7xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl lg:text-5xl font-black text-slate-800 tracking-tight">
                    {contentData.heading}
                </h2>
            </motion.div>

            <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 relative">

                {/* Connecting Line (Desktop) */}
                <div className="hidden lg:block absolute top-12 left-20 right-20 h-1 bg-slate-100 -z-10" />

                {contentData.steps.map((step, index) => {
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="flex-1 relative"
                        >
                            {/* Connector Arrow (Desktop) */}
                            {index < contentData.steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-8 transform -translate-y-1/2 z-0">
                                    <ArrowRight className="w-8 h-8 text-slate-200" />
                                </div>
                            )}
                            {/* Connector Arrow (Mobile) */}
                            {index < contentData.steps.length - 1 && (
                                <div className="lg:hidden absolute -bottom-8 left-1/2 transform -translate-x-1/2 z-0">
                                    <ArrowDown className="w-8 h-8 text-slate-200" />
                                </div>
                            )}

                            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl h-full flex flex-col relative z-10 group hover:-translate-y-2 transition-transform duration-300">

                                {/* Number Badge */}
                                <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-2xl shadow-lg mb-6 mx-auto group-hover:bg-blue-600 transition-colors">
                                    {step.number}
                                </div>

                                <h3 className="text-xl font-black text-slate-800 text-center mb-4">
                                    {step.title}
                                </h3>

                                <p className="text-slate-600 font-medium text-center mb-6 leading-relaxed flex-1">
                                    {step.description}
                                </p>

                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            Herramienta
                                        </span>
                                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                                            {step.tool}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-500 italic">
                                        {step.example}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Result */}
            {contentData.result && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-16 mx-auto max-w-3xl bg-emerald-50 border-2 border-emerald-100 rounded-2xl p-8 text-center shadow-lg shadow-emerald-50"
                >
                    <p className="text-2xl font-black text-emerald-800">
                        Resultado: {contentData.result}
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default Workflow;
