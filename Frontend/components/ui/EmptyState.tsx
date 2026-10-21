'use client';

import React from 'react';

interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
    icon?: React.ReactNode;
    className?: string;
}

/**
 * Estado vacío institucional para tablas, filtros y listas sin resultados.
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
    title,
    description,
    actionLabel,
    onAction,
    icon,
    className = '',
}) => {
    return (
        <div
            className={`flex flex-col items-center justify-center p-12 text-center bg-slate-50/70 border border-dashed border-slate-300 rounded-xl my-4 ${className}`}
            role="status"
            aria-label={title}
        >
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4 border border-slate-200">
                {icon ? (
                    icon
                ) : (
                    <svg
                        className="w-7 h-7"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                        />
                    </svg>
                )}
            </div>
            <h3 className="text-base font-semibold text-slate-800 mb-1">{title}</h3>
            <p className="text-sm text-slate-500 max-w-md mb-6">{description}</p>
            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    type="button"
                    className="inline-flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-[#39A900] hover:bg-[#329600] rounded-full shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:ring-offset-2"
                >
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    {actionLabel}
                </button>
            )}
        </div>
    );
};
