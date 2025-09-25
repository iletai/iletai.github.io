'use client';

import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const navigation = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Dự án', href: '/projects' },
    { name: 'Giới thiệu', href: '/about' },
    { name: 'Liên hệ', href: '/contact' },
    { name: 'Admin', href: '/admin/login' },
];

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            className={cn(
                'fixed top-0 w-full transition-all duration-300 z-50',
                isScrolled
                    ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm'
                    : 'bg-white/80 backdrop-blur-sm'
            )}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between h-16'>
                    {/* Logo */}
                    <motion.div
                        className='flex items-center'
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Link href='/' className='text-xl font-bold text-gray-900'>
                            Portfolio
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center space-x-4'>
                        <NavigationMenu>
                            <NavigationMenuList>
                                {navigation.slice(0, -1).map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <NavigationMenuItem>
                                            <NavigationMenuLink
                                                asChild
                                                className={cn(
                                                    'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50',
                                                    'text-gray-700 hover:text-gray-900 hover:bg-gray-100/50'
                                                )}
                                            >
                                                <Link href={item.href}>
                                                    {item.name}
                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    </motion.div>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>

                        {/* CTA Buttons */}
                        <div className="flex items-center space-x-2">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.6 }}
                            >
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="/admin/login">
                                        Admin
                                    </Link>
                                </Button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.7 }}
                            >
                                <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                                    <Download className="w-4 h-4 mr-2" />
                                    CV
                                </Button>
                            </motion.div>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className='md:hidden flex items-center'>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className='text-gray-700 hover:text-gray-900 hover:bg-gray-100/50'
                            aria-expanded={isMenuOpen}
                        >
                            <span className='sr-only'>Mở menu chính</span>
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={isMenuOpen ? 'close' : 'open'}
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isMenuOpen ? (
                                        <X className='block h-6 w-6' aria-hidden='true' />
                                    ) : (
                                        <Menu className='block h-6 w-6' aria-hidden='true' />
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            className='md:hidden'
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <motion.div
                                className='px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md border-t border-gray-200'
                                initial={{ y: -20 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 }}
                            >
                                {navigation.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                                    >
                                        <Button
                                            variant="ghost"
                                            asChild
                                            className='w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100/50'
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            <Link href={item.href}>
                                                {item.name}
                                            </Link>
                                        </Button>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.header>
    );
}
