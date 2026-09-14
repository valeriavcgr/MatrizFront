'use client';

import React from 'react';
import Link from 'next/link';
import { SenaLogo } from '@/components/ui/SenaLogo';
import { RoleAvatar } from '@/components/ui/RoleAvatar';
import { Badge } from '@/components/ui/Badge';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
            {/* Barra superior de identidad gubernamental */}
            <div className="bg-[#00324D] text-white px-6 py-2 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2 font-medium tracking-wide">
                    <span className="w-2 h-2 rounded-full bg-[#39A900]" />
                    República de Colombia &bull; Servicio Nacional de Aprendizaje SENA
                </div>
                <div className="text-slate-300 hidden sm:block">
                    Dirección de Formación Profesional &bull; Planeación Estratégica 2026
                </div>
            </div>

            {/* Cabecera institucional */}
            <header className="bg-white border-b border-slate-200 px-6 py-4 shadow-xs">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <SenaLogo variant="horizontal" />
                    </div>

                    <div className="flex items-center gap-3">
                        <Badge variant="sena" size="md" dot>
                            Vigencia Fiscal 2026
                        </Badge>
                        <Link
                            href="/matriz"
                            className="bg-[#39A900] hover:bg-[#329600] text-white text-xs font-bold px-5 py-2 rounded-full shadow-xs transition"
                        >
                            Acceder al Sistema
                        </Link>
                    </div>
                </div>
            </header>

            {/* Contenido principal */}
            <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 space-y-12">
                {/* Hero Institucional */}
                <div className="bg-gradient-to-br from-white via-white to-green-50/50 border border-slate-200 rounded-3xl p-8 lg:p-12 shadow-sm relative overflow-hidden">
                    <div className="max-w-2xl relative z-10 space-y-4">
                        <Badge variant="sena" size="sm">
                            Sistema Integrado SENA Matriz
                        </Badge>
                        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                            Priorización de Oferta Formativa Institucional
                        </h1>
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                            Plataforma oficial para la ponderación de programas académicos, articulación con las 18 variables del Plan de Gobierno, trimestralización de cuotas y emisión de avales de formación profesional.
                        </p>
                        <div className="pt-2 flex flex-wrap items-center gap-3">
                            <Link
                                href="/matriz"
                                className="bg-[#39A900] hover:bg-[#329600] text-white text-sm font-semibold px-6 py-3 rounded-full shadow-sm transition flex items-center gap-2"
                            >
                                <span>Ingresar a Matriz de Priorización</span>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                            <Link
                                href="/parametrizacion/programas"
                                className="bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 text-sm font-semibold px-6 py-3 rounded-full shadow-xs transition"
                            >
                                Parametrización de Programas
                            </Link>
                        </div>
                    </div>

                    <div className="absolute -right-12 -bottom-12 opacity-5 pointer-events-none hidden lg:block">
                        <SenaLogo variant="symbol" className="w-96 h-96" />
                    </div>
                </div>

                {/* Módulos Principales */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                            Módulos del Sistema
                        </h2>
                        <span className="text-xs text-slate-500 font-medium">
                            Acceso directo a las vistas especializadas
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Tarjeta Matriz */}
                        <div className="bg-white border border-slate-200 hover:border-[#39A900] p-6 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                            <div className="space-y-3">
                                <div className="w-10 h-10 rounded-xl bg-green-50 text-[#277700] flex items-center justify-center font-bold">
                                    <svg className="w-5 h-5 text-[#39A900]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#277700] transition-colors">
                                    Matriz de Priorización
                                </h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Asignación y ponderación de criterios según las 18 variables del Plan de Gobierno con control estricto de la sumatoria al 100%.
                                </p>
                            </div>

                            <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-[11px] font-semibold text-slate-500">Rol: Líder Planeación</span>
                                <Link
                                    href="/matriz"
                                    className="text-xs font-bold text-[#39A900] hover:underline flex items-center gap-1"
                                >
                                    Abrir Matriz &rarr;
                                </Link>
                            </div>
                        </div>

                        {/* Tarjeta Parametrización */}
                        <div className="bg-white border border-slate-200 hover:border-[#39A900] p-6 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                            <div className="space-y-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#00324D] flex items-center justify-center font-bold">
                                    <svg className="w-5 h-5 text-[#00324D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#277700] transition-colors">
                                    Parametrización de Programas
                                </h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Catálogo de programas formativos, niveles (Tecnólogo, Técnico, etc.), estado de vigencia y cupos para centros de formación.
                                </p>
                            </div>

                            <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-[11px] font-semibold text-slate-500">Rol: Administrador</span>
                                <Link
                                    href="/parametrizacion/programas"
                                    className="text-xs font-bold text-[#39A900] hover:underline flex items-center gap-1"
                                >
                                    Gestionar Programas &rarr;
                                </Link>
                            </div>
                        </div>

                        {/* Tarjeta Reportes */}
                        <div className="bg-white border border-slate-200 hover:border-[#39A900] p-6 rounded-2xl shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                            <div className="space-y-3">
                                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 flex items-center justify-center font-bold">
                                    <svg className="w-5 h-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-base font-bold text-slate-900 group-hover:text-[#277700] transition-colors">
                                    Generación de Reportes
                                </h3>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    Consolidación ejecutiva para subdirección, exportación multiformato (PDF, Excel, CSV) e indicadores de impacto formativo.
                                </p>
                            </div>

                            <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                                <span className="text-[11px] font-semibold text-slate-500">Rol: Subdirector</span>
                                <Link
                                    href="/reportes"
                                    className="text-xs font-bold text-[#39A900] hover:underline flex items-center gap-1"
                                >
                                    Ver Reportes &rarr;
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Perfiles de Roles Institucionales */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Roles Institucionales Diferenciados
                    </h3>
                    <p className="text-xs text-slate-500">
                        La plataforma incorpora segregación de funciones con avatares e identidades visuales distintivas:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center gap-3">
                            <RoleAvatar role="ADMINISTRADOR" size="md" showDetails={false} />
                            <div>
                                <div className="text-xs font-bold text-[#00324D]">Administrador (AD)</div>
                                <div className="text-[11px] text-slate-500">Gestión de catálogo y parámetros</div>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center gap-3">
                            <RoleAvatar role="LIDER_PLANEACION" size="md" showDetails={false} />
                            <div>
                                <div className="text-xs font-bold text-[#277700]">Líder de Planeación (LP)</div>
                                <div className="text-[11px] text-slate-500">Ponderación de matrices al 100%</div>
                            </div>
                        </div>

                        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center gap-3">
                            <RoleAvatar role="SUBDIRECTOR" size="md" showDetails={false} />
                            <div>
                                <div className="text-xs font-bold text-amber-800">Subdirector (SD)</div>
                                <div className="text-[11px] text-slate-500">Aval y análisis ejecutivo de reportes</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Pie de página institucional */}
            <footer className="bg-white border-t border-slate-200 py-6 px-6 text-center text-xs text-slate-500">
                <p className="max-w-2xl mx-auto leading-relaxed">
                    Servicio Nacional de Aprendizaje SENA &bull; Sistema de Gestión de Matrices de Priorización y Oferta Formativa.
                    <br />
                    Ministerio del Trabajo &bull; República de Colombia.
                </p>
            </footer>
        </div>
    );
}
