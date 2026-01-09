"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Use MotionValues for high-performance updates directly to the DOM
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the cursor ring
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            // Initial reveal
            if (!isVisible) setIsVisible(true);
        };

        const handleHoverStart = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, button, input, textarea, [role='button'], .card, .glass")) {
                setIsHovering(true);
            }
        };

        const handleHoverEnd = () => {
            setIsHovering(false);
        };

        window.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseover", handleHoverStart);
        document.addEventListener("mouseout", handleHoverEnd);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseover", handleHoverStart);
            document.removeEventListener("mouseout", handleHoverEnd);
        };
    }, [mouseX, mouseY, isVisible]);

    // Hide on mobile (touch devices) and until first movement
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
        return null;
    }

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
            {/* Main Cursor Dot */}
            <motion.div
                className="cursor-dot fixed top-0 left-0 w-2 h-2 bg-white rounded-full mix-blend-difference z-[9999]"
                style={{
                    x: mouseX,
                    y: mouseY,
                    opacity: isVisible ? 1 : 0,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />

            {/* Trailing Ring */}
            <motion.div
                className="cursor-ring fixed top-0 left-0 w-8 h-8 border border-white rounded-full mix-blend-difference z-[9998]"
                style={{
                    x: cursorX,
                    y: cursorY,
                    opacity: isVisible ? 1 : 0,
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
