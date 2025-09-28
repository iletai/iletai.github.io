'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';

interface BackButtonProps {
    href?: string;
    className?: string;
    variant?: 'default' | 'ghost' | 'outline';
    showHomeIcon?: boolean;
}

export default function BackButton({
    href = '/',
    className,
    variant = 'ghost',
    showHomeIcon = false
}: BackButtonProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={cn('mb-6', className)}
        >
            <Button
                variant={variant}
                asChild
                className={cn(
                    'group relative overflow-hidden rounded-xl border border-gray-200/60 dark:border-gray-700/60',
                    'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm',
                    'hover:bg-gray-50 dark:hover:bg-gray-800',
                    'hover:border-gray-300 dark:hover:border-gray-600',
                    'transition-all duration-300 ease-out',
                    'shadow-sm hover:shadow-md',
                    'px-4 py-2.5 h-auto'
                )}
            >
                <Link href={href} className="flex items-center gap-3">
                    <motion.div
                        className={cn(
                            'flex items-center justify-center',
                            'w-8 h-8 rounded-lg',
                            'bg-gradient-to-br from-blue-50 to-indigo-50',
                            'dark:from-blue-900/30 dark:to-indigo-900/30',
                            'border border-blue-100 dark:border-blue-800/50',
                            'group-hover:from-blue-100 group-hover:to-indigo-100',
                            'dark:group-hover:from-blue-800/40 dark:group-hover:to-indigo-800/40',
                            'transition-all duration-300'
                        )}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {showHomeIcon ? (
                            <Home className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        ) : (
                            <ArrowLeft className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        )}
                    </motion.div>

                    <div className="flex flex-col items-start">
                        <span className={cn(
                            'text-sm font-medium text-gray-900 dark:text-gray-100',
                            'group-hover:text-gray-700 dark:group-hover:text-gray-200',
                            'transition-colors duration-200'
                        )}>
                            Back to Home
                        </span>
                        <span className={cn(
                            'text-xs text-gray-500 dark:text-gray-400',
                            'group-hover:text-gray-600 dark:group-hover:text-gray-300',
                            'transition-colors duration-200'
                        )}>
                            Return to homepage
                        </span>
                    </div>

                    {/* Hover effect overlay */}
                    <motion.div
                        className={cn(
                            'absolute inset-0 bg-gradient-to-r',
                            'from-blue-500/5 via-indigo-500/5 to-purple-500/5',
                            'opacity-0 group-hover:opacity-100',
                            'transition-opacity duration-300'
                        )}
                        initial={false}
                    />
                </Link>
            </Button>
        </motion.div>
    );
}
