import React from 'react'
import { WindowControl } from '#components';
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import { ChevronLeft, PanelLeft, ShieldHalf, ChevronRight, Search, Share, Plus, Copy } from "lucide-react";
import { blogPosts } from "#constants";

const Safari = () => {
    return (
        <>
            <div className="window-header">
                <WindowControl target="safari" />

                <PanelLeft className="ml-10 icon" />

                <div className='flex items-center gap-1 ml-5'>
                    <ChevronLeft className='icon' />
                    <ChevronRight className='icon' />
                </div>

                <div className="flex items-center gap-3">
                    <ShieldHalf className='icon' />
                    <div className='search'>
                        <Search className='icon' />
                        <input
                            type="text"
                            placeholder='https://jsmastery.com/blog'
                            className='flex-1 border-none outline-none text-xs'
                            readOnly
                        />
                    </div>
                </div>
                <div className='flex items-center gap-3 ml-auto'>
                    <Share className='icon' />
                    <Plus className='icon' />
                    <Copy className='icon' />
                </div>
            </div>

            <div className='blog'>
                <h2>Latest Articles</h2>
                <div className='space-y-8'>
                    {blogPosts.map((post) => (
                        <div key={post.id} className='blog-post'>
                            <div className='col-span-3'>
                                <img src={post.image} alt={post.title} className="w-full h-auto rounded-lg shadow-sm" />
                            </div>
                            <div className='content col-span-9'>
                                <p className="text-gray-400 text-[10px] uppercase tracking-wider">{post.date}</p>
                                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight">{post.title}</h3>
                                <a href={post.link} target="_blank" rel="noreferrer" className="text-blue-500 text-xs font-medium hover:underline flex items-center gap-1 mt-2">
                                    Read more <ChevronRight size={12} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
