import React from 'react';
import { Mail, MessageSquare, Linkedin, Globe, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ICON_MAP = {
    Mail,
    MessageSquare,
    Linkedin,
    Globe
};

const Contact = ({ contentData }) => {
    return (
        <div className="h-full flex flex-col justify-center p-8 max-w-6xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h2 className="text-5xl font-black text-slate-800 tracking-tight">
                    {contentData.heading}
                </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-2xl flex flex-col items-center text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 w-full h-32 bg-gradient-to-r from-blue-500 to-indigo-600" />

                    <div className="w-40 h-40 rounded-full border-8 border-white shadow-xl mb-6 relative z-10 overflow-hidden bg-slate-200">
                        {contentData.instructor.image ? (
                            <img
                                src={contentData.instructor.image}
                                alt={contentData.instructor.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-slate-300 flex items-center justify-center text-slate-500 text-4xl font-black">
                                {contentData.instructor.name.charAt(0)}
                            </div>
                        )}
                    </div>

                    <h3 className="text-3xl font-black text-slate-800 mb-2">
                        {contentData.instructor.name}
                    </h3>
                    <p className="text-lg text-slate-500 font-bold uppercase tracking-wider mb-8">
                        {contentData.instructor.role}
                    </p>

                    <div className="space-y-4 w-full">
                        {contentData.channels.map((channel, index) => {
                            const Icon = ICON_MAP[channel.icon] || Mail;
                            return (
                                <a
                                    key={index}
                                    href={channel.action}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-blue-50 hover:border-blue-200 hover:shadow-md transition-all duration-300 group min-w-0"
                                >
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-400 group-hover:text-blue-500 shadow-sm transition-colors flex-shrink-0">
                                        <Icon size={20} />
                                    </div>
                                    <div className="text-left min-w-0 flex-1">
                                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-widest">{channel.label}</span>
                                        <span className="font-bold text-slate-700 group-hover:text-blue-700 transition-colors break-all text-sm">{channel.value}</span>
                                    </div>
                                    <ArrowRight className="ml-auto text-slate-300 group-hover:text-blue-400 transition-colors flex-shrink-0" />
                                </a>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Community Section */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative"
                >
                    <div className="absolute inset-0 bg-green-500 rounded-[3rem] opacity-10 rotate-3 transform scale-95" />

                    <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-xl relative z-10 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-3xl mx-auto flex items-center justify-center text-green-600 mb-8 transform -rotate-6">
                            <Users size={40} />
                        </div>

                        <h3 className="text-3xl font-black text-slate-800 mb-4">
                            {contentData.community.title}
                        </h3>

                        <p className="text-xl text-slate-600 leading-relaxed mb-10">
                            {contentData.community.description}
                        </p>

                        <div className="inline-block px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-black text-lg shadow-lg hover:shadow-green-200 transition-all cursor-pointer transform hover:-translate-y-1">
                            {contentData.community.action}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
