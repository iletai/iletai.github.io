'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

interface DotPatternProps {
    width?: number;
    height?: number;
    cx?: number;
    cy?: number;
    cr?: number;
    className?: string;
    glow?: boolean;
}

export default function DotPattern({
    width = 16,
    height = 16,
    cx = 1,
    cy = 1,
    cr = 1,
    className,
    glow = false,
    ...props
}: DotPatternProps) {
    const id = useRef<string>("");

    useEffect(() => {
        // Generate a unique id for this component
        id.current = Math.random().toString(36).substr(2, 9);
    }, []);

    return (
        <svg
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute inset-0 h-full w-full fill-neutral-400/80",
                className
            )}
            {...props}
        >
            <defs>
                <pattern
                    id={id.current}
                    width={width}
                    height={height}
                    patternUnits="userSpaceOnUse"
                    patternContentUnits="userSpaceOnUse"
                >
                    <circle
                        id="pattern-circle"
                        cx={cx}
                        cy={cy}
                        r={cr}
                        fill="currentColor"
                        className={glow ? "animate-pulse" : ""}
                    />
                </pattern>
                {glow && (
                    <filter id={`glow-${id.current}`}>
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                )}
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id.current})`} />
        </svg>
    );
}
