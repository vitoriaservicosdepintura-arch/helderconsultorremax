import React from 'react';
import { motion } from 'framer-motion';

export default function LightPillar({
    topColor = "#5227FF",
    bottomColor = "#FF9FFC",
    intensity = 1,
    rotationSpeed = 0.3,
    glowAmount = 0.002,
    pillarWidth = 3,
    pillarHeight = 0.4,
    noiseIntensity = 0.5,
    pillarRotation = 25,
    interactive = false,
    mixBlendMode = "screen",
    quality = "high"
}: any) {

    // Setup glowing bloom base layers
    const blurBase = quality === 'high' ? 8 : 4;

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                mixBlendMode: mixBlendMode as any,
                opacity: intensity,
                position: 'absolute',
                inset: 0,
                overflow: 'visible',
                pointerEvents: 'none'
            }}
            className="flex items-center justify-center"
        >
            <motion.div
                animate={{
                    rotate: [pillarRotation, pillarRotation + Math.max(1, 3 * rotationSpeed), pillarRotation],
                    opacity: [0.7, 1, 0.7]
                }}
                transition={{ repeat: Infinity, duration: 6 / (rotationSpeed || 0.1), ease: "easeInOut" }}
                className="relative flex justify-center items-center"
                style={{
                    width: `${pillarWidth * 10}px`,
                    height: `${pillarHeight * 100}%`,
                }}
            >
                {/* Deep external glow */}
                <div style={{
                    position: 'absolute',
                    inset: '-30px',
                    background: `linear-gradient(to bottom, ${topColor}, ${bottomColor})`,
                    filter: `blur(${blurBase * 6}px)`,
                    opacity: 0.5
                }} />

                {/* Intense direct glow */}
                <div style={{
                    position: 'absolute',
                    inset: '-5px',
                    background: `linear-gradient(to bottom, ${topColor}, ${bottomColor})`,
                    filter: `blur(${blurBase}px)`,
                    opacity: 0.9,
                    boxShadow: `0 0 ${(glowAmount || 0.001) * 15000}px ${(glowAmount || 0.001) * 8000}px ${bottomColor}`
                }} />

                {/* Hot glowing core */}
                <div style={{
                    width: '3px',
                    height: '80%',
                    background: '#FFFFFF',
                    position: 'absolute',
                    filter: 'blur(2px)',
                    opacity: 0.9
                }} />

                {/* Subtle organic noise */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: noiseIntensity,
                    background: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
                    mixBlendMode: 'overlay',
                }} />
            </motion.div>
        </div>
    );
}
