import React, { useState } from 'react';
import { WindowControl } from '#components';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import { ChevronLeft, ChevronRight, Search, Share, Copy, LayoutGrid, List } from "lucide-react";
import { locations } from "#constants";
import useWindowStore from '#store/window.js';

const Finder = () => {
    const { openWindow } = useWindowStore();
    const [currentPath, setCurrentPath] = useState(["work"]);
    const [viewMode, setViewMode] = useState("grid");

    const currentFolder = currentPath.reduce((acc, folderKey) => {
        if (acc && acc.children) {
            return acc.children.find(child => child.type === folderKey || child.name === folderKey) || acc;
        }
        return locations[folderKey] || acc;
    }, locations);

    const handleBack = () => {
        if (currentPath.length > 1) {
            setCurrentPath(prev => prev.slice(0, -1));
        }
    };

    const handleItemClick = (item) => {
        if (item.kind === "folder") {
            setCurrentPath(prev => [...prev, item.name]);
        } else if (item.kind === "file") {
            if (item.fileType === "img") {
                openWindow("imgfile", { imageUrl: item.imageUrl, name: item.name });
            } else if (item.fileType === "txt") {
                openWindow("txtfile", { title: item.name, content: item.description });
            } else if (item.fileType === "url") {
                window.open(item.href, "_blank");
            }
        }
    };

    return (
        <div className="flex flex-col h-full bg-white select-none">
            <div className="window-header flex-none flex items-center h-14 border-b border-gray-200 bg-gray-50/50 backdrop-blur-md px-4">
                <div className="flex items-center gap-4">
                    <WindowControl target="finder" />
                    <div className="flex items-center gap-1.5 ml-4">
                        <ChevronLeft
                            size={20}
                            className={`icon ${currentPath.length > 1 ? 'opacity-100' : 'opacity-30'}`}
                            onClick={handleBack}
                        />
                        <ChevronRight size={20} className="icon opacity-30" />
                    </div>
                </div>

                <div className="flex items-center gap-1 absolute left-1/2 -translate-x-1/2 font-bold text-gray-700">
                    {currentFolder?.name || "Finder"}
                </div>

                <div className="flex items-center gap-3 ml-auto">
                    <div className="flex bg-gray-200/50 rounded-lg p-0.5">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={`p-1 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                        >
                            <LayoutGrid size={16} className={viewMode === 'grid' ? 'text-blue-500' : 'text-gray-500'} />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={`p-1 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
                        >
                            <List size={16} className={viewMode === 'list' ? 'text-blue-500' : 'text-gray-500'} />
                        </button>
                    </div>
                    <Search className="icon p-1.5" size={20} />
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <aside className="w-48 bg-gray-50/50 border-r border-gray-200 py-4 px-2">
                    <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-3 mb-2">Favorites</h2>
                    <ul className="space-y-0.5">
                        {Object.entries(locations).map(([key, loc]) => (
                            <li
                                key={key}
                                onClick={() => setCurrentPath([key])}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-default transition-colors ${currentPath[0] === key ? 'bg-gray-200/80 text-blue-600' : 'hover:bg-gray-200/50 text-gray-700'}`}
                            >
                                <img src={loc.icon} alt="" className="w-4 h-4" />
                                <span className="text-[13px] font-medium">{loc.name}</span>
                            </li>
                        ))}
                    </ul>
                </aside>

                <main className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                    <div className={viewMode === 'grid' ? "grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-6" : "space-y-1"}>
                        {currentFolder?.children?.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => handleItemClick(item)}
                                className={viewMode === 'grid' ?
                                    "flex flex-col items-center gap-1 group cursor-default" :
                                    "flex items-center gap-3 px-3 py-1 rounded-md hover:bg-blue-50 group cursor-default"
                                }
                            >
                                <div className={viewMode === 'grid' ? "w-16 h-16 flex-center rounded-xl group-hover:bg-gray-100 transition-colors" : "w-5 h-5 flex-center"}>
                                    <img src={item.icon} alt="" className={viewMode === 'grid' ? "w-12 h-12 object-contain" : "w-4 h-4 object-contain"} />
                                </div>
                                <span className={viewMode === 'grid' ? "text-[11px] text-center font-medium line-clamp-2 px-1 text-gray-700" : "text-[13px] text-gray-700"}>
                                    {item.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

const FinderWindow = WindowWrapper(Finder, "finder");
export default FinderWindow;
