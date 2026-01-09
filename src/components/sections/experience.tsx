"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";
import { GradientText } from "@/components/ui/text-animations";

const experiences = [
    {
        type: "work",
        title: "Creative Technologist",
        company: "AXORACO Digital",
        period: "2024 - Present",
        description:
            "Leading creative development for enterprise clients. Building immersive 3D web experiences and AI-powered applications with cutting-edge technologies.",
        skills: ["Next.js", "Three.js", "OpenAI", "TypeScript"],
    },
    {
        type: "work",
        title: "Full Stack Developer",
        company: "TechVentures",
        period: "2022 - 2024",
        description:
            "Developed high-performance web applications and voice AI systems. Integrated Twilio and OpenAI APIs for automated customer service solutions.",
        skills: ["Node.js", "React", "Twilio", "PostgreSQL"],
    },
    {
        type: "education",
        title: "B.Tech in Computer Science",
        company: "Institute of Technology",
        period: "2018 - 2022",
        description:
            "Graduated with distinction. Specialized in artificial intelligence, web technologies, and software architecture.",
        skills: ["Data Structures", "AI/ML", "System Design"],
    },
    {
        type: "work",
        title: "Frontend Developer",
        company: "Digital Agency",
        period: "2021 - 2022",
        description:
            "Built responsive websites and web applications for clients across various industries. Implemented modern UI/UX best practices.",
        skills: ["JavaScript", "React", "Tailwind CSS", "Figma"],
    },
];

export function ExperienceSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section id="experience" className="section bg-background-secondary/30" ref={ref}>
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-medium text-accent-1 uppercase tracking-widest mb-4 block">
                        Career Path
                    </span>
                    <h2 className="heading-lg mb-6">
                        Professional <GradientText>Journey</GradientText>
                    </h2>
                    <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                        A timeline of my professional experience and education.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="max-w-4xl mx-auto relative">
                    {/* Timeline Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-glass-border transform md:-translate-x-1/2" />
                    <motion.div
                        style={{ scaleY, transformOrigin: "top" }}
                        className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-1 via-accent-2 to-accent-3 transform md:-translate-x-1/2"
                    />

                    {/* Timeline Items */}
                    {experiences.map((exp, i) => (
                        <motion.div
                            key={`${exp.title}-${i}`}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                            className={`relative flex items-center mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                }`}
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-accent-1 to-accent-2 transform -translate-x-1/2 z-10 ring-4 ring-background" />

                            {/* Content Card */}
                            <div
                                className={`ml-8 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"
                                    }`}
                            >
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    className="card"
                                >
                                    {/* Icon & Period */}
                                    <div
                                        className={`flex items-center gap-2 mb-3 ${i % 2 === 0 ? "md:justify-end" : ""
                                            }`}
                                    >
                                        <div className="p-2 rounded-lg bg-accent-1/10">
                                            {exp.type === "work" ? (
                                                <Briefcase className="w-4 h-4 text-accent-1" />
                                            ) : (
                                                <GraduationCap className="w-4 h-4 text-accent-2" />
                                            )}
                                        </div>
                                        <span className="text-sm text-foreground-muted flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {exp.period}
                                        </span>
                                    </div>

                                    {/* Title & Company */}
                                    <h3 className="text-lg font-semibold mb-1">{exp.title}</h3>
                                    <p className="text-accent-1 text-sm font-medium mb-3">
                                        {exp.company}
                                    </p>

                                    {/* Description */}
                                    <p className="text-foreground-muted text-sm mb-4">
                                        {exp.description}
                                    </p>

                                    {/* Skills */}
                                    <div
                                        className={`flex flex-wrap gap-2 ${i % 2 === 0 ? "md:justify-end" : ""
                                            }`}
                                    >
                                        {exp.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-2 py-1 text-xs font-medium text-foreground-muted bg-glass-border/50 rounded"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ExperienceSection;
