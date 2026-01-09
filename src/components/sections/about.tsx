"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Code2, Palette, Rocket, Bot } from "lucide-react";
import { GradientText } from "@/components/ui/text-animations";

const stats = [
    { label: "Years Experience", value: "4+" },
    { label: "Successful Projects", value: "30+" },
    { label: "Performance Score", value: "95+" },
    { label: "AI Models Tuned", value: "10+" },
];

const highlights = [
    {
        icon: Bot,
        title: "AI Integration",
        description: "Building intelligent agents and voice bots using OpenAI and Twilio.",
    },
    {
        icon: Code2,
        title: "Modern Tech",
        description: "Expert in Next.js, React, and Type-Safe full-stack architectures.",
    },
    {
        icon: Palette,
        title: "Creative Coding",
        description: "Crafting immersive 3D experiences with Three.js and GSAP.",
    },
    {
        icon: Rocket,
        title: "Performance",
        description: "Obsessed with Core Web Vitals and sub-second load times.",
    },
];

export function AboutSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    return (
        <section id="about" className="section" ref={ref}>
            <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Content */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="mb-12"
                        >
                            <span className="text-sm font-medium text-accent-1 uppercase tracking-widest mb-4 block">
                                About Me
                            </span>
                            <h2 className="heading-lg mb-6">
                                Crafting Digital <GradientText>Experiences</GradientText>
                            </h2>
                            <p className="text-lg text-foreground-muted mb-8">
                                I&apos;m a Creative Technologist who lives at the intersection of design,
                                performance, and artificial intelligence. My goal is to build digital products
                                that are not just functional, but unforgettable.
                            </p>

                            {/* Highlights Grid (moved here) */}
                            <div className="grid sm:grid-cols-2 gap-4">
                                {highlights.map((item, i) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                                        className="card group p-4"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 rounded-lg bg-accent-1/10 group-hover:bg-accent-1/20 transition-colors">
                                                <item.icon className="w-5 h-5 text-accent-1" />
                                            </div>
                                            <h3 className="font-semibold">{item.title}</h3>
                                        </div>
                                        <p className="text-xs text-foreground-muted">{item.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Parallax Stats Card */}
                    <div className="relative hidden lg:block">
                        <motion.div style={{ y }} className="relative z-10">
                            <div className="absolute -inset-4 bg-gradient-to-r from-accent-1 to-accent-2 opacity-20 blur-2xl rounded-full" />
                            <div className="card-premium p-8 border-glass-border/50 backdrop-blur-xl">
                                <h3 className="text-xl font-bold mb-6">Impact at a Glance</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    {stats.map((stat, i) => (
                                        <div key={stat.label} className="text-center p-4 rounded-xl bg-background/50 border border-glass-border">
                                            <div className="text-3xl font-bold gradient-text mb-1">
                                                {stat.value}
                                            </div>
                                            <div className="text-xs text-foreground-muted uppercase tracking-wider">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Mobile Stats (Only visible on small screens) */}
                    <div className="lg:hidden grid grid-cols-2 gap-4">
                        {stats.map((stat) => (
                            <div key={stat.label} className="glass p-4 text-center">
                                <div className="text-2xl font-bold gradient-text mb-1">{stat.value}</div>
                                <div className="text-xs text-foreground-muted">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
