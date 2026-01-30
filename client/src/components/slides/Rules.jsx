import React from 'react';
import { Clock, Share2, Trophy, HelpCircle, AlertCircle, Info, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ICON_MAP = {
    Clock,
    Share2,
    Trophy,
    HelpCircle,
    AlertCircle,
    Info,
    CheckCircle
};

const Rules = ({ contentData }) => {
    return (
        <div className="h-full flex flex-col justify-center p-8 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <div className="inline-block p-3 rounded-2xl bg-primary/10 text-primary mb-4">
                    <Trophy className="w-8 h-8" />
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
                    {contentData.heading}
                </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
                {contentData.rules.map((rule, index) => {
                    const Icon = ICON_MAP[rule.icon] || Info;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex gap-5 group"
                        >
                            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-blue-50 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <Icon className="w-7 h-7" strokeWidth={2.5} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 mb-2">
                                    {rule.title}
                                </h3>
                                <p className="text-slate-600 leading-relaxed font-medium">
                                    {rule.description}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {contentData.tip && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="bg-yellow-50 border border-yellow-100 rounded-xl p-6 flex flex-col md:flex-row items-center justify-center gap-4 text-center md:text-left mx-auto max-w-4xl"
                >
                    <div className="p-2 bg-yellow-100 rounded-full text-yellow-600">
                        <Info className="w-6 h-6" />
                    </div>
                    <p className="text-yellow-800 font-bold text-lg">
                        {contentData.tip}
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default Rules;
