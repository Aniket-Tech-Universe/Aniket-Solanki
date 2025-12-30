"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
    ArrowLeft,
    ExternalLink,
    Github,
    Calendar,
    Clock,
    User,
    CheckCircle,
    Layers,
} from "lucide-react";
import { Project } from "@/lib/projects";
import { GradientText } from "@/components/ui/text-animations";
import { MagneticButton } from "@/components/ui/magnetic-button";

interface ProjectDetailPageProps {
    project: Project;
}

export function ProjectDetailPage({ project }: ProjectDetailPageProps) {
    return (
        <article className="min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-6">
                {/* Back Button */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground transition-colors mb-12 group"
                    >
                        <ArrowLeft
                            size={16}
                            className="group-hover:-translate-x-1 transition-transform"
                        />
                        Back to Projects
                    </Link>
                </motion.div>

                {/* Header */}
                <header className="max-w-4xl mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-wrap items-center gap-3 mb-6"
                    >
                        <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-accent-1/10 text-accent-1 rounded-full">
                            {project.category}
                        </span>
                        {project.featured && (
                            <span className="px-3 py-1 text-xs font-medium uppercase tracking-wider bg-accent-2/10 text-accent-2 rounded-full">
                                Featured
                            </span>
                        )}
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="heading-lg mb-6"
                    >
                        <GradientText>{project.title}</GradientText>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-foreground-muted mb-8"
                    >
                        {project.fullDescription}
                    </motion.p>

                    {/* Meta Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-wrap gap-6 mb-8"
                    >
                        <div className="flex items-center gap-2 text-foreground-muted">
                            <Calendar size={16} className="text-accent-1" />
                            <span>{project.year}</span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground-muted">
                            <Clock size={16} className="text-accent-1" />
                            <span>{project.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground-muted">
                            <User size={16} className="text-accent-1" />
                            <span>{project.role}</span>
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-wrap gap-4"
                    >
                        {project.live && (
                            <MagneticButton href={project.live}>
                                <ExternalLink size={16} />
                                View Live
                            </MagneticButton>
                        )}
                        {project.github && (
                            <MagneticButton href={project.github} variant="ghost">
                                <Github size={16} />
                                View Code
                            </MagneticButton>
                        )}
                    </motion.div>
                </header>

                {/* Project Image */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="relative aspect-video mb-20 rounded-2xl overflow-hidden bg-gradient-to-br from-accent-1/20 to-accent-2/20"
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Layers className="w-24 h-24 text-accent-1/30" />
                    </div>
                </motion.div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-3 gap-12 mb-20">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Challenge */}
                        <motion.section
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="heading-md mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 text-sm font-bold">
                                    1
                                </span>
                                The Challenge
                            </h2>
                            <p className="text-foreground-muted leading-relaxed">
                                {project.challenge}
                            </p>
                        </motion.section>

                        {/* Solution */}
                        <motion.section
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="heading-md mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-accent-1/10 flex items-center justify-center text-accent-1 text-sm font-bold">
                                    2
                                </span>
                                The Solution
                            </h2>
                            <p className="text-foreground-muted leading-relaxed">
                                {project.solution}
                            </p>
                        </motion.section>

                        {/* Results */}
                        <motion.section
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="heading-md mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 text-sm font-bold">
                                    3
                                </span>
                                The Results
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {project.results.map((result, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: i * 0.1 }}
                                        className="flex items-start gap-3 p-4 rounded-xl glass"
                                    >
                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                        <span className="text-sm">{result}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Tech Stack */}
                        <motion.section
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="card"
                        >
                            <h3 className="text-lg font-semibold mb-4">Tech Stack</h3>
                            <div className="space-y-4">
                                {project.techStack.map((tech, i) => (
                                    <div key={i} className="border-b border-glass-border pb-3 last:border-0 last:pb-0">
                                        <div className="font-medium text-sm">{tech.name}</div>
                                        <div className="text-xs text-foreground-muted">
                                            {tech.description}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Tags */}
                        <motion.section
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="card"
                        >
                            <h3 className="text-lg font-semibold mb-4">Technologies</h3>
                            <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 text-xs font-medium bg-accent-1/10 text-accent-1 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.section>
                    </div>
                </div>

                {/* Back to Projects CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center pt-12 border-t border-glass-border"
                >
                    <p className="text-foreground-muted mb-6">
                        Interested in working together?
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <MagneticButton href="/#contact">Get In Touch</MagneticButton>
                        <MagneticButton href="/#projects" variant="ghost">
                            View More Projects
                        </MagneticButton>
                    </div>
                </motion.div>
            </div>
        </article>
    );
}

export default ProjectDetailPage;
