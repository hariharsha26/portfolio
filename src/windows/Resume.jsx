import React from 'react';
import { WindowControl } from '#components';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import { Download, Share2, Printer, Search, ZoomIn, ZoomOut } from "lucide-react";

const Resume = () => {
    return (
        <div className="flex flex-col h-full bg-[#525659] select-none">
            <div className="window-header flex-none flex items-center h-12 border-b border-gray-800 bg-[#323639] px-4">
                <div className="flex items-center gap-4">
                    <WindowControl target="resume" />
                    <span className="text-white font-medium text-xs ml-4">Resume.pdf</span>
                </div>

                <div className="flex items-center gap-4 ml-auto">
                    <div className="flex items-center gap-1 bg-black/20 rounded-md p-1 px-2">
                        <ZoomOut size={16} className="text-white/60 hover:text-white cursor-pointer" />
                        <span className="text-xs text-white px-2">100%</span>
                        <ZoomIn size={16} className="text-white/60 hover:text-white cursor-pointer" />
                    </div>
                    <div className="h-6 w-px bg-white/10 mx-1" />
                    <Printer size={18} className="text-white/60 hover:text-white cursor-pointer" />
                    <Download size={18} className="text-white/60 hover:text-white cursor-pointer" />
                    <Share2 size={18} className="text-white/60 hover:text-white cursor-pointer" />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-12 flex justify-center custom-scrollbar">
                <div className="bg-white w-full max-w-[800px] shadow-2xl p-16 flex flex-col gap-12 text-gray-800">
                    <header className="flex justify-between items-start">
                        <div>
                            <h1 className="text-5xl font-black tracking-tighter text-black mb-2">Hari Harsha</h1>
                            <p className="text-blue-600 font-bold tracking-widest uppercase text-xs">Full Stack Developer & Designer</p>
                        </div>
                        <div className="text-right space-y-1">
                            <p className="text-sm font-medium">hello@harsha.me</p>
                            <p className="text-sm font-medium">github.com/harsha</p>
                            <p className="text-sm font-medium">+91 12345 67890</p>
                        </div>
                    </header>

                    <section className="space-y-4">
                        <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">Experience</h2>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between items-end mb-1">
                                    <h3 className="font-bold text-lg text-black">Senior Frontend Developer</h3>
                                    <span className="text-sm text-gray-500 italic">2023 - Present</span>
                                </div>
                                <p className="text-sm text-blue-600 font-bold mb-2">Tech Solutions Inc.</p>
                                <p className="text-[13px] leading-relaxed text-gray-600">Leading the development of a flagship SaaS platform using React, Next.js, and GSAP. Improved performance by 40% and implemented a custom design system.</p>
                            </div>
                            <div>
                                <div className="flex justify-between items-end mb-1">
                                    <h3 className="font-bold text-lg text-black">Junior Web Developer</h3>
                                    <span className="text-sm text-gray-500 italic">2021 - 2023</span>
                                </div>
                                <p className="text-sm text-blue-600 font-bold mb-2">Creative Agency</p>
                                <p className="text-[13px] leading-relaxed text-gray-600">Developed interactive marketing sites for Fortune 500 clients. Specialized in CSS animations and responsive layouts.</p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">Education</h2>
                        <div>
                            <div className="flex justify-between items-end mb-1">
                                <h3 className="font-bold text-lg text-black">B.Tech in Computer Science</h3>
                                <span className="text-sm text-gray-500 italic">2017 - 2021</span>
                            </div>
                            <p className="text-sm text-blue-600 font-bold">University of Technology</p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xs font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "GSAP", "Three.js", "MongoDB", "Git"].map(skill => (
                                <span key={skill} className="px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-xs font-bold border border-gray-100">{skill}</span>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

const ResumeWindow = WindowWrapper(Resume, "resume");
export default ResumeWindow;
