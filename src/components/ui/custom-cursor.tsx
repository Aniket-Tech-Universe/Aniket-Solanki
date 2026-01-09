"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

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
            const isInteractive = target.closest("a, button, input, textarea, [role='button'], .card, .glass, .cursor-hover");
            setIsHovering(!!isInteractive);
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", checkHover);

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
                // Centering via negative margins (Size 8px -> -4px)
                // Using style directly to ensure it overrides any potential CSS conflicts
                initial={{ marginLeft: -4, marginTop: -4 }}
            />

            {/* Trailing Ring */}
            <motion.div
                className="cursor-ring fixed top-0 left-0 w-8 h-8 border border-white rounded-full mix-blend-difference z-[9998]"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
                // Centering via negative margins (Size 40px -> -20px)
                initial={{ marginLeft: -20, marginTop: -20 }}
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
