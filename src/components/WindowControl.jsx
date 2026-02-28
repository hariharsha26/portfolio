import useWindowStore from '#store/window.js'
import React from 'react'

const WindowControl = ({ target }) => {
  const { closeWindow, minimizeWindow, maximizeWindow } = useWindowStore();

  return (
    <div id='window-controls' className="group/controls flex gap-2">
      <div
        className='close group relative size-3 rounded-full bg-[#ff6157] border border-black/5 flex items-center justify-center cursor-pointer active:bg-[#e04f45]'
        onClick={(e) => { e.stopPropagation(); closeWindow(target); }}
      >
        <svg className="opacity-0 group-hover/controls:opacity-100 transition-opacity" width="6" height="6" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L6 6M1 6L6 1" stroke="#4c0000" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      <div
        className='minimize group relative size-3 rounded-full bg-[#ffc030] border border-black/5 flex items-center justify-center cursor-pointer active:bg-[#deb029]'
        onClick={(e) => { e.stopPropagation(); minimizeWindow(target); }}
      >
        <svg className="opacity-0 group-hover/controls:opacity-100 transition-opacity" width="6" height="2" viewBox="0 0 7 1" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.5 0.5H6.5" stroke="#995700" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      <div
        className='maximize group relative size-3 rounded-full bg-[#2acb42] border border-black/5 flex items-center justify-center cursor-pointer active:bg-[#1fa334]'
        onClick={(e) => { e.stopPropagation(); maximizeWindow(target); }}
      >
        <svg className="opacity-0 group-hover/controls:opacity-100 transition-opacity" width="6" height="6" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 3.5H6M3.5 1V6" stroke="#006500" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}

export default WindowControl
