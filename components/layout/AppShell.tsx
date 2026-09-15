'use client';

import React, { useState } from 'react';
import { UserRole } from '@/types';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AppShellProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    initialRole?: UserRole;
}

/**
 * Contenedor maestro de la aplicación SENA Matriz (AppShell).
 * Unifica la barra lateral de navegación institucional, la barra superior
 * y el área de contenido principal con diseño responsive y soporte de roles.
 */
export const AppShell: React.FC<AppShellProps> = ({
    title,
    subtitle,
    children,
    initialRole = 'LIDER_PLANEACION',
}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeRole, setActiveRole] = useState<UserRole>(initialRole);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
            <div className="flex flex-1 w-full max-w-[1920px] mx-auto">
                {/* Menú Lateral Institucional */}
                <Sidebar
                    isOpenMobile={mobileMenuOpen}
                    onCloseMobile={() => setMobileMenuOpen(false)}
                />

                {/* Área de Trabajo */}
                <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50">
                    <Header
                        title={title}
                        subtitle={subtitle}
                        role={activeRole}
                        onMenuClick={() => setMobileMenuOpen(true)}
                        onRoleChange={setActiveRole}
                    />

                    <main className="flex-1 p-4 sm:p-6 lg:p-8">
                        <div className="max-w-7xl mx-auto space-y-6">
                            {children}
                        </div>
                    </main>

                    {/* Footer institucional */}
                    <footer className="px-6 py-4 border-t border-slate-200 bg-white text-center text-xs text-slate-500">
                        <p>
                            Servicio Nacional de Aprendizaje SENA &copy; {new Date().getFullYear()} - Sistema Integrado de Gestión y Matriz de Priorización de Formación.
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
};
