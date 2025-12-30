"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GradientText } from "@/components/ui/text-animations";

const skillCategories = [
    {
        title: "Modern Frontend",
        skills: [
            { name: "Next.js 15 / React", level: 98 },
            { name: "TypeScript", level: 95 },
            { name: "Three.js / R3F", level: 85 },
            { name: "GSAP / Framer Motion", level: 92 },
        ],
    },
    {
        title: "AI & Backend",
        skills: [
            { name: "OpenAI / LLMs", level: 90 },
            { name: "Node.js / Bun", level: 88 },
            { name: "Twilio API", level: 95 },
            { name: "Python", level: 80 },
        ],
    },
    {
        title: "Performance & Tools",
        skills: [
            { name: "GA4 / GTM", level: 95 },
            { name: "Web Vitals Optimization", level: 98 },
            { name: "Git / CI/CD", level: 90 },
            { name: "Figma", level: 85 },
        ],
    },
];

const technologies = [
    "Next.js", "React", "TypeScript", "Tailwind CSS", "Three.js", "GSAP",
    "OpenAI", "LangChain", "Twilio", "Python", "Node.js", "PostgreSQL",
    "Google Analytics 4", "GTM", "Docker", "AWS", "Vercel", "Figma",
];

export function SkillsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="skills" className="section bg-background-secondary/30" ref={ref}>
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-medium text-accent-1 uppercase tracking-widest mb-4 block">
                        Skills & Expertise
                    </span>
                    <h2 className="heading-lg mb-6">
                        My <GradientText>Tech Stack</GradientText>
                    </h2>
                    <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                        A potent combination of cutting-edge web technologies, AI integration,
                        and performance optimization tools.
                    </p>
                </motion.div>

                {/* Skills Progress Bars */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {skillCategories.map((category, categoryIndex) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: categoryIndex * 0.15 }}
                            className="card"
                        >
                            <h3 className="text-xl font-semibold mb-6 gradient-text">
                                {category.title}
                            </h3>
                            <div className="space-y-5">
                                {category.skills.map((skill, skillIndex) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-sm font-medium">{skill.name}</span>
                                            <span className="text-sm text-foreground-muted">
                                                {skill.level}%
                                            </span>
                                        </div>
                                        <div className="h-2 bg-glass-border rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={isInView ? { width: `${skill.level}%` } : {}}
                                                transition={{
                                                    duration: 1,
                                                    delay: categoryIndex * 0.15 + skillIndex * 0.1 + 0.5,
                                                    ease: [0.16, 1, 0.3, 1],
                                                }}
                                                className="h-full bg-gradient-to-r from-accent-1 to-accent-2 rounded-full"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Technology Tags */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-wrap justify-center gap-3"
                >
                    {technologies.map((tech, i) => (
                        <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.3, delay: 0.7 + i * 0.03 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="px-4 py-2 text-sm font-medium glass hover:border-accent-1/50 cursor-default transition-colors"
                        >
                            {tech}
                        </motion.span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default SkillsSection;
