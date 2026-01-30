import React from 'react';
import { Mail, Search, FileText, Languages, Wrench, Users, Wand2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ICON_MAP = {
    Mail,
    Search,
    FileText,
    Languages,
    Wrench,
    Users,
    Wand2
};

const CaseIntro = ({ contentData }) => {
    const IconComp = ICON_MAP[contentData.icon] || Mail;

    return (
        <div className="h-full flex items-center justify-center p-8">
            <div className="max-w-5xl w-full grid md:grid-cols-2 gap-12 items-center">
                {/* Left Side: Visual Identity */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative"
                >
                    <div
                        className="absolute inset-0 blur-3xl opacity-20 rounded-full"
                        style={{ backgroundColor: contentData.color }}
                    ></div>

                    <div className="relative bg-white rounded-[3rem] p-10 shadow-2xl border-l-[16px] overflow-hidden group"
                        style={{ borderColor: contentData.color }}>

                        {/* Background Pattern */}
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <IconComp size={200} />
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-start justify-between mb-8">
                                <span className="text-6xl font-black text-slate-200">
                                    #{String(contentData.caseNumber).padStart(2, '0')}
                                </span>
                                <div
                                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform duration-500"
                                    style={{ backgroundColor: contentData.color }}
                                >
                                    <IconComp size={40} />
                                </div>
                            </div>

                            <h2 className="text-4xl font-black text-slate-800 leading-tight mb-2">
                                {contentData.heading}
                            </h2>
                        </div>
                    </div>
                </motion.div>

                {/* Right Side: Information */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-8"
                >
                    <div className="prose prose-xl">
                        <p className="text-2xl text-slate-600 font-medium leading-relaxed">
                            {contentData.description}
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Duration Badge */}
                        <div className="flex items-center gap-3 text-slate-500 font-semibold uppercase tracking-widest text-sm">
                            <div className="px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200">
                                ⏱️ {contentData.duration}
                            </div>
                        </div>

                        {/* Tools */}
                        <div>
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                                Herramientas Recomendadas
                            </span>
                            <div className="flex flex-wrap gap-3">
                                {contentData.tools.map((tool, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + (index * 0.1) }}
                                        className="px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-slate-700 font-bold flex items-center gap-2"
                                    >
                                        <ArrowRight size={14} className="text-blue-500" />
                                        {tool}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CaseIntro;
