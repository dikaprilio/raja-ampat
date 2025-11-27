"use client";
import Link from "next/link";
import { useCursor } from "@/context/CursorContext";
import MagneticButton from "./MagneticButton";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
    { href: "/mission", label: "Mission" },
    { href: "/impact", label: "Impact" },
    { href: "/journal", label: "Journal" },
];

export default function Navbar() {
    const { setCursorType } = useCursor();
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Delay navbar appearance to respect the "Intro"
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 4500); // Sync with intro duration
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <motion.header
                initial={{ opacity: 0 }}
                animate={{ opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 1 }}
                className="fixed top-0 left-0 w-full z-[100] px-8 py-6 flex justify-between items-center pointer-events-none"
            >

                {/* LOGO - Organic & Minimal */}
                <MagneticButton className="pointer-events-auto">
                    <Link
                        href="/"
                        className="block text-xl font-light tracking-widest uppercase leading-none text-white/80 hover:text-accent transition-colors mix-blend-difference"
                        onMouseEnter={() => setCursorType("hover")}
                        onMouseLeave={() => setCursorType("default")}
                    >
                        Raja<br /><span className="font-bold text-accent">Ampat</span>
                    </Link>
                </MagneticButton>

                {/* MENU TRIGGER */}
                <div className="pointer-events-auto">
                    <MagneticButton>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="group relative w-14 h-14 flex flex-col items-center justify-center gap-1.5 overflow-hidden"
                            onMouseEnter={() => setCursorType("hover")}
                            onMouseLeave={() => setCursorType("default")}
                        >
                            <span className={`w-8 h-[1px] bg-white transition-all group-hover:w-10 group-hover:bg-accent ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <span className={`w-6 h-[1px] bg-white transition-all group-hover:w-4 group-hover:bg-accent ${isOpen ? 'opacity-0' : ''}`} />
                            <span className={`w-8 h-[1px] bg-white transition-all group-hover:w-10 group-hover:bg-accent ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                        </button>
                    </MagneticButton>
                </div>

            </motion.header>

            {/* FULLSCREEN MENU OVERLAY */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ clipPath: "circle(0% at 100% 0%)" }}
                        animate={{ clipPath: "circle(150% at 100% 0%)" }}
                        exit={{ clipPath: "circle(0% at 100% 0%)" }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-[90] bg-deep-sea flex items-center justify-center"
                    >
                        {/* Background Texture */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none"
                            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2200/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%221%22/%3E%3C/svg%3E")' }}
                        />

                        <div className="flex flex-col gap-8 items-center relative z-10">
                            {NAV_LINKS.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                >
                                    <Link
                                        href={link.href}
                                        className="text-5xl md:text-7xl font-light lowercase tracking-tighter text-white hover:text-accent transition-colors italic"
                                        onClick={() => setIsOpen(false)}
                                        onMouseEnter={() => setCursorType("hover")}
                                        onMouseLeave={() => setCursorType("default")}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        <div className="absolute bottom-12 left-12 text-white/50 font-mono text-xs tracking-widest">
                            GUARDING THE FOUR KINGS
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
