"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { GradientText } from "@/components/ui/text-animations";
import { TiltCard } from "@/components/ui/tilt-card";
import { projects } from "@/lib/projects";
import { cn } from "@/lib/utils";

const categories = ["all", "web", "app", "ai", "library"];

export function ProjectsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [activeCategory, setActiveCategory] = useState("all");

    const filteredProjects =
        activeCategory === "all"
            ? projects
            : projects.filter((p) => p.category === activeCategory);

    return (
        <section id="projects" className="section" ref={ref}>
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <span className="text-sm font-medium text-accent-1 uppercase tracking-widest mb-4 block">
                        Portfolio
                    </span>
                    <h2 className="heading-lg mb-6">
                        Featured <GradientText>Projects</GradientText>
                    </h2>
                    <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                        A selection of projects that showcase my skills and passion for
                        building exceptional digital products.
                    </p>
                </motion.div>

                {/* Category Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex justify-center gap-2 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={cn(
                                "relative px-5 py-2 text-sm font-medium rounded-lg transition-colors z-10",
                                activeCategory === category
                                    ? "text-white"
                                    : "text-foreground-muted hover:text-foreground hover:bg-glass"
                            )}
                        >
                            {activeCategory === category && (
                                <motion.span
                                    layoutId="activeFilter"
                                    className="absolute inset-0 bg-gradient-to-r from-accent-1 to-accent-2 rounded-lg -z-10"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            {category === "ai" ? "AI" : category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, i) => (
                            <motion.article
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className="group relative"
                            >
                                <TiltCard className="h-full">
                                    <Link href={`/projects/${project.id}`} className="block h-full">
                                        <div className="card-premium overflow-hidden h-full">
                                            {/* Project Image Placeholder */}
                                            <div className="relative aspect-video mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-accent-1/20 to-accent-2/20">
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-4xl font-bold gradient-text opacity-30">
                                                        {project.title.charAt(0)}
                                                    </span>
                                                </div>

                                                {/* View Project Overlay */}
                                                <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="flex items-center gap-2 text-sm font-medium">
                                                        View Case Study
                                                        <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                    </span>
                                                </div>

                                                {/* Featured badge */}
                                                {project.featured && (
                                                    <div className="absolute top-3 right-3 px-2 py-1 text-xs font-medium bg-accent-1 text-white rounded pulse-glow">
                                                        Featured
                                                    </div>
                                                )}
                                            </div>

                                            {/* Project Info */}
                                            <h3 className="text-lg font-semibold mb-2 group-hover:text-accent-1 transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="text-sm text-foreground-muted mb-4 line-clamp-2">
                                                {project.shortDescription}
                                            </p>

                                            {/* Tags */}
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.tags.slice(0, 3).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-1 text-xs font-medium text-accent-1 bg-accent-1/10 rounded"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                                {project.tags.length > 3 && (
                                                    <span className="px-2 py-1 text-xs font-medium text-foreground-muted bg-glass-border/50 rounded">
                                                        +{project.tags.length - 3}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Quick Links */}
                                            <div className="flex items-center gap-3 pt-4 border-t border-glass-border">
                                                {project.github && (
                                                    <a
                                                        href={project.github}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="text-foreground-muted hover:text-foreground transition-colors"
                                                    >
                                                        <Github size={18} />
                                                    </a>
                                                )}
                                                {project.live && (
                                                    <a
                                                        href={project.live}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="text-foreground-muted hover:text-foreground transition-colors"
                                                    >
                                                        <ExternalLink size={18} />
                                                    </a>
                                                )}
                                                <span className="ml-auto text-xs text-foreground-muted">
                                                    {project.year}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </TiltCard>
                            </motion.article>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}

export default ProjectsSection;
