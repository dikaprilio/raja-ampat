import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to manage theme (dark/light mode)
 * @returns Object with isDark state and toggleTheme function
 */
export function useTheme() {
    const [isDark, setIsDark] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Initialize theme on mount
    useEffect(() => {
        setIsMounted(true);
        
        // Check localStorage or system preference
        const storedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const shouldBeDark = storedTheme === 'dark' || (!storedTheme && systemDark);
        setIsDark(shouldBeDark);
        
        if (shouldBeDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem('theme')) {
                setIsDark(e.matches);
                if (e.matches) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const toggleTheme = useCallback(() => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        
        if (newTheme) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    // Prevent hydration mismatch by not rendering theme-dependent content until mounted
    return { isDark: isMounted ? isDark : false, toggleTheme };
}

