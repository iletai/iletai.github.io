'use client';

import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedCardProps {
    children: ReactNode;
    className?: string;
    index?: number;
}

export default function AnimatedCard({ children, className, index = 0 }: AnimatedCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut'
            }}
            whileHover={{
                y: -8,
                transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
        >
            <Card className={className}>
                {children}
            </Card>
        </motion.div>
    );
}
