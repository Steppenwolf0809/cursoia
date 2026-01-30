import React, { useState } from 'react';
import { Lightbulb, ArrowDown, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const SetupGuide = ({ contentData }) => {
    const [completedSteps, setCompletedSteps] = useState([]);

    const toggleStep = (index) => {
        if (completedSteps.includes(index)) {
            setCompletedSteps(completedSteps.filter(i => i !== index));
        } else {
            setCompletedSteps([...completedSteps, index]);
        }
    };

    return (
        <div className="h-full flex flex-col justify-center p-8 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-10 text-center"
            >
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-bold text-sm uppercase tracking-widest mb-4">
                    Guía de Configuración
                </span>
                <h2 className="text-4xl font-black text-slate-800">
                    {contentData.heading}
                </h2>
            </motion.div>

            <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-8 top-8 bottom-8 w-1 bg-slate-100 -z-10" />

                <div className="space-y-8">
                    {contentData.steps.map((step, index) => {
                        const isCompleted = completedSteps.includes(index);

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.15 }}
                                className="flex gap-6 group cursor-pointer"
                                onClick={() => toggleStep(index)}
                            >
                                {/* Step Number/Check */}
                                <div className={`
                                    w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 text-xl font-black border-4 shadow-lg transition-all duration-300
                                    ${isCompleted
                                        ? 'bg-green-500 border-green-200 text-white scale-110'
                                        : 'bg-white border-slate-100 text-slate-400 group-hover:border-blue-200 group-hover:text-blue-500'}
                                `}>
                                    {isCompleted ? <Check size={32} /> : step.step}
                                </div>

                                {/* Content */}
                                <div className={`
                                    flex-1 bg-white p-6 rounded-2xl border transition-all duration-300
                                    ${isCompleted
                                        ? 'border-green-200 shadow-md opacity-50' // Dim when completed
                                        : 'border-slate-100 shadow-sm group-hover:border-blue-200 group-hover:shadow-md'}
                                `}>
                                    <h3 className={`text-xl font-bold mb-2 transition-colors ${isCompleted ? 'text-green-800' : 'text-slate-800'}`}>
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-600 font-medium leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {contentData.tip && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="mt-12 bg-yellow-50 border-2 border-yellow-200 p-6 rounded-2xl flex items-center gap-5 shadow-lg shadow-yellow-100"
                >
                    <div className="bg-yellow-400 p-3 rounded-xl text-yellow-900 shadow-sm">
                        <Lightbulb size={28} strokeWidth={2.5} />
                    </div>
                    <div>
                        <span className="block text-xs font-bold text-yellow-700 uppercase tracking-widest mb-1">
                            Pro Tip
                        </span>
                        <p className="text-yellow-900 font-bold text-lg">
                            {contentData.tip}
                        </p>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default SetupGuide;
