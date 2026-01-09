"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, RefreshCw } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";

// Glitch text effect component
function GlitchText({ children }: { children: string }) {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 200);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className="relative inline-block">
            <span className={isGlitching ? "animate-pulse" : ""}>{children}</span>
            {isGlitching && (
                <>
                    <span
                        className="absolute top-0 left-0 text-accent-1 opacity-70"
                        style={{ clipPath: "inset(0 0 50% 0)", transform: "translateX(-2px)" }}
                    >
                        {children}
                    </span>
                    <span
                        className="absolute top-0 left-0 text-accent-2 opacity-70"
                        style={{ clipPath: "inset(50% 0 0 0)", transform: "translateX(2px)" }}
                    >
                        {children}
                    </span>
                </>
            )}
        </span>
    );
}

export default function NotFound() {
    const [particles, setParticles] = useState<Array<{ x: number; y: number; size: number; delay: number }>>([]);

    useEffect(() => {
        // Generate random particles on client side only
        const newParticles = Array.from({ length: 30 }, () => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 1,
            delay: Math.random() * 2,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <main className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Particle Background */}
            <div className="absolute inset-0 pointer-events-none">
                {particles.map((particle, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-accent-1/30"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: particle.size,
                            height: particle.size,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                            duration: 3,
                            delay: particle.delay,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-accent-1/5 via-transparent to-accent-2/5 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {/* 404 Number */}
                    <h1 className="text-[10rem] md:text-[15rem] font-black leading-none gradient-text text-glow">
                        <GlitchText>404</GlitchText>
                    </h1>

                    {/* Message */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl md:text-2xl text-foreground-muted mb-4"
                    >
                        Looks like you&apos;ve ventured into the void.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-foreground-muted/70 mb-12"
                    >
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap items-center justify-center gap-4"
                    >
                        <MagneticButton href="/" size="lg">
                            <Home size={18} />
                            Go Home
                        </MagneticButton>

                        <MagneticButton
                            onClick={() => window.history.back()}
                            variant="ghost"
                            size="lg"
                        >
                            <ArrowLeft size={18} />
                            Go Back
                        </MagneticButton>

                        <MagneticButton
                            onClick={() => window.location.reload()}
                            variant="ghost"
                            size="lg"
                        >
                            <RefreshCw size={18} />
                            Retry
                        </MagneticButton>
                    </motion.div>
                </motion.div>

                {/* Fun Message */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-16 text-sm text-foreground-muted/50"
                >
                    Error Code: UNIVERSE_NOT_FOUND • Dimension: 404-α
                </motion.p>
            </div>
        </main>
    );
}
