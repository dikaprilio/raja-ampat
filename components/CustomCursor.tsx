"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { clsx } from "clsx";
import { useCursor } from "@/context/CursorContext";

export default function CustomCursor() {
  const { cursorType } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Underwater physics: higher mass, smooth damping
  const springConfig = { damping: 40, stiffness: 300, mass: 1.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[999] pointer-events-none mix-blend-exclusion">
      {/* Main Bubble */}
      <motion.div
        className={clsx(
            "absolute top-0 left-0 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm",
            cursorType === 'hover' ? "w-3 h-3" : "w-2 h-2"
        )}
        style={{ x: mouseX, y: mouseY }}
      />
      
      {/* Outer Ripple */}
      <motion.div
        className={clsx(
            "absolute top-0 left-0 border border-white/40 rounded-full -translate-x-1/2 -translate-y-1/2",
            cursorType === 'hover' ? "opacity-100" : "opacity-30"
        )}
        animate={{
            width: cursorType === 'hover' ? 48 : 16,
            height: cursorType === 'hover' ? 48 : 16,
            scale: cursorType === 'hover' ? 1.1 : 1,
        }}
        style={{ x: cursorX, y: cursorY }}
        transition={{ type: "tween", ease: "backOut", duration: 0.4 }}
      />
    </div>
  );
}
