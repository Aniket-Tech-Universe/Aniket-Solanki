"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
    children: string;
    className?: string;
    delay?: number;
    duration?: number;
    once?: boolean;
}

// Character-by-character reveal
export function TextReveal({
    children,
    className,
    delay = 0,
    duration = 0.05,
    once = true,
}: TextRevealProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once, margin: "-100px" });

    const characters = children.split("");

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: duration,
                delayChildren: delay,
            },
        },
    };

    const characterVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
            rotateX: -90,
        },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            },
        },
    };

    return (
        <motion.span
            ref={ref}
            className={cn("inline-block", className)}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            aria-label={children}
        >
            {characters.map((char, i) => (
                <motion.span
                    key={`${char}-${i}`}
                    className="inline-block"
                    style={{ transformOrigin: "bottom" }}
                    variants={characterVariants}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.span>
    );
}

// Word-by-word reveal
interface WordRevealProps {
    children: string;
    className?: string;
    delay?: number;
    duration?: number;
    once?: boolean;
}

export function WordReveal({
    children,
    className,
    delay = 0,
    duration = 0.1,
    once = true,
}: WordRevealProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once, margin: "-100px" });

    const words = children.split(" ");

    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: duration,
                delayChildren: delay,
            },
        },
    };

    const wordVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 40,
            filter: "blur(10px)",
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.span
            ref={ref}
            className={cn("inline-block", className)}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {words.map((word, i) => (
                <motion.span
                    key={`${word}-${i}`}
                    className="inline-block mr-[0.25em]"
                    variants={wordVariants}
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    );
}

// Typewriter effect
interface TypewriterProps {
    text: string;
    className?: string;
    speed?: number;
    delay?: number;
    cursor?: boolean;
}

export function Typewriter({
    text,
    className,
    speed = 50,
    delay = 0,
    cursor = true,
}: TypewriterProps) {
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;

        setIsTyping(true);
        let currentIndex = 0;

        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (currentIndex < text.length) {
                    setDisplayText(text.slice(0, currentIndex + 1));
                    currentIndex++;
                } else {
                    setIsTyping(false);
                    clearInterval(interval);
                }
            }, speed);

            return () => clearInterval(interval);
        }, delay);

        return () => clearTimeout(timeout);
    }, [isInView, text, speed, delay]);

    return (
        <span ref={ref} className={cn("inline-block", className)}>
            {displayText}
            {cursor && (
                <span
                    className={cn(
                        "inline-block w-[2px] h-[1em] bg-accent-1 ml-1 -mb-0.5",
                        isTyping ? "animate-pulse" : "opacity-0"
                    )}
                />
            )}
        </span>
    );
}

// Gradient text with animation
interface GradientTextProps {
    children: React.ReactNode;
    className?: string;
    animate?: boolean;
}

export function GradientText({
    children,
    className,
    animate = true,
}: GradientTextProps) {
    return (
        <span
            className={cn(
                "bg-gradient-to-r from-accent-1 via-accent-2 to-accent-3",
                "bg-clip-text text-transparent",
                animate && "bg-[length:200%_200%] animate-[gradient-shift_8s_ease_infinite]",
                className
            )}
        >
            {children}
        </span>
    );
}

export default TextReveal;
