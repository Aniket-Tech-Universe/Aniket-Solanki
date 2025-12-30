"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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

    return (
        <section id="about" className="section" ref={ref}>
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-medium text-accent-1 uppercase tracking-widest mb-4 block">
                        About Me
                    </span>
                    <h2 className="heading-lg mb-6">
                        Crafting Digital <GradientText>Experiences</GradientText>
                    </h2>
                    <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                        I&apos;m a Creative Technologist who lives at the intersection of design,
                        performance, and artificial intelligence. My goal is to build digital products
                        that are not just functional, but unforgettable.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                            className="glass p-6 text-center hover:border-accent-1/30 transition-colors"
                        >
                            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-foreground-muted">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Highlights Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {highlights.map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="card group"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-1/20 to-accent-2/20 flex items-center justify-center mb-4 group-hover:from-accent-1/30 group-hover:to-accent-2/30 transition-colors">
                                <item.icon className="w-6 h-6 text-accent-1" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                            <p className="text-foreground-muted text-sm">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
