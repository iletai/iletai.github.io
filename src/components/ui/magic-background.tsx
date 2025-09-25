'use client';

import { cn } from '@/lib/utils';
import AnimatedGridPattern from './animated-grid-pattern';
import DotPattern from './dot-pattern';

interface MagicBackgroundProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'dots' | 'grid' | 'combined' | 'subtle';
    intensity?: 'low' | 'medium' | 'high';
}

export default function MagicBackground({
    children,
    className,
    variant = 'combined',
    intensity = 'medium',
}: MagicBackgroundProps) {
    const getOpacityClasses = () => {
        switch (intensity) {
            case 'low': return { dots: 'opacity-10', grid: 'opacity-10' };
            case 'medium': return { dots: 'opacity-20', grid: 'opacity-20' };
            case 'high': return { dots: 'opacity-40', grid: 'opacity-40' };
            default: return { dots: 'opacity-20', grid: 'opacity-20' };
        }
    };

    const opacityClasses = getOpacityClasses();

    return (
        <div className={cn("relative overflow-hidden", className)}>
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 -z-15 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-teal-600/20 animate-gradient bg-[length:300%_100%]" />

            {/* Background Effects */}
            {(variant === 'dots' || variant === 'combined') && (
                <DotPattern
                    className={cn("absolute inset-0 -z-10 text-neutral-400/80", opacityClasses.dots)}
                    width={16}
                    height={16}
                    cx={1}
                    cy={1}
                    cr={1}
                    glow={false}
                />
            )}

            {(variant === 'grid' || variant === 'combined') && (
                <AnimatedGridPattern
                    numSquares={variant === 'combined' ? 40 : 60}
                    maxOpacity={intensity === 'low' ? 0.1 : intensity === 'medium' ? 0.3 : 0.5}
                    duration={3}
                    repeatDelay={0.5}
                    size={40}
                    className={cn("absolute inset-0 -z-10 text-blue-500/50", opacityClasses.grid)}
                />
            )}

            {variant === 'subtle' && (
                <>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50" />
                    {/* Subtle dots */}
                    <DotPattern
                        className="absolute inset-0 -z-10 text-gray-300 opacity-5"
                        width={24}
                        height={24}
                        cx={1}
                        cy={1}
                        cr={0.5}
                    />
                </>
            )}

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}
