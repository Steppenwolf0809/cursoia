import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const KeyPoints = ({ contentData }) => {
    return (
        <div className="h-full flex flex-col justify-center p-8 max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
            >
                <h2 className="text-5xl font-black text-slate-800 tracking-tight">
                    {contentData.heading}
                </h2>
            </motion.div>

            <div className="space-y-6">
                {contentData.points.map((point, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 }}
                        className="flex items-start gap-6 group"
                    >
                        <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center font-black text-2xl shadow-xl flex-shrink-0 group-hover:scale-110 group-hover:bg-blue-600 transition-all duration-300">
                            {point.number}
                        </div>

                        <div className={`
                            flex-1 p-6 rounded-2xl border transition-all duration-300
                            ${index % 2 === 0 ? 'bg-white border-slate-100' : 'bg-slate-50 border-slate-100'}
                            group-hover:shadow-lg group-hover:border-blue-100
                        `}>
                            <h3 className="text-2xl font-black text-slate-800 mb-2">
                                {point.title}
                            </h3>
                            <p className="text-xl text-slate-600 leading-relaxed font-medium">
                                {point.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default KeyPoints;
