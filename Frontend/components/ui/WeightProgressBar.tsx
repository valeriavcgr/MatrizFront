'use client';

import React from 'react';

interface WeightProgressBarProps {
    totalWeight: number;
    className?: string;
    showLabel?: boolean;
}

/**
 * Barra de control de ponderación estricta al 100% para Matrices de Priorización SENA.
 * Proporciona retroalimentación visual en tiempo real del cumplimiento de la regla de negocio.
 */
export const WeightProgressBar: React.FC<WeightProgressBarProps> = ({
    totalWeight,
    className = '',
    showLabel = true,
}) => {
    const isComplete = totalWeight === 100;
    const isOver = totalWeight > 100;
    const remaining = 100 - totalWeight;

    // Colores y badges según el estado de la ponderación
    const getStatusConfig = () => {
        if (isComplete) {
            return {
                barColor: 'bg-[#39A900]',
                bgColor: 'bg-emerald-50',
                borderColor: 'border-emerald-200',
                textColor: 'text-[#277700]',
                badgeText: '100% Completo (Válido para Aval)',
                icon: (
                    <svg className="w-4 h-4 text-[#39A900]" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                        />
                    </svg>
                ),
            };
        }

        if (isOver) {
            return {
                barColor: 'bg-red-600',
                bgColor: 'bg-red-50',
                borderColor: 'border-red-200',
                textColor: 'text-red-700',
                badgeText: `Excede por ${Math.abs(remaining)}% (Límite: 100%)`,
                icon: (
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                ),
            };
        }

        return {
            barColor: 'bg-amber-500',
            bgColor: 'bg-amber-50',
            borderColor: 'border-amber-200',
            textColor: 'text-amber-800',
            badgeText: `Falta ${remaining}% para completar el 100%`,
            icon: (
                <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            ),
        };
    };

    const config = getStatusConfig();
    const clampedProgress = Math.min(Math.max(totalWeight, 0), 100);

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {showLabel && (
                <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700 flex items-center gap-1.5">
                        Sumatoria de Ponderación de Criterios:
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${config.bgColor} ${config.borderColor} ${config.textColor}`}>
                        {config.icon}
                        <span className="font-bold">{totalWeight}%</span>
                        <span className="font-normal opacity-90">({config.badgeText})</span>
                    </span>
                </div>
            )}

            {/* Barra de progreso */}
            <div
                className="w-full h-3 bg-slate-200 rounded-full overflow-hidden relative shadow-inner"
                role="progressbar"
                aria-valuenow={totalWeight}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Progreso de ponderación al 100%"
            >
                <div
                    className={`h-full ${config.barColor} transition-all duration-500 ease-out rounded-full`}
                    style={{ width: `${clampedProgress}%` }}
                />
            </div>
        </div>
    );
};
