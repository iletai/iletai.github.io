'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

interface GridPatternProps {
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    strokeDasharray?: string;
    className?: string;
    maxOpacity?: number;
    squares?: Array<[x: number, y: number]>;
}

export default function GridPattern({
    width = 40,
    height = 40,
    x = -1,
    y = -1,
    strokeDasharray = "0",

    className,
    maxOpacity = 0.5,
    squares = [],
    ...props
}: GridPatternProps) {
    const id = useRef<string>("");

    useEffect(() => {
        // Generate a unique id for this component
        id.current = Math.random().toString(36).substr(2, 9);
    }, []);

    const getPos = () => {
        return squares.map(([x, y]) => [x * width, y * height]);
    };

    return (
        <svg
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30",
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
                    x={x}
                    y={y}
                >
                    <path
                        d={`M.5,${height}V.5H${width}`}
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray={strokeDasharray}
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${id.current})`} />

            {/* Highlighted squares */}
            <svg x={x} y={y} className="overflow-visible">
                {getPos().map(([x, y], i) => (
                    <rect
                        strokeWidth="0"
                        key={`${x}-${y}-${i}`}
                        width={width - 1}
                        height={height - 1}
                        x={x + 1}
                        y={y + 1}
                        fill="currentColor"
                        fillOpacity={maxOpacity}
                    />
                ))}
            </svg>
        </svg>
    );
}
