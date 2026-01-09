"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextReveal, GradientText, Typewriter } from "@/components/ui/text-animations";
import { GlitchText } from "@/components/ui/glitch-text";

import { SOCIAL_LINKS } from "@/constants";

// Lazy load Three.js scene to improve initial load
const HeroScene = dynamic(() => import("@/components/ui/hero-scene"), {
    ssr: false,
    loading: () => null,
});

export function HeroSection() {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* 3D Background Scene */}
            <HeroScene />

            <div className="container mx-auto px-6 py-20 relative z-10">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Status Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                        </span>
                        <span className="text-sm text-foreground-muted">
                            Available for new opportunities
                        </span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="heading-xl mb-6"
                    >
                        <TextReveal delay={0.3}>Building the Future of </TextReveal>
                        <GradientText>
                            <GlitchText>AI & Web</GlitchText>
                        </GradientText>
                    </motion.h1>

                    {/* Animated Role */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="text-xl md:text-3xl text-foreground-muted mb-8 h-10"
                    >
                        <Typewriter
                            text="Creative Technologist & AI Specialist"
                            speed={50}
                            delay={1200}
                        />
                    </motion.div>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1 }}
                        className="text-lg text-foreground-muted max-w-2xl mx-auto mb-12"
                    >
                        I craft performance-obsessed digital experiences and intelligent systems.
                        Bridging the gap between stunning 3D interfaces and powerful AI logic
                        to build products that feel alive.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.2 }}
                        className="flex flex-wrap items-center justify-center gap-4 mb-16"
                    >
                        <MagneticButton href="#projects" size="lg">
                            View My Work
                        </MagneticButton>
                        <MagneticButton href="#contact" variant="ghost" size="lg">
                            Get In Touch
                        </MagneticButton>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1.4 }}
                        className="flex items-center justify-center gap-4"
                    >
                        {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.15, y: -3 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-3 rounded-xl glass hover:border-accent-1/50 transition-all"
                                aria-label={label}
                            >
                                <Icon size={20} className="text-foreground-muted" />
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <motion.a
                    href="#about"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 text-foreground-muted hover:text-foreground transition-colors"
                >
                    <span className="text-xs uppercase tracking-widest">Scroll</span>
                    <ArrowDown size={16} />
                </motion.a>
            </motion.div>
        </section>
    );
}

export default HeroSection;
