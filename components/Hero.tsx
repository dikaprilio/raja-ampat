"use client";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useCursor } from "@/context/CursorContext";
import MagneticButton from "./MagneticButton";

// --- VISUAL COMPONENTS ---

const MantaSilhouette = () => (
    <div className="relative w-full h-full opacity-40 mix-blend-overlay blur-[1px]">
        <Image
            src="/manta-ray.png"
            alt="Manta Ray Silhouette"
            fill
            className="object-contain object-center -scale-x-100"
        />
    </div>
);

const CoralReefSilhouette = () => (
    <div className="relative w-[200%] -ml-[50%] md:w-[130%] md:-ml-[14%] opacity-80 blur-[3px]">
        <Image
            src="/coral-reef-foreground.png"
            alt="Coral Reef Silhouette"
            width={1920}
            height={1080}
            className="w-full h-auto"
            sizes="100vw"
        />
    </div>
);

// FIX HYDRATION ERROR: Render particles only on client
const Particles = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 30 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1 h-1 bg-white/30 rounded-full"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `float ${5 + Math.random() * 10}s infinite ease-in-out ${Math.random() * 5}s`
                    }}
                />
            ))}
        </div>
    );
};

// FIX HYDRATION ERROR: Render birds only on client
const SeagullParticles = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="absolute inset-0 pointer-events-none z-30">
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute w-4 h-2 border-t-2 border-r-2 border-white/60 rotate-45"
                    style={{
                        top: `${10 + Math.random() * 20}%`,
                        left: `${10 + Math.random() * 80}%`,
                        animation: `float ${10 + Math.random() * 5}s infinite ease-in-out ${Math.random() * 2}s`
                    }}
                />
            ))}
        </div>
    );
};

const GodRays = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-overlay">
        {/* Ray 1 - Stronger Opacity */}
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(255,255,255,0.2)_0deg,transparent_20deg,rgba(255,255,255,0.2)_40deg,transparent_60deg)] animate-spin-slow opacity-70 origin-center blur-3xl" />
        {/* Ray 2 (Reverse) - Added for complexity */}
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(255,255,255,0.1)_30deg,transparent_60deg,rgba(255,255,255,0.1)_90deg)] animate-spin-slow opacity-50 origin-center blur-2xl" style={{ animationDirection: 'reverse', animationDuration: '25s' }} />
    </div>
);

