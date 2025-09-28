'use client';

import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Briefcase, Download, Home, Mail, Menu, Shield, User, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const dockItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'Projects', href: '/projects', icon: Briefcase },
    { name: 'About', href: '/about', icon: User },
    { name: 'Contact', href: '/contact', icon: Mail },
    { name: 'Admin', href: '/admin/login', icon: Shield },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const pathname = usePathname();

    // Show back button when not on home page
    const showBackButton = pathname !== '/';

    return (
        <div suppressHydrationWarning>
            <style jsx>{`
                .macos-dock {
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 50;
                    pointer-events: none;
                    margin: 20px auto;
                }

                .dock-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-width: 800px;
                    max-width: 95vw;
                    padding: 24px 40px;
                    margin: 0 auto;
                    background: linear-gradient(135deg,
                        rgba(255, 255, 255, 0.15) 0%,
                        rgba(255, 255, 255, 0.08) 50%,
                        rgba(255, 255, 255, 0.12) 100%
                    );
                    backdrop-filter: blur(32px) saturate(1.8);
                    -webkit-backdrop-filter: blur(32px) saturate(1.8);
                    border: 1.5px solid rgba(255, 255, 255, 0.25);
                    border-radius: 32px;
                    box-shadow:
                        inset 0 1px 2px rgba(255, 255, 255, 0.3),
                        0 10px 30px rgba(0, 0, 0, 0.15);
                    pointer-events: all;
                }

                @media (max-width: 1024px) {
                    .dock-container {
                        min-width: 600px;
                        padding: 20px 32px;
                    }

                    .dock-item {
                        width: 56px;
                        height: 72px;
                        margin: 0 6px;
                    }
                }

                .dock-item {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 64px;
                    height: 80px;
                    margin: 0 8px;
                    background: linear-gradient(135deg,
                        rgba(255, 255, 255, 0.12) 0%,
                        rgba(255, 255, 255, 0.06) 100%
                    );
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 16px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    overflow: hidden;
                }

                .dock-item::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(
                        circle at 50% 50%,
                        rgba(59, 130, 246, 0.15) 0%,
                        transparent 70%
                    );
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .dock-item:hover::before {
                    opacity: 1;
                }

                .dock-item:hover {
                    background: linear-gradient(135deg,
                        rgba(255, 255, 255, 0.18) 0%,
                        rgba(255, 255, 255, 0.10) 100%
                    );
                    border-color: rgba(255, 255, 255, 0.25);
                    transform: translateY(-4px) scale(1.1);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
                }

                .mobile-dock {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 14px 18px;
                    margin: 16px;
                    background: linear-gradient(135deg,
                        rgba(255, 255, 255, 0.15) 0%,
                        rgba(255, 255, 255, 0.08) 100%
                    );
                    backdrop-filter: blur(28px) saturate(1.6);
                    -webkit-backdrop-filter: blur(28px) saturate(1.6);
                    border: 1.5px solid rgba(255, 255, 255, 0.22);
                    border-radius: 22px;
                    box-shadow:
                        inset 0 1px 2px rgba(255, 255, 255, 0.25),
                        0 8px 25px rgba(0, 0, 0, 0.18);
                    z-index: 50;
                }

                .dock-action-btn {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 50px;
                    height: 50px;
                    background: linear-gradient(135deg,
                        rgba(255, 255, 255, 0.12) 0%,
                        rgba(255, 255, 255, 0.06) 100%
                    );
                    backdrop-filter: blur(16px);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 12px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    overflow: hidden;
                }

                .dock-action-btn::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(
                        circle at 50% 50%,
                        rgba(147, 51, 234, 0.12) 0%,
                        transparent 70%
                    );
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .dock-action-btn:hover::before {
                    opacity: 1;
                }

                .dock-action-btn:hover {
                    background: linear-gradient(135deg,
                        rgba(255, 255, 255, 0.18) 0%,
                        rgba(255, 255, 255, 0.10) 100%
                    );
                    border-color: rgba(255, 255, 255, 0.25);
                    transform: scale(1.05);
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
                }

                .dock-item.gradient {
                    background: linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234));
                    border: 1px solid rgba(255, 255, 255, 0.3);
                }

                .dock-item.gradient:hover {
                    background: linear-gradient(135deg, rgb(79, 150, 255), rgb(167, 71, 254));
                    border-color: rgba(255, 255, 255, 0.4);
                }

                .dock-action-btn.gradient {
                    background: linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234));
                }



                /* Dark Mode Styles */
                .dark .dock-container {
                    background: linear-gradient(135deg,
                        rgba(15, 15, 15, 0.25) 0%,
                        rgba(0, 0, 0, 0.15) 50%,
                        rgba(30, 30, 30, 0.20) 100%
                    );
                    border-color: rgba(255, 255, 255, 0.18);
                    box-shadow:
                        inset 0 1px 2px rgba(255, 255, 255, 0.08),
                        0 10px 30px rgba(0, 0, 0, 0.4);
                }

                .dark .dock-item {
                    background: linear-gradient(135deg,
                        rgba(30, 30, 30, 0.20) 0%,
                        rgba(0, 0, 0, 0.15) 100%
                    );
                    border-color: rgba(255, 255, 255, 0.12);
                }

                .dark .dock-item:hover {
                    background: linear-gradient(135deg,
                        rgba(40, 40, 40, 0.25) 0%,
                        rgba(20, 20, 20, 0.20) 100%
                    );
                    border-color: rgba(255, 255, 255, 0.20);
                }

                .dark .mobile-dock {
                    background: linear-gradient(135deg,
                        rgba(15, 15, 15, 0.25) 0%,
                        rgba(0, 0, 0, 0.15) 100%
                    );
                    border-color: rgba(255, 255, 255, 0.16);
                    box-shadow:
                        inset 0 1px 2px rgba(255, 255, 255, 0.06),
                        0 8px 25px rgba(0, 0, 0, 0.5);
                }

                .dark .dock-action-btn {
                    background: linear-gradient(135deg,
                        rgba(30, 30, 30, 0.20) 0%,
                        rgba(0, 0, 0, 0.15) 100%
                    );
                    border-color: rgba(255, 255, 255, 0.12);
                }

                .dark .dock-action-btn:hover {
                    background: linear-gradient(135deg,
                        rgba(40, 40, 40, 0.25) 0%,
                        rgba(20, 20, 20, 0.20) 100%
                    );
                    border-color: rgba(255, 255, 255, 0.18);
                }
            `}</style>

            {/* Desktop macOS Dock */}
            <div className="hidden md:block">
                <div className="macos-dock">
                    <div className="dock-container">
                        <div className="flex items-center justify-center gap-4 w-full">
                            {/* Logo */}
                            <motion.div
                                className="dock-item"
                                whileHover={{ scale: 1.1, y: -4 }}
                                whileTap={{ scale: 1.05, y: -2 }}
                                onHoverStart={() => setHoveredItem('logo')}
                                onHoverEnd={() => setHoveredItem(null)}
                            >
                                <Link href="/" className="flex items-center justify-center w-full h-full relative">
                                    <span className="text-xl font-bold bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                        iL
                                    </span>
                                    <AnimatePresence>
                                        {hoveredItem === 'logo' && (
                                            <motion.div
                                                className="dock-tooltip"
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 5 }}
                                            >
                                                Home
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </Link>
                            </motion.div>

                            <div className="w-px h-8 bg-white/20 mx-3" />

                            {/* Navigation Items */}
                            {dockItems.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div
                                        key={item.name}
                                        className="dock-item"
                                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{
                                            delay: index * 0.05,
                                            duration: 0.4,
                                            ease: [0.34, 1.56, 0.64, 1]
                                        }}
                                        whileHover={{ scale: 1.1, y: -4 }}
                                        whileTap={{ scale: 1.05, y: -2 }}
                                        onHoverStart={() => setHoveredItem(item.name)}
                                        onHoverEnd={() => setHoveredItem(null)}
                                    >
                                        <Link href={item.href} className="flex flex-col items-center justify-center w-full h-full relative">
                                            <Icon size={20} className="text-foreground/80 mb-1" />
                                            <span className="text-xs font-medium text-foreground/70">
                                                {item.name}
                                            </span>
                                        </Link>
                                    </motion.div>
                                );
                            })}

                            <div className="w-px h-8 bg-white/20 mx-3" />

                            {/* Theme Toggle */}
                            <motion.div
                                className="dock-item"
                                whileHover={{ scale: 1.1, y: -4 }}
                                whileTap={{ scale: 1.05, y: -2 }}
                            >
                                <ThemeToggle />
                            </motion.div>

                            {/* Back to Home Button - Show only when not on home page */}
                            <AnimatePresence>
                                {showBackButton && (
                                    <>
                                        <div className="w-px h-8 bg-white/20 mx-3" />
                                        <motion.div
                                            className="dock-item"
                                            initial={{ opacity: 0, scale: 0.8, x: 20 }}
                                            animate={{ opacity: 1, scale: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.8, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                            whileHover={{ scale: 1.1, y: -4 }}
                                            whileTap={{ scale: 1.05, y: -2 }}
                                        >
                                            <Link href="/" className="flex flex-col items-center justify-center w-full h-full relative">
                                                <ArrowLeft size={20} className="text-foreground/80 mb-1" />
                                                <span className="text-xs font-medium text-foreground/70">
                                                    Home
                                                </span>
                                            </Link>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>

                            <div className="w-px h-8 bg-white/20 mx-3" />

                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Floating Menu */}
            <div className="md:hidden">
                <AnimatePresence>
                    {!isMenuOpen && (
                        <motion.div
                            className="mobile-dock"
                            initial={{ y: -100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -100, opacity: 0 }}
                        >
                            <motion.button
                                className="dock-action-btn"
                                onClick={() => setIsMenuOpen(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Menu size={20} className="text-foreground" />
                            </motion.button>

                            <div className="w-px h-6 bg-white/20" />

                            <ThemeToggle />

                            {/* Mobile Back Button */}
                            {showBackButton && (
                                <>
                                    <div className="w-px h-6 bg-white/20" />
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                    >
                                        <Link href="/" className="dock-action-btn flex items-center justify-center">
                                            <ArrowLeft size={16} className="text-foreground" />
                                        </Link>
                                    </motion.div>
                                </>
                            )}

                            <motion.button
                                className="dock-action-btn gradient"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Download size={16} className="text-white" />
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className="fixed inset-0 z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="absolute inset-0 bg-black/20 backdrop-blur-md"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMenuOpen(false)}
                            />

                            <motion.div
                                className="absolute top-20 left-1/2 transform -translate-x-1/2"
                                initial={{ y: -100, opacity: 0, scale: 0.9 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                exit={{ y: -100, opacity: 0, scale: 0.9 }}
                            >
                                <div className="grid grid-cols-3 gap-4 p-6 bg-white/8 backdrop-blur-2xl border border-white/20 rounded-3xl">
                                    {dockItems.map((item, index) => {
                                        const Icon = item.icon;
                                        return (
                                            <motion.div
                                                key={item.name}
                                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    className="flex flex-col items-center p-4 rounded-2xl hover:bg-white/10 transition-colors"
                                                    onClick={() => setIsMenuOpen(false)}
                                                >
                                                    <Icon size={24} className="text-foreground/80 mb-2" />
                                                    <span className="text-xs font-medium text-foreground/70">
                                                        {item.name}
                                                    </span>
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                <motion.button
                                    className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-14 h-14 flex items-center justify-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-full"
                                    onClick={() => setIsMenuOpen(false)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <X size={20} className="text-foreground" />
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
