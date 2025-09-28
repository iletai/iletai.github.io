'use client';

import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();

    // useEffect only runs on the client, so now we can safely show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        // Return a placeholder with the same dimensions to avoid layout shift
        return (
            <Button
                variant="ghost"
                size="sm"
                className="w-9 h-9"
                disabled
                suppressHydrationWarning
            >
                <div className="h-4 w-4" />
                <span className="sr-only">Loading theme toggle</span>
            </Button>
        );
    }

    const isDark = resolvedTheme === 'dark';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="w-9 h-9 hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={isDark ? 'moon' : 'sun'}
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {isDark ? (
                            <Moon className="h-4 w-4" />
                        ) : (
                            <Sun className="h-4 w-4" />
                        )}
                    </motion.div>
                </AnimatePresence>
            </Button>
        </motion.div>
    );
}
