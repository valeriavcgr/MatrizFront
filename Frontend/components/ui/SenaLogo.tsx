'use client';

import React from 'react';
import Image from 'next/image';

interface SenaLogoProps {
    className?: string;
    variant?: 'full' | 'symbol' | 'horizontal';
    theme?: 'color' | 'white';
}

/**
 * Logotipo Institucional del SENA (Servicio Nacional de Aprendizaje)
 */
export const SenaLogo: React.FC<SenaLogoProps> = ({
    className = 'h-10 w-auto',
    variant = 'full',
    theme = 'color',
}) => {
    const textColor = theme === 'white' ? '#FFFFFF' : '#00324D';

    if (variant === 'symbol') {
        return (
            <Image
                src="/sena-logo.png"
                alt="Símbolo oficial del SENA"
                width={100}
                height={90}
                className={`object-contain ${className}`}
            />
        );
    }

    if (variant === 'horizontal') {
        return (
            <div className={`flex items-center gap-3 ${className}`}>
                <Image
                    src="/sena-logo.png"
                    alt="Símbolo oficial del SENA"
                    width={36}
                    height={32}
                    className="h-9 w-9 shrink-0 object-contain"
                />
                <div className="flex flex-col">
                    <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase leading-tight mt-0.5">
                        Matriz de Priorización
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex flex-col items-center justify-center ${className}`}>
            <Image
                src="/sena-logo.png"
                alt="Símbolo oficial del SENA"
                width={40}
                height={36}
                className="h-10 w-10 mb-1 object-contain"
            />
            <span className="text-[15px] font-bold tracking-wider text-slate-900 uppercase mt-0.5">
                MATRIZ PRIORIZACIÓN
            </span>
        </div>
    );
};
