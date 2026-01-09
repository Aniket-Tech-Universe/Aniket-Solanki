"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";

const socialLinks = [
    {
        icon: Github, href: "https://github.com/Aniket-Tech-Universe",
        label: "GitHub",
    },
    {
        icon: Linkedin,
        href: "https://www.linkedin.com/in/aniket-solanki-463449360/",
        label: "LinkedIn",
    },
    {
        icon: Twitter,
        href: "https://x.com/ANIKET_SOLANKI1",
        label: "Twitter",
    },
    {
        icon: Mail,
        href: "mailto:hello@aniket.dev",
        label: "Email",
    },
];

const footerLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-12 border-t border-glass-border">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Logo & Copyright */}
                    <div className="text-center md:text-left">
                        <Link href="#home" className="text-xl font-bold gradient-text mb-2 block">
                            AS.
                        </Link>
                        <p className="text-foreground-muted text-sm">
                            © {currentYear} Aniket Solanki. All rights reserved.
                        </p>
                    </div>

                    {/* Footer Links */}
                    <nav className="flex items-center gap-6">
                        {footerLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-sm text-foreground-muted hover:text-foreground transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        {socialLinks.map(({ icon: Icon, href, label }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="p-2 rounded-lg glass hover:border-accent-1/50 transition-colors"
                                aria-label={label}
                            >
                                <Icon size={18} className="text-foreground-muted" />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
