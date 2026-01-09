"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
    children: string;
    className?: string;
}

export function GlitchText({ children, className }: GlitchTextProps) {
    return (
        <div className={cn("relative inline-block group", className)}>
            <span className="relative z-10">{children}</span>
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-accent-1 opacity-0 group-hover:opacity-70 group-hover:animate-glitch-1"
                aria-hidden="true"
            >
                {children}
            </span>
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-accent-2 opacity-0 group-hover:opacity-70 group-hover:animate-glitch-2"
                aria-hidden="true"
            >
                {children}
            </span>
        </div>
    );
}

export default GlitchText;
