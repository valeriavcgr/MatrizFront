'use client';

import React, { useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { leerUsuario, suscribirSesion } from '@/lib/sesion';
import { UsuarioSesion } from '@/types';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AppShellProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

/**
 * Contenedor maestro de la aplicación SENA Matriz (AppShell).
 * Unifica la barra lateral de navegación institucional, la barra superior
 * y el área de contenido principal con diseño responsive y soporte de roles.
 * Solo se muestra con sesión iniciada; sin sesión redirige al login.
 */
export const AppShell: React.FC<AppShellProps> = ({
    title,
    subtitle,
    children,
}) => {
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [usuario, setUsuario] = useState<UsuarioSesion | null>(null);

    // Next 16 conserva en memoria las pantallas ya visitadas y las vuelve a
    // mostrar con el botón Atrás: por eso la sesión se verifica cada vez que la
    // pantalla aparece (este efecto se vuelve a ejecutar), cuando la sesión
    // cambia y cuando el navegador restaura la página desde su caché.
    // useLayoutEffect: se verifica antes de pintar, sin mostrar datos viejos.
    useLayoutEffect(() => {
        const verificar = () => {
            // sessionStorage solo existe en el navegador: se lee en el efecto,
            // no al renderizar, para no romper la hidratación.
            const sesion = leerUsuario();
            setUsuario(sesion);
            if (!sesion) router.replace('/');
        };
        verificar();
        return suscribirSesion(verificar);
    }, [router]);

    // Mientras se verifica la sesión no se muestra contenido protegido.
    if (!usuario) return null;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
            <div className="flex flex-1 w-full max-w-[1920px] mx-auto">
                {/* Menú Lateral Institucional */}
                <Sidebar
                    usuario={usuario}
                    isOpenMobile={mobileMenuOpen}
                    onCloseMobile={() => setMobileMenuOpen(false)}
                />

                {/* Área de Trabajo */}
                <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50">
                    <Header
                        title={title}
                        subtitle={subtitle}
                        usuario={usuario}
                        onMenuClick={() => setMobileMenuOpen(true)}
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
