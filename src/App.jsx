import React from 'react'
import gsap from 'gsap';

import { Navbar, Welcome, Dock } from '#components';
import { Terminal, Safari, Photos, ImagePreview, Finder, Contact, Resume, TxtFile } from '#windows';
import Draggable from 'gsap/Draggable';
gsap.registerPlugin(Draggable);

const App = () => {
    return (
        <main>
            <Navbar />
            <Welcome />
            <Dock />

            <Terminal />
            <Safari />
            <Photos />
            <ImagePreview />
            <Finder />
            <Contact />
            <Resume />
            <TxtFile />
        </main>
    )
}
export default App