import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'SENA Matriz - Priorización de Oferta Formativa Institucional',
    description:
        'Sistema oficial del Servicio Nacional de Aprendizaje SENA para la gestión de matrices de priorización, articulación con variables del Plan de Gobierno, trimestralización y avales.',
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="es"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-[#39A900]/20 selection:text-[#277700]">
                {children}
            </body>
        </html>
    );
}
