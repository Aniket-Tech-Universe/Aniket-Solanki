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

    // Render nothing on server or if hidden logic applies (but we use CSS for mobile hiding)

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
            {/* Main Cursor Dot - follows mouse exactly */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 bg-white rounded-full mix-blend-difference"
                style={{
                    x: mouseX,
                    y: mouseY,
                    opacity: isVisible ? 1 : 0,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />

            {/* Trailing Ring - follows with spring physics */}
            <motion.div
                className="fixed top-0 left-0 border border-white rounded-full mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    opacity: isVisible ? 1 : 0,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    width: isHovering ? 48 : 24,
                    height: isHovering ? 48 : 24,
                    backgroundColor: isHovering ? "rgba(255, 255, 255, 0.1)" : "transparent",
                }}
                transition={{
                    width: { duration: 0.2 },
                    height: { duration: 0.2 },
                    backgroundColor: { duration: 0.2 }
                }}
            />
        </div>
    );
}
