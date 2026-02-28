import { useRef } from 'react'
import { dockApps } from '#constants/index.js'
import { Tooltip } from 'react-tooltip'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import useWindowStore from '#store/window.js'

const Dock = () => {
    const { openWindow, minimizeWindow, windows } = useWindowStore()
    const dockRef = useRef(null)

    useGSAP(() => {
        const dock = dockRef.current
        if (!dock) return

        const icons = dock.querySelectorAll('.dock-icon')

        const animateIcons = (mouseX) => {
            const { left } = dock.getBoundingClientRect()

            icons.forEach(icon => {
                const { left: iconLeft, width } = icon.getBoundingClientRect()
                const center = iconLeft - left + width / 2
                const distance = Math.abs(mouseX - center)
                const intensity = Math.exp(-(distance ** 2.5) / 20000)

                gsap.to(icon, {
                    scale: 1 + 0.35 * intensity,
                    y: -20 * intensity,
                    duration: 0.2,
                    ease: 'power1.out'
                })
            })
        }

        const handleMouseMove = (e) => {
            const { left } = dock.getBoundingClientRect()
            animateIcons(e.clientX - left)
        }

        const resetIcons = () =>
            icons.forEach((icon) =>
                gsap.to(icon, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'power1.out'
                }),
            )

        dock.addEventListener('mousemove', handleMouseMove)
        dock.addEventListener('mouseleave', resetIcons)

        return () => {
            dock.removeEventListener('mousemove', handleMouseMove)
            dock.removeEventListener('mouseleave', resetIcons)
        }

    }, [])

    const toggleApp = (app) => {
        if (!app.canOpen) return

        const winState = windows[app.id]
        if (!winState) return

        if (winState.isOpen) {
            if (winState.isMinimized) {
                openWindow(app.id) // This currently unminimizes in our store logic
            } else {
                minimizeWindow(app.id)
            }
        } else {
            openWindow(app.id)
        }
    }

    return (
        <section id="dock">
            <div ref={dockRef} className="dock-container">
                {dockApps.map(({ id, name, icon, canOpen }) => (
                    <div
                        key={id}
                        id={`dock-icon-${id}`}
                        className="relative flex justify-center"
                    >
                        <button
                            type="button"
                            className={`dock-icon flex flex-col items-center group ${windows[id]?.isOpen ? 'open' : ''}`}
                            aria-label={name}
                            data-tooltip-id="dock-tooltip"
                            data-tooltip-content={name}
                            data-tooltip-delay-show={150}
                            disabled={!canOpen}
                            onClick={() => toggleApp({ id, name, icon, canOpen })}
                        >
                            <img
                                src={`/images/${icon}`}
                                alt={name}
                                loading="lazy"
                                className={canOpen ? "w-full h-full" : "w-full h-full opacity-60"}
                            />
                        </button>
                    </div>
                ))}

                <Tooltip
                    id="dock-tooltip"
                    place="top"
                    className="tooltip"
                />
            </div>
        </section>
    )
}

export default Dock
