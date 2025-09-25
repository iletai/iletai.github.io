'use client';

import { motion, useInView } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface FadeInSectionProps {
    children: ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right';
    delay?: number;
    duration?: number;
    className?: string;
}

export default function FadeInSection({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.6,
    className
}: FadeInSectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-10% 0px' });

    const variants = {
        up: { y: 50, opacity: 0 },
        down: { y: -50, opacity: 0 },
        left: { x: 50, opacity: 0 },
        right: { x: -50, opacity: 0 },
    };

    return (
        <motion.div
            ref={ref}
            initial={variants[direction]}
            animate={isInView ? { x: 0, y: 0, opacity: 1 } : variants[direction]}
            transition={{
                duration,
                delay,
                ease: 'easeOut'
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
