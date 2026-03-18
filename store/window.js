import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { WINDOW_CONFIG, INITIAL_Z_INDEX } from '#constants';

const useWindowStore = create(
    immer((set) => ({
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,

        openWindow: (windowKey, data = null) => set((state) => {
            const win = state.windows[windowKey];
            if (!win) return;
            win.isOpen = true;
            win.isMinimized = false;
            win.zIndex = state.nextZIndex;
            win.data = data ?? win.data;
            state.nextZIndex += 1;
        }),

        closeWindow: (windowKey) => set((state) => {
            const win = state.windows[windowKey];
            if (!win) return;
            win.isOpen = false;
            win.isMinimized = false;
            win.isMaximized = false;
            win.data = null;
            win.zIndex = INITIAL_Z_INDEX;
        }),

        focusWindow: (windowKey) => set((state) => {
            const win = state.windows[windowKey];
            if (!win) return;
            win.zIndex = state.nextZIndex++;
            if (win.isMinimized) {
                win.isMinimized = false;
            }
        }),

        minimizeWindow: (windowKey) => set((state) => {
            const win = state.windows[windowKey];
            if (!win) return;
            win.isMinimized = true;
        }),

        maximizeWindow: (windowKey) => set((state) => {
            const win = state.windows[windowKey];
            if (!win) return;
            win.isMaximized = !win.isMaximized;
            win.zIndex = state.nextZIndex++;
        }),

        toggleMinimize: (windowKey) => set((state) => {
            const win = state.windows[windowKey];
            if (!win) return;
            win.isMinimized = !win.isMinimized;
            if (!win.isMinimized) {
                win.zIndex = state.nextZIndex++;
            }
        }),
    })),
);

export default useWindowStore;