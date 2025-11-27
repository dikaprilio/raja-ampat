"use client";

import React, { useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useScroll } from '@/hooks/useScroll';
import { useTheme } from '@/hooks/useTheme';

// Types
interface HeaderProps {
    // Reserved for future use
}

interface NavItem {
    href: string;
    label: string;
    icon?: string;
    matchPattern?: (pathname: string) => boolean;
}

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: React.ReactNode;
    active?: boolean;
    isScrolled?: boolean;
}

interface MobileLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    icon: string;
    children: React.ReactNode;
    active?: boolean;
    isHighlighted?: boolean;
}

// Constants
const SCROLL_THRESHOLD = 20;

const NAV_ITEMS: NavItem[] = [
    {
        href: '/',
        label: 'Home',
        icon: 'fa-house',
        matchPattern: (pathname) => pathname === '/',
    },
    {
        href: '/about',
        label: 'About',
        icon: 'fa-info-circle',
        matchPattern: (pathname) => pathname.startsWith('/about'),
    },
    {
        href: '/campaign',
        label: 'Campaign',
        icon: 'fa-leaf',
        matchPattern: (pathname) => pathname.startsWith('/campaign'),
    },
    {
        href: '/news',
        label: 'News',
        icon: 'fa-newspaper',
        matchPattern: (pathname) => pathname.startsWith('/news'),
    },
    {
        href: '/contact',
        label: 'Contact',
        icon: 'fa-envelope',
        matchPattern: (pathname) => pathname.startsWith('/contact'),
    },
];

