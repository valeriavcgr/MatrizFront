'use client';

import React from 'react';
import { UserRole } from '@/types';

interface RoleAvatarProps {
    role: UserRole;
    /** Nombre completo del usuario de la sesión */
    nombre: string;
    showDetails?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

interface RoleConfig {
    roleLabel: string;
    bgClass: string;
    borderClass: string;
    textClass: string;
    badgeBgClass: string;
    badgeTextClass: string;
    ringColor: string;
}

const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
    ADMINISTRADOR: {
        roleLabel: 'Administrador',
        bgClass: 'bg-[#00324D]',
        borderClass: 'border-[#004b73]',
        textClass: 'text-white',
        badgeBgClass: 'bg-blue-100 text-[#00324D] border-blue-200',
        badgeTextClass: 'text-[#00324D]',
        ringColor: 'ring-[#00324D]/30',
    },
    LIDER_PLANEACION: {
        roleLabel: 'Líder de Planeación',
        bgClass: 'bg-[#39A900]',
        borderClass: 'border-[#2e8700]',
        textClass: 'text-white',
        badgeBgClass: 'bg-emerald-100 text-[#277700] border-emerald-200',
        badgeTextClass: 'text-[#277700]',
        ringColor: 'ring-[#39A900]/30',
    },
    SUBDIRECTOR: {
        roleLabel: 'Subdirector',
        bgClass: 'bg-[#854D0E]', // Ámbar/Ocre corporativo institucional
        borderClass: 'border-[#713F12]',
        textClass: 'text-white',
        badgeBgClass: 'bg-amber-100 text-amber-900 border-amber-200',
        badgeTextClass: 'text-amber-900',
        ringColor: 'ring-amber-600/30',
    },
};

/**
 * Avatar de rol diferenciado para usuarios del sistema institucional SENA.
 * Proporciona distinción cromática, tipográfica y de estatus entre Administrador,
 * Líder de Planeación y Subdirector.
 */
export const RoleAvatar: React.FC<RoleAvatarProps> = ({
    role,
    nombre,
    showDetails = true,
    size = 'md',
    className = '',
}) => {
    const config = ROLE_CONFIGS[role];
    // Iniciales de las dos primeras palabras del nombre (ej. "Valeria Carrillo" → VC)
    const iniciales = nombre
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((palabra) => palabra[0].toUpperCase())
        .join('');

    const sizeClasses = {
        sm: {
            avatar: 'w-7 h-7 text-xs',
            dot: 'w-2 h-2',
            text: 'text-xs',
            subtext: 'text-[10px]',
        },
        md: {
            avatar: 'w-9 h-9 text-sm',
            dot: 'w-2.5 h-2.5',
            text: 'text-sm',
            subtext: 'text-xs',
        },
        lg: {
            avatar: 'w-11 h-11 text-base',
            dot: 'w-3 h-3',
            text: 'text-base',
            subtext: 'text-xs',
        },
    }[size];

    return (
        <div
            className={`flex items-center gap-3 select-none ${className}`}
            role="region"
            aria-label={`Usuario activo: ${config.roleLabel}`}
        >
            {showDetails && (
                <div className="flex flex-col text-right">
                    <span className={`font-semibold text-slate-800 leading-tight ${sizeClasses.text}`}>
                        {nombre}
                    </span>
                    <span className={`font-medium ${config.badgeTextClass} leading-tight ${sizeClasses.subtext}`}>
                        {config.roleLabel}
                    </span>
                </div>
            )}

            <div className="relative group">
                <div
                    className={`${sizeClasses.avatar} ${config.bgClass} ${config.textClass} rounded-full flex items-center justify-center font-bold tracking-wider shadow-sm ring-2 ${config.ringColor} transition-transform group-hover:scale-105`}
                    title={`${config.roleLabel}: ${nombre}`}
                >
                    {iniciales}
                </div>
                {/* Indicador de estado en línea */}
                <span
                    className={`absolute bottom-0 right-0 ${sizeClasses.dot} bg-emerald-500 rounded-full ring-2 ring-white`}
                    aria-hidden="true"
                    title="Sesión activa"
                />
            </div>
        </div>
    );
};
