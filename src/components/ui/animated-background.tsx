"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParticleData {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    color: string;
}

export function AnimatedBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Non-null assertion - we've already checked above
        const context = ctx as CanvasRenderingContext2D;

        // Store dimensions
        let width = window.innerWidth;
        let height = window.innerHeight;

        // Set canvas size
        const setSize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        setSize();
        window.addEventListener("resize", setSize);

        // Particle configuration
        const particles: ParticleData[] = [];
        const particleCount = 80;

        // Create particle
        function createParticle(): ParticleData {
            const colors = [
                "rgba(124, 58, 237,", // accent-1
                "rgba(6, 182, 212,",  // accent-2
                "rgba(236, 72, 153,", // accent-3
            ];

            return {
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.1,
                color: colors[Math.floor(Math.random() * colors.length)],
            };
        }

        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }

        // Update particle
        function updateParticle(p: ParticleData) {
            p.x += p.speedX;
            p.y += p.speedY;

            // Wrap around screen
            if (p.x > width + 10) p.x = -10;
            if (p.x < -10) p.x = width + 10;
            if (p.y > height + 10) p.y = -10;
            if (p.y < -10) p.y = height + 10;
        }

        // Draw particle
        function drawParticle(p: ParticleData) {
            context.beginPath();
            context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            context.fillStyle = `${p.color} ${p.opacity})`;
            context.fill();
        }

        // Draw connections
        function drawConnections() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        context.beginPath();
                        context.moveTo(particles[i].x, particles[i].y);
                        context.lineTo(particles[j].x, particles[j].y);
                        context.strokeStyle = `rgba(124, 58, 237, ${0.1 * (1 - distance / 150)})`;
                        context.lineWidth = 0.5;
                        context.stroke();
                    }
                }
            }
        }

        // Animation loop
        let animationId: number;

        function animate() {
            context.clearRect(0, 0, width, height);

            particles.forEach((particle) => {
                updateParticle(particle);
                drawParticle(particle);
            });

            drawConnections();

            animationId = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener("resize", setSize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <>
            {/* Gradient orbs */}
            <div className="gradient-bg" />

            {/* Particle canvas */}
            <motion.canvas
                ref={canvasRef}
                className="fixed inset-0 z-0 pointer-events-none"
                style={{ opacity }}
            />

            {/* Noise overlay */}
            <div className="noise-overlay" />
        </>
    );
}

export default AnimatedBackground;
