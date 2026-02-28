import React, { useState } from 'react';
import { WindowControl } from '#components';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import { Mail, Github, Linkedin, Twitter, MessageSquare, Send } from "lucide-react";
import { socials } from "#constants";

const Contact = () => {
    const [status, setStatus] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus("success");
        setTimeout(() => setStatus(""), 3000);
    };

    return (
        <div className="flex flex-col h-full bg-[#fbfbfb] select-none">
            <div className="window-header flex-none flex items-center h-12 border-b border-gray-200 bg-white/50 backdrop-blur-md px-4">
                <WindowControl target="contact" />
                <div className="ml-4 font-bold text-gray-800">Get in Touch</div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                <div className="w-1/3 bg-gray-50 p-8 border-r border-gray-200 flex flex-col gap-8">
                    <div>
                        <h2 className="text-2xl font-black text-gray-900 leading-tight mb-2">Let's talk about your next project</h2>
                        <p className="text-gray-500 text-sm">Always open to new opportunities and interesting collaborations.</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-gray-700 hover:text-blue-500 transition-colors cursor-pointer">
                            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex-center border border-gray-100">
                                <Mail size={20} />
                            </div>
                            <span className="text-sm font-medium">hello@harsha.me</span>
                        </div>
                        {socials.map(social => (
                            <a
                                key={social.id}
                                href={social.link}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-3 text-gray-700 hover:text-blue-500 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex-center border border-gray-100">
                                    <img src={social.icon} alt="" className="w-5 h-5" />
                                </div>
                                <span className="text-sm font-medium">{social.text}</span>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="flex-1 p-10 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Your Name</label>
                            <input
                                required
                                type="text"
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all shadow-sm"
                                placeholder="Hari Harsha"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                            <input
                                required
                                type="email"
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all shadow-sm"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Message</label>
                            <textarea
                                required
                                rows={4}
                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all shadow-sm resize-none"
                                placeholder="How can I help you?"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 transition-all flex-center gap-2 group"
                        >
                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            Send Message
                        </button>

                        {status === "success" && (
                            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl font-medium text-center border border-emerald-100 animate-in fade-in zoom-in slide-in-from-top-4 duration-300">
                                Message sent successfully! I'll get back to you soon.
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

const ContactWindow = WindowWrapper(Contact, "contact");
export default ContactWindow;
