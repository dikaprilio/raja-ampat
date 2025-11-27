"use client";
import { useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import { useCursor } from "@/context/CursorContext";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    strength?: number; // How strong the pull is
}

export default function MagneticButton({ children, className = "", strength = 30 }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const { setCursorType } = useCursor();

    const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        
        setPosition({ x: x * 0.5, y: y * 0.5 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
        setCursorType("default");
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setCursorType("hover")}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

