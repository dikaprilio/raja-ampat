"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MarqueeProps {
    children: ReactNode;
    direction?: "left" | "right";
    speed?: number;
    className?: string;
}

export default function Marquee({ children, direction = "left", speed = 20, className = "" }: MarqueeProps) {
    return (
        <div className={`flex overflow-hidden whitespace-nowrap select-none ${className}`}>
            <motion.div 
                className="flex min-w-full shrink-0"
                animate={{ 
                    x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"] 
                }}
                transition={{ 
                    repeat: Infinity, 
                    ease: "linear", 
                    duration: speed 
                }}
            >
                <div className="flex gap-8 pr-8 items-center">
                    {children}
                </div>
            </motion.div>
            <motion.div 
                className="flex min-w-full shrink-0"
                animate={{ 
                    x: direction === "left" ? ["0%", "-100%"] : ["-100%", "0%"] 
                }}
                transition={{ 
                    repeat: Infinity, 
                    ease: "linear", 
                    duration: speed 
                }}
            >
                <div className="flex gap-8 pr-8 items-center">
                    {children}
                </div>
            </motion.div>
        </div>
    );
}

