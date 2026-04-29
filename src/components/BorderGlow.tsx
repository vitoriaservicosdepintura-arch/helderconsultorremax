import React, { useRef, useState, MouseEvent } from 'react';

interface BorderGlowProps {
    children?: React.ReactNode;
    edgeSensitivity?: number;
    glowColor?: string;
    backgroundColor?: string;
    borderRadius?: number;
    glowRadius?: number;
    glowIntensity?: number;
    coneSpread?: number;
    animated?: boolean;
    colors?: string[];
    className?: string;
}

const BorderGlow: React.FC<BorderGlowProps> = ({
    children,
    edgeSensitivity = 30,
    glowColor = "40 80 80",
    backgroundColor = "#120F17",
    borderRadius = 28,
    glowRadius = 40,
    glowIntensity = 1,
    coneSpread = 25,
    animated = false,
    colors = ['#003DA5', '#E11B22', '#FFFFFF'],
    className = ''
}) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
    const rectRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!rectRef.current) return;
        const rect = rectRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setPosition({ x, y });

        // Simple edge sensitivity check to decide opacity
        const isNearEdge =
            x < edgeSensitivity ||
            x > rect.width - edgeSensitivity ||
            y < edgeSensitivity ||
            y > rect.height - edgeSensitivity;

        setOpacity(isNearEdge ? glowIntensity : glowIntensity * 0.5);
    };

    // Build the rgb components assuming space-separated values
    const rgbColor = glowColor.includes(' ') ? glowColor.replace(/ /g, ',') : '255,255,255';

    // Use animated colors if specified, else single color
    const backgroundContent = animated && colors.length > 0
        ? `conic-gradient(from 0deg, ${colors.join(', ')})`
        : `radial-gradient(${glowRadius}px circle at ${position.x}px ${position.y}px, rgba(${rgbColor}, 1), transparent ${coneSpread}%)`;

    return (
        <div
            ref={rectRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setOpacity(0)}
            onMouseEnter={() => setOpacity(glowIntensity)}
            className={`relative inline-block overflow-hidden ${className}`}
            style={{
                borderRadius: borderRadius,
                background: backgroundColor,
            }}
        >
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
                style={{
                    opacity,
                    background: backgroundContent,
                }}
            />
            <div
                className="absolute inset-[1px] z-10 pointer-events-none"
                style={{ borderRadius: borderRadius - 1, background: backgroundColor }}
            />
            <div className="relative z-20 w-full h-full pointer-events-auto">{children}</div>
        </div>
    );
}

export default BorderGlow;