// Main Component
export default function Header(_props: HeaderProps) {
    const pathname = usePathname();
    const isScrolled = useScroll(SCROLL_THRESHOLD);
    const { isDark, toggleTheme } = useTheme();

    // Determine active nav item
    const activeNavItem = useMemo(() => {
        return NAV_ITEMS.find((item) => item.matchPattern?.(pathname))?.href || '/';
    }, [pathname]);

    // Navigation classes
    const navClasses = useMemo(() => {
        const base = 'pointer-events-auto flex items-center justify-between transition-all duration-500 ease-in-out border';
        if (isScrolled) {
            return `${base} w-[95%] md:w-[85%] max-w-6xl py-3 px-6 rounded-full shadow-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-white/20 dark:border-slate-700`;
        }
        return `${base} w-full max-w-7xl py-4 px-4 bg-transparent border-transparent`;
    }, [isScrolled]);

    // Logo container classes
    const logoContainerClasses = useMemo(() => {
        const base = 'w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 overflow-hidden';
        if (isScrolled) {
            return `${base} bg-white/80 text-slate-900 dark:bg-white/10 dark:text-white backdrop-blur-md shadow-md`;
        }
        return `${base} bg-transparent text-slate-900 dark:bg-white/10 dark:text-white backdrop-blur-md`;
    }, [isScrolled]);

    return (
        <>
            {/* Desktop Header */}
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
                <nav className={navClasses} role="navigation" aria-label="Main navigation">
                    {/* Logo Section */}
                    <Link 
                        href="/" 
                        className="flex items-center gap-2 group cursor-pointer"
                        aria-label="Eco Raja Ampat Home"
                    >
                        <div className={logoContainerClasses}>
                            <div className="w-12 h-12 flex items-center justify-center">
                                <i className="fa-solid fa-leaf text-teal-500 text-2xl" aria-hidden="true" />
                            </div>
                        </div>
                        <span className="text-xl font-bold tracking-tight transition-colors duration-500 text-slate-800 dark:text-white">
                            Eco <span className="text-teal-500">Raja Ampat</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex relative items-center justify-center">
                        <div
                            className={`absolute inset-0 rounded-full transition-opacity duration-500 ease-in-out bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-white/10 ${
                                isScrolled ? 'opacity-0' : 'opacity-100'
                            }`}
                            aria-hidden="true"
                        />
                        <nav className="relative z-10 flex items-center gap-1 px-2 py-1.5" aria-label="Desktop navigation">
                            {NAV_ITEMS.map((item) => (
                                <NavLink
                                    key={item.href}
                                    href={item.href}
                                    active={activeNavItem === item.href}
                                    isScrolled={isScrolled}
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleTheme}
                            type="button"
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border ${
                                isScrolled
                                    ? 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:text-yellow-400'
                                    : 'bg-white/50 border-white/20 text-slate-700 hover:bg-white dark:bg-white/10 dark:text-yellow-300 dark:border-white/10'
                            }`}
                            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                            aria-pressed={isDark}
                        >
                            {isDark ? (
                                <i className="fa-solid fa-sun text-lg animate-spin-slow" aria-hidden="true" />
                            ) : (
                                <i className="fa-solid fa-moon text-lg" aria-hidden="true" />
                            )}
                        </button>

                        <Link
                            href="/donate"
                            className="hidden md:inline-flex px-6 py-2.5 rounded-full bg-teal-500 text-white font-semibold text-sm hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                        >
                            Donate
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Mobile Bottom Navigation */}
            <nav
                className="md:hidden fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
                role="navigation"
                aria-label="Mobile navigation"
            >
                <div className="pointer-events-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-slate-700 rounded-2xl shadow-2xl shadow-black/10 flex items-center gap-1 p-2 w-full max-w-sm justify-between">
                    {NAV_ITEMS.map((item) => (
                        <MobileLink
                            key={item.href}
                            href={item.href}
                            icon={item.icon || 'fa-circle'}
                            active={activeNavItem === item.href}
                        >
                            {item.label}
                        </MobileLink>
                    ))}
                    <MobileLink
                        href="/donate"
                        icon="fa-heart"
                        active={pathname.startsWith('/donate')}
                        isHighlighted
                    >
                        Donate
                    </MobileLink>
                </div>
            </nav>
        </>
    );
}

// Sub-components
function NavLink({ href, children, active, isScrolled, ...props }: NavLinkProps) {
    const baseClasses = 'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2';
    
    const classes = useMemo(() => {
        if (active) {
            return `${baseClasses} bg-teal-500 text-white shadow-md shadow-teal-500/20`;
        }
        
        if (isScrolled) {
            return `${baseClasses} text-slate-600 hover:bg-slate-100 hover:text-teal-600 dark:text-slate-300 dark:hover:bg-slate-800`;
        }
        
        return `${baseClasses} text-slate-700 hover:bg-white/50 hover:text-teal-600 dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white`;
    }, [active, isScrolled, baseClasses]);

    return (
        <Link href={href} className={classes} aria-current={active ? 'page' : undefined} {...props}>
            {children}
        </Link>
    );
}

function MobileLink({ href, icon, children, active, isHighlighted, ...props }: MobileLinkProps) {
    const classes = useMemo(() => {
        const base = 'flex flex-col items-center justify-center w-full py-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500';
        
        if (active) {
            return `${base} text-teal-500 bg-teal-50 dark:bg-teal-900/20 dark:text-teal-400`;
        }
        
        if (isHighlighted) {
            return `${base} text-teal-500 dark:text-teal-400 bg-slate-100 dark:bg-slate-800 ml-1`;
        }
        
        return `${base} text-slate-500 hover:text-teal-500 dark:text-slate-400 dark:hover:text-teal-300`;
    }, [active, isHighlighted]);

    return (
        <Link
            href={href}
            className={classes}
            aria-current={active ? 'page' : undefined}
            {...props}
        >
            <i 
                className={`fa-solid ${icon} text-xl mb-0.5 ${
                    isHighlighted && !active ? 'text-slate-700 dark:text-slate-300' : ''
                }`}
                aria-hidden="true"
            />
            <span className="text-[10px] font-medium">{children}</span>
        </Link>
    );
}
