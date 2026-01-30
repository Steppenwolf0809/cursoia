import React from 'react';
import { Brain, MessageSquare, Search, PenTool, Image as ImageIcon, Video, Mic, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

const ICON_MAP = {
    Brain,
    MessageSquare,
    Search,
    PenTool,
    Image: ImageIcon,
    Video,
    Mic
};

const ToolSummary = ({ contentData }) => {
    return (
        <div className="h-full flex flex-col justify-center p-8 max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-10"
            >
                <h2 className="text-4xl font-black text-slate-800">
                    {contentData.heading}
                </h2>
            </motion.div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden mb-8">
                {contentData.tools.map((tool, index) => {
                    const Icon = ICON_MAP[tool.icon] || Brain;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`
                                p-6 flex flex-col sm:flex-row items-center gap-6
                                ${index !== contentData.tools.length - 1 ? 'border-b border-slate-100' : ''}
                                hover:bg-slate-50 transition-colors duration-300
                            `}
                        >
                            <div className="w-16 h-16 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 shadow-inner">
                                <Icon size={32} />
                            </div>

                            <div className="flex-1 text-center sm:text-left">
                                <h3 className="text-xl font-black text-slate-800 mb-1">
                                    {tool.name}
                                </h3>
                                <p className="text-slate-600 font-medium leading-relaxed">
                                    {tool.useFor}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {contentData.tip && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 flex gap-4 items-center shadow-lg"
                >
                    <Lightbulb className="w-8 h-8 text-yellow-600 flex-shrink-0" />
                    <p className="text-yellow-900 font-bold text-lg italic">
                        "{contentData.tip}"
                    </p>
                </motion.div>
            )}
        </div>
    );
};

export default ToolSummary;
