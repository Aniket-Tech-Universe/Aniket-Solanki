"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
    const cursorDot = useRef<HTMLDivElement>(null);
    const cursorRing = useRef<HTMLDivElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for the ring
    const springConfig = { damping: 25, stiffness: 300 };
    const ringX = useSpring(mouseX, springConfig);
    const ringY = useSpring(mouseY, springConfig);

    useEffect(() => {
        // Check if device supports hover
        const hasHover = window.matchMedia("(hover: hover)").matches;
        if (!hasHover) return;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseEnter = () => {
            if (cursorDot.current) cursorDot.current.style.opacity = "1";
            if (cursorRing.current) cursorRing.current.style.opacity = "1";
        };

        const handleMouseLeave = () => {
            if (cursorDot.current) cursorDot.current.style.opacity = "0";
            if (cursorRing.current) cursorRing.current.style.opacity = "0";
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, [data-cursor-hover]');

            if (isInteractive) {
                if (cursorRing.current) {
                    cursorRing.current.style.width = "60px";
                    cursorRing.current.style.height = "60px";
                    cursorRing.current.style.borderColor = "var(--accent-1)";
                }
            } else {
                if (cursorRing.current) {
                    cursorRing.current.style.width = "40px";
                    cursorRing.current.style.height = "40px";
                    cursorRing.current.style.borderColor = "rgba(255, 255, 255, 0.5)";
                }
            }
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseover", handleMouseOver);
        document.addEventListener("mouseenter", handleMouseEnter);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseover", handleMouseOver);
            document.removeEventListener("mouseenter", handleMouseEnter);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Cursor dot - follows exactly */}
            <motion.div
                ref={cursorDot}
                className="cursor-dot"
                style={{
                    x: mouseX,
                    y: mouseY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />

            {/* Cursor ring - follows with spring */}
            <motion.div
                ref={cursorRing}
                className="cursor-ring"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            />
        </>
    );
}

export default CustomCursor;
