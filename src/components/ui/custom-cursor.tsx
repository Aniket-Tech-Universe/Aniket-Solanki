"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);

    // Use MotionValues for direct DOM manipulation (Performance)
    // Start off-screen to prevent flash
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth physics for the ring
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const checkHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Robust check for interactive elements
            // Handles bubbling correctly by checking closest interactive ancestor
            const isInteractive = target.closest("a, button, input, textarea, [role='button'], .card, .glass, .cursor-hover");
            setIsHovering(!!isInteractive);
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", checkHover);

        // Prevent default cursor on desktop when component is mounted
        document.documentElement.style.cursor = "none";

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", checkHover);
            document.documentElement.style.cursor = "auto";
        };
    }, [mouseX, mouseY]);

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
            {/* Main Cursor Dot */}
            <motion.div
                className="cursor-dot fixed top-0 left-0 w-2 h-2 bg-white rounded-full mix-blend-difference z-[9999]"
                style={{
                    x: mouseX,
                    y: mouseY,
                }}
                // Centering handled via transform template to key off dynamic X and Y
                transformTemplate={({ x, y }) => `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`}
            />

            {/* Trailing Ring */}
            <motion.div
                className="cursor-ring fixed top-0 left-0 w-8 h-8 border border-white rounded-full mix-blend-difference z-[9998]"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
                transformTemplate={({ x, y, scale }) => `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? "rgba(255, 255, 255, 0.1)" : "transparent",
                    borderColor: isHovering ? "transparent" : "white"
                }}
                transition={{
                    scale: { duration: 0.2, type: "spring", stiffness: 300, damping: 20 },
                    backgroundColor: { duration: 0.2 },
                    borderColor: { duration: 0.2 }
                }}
            />
        </div>
    );
}
