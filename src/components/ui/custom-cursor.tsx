"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);

    // Use MotionValues for direct DOM manipulation (Performance)
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

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", checkHover);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
            {/* Main Cursor Dot */}
            <motion.div
                className="cursor-dot fixed top-0 left-0 w-2 h-2 bg-white rounded-full mix-blend-difference"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />

            {/* Trailing Ring */}
            <motion.div
                className="cursor-ring fixed top-0 left-0 w-8 h-8 border border-white rounded-full mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
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
