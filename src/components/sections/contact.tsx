"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Send, Mail, MapPin, CheckCircle, Loader2, AlertCircle, Download, Plane } from "lucide-react";
import { GradientText } from "@/components/ui/text-animations";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { cn } from "@/lib/utils";

// Web3Forms API key - get yours free at https://web3forms.com/
const WEB3FORMS_KEY = "18610819-ed49-43b4-8ac1-056fdcfb92f6";

const contactInfo = [
    {
        icon: Mail,
        label: "Email",
        value: "hello@aniket.dev",
        href: "mailto:hello@aniket.dev",
    },
    {
        icon: MapPin,
        label: "Location",
        value: "Available Worldwide",
        href: null,
    },
];

export function ContactSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMessage("");

        try {
            // Use Web3Forms for serverless form submission
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: WEB3FORMS_KEY,
                    name: formState.name,
                    email: formState.email,
                    message: formState.message,
                    from_name: "Portfolio Contact Form",
                    subject: `New contact from ${formState.name}`,
                }),
            });

            const result = await response.json();

            if (result.success) {
                setStatus("success");
                setFormState({ name: "", email: "", message: "" });
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                throw new Error(result.message || "Something went wrong");
            }
        } catch (error) {
            setStatus("error");
            setErrorMessage(error instanceof Error ? error.message : "Failed to send message");
            setTimeout(() => setStatus("idle"), 5000);
        }
    };

    return (
        <section id="contact" className="section" ref={ref}>
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-sm font-medium text-accent-1 uppercase tracking-widest mb-4 block">
                        Get In Touch
                    </span>
                    <h2 className="heading-lg mb-6">
                        Let&apos;s Build <GradientText>Something Great</GradientText>
                    </h2>
                    <p className="text-lg text-foreground-muted max-w-2xl mx-auto">
                        Whether you need a high-performance website, an AI integration,
                        or just want to discuss the latest in tech—I&apos;m always open to new opportunities.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                            <p className="text-foreground-muted">
                                Open to freelance opportunities, consulting, and full-time roles.
                                Let&apos;s turn your vision into reality.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {contactInfo.map((item) => (
                                <motion.div
                                    key={item.label}
                                    whileHover={{ x: 4 }}
                                    className="flex items-center gap-4"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-1/20 to-accent-2/20 flex items-center justify-center">
                                        <item.icon className="w-5 h-5 text-accent-1" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-foreground-muted">{item.label}</p>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                className="font-medium hover:text-accent-1 transition-colors"
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="font-medium">{item.value}</p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Decorative element */}
                        <div className="relative h-48 rounded-2xl overflow-hidden glass mt-8">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent-1/10 via-accent-2/10 to-accent-3/10" />
                            <div className="absolute inset-0 flex items-center justify-center text-center p-6">
                                <div>
                                    <p className="text-2xl font-bold gradient-text mb-2">Ready to Start?</p>
                                    <p className="text-sm text-foreground-muted">Let&apos;s create the extraordinary.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <form onSubmit={handleSubmit} className="card space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium mb-2"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formState.name}
                                    onChange={(e) =>
                                        setFormState({ ...formState, name: e.target.value })
                                    }
                                    required
                                    className={cn(
                                        "w-full px-4 py-3 rounded-xl",
                                        "bg-background border border-glass-border",
                                        "focus:border-accent-1 focus:ring-1 focus:ring-accent-1",
                                        "outline-none transition-all",
                                        "placeholder:text-foreground-muted/50"
                                    )}
                                    placeholder="Your Name"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium mb-2"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formState.email}
                                    onChange={(e) =>
                                        setFormState({ ...formState, email: e.target.value })
                                    }
                                    required
                                    className={cn(
                                        "w-full px-4 py-3 rounded-xl",
                                        "bg-background border border-glass-border",
                                        "focus:border-accent-1 focus:ring-1 focus:ring-accent-1",
                                        "outline-none transition-all",
                                        "placeholder:text-foreground-muted/50"
                                    )}
                                    placeholder="you@company.com"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium mb-2"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    value={formState.message}
                                    onChange={(e) =>
                                        setFormState({ ...formState, message: e.target.value })
                                    }
                                    required
                                    rows={5}
                                    className={cn(
                                        "w-full px-4 py-3 rounded-xl resize-none",
                                        "bg-background border border-glass-border",
                                        "focus:border-accent-1 focus:ring-1 focus:ring-accent-1",
                                        "outline-none transition-all",
                                        "placeholder:text-foreground-muted/50"
                                    )}
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <MagneticButton
                                onClick={() => { }}
                                className="w-full"
                                disabled={status === "loading" || status === "success"}
                            >
                                <AnimatePresence mode="wait">
                                    {status === "loading" ? (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex items-center gap-2"
                                        >
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Sending...</span>
                                        </motion.div>
                                    ) : status === "success" ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex items-center gap-2"
                                        >
                                            <CheckCircle className="w-4 h-4" />
                                            <span>Message Sent!</span>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="idle"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, x: 20, y: -20 }}
                                            className="flex items-center gap-2"
                                        >
                                            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            <span>Send Message</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </MagneticButton>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default ContactSection;
