"use client";

import React, { useRef, useState, MouseEvent, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    tiltAmount?: number;
    glareEnabled?: boolean;
    scale?: number;
}

export function TiltCard({
    children,
    className,
    tiltAmount = 10,
    glareEnabled = true,
    scale = 1.02,
}: TiltCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // Calculate rotation (inverted for natural feel)
        const rotateXValue = (mouseY / (rect.height / 2)) * -tiltAmount;
        const rotateYValue = (mouseX / (rect.width / 2)) * tiltAmount;

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);

        // Calculate glare position
        const glareX = ((e.clientX - rect.left) / rect.width) * 100;
        const glareY = ((e.clientY - rect.top) / rect.height) * 100;
        setGlarePosition({ x: glareX, y: glareY });
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setGlarePosition({ x: 50, y: 50 });
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{
                rotateX,
                rotateY,
                scale: rotateX !== 0 || rotateY !== 0 ? scale : 1,
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
            }}
            style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
            }}
            className={cn("relative", className)}
        >
            {children}

            {/* Glare overlay */}
            {glareEnabled && (
                <div
                    className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden z-10"
                    style={{
                        background: `radial-gradient(
                            circle at ${glarePosition.x}% ${glarePosition.y}%,
                            rgba(255, 255, 255, 0.15) 0%,
                            transparent 60%
                        )`,
                        opacity: rotateX !== 0 || rotateY !== 0 ? 1 : 0,
                        transition: "opacity 0.3s ease",
                    }}
                />
            )}
        </motion.div>
    );
}

export default TiltCard;
