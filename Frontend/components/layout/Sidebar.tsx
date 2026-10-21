'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SenaLogo } from '@/components/ui/SenaLogo';

interface SidebarProps {
    isOpenMobile?: boolean;
    onCloseMobile?: () => void;
}

interface NavItem {
    name: string;
    href?: string;
    icon?: React.ReactNode;
    children?: { name: string; href: string }[];
}

/**
 * Menú lateral de navegación institucional del SENA.
 * Proporciona acceso jerárquico a los módulos de la plataforma,
 * detección de ruta activa y soporte totalmente responsivo.
 */
export const Sidebar: React.FC<SidebarProps> = ({
    isOpenMobile = false,
    onCloseMobile,
}) => {
    const pathname = usePathname();
    const router = useRouter();
    const [parametrizacionExpanded, setParametrizacionExpanded] = useState(
        pathname.startsWith('/parametrizacion')
    );

    const isLinkActive = (href?: string) => {
        if (!href) return false;
        if (href === '/') return pathname === '/';
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const navItems: NavItem[] = [
        {
            name: 'Inicio',
            href: '/',
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                </svg>
            ),
        },
        {
            name: 'Parametrización',
            children: [
                { name: 'Programas', href: '/parametrizacion/programas' },
                { name: 'Centros de Formación', href: '/parametrizacion/centros' },
                { name: 'Modalidades', href: '/parametrizacion/modalidades' },
                { name: 'Jornadas', href: '/parametrizacion/jornadas' },
                { name: 'Tipos de Oferta', href: '/parametrizacion/tipos-oferta' },
            ],
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            ),
        },
        {
            name: 'Matriz de Priorización',
            href: '/matriz',
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                </svg>
            ),
        },
        {
            name: 'Trimestralización',
            href: '/trimestralizacion',
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
            ),
        },
        {
            name: 'Vigencias',
            href: '/vigencias',
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ),
        },
        {
            name: 'Aval Institucional',
            href: '/aval',
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                </svg>
            ),
        },
        {
            name: 'Reportes',
            href: '/reportes',
            icon: (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
            ),
        },
    ];

    const content = (
        <div className="h-full flex flex-col justify-between bg-slate-50/90 border-r border-slate-200 p-4 select-none">
            {/* Encabezado con Logo SENA */}
            <div>
                <div className="mb-6 pb-4 border-b border-slate-200">
                    <Link
                        href="/"
                        className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-[#39A900] rounded-xl p-1"
                        onClick={onCloseMobile}
                    >
                        <SenaLogo variant="horizontal" className="transition-transform group-hover:scale-102" />
                    </Link>
                </div>

                {/* Lista de Navegación */}
                <nav className="space-y-1.5 text-sm" aria-label="Navegación principal">
                    {navItems.map((item) => {
                        // Caso con submenú (ej. Parametrización)
                        if (item.children) {
                            const isChildActive = pathname.startsWith('/parametrizacion');
                            const isOpen = parametrizacionExpanded || isChildActive;

                            return (
                                <div key={item.name} className="space-y-1">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (!isOpen) {
                                                setParametrizacionExpanded(true);
                                                router.push('/parametrizacion/programas');
                                            } else {
                                                setParametrizacionExpanded(!parametrizacionExpanded);
                                            }
                                        }}
                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors ${
                                            isChildActive
                                                ? 'text-slate-900 bg-slate-200/90 font-bold border border-slate-300/60 shadow-2xs'
                                                : 'text-slate-700 font-medium hover:bg-slate-200/60'
                                        }`}
                                    >
                                        <div className="flex items-center gap-2.5">
                                            {item.icon}
                                            <span>{item.name}</span>
                                        </div>
                                        <svg
                                            className={`w-3.5 h-3.5 transition-transform duration-200 text-slate-500 ${
                                                isOpen ? 'rotate-180 text-[#39A900]' : ''
                                            }`}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>

                                    {isOpen && (
                                        <div className="pl-6 pr-1 py-1 space-y-1 border-l-2 border-slate-300 ml-4 animate-fade-in">
                                            {item.children.map((child) => {
                                                const active = isLinkActive(child.href);
                                                return (
                                                    <Link
                                                        key={child.name}
                                                        href={child.href}
                                                        onClick={onCloseMobile}
                                                        className={`block px-3 py-1.5 rounded-lg text-xs transition ${
                                                            active
                                                                ? 'bg-[#39A900] text-white shadow-xs font-bold'
                                                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 font-medium'
                                                        }`}
                                                    >
                                                        {child.name}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        }

                        // Elementos de enlace directo
                        const active = isLinkActive(item.href);
                        return (
                            <Link
                                key={item.name}
                                href={item.href || '#'}
                                onClick={onCloseMobile}
                                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium transition ${
                                    active
                                        ? 'bg-[#39A900] text-white shadow-xs font-semibold'
                                        : 'text-slate-700 hover:bg-emerald-50/70 hover:text-[#277700]'
                                }`}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Footer institucional de la barra lateral */}
            <div className="border-t border-slate-200 pt-4 space-y-3">
                <div className="bg-slate-100/80 p-2.5 rounded-xl border border-slate-200 text-xs">
                    <div className="font-semibold text-slate-800">Centro de Servicios Financieros</div>
                    <div className="text-[11px] text-slate-500">Regional Distrito Capital</div>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        // [BACKEND INTEGRATION]: POST /api/v1/auth/logout
                        router.push('/');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                    <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                    </svg>
                    Cerrar Sesión Institucional
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Versión de escritorio */}
            <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
                {content}
            </aside>

            {/* Versión móvil (Drawer) */}
            {isOpenMobile && (
                <div className="fixed inset-0 z-50 lg:hidden flex">
                    <div
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
                        onClick={onCloseMobile}
                        aria-hidden="true"
                    />
                    <div className="relative w-72 max-w-[80vw] h-full shadow-2xl z-10">
                        {content}
                    </div>
                </div>
            )}
        </>
    );
};
