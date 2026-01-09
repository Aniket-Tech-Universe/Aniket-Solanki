"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { GradientText } from "@/components/ui/text-animations";

const testimonials = [
    {
        id: 1,
        name: "Sarah Chen",
        role: "CTO at TechVentures",
        content:
            "An exceptional developer who brings both technical excellence and creative vision to every project. The 3D interfaces they built for us increased user engagement by 300%.",
        rating: 5,
        image: null,
    },
    {
        id: 2,
        name: "Marcus Johnson",
        role: "Founder at StartupX",
        content:
            "Delivered our AI-powered platform ahead of schedule with impeccable attention to detail. Their understanding of both frontend aesthetics and backend architecture is rare.",
        rating: 5,
        image: null,
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        role: "Product Lead at DesignCo",
        content:
            "The most talented creative technologist I've worked with. They transformed our vision into an award-winning digital experience that our users absolutely love.",
        rating: 5,
        image: null,
    },
    {
        id: 4,
        name: "David Kim",
        role: "Engineering Director",
        content:
            "Outstanding performance optimization skills. They reduced our load times by 60% while adding complex animations. True mastery of the craft.",
        rating: 5,
        image: null,
    },
];

export function TestimonialsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-rotate testimonials
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isPaused]);

    const goToPrevious = () => {
        setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const goToNext = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    return (
        <section id="testimonials" className="section" ref={ref}>
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-medium text-accent-1 uppercase tracking-widest mb-4 block">
                        Testimonials
                    </span>
                    <h2 className="heading-lg mb-6">
                        What People <GradientText>Say</GradientText>
                    </h2>
                    <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                        Feedback from clients and collaborators I&apos;ve had the pleasure of working with.
                    </p>
                </motion.div>

                {/* Testimonial Carousel */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-4xl mx-auto"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="relative">
                        {/* Main Card */}
                        <div className="card-premium relative min-h-[280px] flex flex-col justify-center">
                            {/* Quote Icon */}
                            <div className="absolute top-6 left-6 text-accent-1/20">
                                <Quote size={48} />
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative z-10 px-4 md:px-12 py-8"
                                >
                                    {/* Stars */}
                                    <div className="flex gap-1 mb-6 justify-center">
                                        {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={20}
                                                className="fill-accent-1 text-accent-1"
                                            />
                                        ))}
                                    </div>

                                    {/* Content */}
                                    <p className="text-lg md:text-xl text-center leading-relaxed mb-8 text-foreground/90">
                                        &ldquo;{testimonials[activeIndex].content}&rdquo;
                                    </p>

                                    {/* Author */}
                                    <div className="flex flex-col items-center gap-2">
                                        {/* Avatar Placeholder */}
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-1 to-accent-2 flex items-center justify-center text-white font-bold">
                                            {testimonials[activeIndex].name.charAt(0)}
                                        </div>
                                        <div className="text-center">
                                            <p className="font-semibold">
                                                {testimonials[activeIndex].name}
                                            </p>
                                            <p className="text-sm text-foreground-muted">
                                                {testimonials[activeIndex].role}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-center gap-4 mt-8">
                            <button
                                onClick={goToPrevious}
                                className="p-3 rounded-full glass hover:bg-accent-1/20 transition-colors"
                                aria-label="Previous testimonial"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            {/* Dots */}
                            <div className="flex items-center gap-2">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveIndex(i)}
                                        className={`w-2 h-2 rounded-full transition-all ${i === activeIndex
                                                ? "bg-accent-1 w-6"
                                                : "bg-foreground-muted/30 hover:bg-foreground-muted/50"
                                            }`}
                                        aria-label={`Go to testimonial ${i + 1}`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={goToNext}
                                className="p-3 rounded-full glass hover:bg-accent-1/20 transition-colors"
                                aria-label="Next testimonial"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default TestimonialsSection;
