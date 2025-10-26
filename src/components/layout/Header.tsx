'use client';

import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Briefcase, Home, Mail, Menu, Shield, User, X } from 'lucide-react';
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

    return (
        <>
            {/* Desktop macOS Dock */}
            <div className="hidden md:block">
                <div 
                    className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50"
                    style={{ pointerEvents: 'none' }}
                >
                    <div 
                        className="flex items-center justify-center gap-2 px-5 py-3 rounded-3xl border backdrop-blur-2xl"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)',
                            borderColor: 'rgba(255, 255, 255, 0.2)',
                            boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 8px 32px rgba(0, 0, 0, 0.12)',
                            pointerEvents: 'all'
                        }}
                    >
                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                            whileHover={{ scale: 1.1, y: -8 }}
                            whileTap={{ scale: 1.05 }}
                            onHoverStart={() => setHoveredItem('logo')}
                            onHoverEnd={() => setHoveredItem(null)}
                            className="relative"
                        >
                            <Link 
                                href="/" 
                                className="flex items-center justify-center w-[52px] h-[52px] rounded-[14px] border backdrop-blur-xl transition-all duration-200"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
                                    borderColor: 'rgba(255, 255, 255, 0.1)'
                                }}
                            >
                                <span className="text-lg font-bold bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    iL
                                </span>
                            </Link>
                            <AnimatePresence>
                                {hoveredItem === 'logo' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 4, scale: 0.9 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 4, scale: 0.9 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg border backdrop-blur-lg whitespace-nowrap pointer-events-none z-[60]"
                                        style={{
                                            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.88) 0%, rgba(20, 20, 20, 0.92) 100%)',
                                            borderColor: 'rgba(255, 255, 255, 0.12)',
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                                        }}
                                    >
                                        <span className="text-[11px] font-medium text-white">Home</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        <div className="w-px h-6 bg-white/15 mx-1" />

                        {/* Navigation Items */}
                        {dockItems.map((item, index) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 12, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{
                                        delay: index * 0.05,
                                        duration: 0.4,
                                        ease: [0.34, 1.56, 0.64, 1],
                                    }}
                                    whileHover={{ scale: 1.1, y: -8 }}
                                    whileTap={{ scale: 1.05 }}
                                    onHoverStart={() => setHoveredItem(item.name)}
                                    onHoverEnd={() => setHoveredItem(null)}
                                    className="relative"
                                >
                                    <Link 
                                        href={item.href} 
                                        className="flex items-center justify-center w-[52px] h-[52px] rounded-[14px] border backdrop-blur-xl transition-all duration-200"
                                        style={{
                                            background: isActive 
                                                ? 'linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234))'
                                                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
                                            borderColor: isActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)'
                                        }}
                                    >
                                        <Icon size={20} className={isActive ? 'text-white' : 'text-foreground/80'} />
                                    </Link>
                                    <AnimatePresence>
                                        {hoveredItem === item.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 4, scale: 0.9 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 4, scale: 0.9 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg border backdrop-blur-lg whitespace-nowrap pointer-events-none z-[60]"
                                                style={{
                                                    background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.88) 0%, rgba(20, 20, 20, 0.92) 100%)',
                                                    borderColor: 'rgba(255, 255, 255, 0.12)',
                                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                                                }}
                                            >
                                                <span className="text-[11px] font-medium text-white">{item.name}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}

                        <div className="w-px h-6 bg-white/15 mx-1" />

                        {/* Theme Toggle */}
                        <motion.div
                            initial={{ opacity: 0, y: 12, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{
                                delay: dockItems.length * 0.05,
                                duration: 0.4,
                                ease: [0.34, 1.56, 0.64, 1],
                            }}
                            whileHover={{ scale: 1.1, y: -8 }}
                            whileTap={{ scale: 1.05 }}
                            className="flex items-center justify-center w-[52px] h-[52px]"
                        >
                            <ThemeToggle />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Mobile Floating Menu */}
            <div className="md:hidden">
                <AnimatePresence>
                    {!isMenuOpen && (
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2.5 rounded-2xl border backdrop-blur-2xl z-50"
                            style={{
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)',
                                borderColor: 'rgba(255, 255, 255, 0.18)',
                                boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 8px 24px rgba(0, 0, 0, 0.15)'
                            }}
                        >
                            <motion.button
                                onClick={() => setIsMenuOpen(true)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center justify-center w-11 h-11 rounded-xl border backdrop-blur-xl"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
                                    borderColor: 'rgba(255, 255, 255, 0.1)'
                                }}
                            >
                                <Menu size={18} className="text-foreground" />
                            </motion.button>

                            <div className="w-px h-6 bg-white/15" />

                            <ThemeToggle />
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
                                className="absolute bottom-20 left-1/2 -translate-x-1/2"
                                initial={{ y: 100, opacity: 0, scale: 0.95 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                exit={{ y: 100, opacity: 0, scale: 0.95 }}
                            >
                                <div 
                                    className="grid grid-cols-3 gap-3 p-5 rounded-3xl border backdrop-blur-2xl"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.08)',
                                        borderColor: 'rgba(255, 255, 255, 0.2)'
                                    }}
                                >
                                    {dockItems.map((item, index) => {
                                        const Icon = item.icon;
                                        const isActive = pathname === item.href;
                                        return (
                                            <motion.div
                                                key={item.name}
                                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                transition={{ delay: index * 0.04 }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <Link
                                                    href={item.href}
                                                    className="flex flex-col items-center p-3 rounded-2xl transition-colors"
                                                    onClick={() => setIsMenuOpen(false)}
                                                    style={{
                                                        background: isActive 
                                                            ? 'linear-gradient(135deg, rgb(59, 130, 246), rgb(147, 51, 234))' 
                                                            : 'transparent'
                                                    }}
                                                >
                                                    <Icon size={22} className={isActive ? 'text-white' : 'text-foreground/80'} />
                                                    <span className={`text-xs font-medium mt-1 ${isActive ? 'text-white' : 'text-foreground/70'}`}>
                                                        {item.name}
                                                    </span>
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </div>

                                <motion.button
                                    className="absolute -top-16 left-1/2 -translate-x-1/2 w-12 h-12 flex items-center justify-center rounded-full border backdrop-blur-xl"
                                    onClick={() => setIsMenuOpen(false)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        borderColor: 'rgba(255, 255, 255, 0.2)'
                                    }}
                                >
                                    <X size={18} className="text-foreground" />
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
}
