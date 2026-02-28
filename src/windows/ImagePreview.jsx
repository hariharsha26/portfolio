import React from 'react';
import { WindowControl } from '#components';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import useWindowStore from '#store/window.js';
import { Share, Heart, Info, ChevronLeft, ChevronRight, Maximize2, RotateCw } from 'lucide-react';

const ImagePreview = () => {
    const { windows } = useWindowStore();
    const data = windows.imgfile?.data;

    if (!data) return (
        <div className="flex flex-col h-full bg-white">
            <div className="window-header">
                <WindowControl target="imgfile" />
                <p className="ml-4 text-xs font-semibold text-gray-500">Image Preview</p>
            </div>
            <div className="flex-1 flex items-center justify-center bg-gray-100">
                <p className="text-gray-400">No image selected</p>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col h-full bg-white select-none">
            <div className="window-header">
                <div className="flex items-center gap-4">
                    <WindowControl target="imgfile" />
                    <div className="flex items-center gap-1 ml-4 text-gray-400">
                        <ChevronLeft size={18} className="icon opacity-30" />
                        <ChevronRight size={18} className="icon opacity-30" />
                    </div>
                </div>

                <p className="absolute left-1/2 -translate-x-1/2 text-xs font-bold text-gray-600 truncate max-w-[200px]">
                    {data.name || 'Image'}
                </p>

                <div className="flex items-center gap-4 ml-auto">
                    <RotateCw className="icon" size={18} />
                    <Maximize2 className="icon" size={18} />
                    <div className="w-[1px] h-4 bg-gray-200 mx-1" />
                    <Share className="icon" size={18} />
                    <Heart className="icon" size={18} />
                    <Info className="icon" size={18} />
                </div>
            </div>

            <div className="flex-1 bg-[#f5f5f7] p-4 flex items-center justify-center overflow-hidden">
                <div className="relative group shadow-2xl rounded-lg overflow-hidden">
                    <img
                        src={data.imageUrl}
                        alt={data.name}
                        className="max-w-full max-h-[70vh] object-contain"
                    />
                </div>
            </div>

            <div className="h-12 border-t border-gray-100 bg-white/80 backdrop-blur-md flex items-center justify-center gap-2 px-4 shadow-inner">
                <p className="text-[10px] text-gray-400 font-medium tracking-tight">
                    {data.name} • 1.2 MB • JPG
                </p>
            </div>
        </div>
    );
};

const ImagePreviewWindow = WindowWrapper(ImagePreview, "imgfile");

export default ImagePreviewWindow;
