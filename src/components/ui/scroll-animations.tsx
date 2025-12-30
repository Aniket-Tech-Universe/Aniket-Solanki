"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    y?: number;
    x?: number;
    scale?: number;
    opacity?: number;
    stagger?: number;
    scrub?: boolean | number;
}

export function ScrollReveal({
    children,
    className,
    delay = 0,
    duration = 1,
    y = 60,
    x = 0,
    scale = 1,
    opacity = 0,
    stagger = 0,
    scrub = false,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                element.children.length > 0 && stagger > 0
                    ? element.children
                    : element,
                {
                    y,
                    x,
                    scale,
                    opacity,
                },
                {
                    y: 0,
                    x: 0,
                    scale: 1,
                    opacity: 1,
                    duration,
                    delay,
                    stagger,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        end: "bottom 15%",
                        toggleActions: scrub ? undefined : "play none none reverse",
                        scrub: scrub,
                    },
                }
            );
        }, element);

        return () => ctx.revert();
    }, [delay, duration, y, x, scale, opacity, stagger, scrub]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

// Parallax effect component
interface ParallaxProps {
    children: React.ReactNode;
    className?: string;
    speed?: number;
}

export function Parallax({ children, className, speed = 0.5 }: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const ctx = gsap.context(() => {
            gsap.to(element, {
                y: () => -100 * speed,
                ease: "none",
                scrollTrigger: {
                    trigger: element,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }, element);

        return () => ctx.revert();
    }, [speed]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

// Text split animation
interface TextSplitProps {
    children: string;
    className?: string;
    type?: "chars" | "words" | "lines";
    stagger?: number;
}

export function TextSplit({
    children,
    className,
    type = "words",
    stagger = 0.05,
}: TextSplitProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const items = type === "chars"
            ? children.split("")
            : type === "words"
                ? children.split(" ")
                : children.split("\n");

        element.innerHTML = items
            .map(
                (item) =>
                    `<span class="inline-block overflow-hidden"><span class="inline-block split-item">${type === "words" ? item + "&nbsp;" : item
                    }</span></span>`
            )
            .join("");

        const ctx = gsap.context(() => {
            gsap.fromTo(
                element.querySelectorAll(".split-item"),
                {
                    y: "100%",
                    opacity: 0,
                },
                {
                    y: "0%",
                    opacity: 1,
                    duration: 0.8,
                    stagger,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, element);

        return () => ctx.revert();
    }, [children, type, stagger]);

    return <div ref={ref} className={className} />;
}

// Horizontal scroll section
interface HorizontalScrollProps {
    children: React.ReactNode;
    className?: string;
}

export function HorizontalScroll({
    children,
    className,
}: HorizontalScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const scroll = scrollRef.current;
        if (!container || !scroll) return;

        const ctx = gsap.context(() => {
            const scrollWidth = scroll.scrollWidth - container.clientWidth;

            gsap.to(scroll, {
                x: -scrollWidth,
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: () => `+=${scrollWidth}`,
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                },
            });
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`}>
            <div ref={scrollRef} className="flex">
                {children}
            </div>
        </div>
    );
}

export default ScrollReveal;
