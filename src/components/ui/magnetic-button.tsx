"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md" | "lg";
    href?: string;
    onClick?: () => void;
    disabled?: boolean;
    magneticStrength?: number;
    "aria-label"?: string;
}

export function MagneticButton({
    children,
    className,
    variant = "primary",
    size = "md",
    href,
    onClick,
    disabled = false,
    magneticStrength = 0.4,
    "aria-label": ariaLabel,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (disabled) return;

        const button = buttonRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * magneticStrength;
        const deltaY = (e.clientY - centerY) * magneticStrength;

        setPosition({ x: deltaX, y: deltaY });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const variants = {
        primary: "bg-gradient-to-r from-accent-1 to-accent-2 text-white",
        secondary: "bg-background-secondary border border-glass-border text-foreground",
        ghost: "bg-transparent border border-glass-border text-foreground hover:border-accent-1",
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
    };

    const Component = href ? motion.a : motion.button;

    return (
        <Component
            ref={buttonRef as React.RefObject<HTMLButtonElement & HTMLAnchorElement>}
            href={href}
            onClick={onClick}
            disabled={disabled}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 350, damping: 15 }}
            className={cn(
                "relative inline-flex items-center justify-center gap-2",
                "font-semibold rounded-xl overflow-hidden",
                "transition-shadow duration-300",
                "hover:shadow-[0_0_40px_rgba(124,58,237,0.3)]",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "group",
                variants[variant],
                sizes[size],
                className
            )}
        >
            {/* Shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </Component>
    );
}

export default MagneticButton;
