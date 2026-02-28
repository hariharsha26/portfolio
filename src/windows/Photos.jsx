import React, { useState, useMemo } from 'react';
import { WindowControl } from '#components';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import {
    ChevronLeft,
    ChevronRight,
    Search,
    Share,
    Info,
    Heart,
    LayoutGrid,
    SquarePlay,
    Plus,
    MoreHorizontal
} from "lucide-react";
import { photosLinks, gallery, albumGallery } from "#constants";
import useWindowStore from '#store/window.js';

const Photos = () => {
    const { openWindow } = useWindowStore();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("library");
    const [selectedAlbum, setSelectedAlbum] = useState(null);

    const filteredImages = useMemo(() => {
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return gallery.filter(img =>
                img.name.toLowerCase().includes(query) ||
                img.category.toLowerCase().includes(query)
            );
        }

        let baseImages = gallery;
        if (selectedAlbum) {
            baseImages = gallery.filter(img => img.category.toLowerCase() === selectedAlbum.id.toLowerCase());
        } else if (activeTab === "favorites") {
            baseImages = gallery.slice(0, 3);
        } else if (activeTab === "people") {
            baseImages = gallery.filter(img => img.category === "People");
        } else if (activeTab === "memories") {
            baseImages = gallery.slice(0, 5);
        }

        return baseImages;
    }, [searchQuery, activeTab, selectedAlbum]);

    const handleAlbumClick = (album) => {
        setSelectedAlbum(album);
        setActiveTab("albums");
    };

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        setSelectedAlbum(null);
    };

    const handleImageClick = (img) => {
        openWindow("imgfile", { imageUrl: img.img, name: img.name });
    };

    return (
        <div className="flex flex-col h-full bg-white select-none">
            {/* Header */}
            <div className="window-header flex-none flex items-center h-14 border-b border-gray-200 bg-gray-50/50 backdrop-blur-md px-4">
                <div className="flex items-center gap-4">
                    <WindowControl target="photos" />
                    <div className="flex items-center gap-1.5 ml-4">
                        <ChevronLeft
                            size={22}
                            className={`icon ${selectedAlbum ? 'opacity-100 text-gray-700' : 'opacity-30 text-gray-400'}`}
                            onClick={() => selectedAlbum && setSelectedAlbum(null)}
                        />
                        <ChevronRight size={22} className="icon opacity-30 text-gray-400" />
                    </div>
                </div>

                <div className="flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                    <LayoutGrid className="icon text-blue-500" size={22} />
                    <SquarePlay className="icon text-gray-500" size={22} />
                </div>

                <div className="flex items-center gap-3 ml-auto">
                    <div className="flex items-center gap-2 bg-gray-200/60 border border-gray-300/40 rounded-lg px-2.5 py-1.5 w-60 group transition-all focus-within:bg-white focus-within:w-72 focus-within:shadow-sm">
                        <Search size={18} className="text-gray-400 group-focus-within:text-blue-500" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-none outline-none text-[13px] w-full placeholder:text-gray-400 text-gray-700 font-medium"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <Plus size={18} className="rotate-45" />
                            </button>
                        )}
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                        <Share className="icon p-1.5" size={22} />
                        <Heart className="icon p-1.5" size={22} />
                        <Info className="icon p-1.5" size={22} />
                    </div>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden h-full">
                {/* Sidebar */}
                <aside className="w-56 bg-gray-50/90 border-r border-gray-200 py-6 overflow-y-auto">
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-6 mb-2">Photos</h2>
                            <ul className="px-3 space-y-0.5">
                                {photosLinks.filter(l => !l.isHeader && ["library", "memories", "places", "people", "favorites"].includes(l.id)).map((link) => (
                                    <li
                                        key={link.id}
                                        onClick={() => handleTabClick(link.id)}
                                        className={`flex items-center gap-3 px-3 py-1.5 rounded-lg cursor-default transition-all ${activeTab === link.id && !selectedAlbum ? 'bg-gray-200/80 text-blue-600 shadow-sm' : 'hover:bg-gray-200/50 text-gray-700'}`}
                                    >
                                        <img src={link.icon} alt="" className="w-5 h-5 flex-none" />
                                        <span className="text-[13px] font-medium">{link.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <div className="flex items-center justify-between px-6 mb-2">
                                <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Albums</h2>
                                <Plus size={14} className="text-gray-400 hover:text-gray-600 cursor-pointer" />
                            </div>
                            <ul className="px-3 space-y-0.5">
                                {albumGallery.map((album) => (
                                    <li
                                        key={album.id}
                                        onClick={() => handleAlbumClick(album)}
                                        className={`flex items-center gap-3 px-3 py-1.5 rounded-lg cursor-default transition-all ${selectedAlbum?.id === album.id ? 'bg-gray-200/80 text-blue-600 shadow-sm' : 'hover:bg-gray-200/50 text-gray-700'}`}
                                    >
                                        <div className="w-5 h-5 rounded-sm bg-gray-300 overflow-hidden flex-none shadow-inner border border-white/20">
                                            <img src={album.cover} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <span className="text-[13px] font-medium truncate">{album.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="pt-4 px-6 border-t border-gray-100">
                            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">External</h2>
                            <p className="text-[12px] text-gray-400 italic">No shared library</p>
                        </div>
                    </div>
                </aside>

                {/* Content Area */}
                <main className="flex-1 bg-white overflow-y-auto custom-scrollbar">
                    <div className="p-8 pb-20">
                        <div className="mb-10 flex justify-between items-end">
                            <div>
                                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                                    {searchQuery ? `Results for "${searchQuery}"` : (selectedAlbum ? selectedAlbum.name : (photosLinks.find(l => l.id === activeTab)?.title || "Library"))}
                                </h1>
                                <p className="text-gray-500 text-[13px] font-medium mt-1">
                                    {filteredImages.length} {filteredImages.length === 1 ? 'Photo' : 'Photos'}
                                </p>
                            </div>
                            {!searchQuery && (
                                <div className="flex gap-2">
                                    <button className="bg-gray-50 text-blue-600 text-[13px] font-bold px-4 py-1.5 rounded-full hover:bg-gray-100 transition-colors border border-gray-200/50 shadow-sm">Filter</button>
                                    <button className="icon p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors border border-transparent">
                                        <MoreHorizontal size={20} />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                            {filteredImages.length > 0 ? (
                                filteredImages.map((img) => (
                                    <div
                                        key={img.id}
                                        className="flex flex-col gap-2.5 group cursor-pointer animate-in fade-in duration-500"
                                        onClick={() => handleImageClick(img)}
                                    >
                                        <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 shadow-sm border border-gray-200/40 group-hover:shadow-xl group-hover:border-blue-300 transition-all duration-300">
                                            <img src={img.img} alt={img.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <p className="text-[12px] font-bold text-gray-600 truncate px-2 text-center group-hover:text-blue-500 transition-colors tracking-tight">
                                            {img.name}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full py-40 text-center">
                                    <div className="bg-gray-50 size-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-gray-100">
                                        <Search size={32} className="text-gray-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">No matching photos</h3>
                                    <p className="text-gray-400 text-sm max-w-[240px] mx-auto">Try searching for broader terms or categories like "Nature".</p>
                                    <button onClick={() => setSearchQuery("")} className="mt-6 text-blue-500 font-bold text-sm hover:underline">Reset search</button>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

const PhotosWindow = WindowWrapper(Photos, "photos");

export default PhotosWindow;
