import React from 'react';
import { WindowControl } from '#components';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import { FileText, Save, Share, Trash, Search } from "lucide-react";
import useWindowStore from '#store/window.js';

const TxtFile = () => {
    const { windows } = useWindowStore();
    const data = windows.txtfile?.data || { title: "Untitled.txt", content: ["No content."] };

    return (
        <div className="flex flex-col h-full bg-white select-none">
            <div className="window-header flex-none flex items-center h-12 border-b border-gray-200 bg-gray-50/50 backdrop-blur-md px-4">
                <div className="flex items-center gap-4">
                    <WindowControl target="txtfile" />
                    <div className="flex items-center gap-2 ml-4">
                        <FileText size={16} className="text-gray-400" />
                        <span className="font-bold text-gray-800 text-xs">{data.title}</span>
                    </div>
                </div>

                <div className="flex items-center gap-4 ml-auto">
                    <Save size={18} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                    <Share size={18} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                    <Trash size={18} className="text-gray-400 hover:text-red-500 cursor-pointer" />
                </div>
            </div>

            <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                <div className="max-w-2xl mx-auto space-y-4">
                    {data.subtitle && (
                        <h2 className="text-2xl font-black text-gray-900 border-b-4 border-blue-500 inline-block mb-6">{data.subtitle}</h2>
                    )}
                    {data.image && (
                        <img src={data.image} alt="" className="w-full h-auto rounded-2xl shadow-lg mb-8" />
                    )}
                    {Array.isArray(data.content || data.description) ? (
                        (data.content || data.description).map((para, i) => (
                            <p key={i} className="text-lg text-gray-700 leading-relaxed indent-8 first:indent-0">
                                {para}
                            </p>
                        ))
                    ) : (
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {data.content || data.description || "No content."}
                        </p>
                    )}
                </div>
            </div>

            <div className="h-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between px-4">
                <span className="text-[10px] text-gray-400 font-medium">Character Count: 1,234</span>
                <span className="text-[10px] text-gray-400 font-medium">UTF-8</span>
            </div>
        </div>
    );
};

const TxtFileWindow = WindowWrapper(TxtFile, "txtfile");
export default TxtFileWindow;
