"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

interface SmoothScrollProviderProps {
    children: React.ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) return;

        // Initialize Lenis with optimized settings
        lenisRef.current = new Lenis({
            duration: 1.0, // Slightly faster for snappier feel
            easing: (t) => 1 - Math.pow(1 - t, 3), // Smoother easeOutCubic
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 1.5, // Reduced for less aggressive mobile scroll
            wheelMultiplier: 1,
            infinite: false,
        });

        // Animation frame loop with performance optimization
        let rafId: number;
        function raf(time: number) {
            lenisRef.current?.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        // Handle anchor link clicks for smooth scrolling
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a[href^="#"]');
            if (anchor) {
                const href = anchor.getAttribute("href");
                if (href && href !== "#") {
                    const element = document.querySelector(href);
                    if (element) {
                        e.preventDefault();
                        lenisRef.current?.scrollTo(element as HTMLElement, {
                            offset: -80, // Offset for fixed header
                            duration: 1.2,
                        });
                    }
                }
            }
        };

        document.addEventListener("click", handleAnchorClick);

        return () => {
            cancelAnimationFrame(rafId);
            document.removeEventListener("click", handleAnchorClick);
            lenisRef.current?.destroy();
        };
    }, []);

    return <>{children}</>;
}

export default SmoothScrollProvider;
