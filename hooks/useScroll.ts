import { useState, useEffect } from 'react';

/**
 * Custom hook to track scroll position
 * @param threshold - The scroll threshold in pixels
 * @returns boolean indicating if scrolled past threshold
 */
export function useScroll(threshold: number = 20): boolean {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // Check initial scroll position
        setIsScrolled(window.scrollY > threshold);

        const handleScroll = () => {
            setIsScrolled(window.scrollY > threshold);
        };

        // Use passive listener for better performance
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [threshold]);

    return isScrolled;
}