// Seamless Wave SVG
const SeaWaves = () => (
    <div className="absolute bottom-[-5px] left-0 w-full h-32 md:h-48 overflow-hidden z-20 pointer-events-none transform translate-y-[1px]">
        <div className="absolute bottom-0 left-0 w-[200%] h-full animate-wave opacity-100">
            {/* Fill color matches the START of the underwater gradient (#0d9488) */}
            <svg className="w-full h-full text-[#0d9488] fill-current" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
        </div>
    </div>
);

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const { setCursorType } = useCursor();

    const [isIntroDone, setIsIntroDone] = useState(false);
    const [showScrollPrompt, setShowScrollPrompt] = useState(false);

    // Increased scroll distance for even better pacing (600vh)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // --- DYNAMIC COLOR PALETTE ---
    // REMOVED: Background color transition on parent container to avoid conflicts.
    // We will rely on layer colors directly.

    const accentColor = useTransform(
        scrollYProgress,
        [0, 0.5, 1],
        ["#fcd34d", "#34d399", "#60a5fa"]
    );

    // --- SCROLL PACING ---
    // The surface moves UP and out of view.
    const ySurface = useTransform(scrollYProgress, [0, 0.4], ["0%", "-120%"]);

    const yUnderwater = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]);

    // Extended Narrative Section
    const opacityNarrative = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0]);
    const yNarrative = useTransform(scrollYProgress, [0.3, 0.7], ["20%", "-20%"]);

    // "Life Explodes" Text Animations
    const scaleExplode = useTransform(scrollYProgress, [0.3, 0.45], [0.8, 1.2]);
    const letterSpacingExplode = useTransform(scrollYProgress, [0.3, 0.45], ["-0.05em", "0.1em"]);
    const blurExplode = useTransform(scrollYProgress, [0.3, 0.45], ["10px", "0px"]);

    // Deep Content: Appears later
    // Faster transition: Reaches full opacity sooner (at 0.85 instead of 0.9)
    const opacityDepth = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
    // Removed yDepth to keep it stable, or adjust range if needed.
    // const yDepth = useTransform(scrollYProgress, [0.75, 0.9], ["50px", "0px"]); 

    const yLeaves = useTransform(scrollYProgress, [0, 0.25], ["0%", "-150%"]);
    const opacityIntro = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

    // Coral Reef Animation
    const opacityCoral = useTransform(scrollYProgress, [0.6, 0.8], [0, 0.8]);
    const yCoral = useTransform(scrollYProgress, [0.6, 0.8], ["20%", "0%"]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        const sequence = async () => {
            await new Promise(r => setTimeout(r, 2000));
            setIsIntroDone(true);
            await new Promise(r => setTimeout(r, 1000));
            setShowScrollPrompt(true);
            document.body.style.overflow = 'auto';
        };
        sequence();
    }, []);

    return (
        <motion.section
            ref={containerRef}
            className="relative h-[600vh] w-full overflow-hidden bg-[#0d9488]" // FIXED BASE COLOR
        >
            {/* --- FIXED VIEWPORT --- */}
            <div className="fixed inset-0 w-full h-screen overflow-hidden">

                {/* ============================================== */}
                {/* LAYER 1: THE SURFACE (Moves UP on scroll)      */}
                {/* ============================================== */}
                <motion.div
                    className="absolute inset-0 z-30 origin-top"
                    style={{ y: ySurface }}
                >
                    {/* Sky Background */}
                    <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-200 to-[#0d9488]" />

                    {/* God Rays (Atmospheric) */}
                    <GodRays />

                    {/* Sun - More visible */}
                    <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-64 h-64 bg-yellow-100 rounded-full blur-[80px] opacity-80 mix-blend-screen" />
                    <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-32 h-32 bg-white rounded-full blur-[30px] opacity-100" />

                    {/* Birds */}
                    <SeagullParticles />

                    {/* HERO TITLE (Behind Island) */}
                    <motion.div
                        className="absolute inset-0 flex items-start justify-center z-0 pt-32 md:pt-24"
                        style={{ y: useTransform(scrollYProgress, [0, 0.5], ["0%", "-30%"]) }}
                    >
                        <h1 className="text-[13vw] font-black text-white/80 tracking-tighter leading-[0.8] select-none drop-shadow-2xl text-center">
                            RAJA<br />AMPAT
                        </h1>
                    </motion.div>

                    {/* ISLAND IMAGE CONTAINER */}
                    <div className="absolute inset-0 flex flex-col items-center justify-end pb-32 md:pb-4 z-10">
                        <div className="relative w-[160%] md:w-full h-[60vh] md:h-[95vh]">
                            <div className="w-full h-full relative">
                                <Image
                                    src="/raja-ampat-island.png"
                                    alt="Raja Ampat Island"
                                    fill
                                    className="object-contain object-bottom drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* WATER LINE BLEND - Improved Gradient */}
                    <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-[#0d9488] via-[#0d9488]/90 to-transparent z-10" />

                    {/* WAVES */}
                    <SeaWaves />

                    {/* FOREGROUND LEAVES */}
                    <motion.div
                        className="absolute inset-0 z-50 pointer-events-none"
                        style={{ y: yLeaves }}
                    >
                        <div className="absolute bottom-[-5%] left-[-5%] w-[40vw] h-[50vh]">
                            <Image src="/leaf-left.png" alt="Leaf" fill className="object-contain object-bottom-left blur-[2px]" />
                        </div>
                        <div className="absolute top-[-5%] right-[-5%] w-[50vw] h-[60vh]">
                            <Image src="/leaf-right.png" alt="Leaf" fill className="object-contain object-top-right blur-[3px]" />
                        </div>
                    </motion.div>

                    {/* --- THE EXTENDER BLOCK (Massive Skirt) --- */}
                    {/* This moves WITH the surface. */}
                    {/* CHANGED: Reduced height and opacity to prevent dimming the underwater content */}
                    <div className="absolute top-[100%] left-0 w-full h-[100vh] bg-gradient-to-b from-[#0d9488] via-[#0d9488]/40 to-transparent" />

                    {/* SCROLL PROMPT */}
                    <AnimatePresence>
                        {showScrollPrompt && (
                            <motion.div
                                className="absolute bottom-12 left-0 w-full flex flex-col items-center justify-center z-40"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{ opacity: opacityIntro }}
                            >
                                <p className="text-white/80 font-bold uppercase tracking-[0.2em] text-xs mb-2 shadow-black/20 drop-shadow-md">Dive In</p>
                                <motion.div className="w-[1px] h-16 bg-white/50 overflow-hidden">
                                    <motion.div
                                        className="w-full h-full bg-white"
                                        animate={{ y: ["-100%", "100%"] }}
                                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                    />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>


                {/* ============================================== */}
                {/* INTRO OVERLAY (Black Screen)                   */}
                {/* ============================================== */}
                <AnimatePresence>
                    {!isIntroDone && (
                        <motion.div
                            className="absolute inset-0 z-[100] flex items-center justify-center bg-[#050a05]"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        >
                            <motion.p
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="text-white/80 text-lg md:text-xl font-light tracking-widest text-center px-6"
                            >
                                Before the world touched Raja Ampat,<br />
                                Raja Ampat touched the world.
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>


                {/* ============================================== */}
                {/* SCENE 2: THE UNDERWATER (Fixed Behind)         */}
                {/* ============================================== */}
                <motion.div
                    className="absolute inset-0 z-10"
                    style={{ y: yUnderwater }}
                >
                    {/* STATIC BACKGROUND - Dark Abyss */}
                    <div className="absolute inset-0 bg-[#020617]" />

                    {/* Ocean Gradient Overlay - Matches Extender Gradient */}
                    {/* NOTE: The top part is hidden by the Extender Block initially */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0d9488] via-[#0d9488]/20 to-[#020617]" />

                    {/* Enhanced Caustics / God Rays Underwater */}
                    <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none">
                        <GodRays />
                    </div>

                    {/* Marine Life Layers */}
                    <motion.div
                        className="absolute left-1/4 w-[30vw] h-[15vw] top-1/3"
                        style={{ x: useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]) }}
                    >
                        <MantaSilhouette />
                    </motion.div>

                    <Particles />

                    <motion.div
                        className="absolute bottom-[-20vw] md:bottom-[-20vw] left-0 w-full text-black/40"
                        style={{ opacity: opacityCoral, y: yCoral }}
                    >
                        <CoralReefSilhouette />
                    </motion.div>

                    {/* SECTION A: NARRATIVE (Mid-Dive) */}
                    <motion.div
                        className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
                        style={{ opacity: opacityNarrative, y: yNarrative }}
                    >
                        <h2 className="text-4xl md:text-7xl font-light text-white text-center leading-tight drop-shadow-2xl perspective-1000">
                            <motion.span
                                className="block"
                                style={{ filter: blurExplode, scale: useTransform(scrollYProgress, [0.3, 0.4], [0.9, 1]) }}
                            >
                                Beneath the surface...
                            </motion.span>
                            <motion.span
                                style={{
                                    color: accentColor,
                                    scale: scaleExplode,
                                    letterSpacing: letterSpacingExplode,
                                    filter: blurExplode,
                                    display: "inline-block"
                                }}
                                className="italic font-serif mt-2 md:mt-4"
                            >
                                Life explodes.
                            </motion.span>
                        </h2>
                    </motion.div>

                </motion.div>

                {/* SECTION B: DEEP CONTENT (Bottom) - MOVED OUT OF UNDERWATER TO FIX Z-INDEX */}
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center z-[60] pointer-events-auto"
                    style={{ opacity: opacityDepth }}
                >
                    <div className="text-center max-w-4xl px-6 mx-auto relative z-10 mix-blend-normal isolate">
                        <div className="absolute inset-[-100px] bg-radial-gradient from-black/40 via-transparent to-transparent blur-3xl -z-10" />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            {/* Floating Coordinates */}
                            <div className="flex items-center justify-center gap-4 mb-8 opacity-80">
                                <span className="h-[1px] w-12 bg-white" />
                                <p className="font-mono text-[10px] md:text-xs text-white tracking-[0.2em] drop-shadow-md">
                                    0° 14' S, 130° 30' E
                                </p>
                                <span className="h-[1px] w-12 bg-white" />
                            </div>

                            {/* Main Title Area */}
                            <h3 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.9] drop-shadow-2xl">
                                THE LAST <br />
                                <span className="text-teal-300 italic font-serif pr-4 drop-shadow-[0_0_15px_rgba(20,184,166,0.5)]">
                                    Paradise
                                </span>
                            </h3>

                            <p className="text-white text-sm md:text-lg font-light leading-relaxed mb-12 max-w-lg mx-auto tracking-wide drop-shadow-lg">
                                Where the Pacific and Indian Oceans collide to create the most bio-diverse marine ecosystem on Earth.
                            </p>

                            {/* Cinematic Button */}
                            <div className="flex flex-col items-center gap-4">
                                <MagneticButton>
                                    <motion.button
                                        onMouseEnter={() => setCursorType("hover")}
                                        onMouseLeave={() => setCursorType("default")}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="group relative px-10 py-5 overflow-hidden rounded-none bg-black/20 border border-white/40 backdrop-blur-sm transition-all duration-500 hover:border-white hover:bg-black/40"
                                    >
                                        <div className="absolute inset-0 bg-teal-500/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                        <div className="relative flex items-center gap-4">
                                            <span className="text-white text-xs font-bold uppercase tracking-[0.3em] drop-shadow-md">
                                                Explore The Depths
                                            </span>
                                            <span className="text-white group-hover:translate-x-1 transition-transform duration-300 drop-shadow-md">
                                                →
                                            </span>
                                        </div>
                                    </motion.button>
                                </MagneticButton>

                                {/* Minimal Scroll Indicator */}
                                <p className="text-[9px] text-white/60 uppercase tracking-[0.2em] animate-pulse mt-8 drop-shadow-md">
                                    Scroll to Submerge
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

            </div>

            {/* --- SCROLLABLE HEIGHT --- */}
            <div className="w-full h-full" />

        </motion.section>
    );
}
