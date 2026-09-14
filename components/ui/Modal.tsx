'use client';

import React, { useEffect, useRef } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
    className?: string;
}

/**
 * Modal Institucional Accesible (A11y) con efecto de fondo difuminado (backdrop-blur),
 * transiciones fluidas, cierre por tecla Escape y navegación por teclado.
 */
export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    subtitle,
    children,
    maxWidth = 'lg',
    className = '',
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Manejo de la tecla Escape para cerrar el modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const maxWidthClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-xl',
        xl: 'max-w-2xl',
        '2xl': 'max-w-3xl',
    }[maxWidth];

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            {/* Fondo con desenfoque difuminado (backdrop-blur) y transición */}
            <div
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity animate-fade-in"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Contenedor del Modal */}
            <div
                ref={modalRef}
                className={`relative w-full ${maxWidthClasses} bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-scale-in z-10 ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Cabecera institucional */}
                <div className="flex items-start justify-between px-6 py-5 border-b border-slate-200 bg-slate-50/80">
                    <div>
                        <h2
                            id="modal-title"
                            className="text-lg font-bold text-slate-900 flex items-center gap-2"
                        >
                            <span className="w-2.5 h-2.5 rounded-full bg-[#39A900]" />
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
                        )}
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-200/60 transition-colors focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                        aria-label="Cerrar modal"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Contenido */}
                <div className="px-6 py-5 max-h-[calc(85vh-140px)] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};
