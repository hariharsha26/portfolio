import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import useWindowStore from "#store/window.js";
import gsap from "gsap";
import Draggable from "gsap/Draggable";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows } = useWindowStore();
    const entry = windows[windowKey] || {};
    const { isOpen, isMinimized, isMaximized, zIndex } = entry;

    const ref = useRef(null);
    const isMountedRef = useRef(false);
    const [lastNonMaximizedRect, setLastNonMaximizedRect] = useState(null);

    // Initial setup and Draggable
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      gsap.registerPlugin(Draggable);

      // Centering logic that doesn't use conflicting CSS transforms
      if (!isMountedRef.current) {
        const viewportW = window.innerWidth;
        const viewportH = window.innerHeight;
        const width = el.offsetWidth;
        const height = el.offsetHeight;

        gsap.set(el, {
          x: (viewportW - width) / 2,
          y: (viewportH - height) / 2,
        });
      }

      const [instance] = Draggable.create(el, {
        trigger: el.querySelector(".window-header"),
        onPress: () => focusWindow(windowKey),
        onDragStart: function () {
          if (isMaximized) return false;
        },
        bounds: "main",
      });

      const resizers = el.querySelectorAll(".resizer");
      const subInstances = [];

      resizers.forEach((resizer) => {
        const type = resizer.getAttribute("data-resize");
        const subInstance = Draggable.create(resizer, {
          type: "x,y",
          onPress: function (e) {
            e.stopPropagation();
            if (isMaximized) return false;
            focusWindow(windowKey);
            this.startWidth = el.offsetWidth;
            this.startHeight = el.offsetHeight;
            this.startX = gsap.getProperty(el, "x");
            this.startY = gsap.getProperty(el, "y");
          },
          onDrag: function () {
            let w = this.startWidth + (type.includes("r") ? this.x : type.includes("l") ? -this.x : 0);
            let h = this.startHeight + (type.includes("b") ? this.y : type.includes("t") ? -this.y : 0);
            let x = this.startX + (type.includes("l") ? this.x : 0);
            let y = this.startY + (type.includes("t") ? this.y : 0);

            const minW = 400, minH = 300;
            if (w < minW) { if (type.includes("l")) x = this.startX + (this.startWidth - minW); w = minW; }
            if (h < minH) { if (type.includes("t")) y = this.startY + (this.startHeight - minH); h = minH; }

            gsap.set(el, { width: w, height: h, x: x, y: y });
          },
          onRelease: function () {
            gsap.set(this.target, { x: 0, y: 0 });
          }
        })[0];
        subInstances.push(subInstance);
      });

      return () => {
        instance.kill();
        subInstances.forEach(si => si.kill());
      };
    }, [isMaximized]);

    // Animation: Open / Close
    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      if (isOpen && !isMinimized) {
        el.style.display = "flex";
        gsap.fromTo(el,
          { scale: 0.92, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      } else if (!isOpen && isMountedRef.current) {
        gsap.to(el, {
          scale: 0.95, opacity: 0, duration: 0.2, ease: "power2.in",
          onComplete: () => { el.style.display = "none"; }
        });
      }
    }, [isOpen]);

    // Animation: Minimize / Restore (Genie)
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isMountedRef.current) return;

      if (isMinimized) {
        if (!isMaximized) {
          setLastNonMaximizedRect({
            width: el.offsetWidth,
            height: el.offsetHeight,
            x: gsap.getProperty(el, "x"),
            y: gsap.getProperty(el, "y")
          });
        }

        const dockIcon = document.querySelector(`#dock-icon-${windowKey}`);
        const dockRect = dockIcon ? dockIcon.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight };
        const windowRect = el.getBoundingClientRect();

        const deltaX = (dockRect.left + dockRect.width / 2) - (windowRect.left + windowRect.width / 2);
        const deltaY = (dockRect.top + dockRect.height / 2) - (windowRect.top + windowRect.height / 2);

        gsap.to(el, {
          x: `+=${deltaX}`,
          y: `+=${deltaY}`,
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => { el.style.display = "none"; }
        });
      } else if (isOpen) {
        el.style.display = "flex";
        gsap.to(el, {
          scale: 1, opacity: 1,
          x: isMaximized ? 0 : (lastNonMaximizedRect?.x || gsap.getProperty(el, "x")),
          y: isMaximized ? 38 : (lastNonMaximizedRect?.y || gsap.getProperty(el, "y")),
          duration: 0.5,
          ease: "power2.out"
        });
      }
    }, [isMinimized]);

    // Handle Maximize
    useGSAP(() => {
      const el = ref.current;
      if (!el || !isMountedRef.current || isMinimized) return;

      if (isMaximized) {
        setLastNonMaximizedRect({
          width: el.offsetWidth,
          height: el.offsetHeight,
          x: gsap.getProperty(el, "x"),
          y: gsap.getProperty(el, "y")
        });

        gsap.to(el, {
          width: "100%",
          height: "calc(100% - 38px)", // minus navbar
          x: 0,
          y: 38,
          duration: 0.4,
          ease: "power3.inOut"
        });
      } else if (lastNonMaximizedRect) {
        gsap.to(el, {
          width: lastNonMaximizedRect.width,
          height: lastNonMaximizedRect.height,
          x: lastNonMaximizedRect.x,
          y: lastNonMaximizedRect.y,
          duration: 0.4,
          ease: "power3.inOut"
        });
      }
    }, [isMaximized]);

    useEffect(() => {
      isMountedRef.current = true;
    }, []);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex }}
        className={`fixed window-node pointer-events-auto shadow-2xl ${isMaximized ? 'rounded-none' : 'rounded-xl'}`}
      >
        {!isMaximized && (
          <>
            <div className="resizer resizer-r" data-resize="r" />
            <div className="resizer resizer-b" data-resize="b" />
            <div className="resizer resizer-rb" data-resize="rb" />
            <div className="resizer resizer-l" data-resize="l" />
            <div className="resizer resizer-t" data-resize="t" />
          </>
        )}
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default WindowWrapper;