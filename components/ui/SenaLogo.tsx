'use client';

import React from 'react';

interface SenaLogoProps {
    className?: string;
    variant?: 'full' | 'symbol' | 'horizontal';
    theme?: 'color' | 'white';
}

/**
 * Logotipo Vectorial Institucional del SENA (Servicio Nacional de Aprendizaje)
 * Diseñado con las proporciones y geometría oficial del manual de identidad visual.
 */
export const SenaLogo: React.FC<SenaLogoProps> = ({
    className = 'h-10 w-auto',
    variant = 'full',
    theme = 'color',
}) => {
    const primaryColor = theme === 'white' ? '#FFFFFF' : '#39A900';
    const textColor = theme === 'white' ? '#FFFFFF' : '#00324D';

    if (variant === 'symbol') {
        return (
            <svg
                viewBox="0 0 100 100"
                className={className}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Símbolo oficial del SENA"
            >
                {/* Cabeza */}
                <circle cx="50" cy="18" r="8" fill={primaryColor} />
                {/* Cuerpo / Brazos extendidos formando el engranaje */}
                <path
                    d="M50 30 C38 30 25 36 18 45 C15 48 18 52 22 50 C28 47 38 42 50 42 C62 42 72 47 78 50 C82 52 85 48 82 45 C75 36 62 30 50 30 Z"
                    fill={primaryColor}
                />
                {/* Piernas / Base angular */}
                <path
                    d="M44 48 L32 82 C31 85 34 88 37 88 C40 88 43 85 45 80 L50 64 L55 80 C57 85 60 88 63 88 C66 88 69 85 68 82 L56 48 Z"
                    fill={primaryColor}
                />
            </svg>
        );
    }

    if (variant === 'horizontal') {
        return (
            <div className={`flex items-center gap-3 ${className}`}>
                <svg
                    viewBox="0 0 100 100"
                    className="h-9 w-9 shrink-0"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Símbolo oficial del SENA"
                >
                    <circle cx="50" cy="18" r="8" fill={primaryColor} />
                    <path
                        d="M50 30 C38 30 25 36 18 45 C15 48 18 52 22 50 C28 47 38 42 50 42 C62 42 72 47 78 50 C82 52 85 48 82 45 C75 36 62 30 50 30 Z"
                        fill={primaryColor}
                    />
                    <path
                        d="M44 48 L32 82 C31 85 34 88 37 88 C40 88 43 85 45 80 L50 64 L55 80 C57 85 60 88 63 88 C66 88 69 85 68 82 L56 48 Z"
                        fill={primaryColor}
                    />
                </svg>
                <div className="flex flex-col">
                    <span
                        className="text-xl font-black tracking-widest leading-none"
                        style={{ color: textColor }}
                    >
                        SENA
                    </span>
                    <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase leading-tight mt-0.5">
                        Matriz de Priorización
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <svg
                viewBox="0 0 100 100"
                className="h-10 w-10 mb-1"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Símbolo oficial del SENA"
            >
                <circle cx="50" cy="18" r="8" fill={primaryColor} />
                <path
                    d="M50 30 C38 30 25 36 18 45 C15 48 18 52 22 50 C28 47 38 42 50 42 C62 42 72 47 78 50 C82 52 85 48 82 45 C75 36 62 30 50 30 Z"
                    fill={primaryColor}
                />
                <path
                    d="M44 48 L32 82 C31 85 34 88 37 88 C40 88 43 85 45 80 L50 64 L55 80 C57 85 60 88 63 88 C66 88 69 85 68 82 L56 48 Z"
                    fill={primaryColor}
                />
            </svg>
            <span
                className="text-lg font-black tracking-widest leading-none"
                style={{ color: primaryColor }}
            >
                SENA
            </span>
            <span className="text-[9px] font-bold tracking-wider text-slate-500 uppercase mt-0.5">
                MATRIZ INSTITUCIONAL
            </span>
        </div>
    );
};
