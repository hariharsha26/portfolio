import React from 'react'
import gsap from 'gsap';
//import WindowWrapper from '#hoc/WindowWrapper';
import { Navbar , Welcome , Dock } from '#components';
import Terminal from '#windows/Terminal';
import Draggable from 'gsap/Draggable';
gsap.registerPlugin(Draggable);

const App = () => {
    return (
        <main>
            <Navbar />
            <Welcome />
            <Dock />

            <Terminal />
        </main>
    )
}
export default App