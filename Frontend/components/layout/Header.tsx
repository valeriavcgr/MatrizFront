'use client';

import React from 'react';
import { UsuarioSesion } from '@/types';
import { RoleAvatar } from '@/components/ui/RoleAvatar';
import { Badge } from '@/components/ui/Badge';

interface HeaderProps {
    title: string;
    subtitle?: string;
    usuario: UsuarioSesion;
    onMenuClick?: () => void;
}

/**
 * Cabecera institucional del sistema SENA Matriz.
 * Incorpora navegación contextual, insignia de vigencia institucional
 * y el avatar del usuario de la sesión.
 */
export const Header: React.FC<HeaderProps> = ({
    title,
    subtitle,
    usuario,
    onMenuClick,
}) => {
    return (
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
            <div className="flex items-center gap-3">
                {/* Botón menú móvil */}
                <button
                    type="button"
                    onClick={onMenuClick}
                    className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    aria-label="Abrir menú de navegación"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <div>
                    <div className="flex items-center gap-2 flex-wrap">
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h1>
                        <Badge variant="sena" size="sm" dot>
                            Vigencia 2026
                        </Badge>
                    </div>
                    {subtitle && (
                        <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
                    )}
                </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-4">
                <div className="h-6 w-px bg-slate-200 hidden md:block" />

                {/* Usuario de la sesión con avatar de rol diferenciado */}
                <RoleAvatar role={usuario.rol} nombre={`${usuario.nombres} ${usuario.apellidos}`} size="md" />
            </div>
        </header>
    );
};
