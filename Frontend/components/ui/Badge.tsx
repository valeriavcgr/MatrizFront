'use client';

import React from 'react';

export type BadgeVariant =
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'neutral'
    | 'sena';

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    size?: 'sm' | 'md';
    dot?: boolean;
    className?: string;
}

const VARIANT_STYLES: Record<BadgeVariant, { container: string; dot: string }> = {
    sena: {
        container: 'bg-green-50 text-[#277700] border-green-200',
        dot: 'bg-[#39A900]',
    },
    success: {
        container: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dot: 'bg-emerald-500',
    },
    warning: {
        container: 'bg-amber-50 text-amber-800 border-amber-200',
        dot: 'bg-amber-500',
    },
    danger: {
        container: 'bg-red-50 text-red-700 border-red-200',
        dot: 'bg-red-500',
    },
    info: {
        container: 'bg-sky-50 text-sky-800 border-sky-200',
        dot: 'bg-sky-500',
    },
    neutral: {
        container: 'bg-slate-100 text-slate-700 border-slate-200',
        dot: 'bg-slate-400',
    },
};

/**
 * Componente Badge institucional para estados, categorías y etiquetas.
 */
export const Badge: React.FC<BadgeProps> = ({
    children,
    variant = 'neutral',
    size = 'sm',
    dot = false,
    className = '',
}) => {
    const styles = VARIANT_STYLES[variant];
    const sizeClasses = size === 'sm' ? 'px-2.5 py-0.5 text-xs' : 'px-3 py-1 text-sm';

    return (
        <span
            className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${styles.container} ${sizeClasses} ${className}`}
        >
            {dot && <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} aria-hidden="true" />}
            {children}
        </span>
    );
};
