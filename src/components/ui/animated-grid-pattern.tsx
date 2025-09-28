'use client';

import { cn } from '@/lib/utils';
import { useEffect, useId, useState } from 'react';

interface AnimatedGridPatternProps {
    width?: number;
    height?: number;
    numSquares?: number;
    maxOpacity?: number;
    duration?: number;
    repeatDelay?: number;
    className?: string;
    size?: number;
}

export default function AnimatedGridPattern({
    width = 40,
    height = 40,
    numSquares = 50,
    maxOpacity = 0.5,
    duration = 4,
    repeatDelay = 0.5,
    className,
    size = 20,
    ...props
}: AnimatedGridPatternProps) {
    const [grid, setGrid] = useState<Array<{ x: number; y: number; opacity: number; delay: number }>>([]);

    const id = useId();

    useEffect(() => {
        const generateGrid = () => {
            const newGrid = [];
            for (let i = 0; i < numSquares; i++) {
                newGrid.push({
                    x: Math.floor(Math.random() * (width / size)) * size,
                    y: Math.floor(Math.random() * (height / size)) * size,
                    opacity: Math.random() * maxOpacity,
                    delay: Math.random() * repeatDelay,
                });
            }
            setGrid(newGrid);
        };

        generateGrid();
        const interval = setInterval(generateGrid, (duration + repeatDelay) * 1000);

        return () => clearInterval(interval);
    }, [numSquares, width, height, size, maxOpacity, duration, repeatDelay]);

    return (
        <svg
            className={cn(
                "pointer-events-none absolute inset-0 h-full w-full",
                className
            )}
            {...props}
        >
            <defs>
                <pattern
                    id={id}
                    width={size}
                    height={size}
                    patternUnits="userSpaceOnUse"
                >
                    <rect
                        width={size}
                        height={size}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        opacity="0.1"
                    />
                </pattern>
            </defs>

            <rect width="100%" height="100%" fill={`url(#${id})`} />

            {grid.map((square, i) => (
                <rect
                    key={i}
                    x={square.x}
                    y={square.y}
                    width={size}
                    height={size}
                    fill="currentColor"
                    opacity={square.opacity}
                    className="animate-pulse"
                    style={{
                        animationDelay: `${square.delay}s`,
                        animationDuration: `${duration}s`,
                    }}
                />
            ))}
        </svg>
    );
}
