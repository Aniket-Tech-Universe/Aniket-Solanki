"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GlitchText } from "./glitch-text";

export function Preloader() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                const increment = Math.random() * 10;
                return Math.min(prev + increment, 100);
            });
        }, 100);

        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground"
        >
            <div className="w-64 space-y-4">
                <div className="flex justify-between text-xs font-mono text-accent-1">
                    <span>INITIALIZING SYSTEM...</span>
                    <span>{Math.round(progress)}%</span>
                </div>

                {/* Progress Bar */}
                <div className="h-1 w-full bg-accent-1/20 overflow-hidden relative">
                    <motion.div
                        className="h-full bg-accent-1"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                    />
                </div>

                <div className="h-4 text-xs font-mono text-foreground-muted overflow-hidden">
                    {progress < 30 && "Loading Core Modules..."}
                    {progress >= 30 && progress < 60 && "Establishing Neural Link..."}
                    {progress >= 60 && progress < 90 && "Calibrating Visuals..."}
                    {progress >= 90 && "Access Granted."}
                </div>
            </div>

            <div className="absolute bottom-8 left-8 text-xs font-mono text-accent-1/50">
                SECURE_CONNECTION_ESTABLISHED
            </div>
            <div className="absolute top-8 right-8 text-xs font-mono text-accent-1/50">
                V.2.0.4 [DEMON_MODE]
            </div>
        </motion.div>
    );
}
