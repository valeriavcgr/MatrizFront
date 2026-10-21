'use client';

import React from 'react';
import { TableColumn } from '@/types';
import { EmptyState } from './EmptyState';

interface DataTableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    keyExtractor: (item: T, index: number) => string | number;
    emptyTitle?: string;
    emptyDescription?: string;
    emptyActionLabel?: string;
    onEmptyAction?: () => void;
    isLoading?: boolean;
    pagination?: {
        currentPage: number;
        totalPages: number;
        totalItems?: number;
        pageSize?: number;
        onPageChange: (newPage: number) => void;
    };
    onRowClick?: (item: T) => void;
    className?: string;
}

/**
 * Tabla de datos institucional reutilizable y tipada estrictamente en TypeScript.
 * Incorpora fondos en grises limpios para cabeceras, realce interactivo al pasar el cursor (hover),
 * soporte de estados vacíos y controles de paginación accesibles.
 */
export function DataTable<T>({
    data,
    columns,
    keyExtractor,
    emptyTitle = 'No hay registros disponibles',
    emptyDescription = 'No se encontraron datos en esta consulta.',
    emptyActionLabel,
    onEmptyAction,
    isLoading = false,
    pagination,
    onRowClick,
    className = '',
}: DataTableProps<T>) {
    if (isLoading) {
        return (
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-200 border-t-[#39A900] mb-3" />
                <p className="text-sm font-medium text-slate-600">Cargando registros institucionales...</p>
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <EmptyState
                title={emptyTitle}
                description={emptyDescription}
                actionLabel={emptyActionLabel}
                onAction={onEmptyAction}
            />
        );
    }

    return (
        <div className={`space-y-4 ${className}`}>
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm ring-1 ring-black/5">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-sm text-left" role="table">
                        <thead>
                            <tr className="bg-slate-100/90 text-slate-700 border-b border-slate-200">
                                {columns.map((col) => {
                                    const alignClass =
                                        col.align === 'center'
                                            ? 'text-center'
                                            : col.align === 'right'
                                            ? 'text-right'
                                            : 'text-left';

                                    return (
                                        <th
                                            key={col.key}
                                            scope="col"
                                            className={`px-4 py-3.5 text-xs font-semibold tracking-wider text-slate-700 uppercase border-r last:border-r-0 border-slate-200 ${alignClass} ${col.headerClassName || ''}`}
                                        >
                                            {col.header}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {data.map((item, index) => {
                                const rowKey = keyExtractor(item, index);
                                return (
                                    <tr
                                        key={rowKey}
                                        onClick={() => onRowClick && onRowClick(item)}
                                        className={`transition-colors duration-150 border-b border-slate-100 last:border-b-0 hover:bg-emerald-50/50 ${
                                            onRowClick ? 'cursor-pointer' : ''
                                        }`}
                                    >
                                        {columns.map((col) => {
                                            const alignClass =
                                                col.align === 'center'
                                                    ? 'text-center'
                                                    : col.align === 'right'
                                                    ? 'text-right'
                                                    : 'text-left';

                                            return (
                                                <td
                                                    key={`${rowKey}-${col.key}`}
                                                    className={`px-4 py-3 text-slate-700 border-r last:border-r-0 border-slate-100 ${alignClass} ${col.className || ''}`}
                                                >
                                                    {col.render
                                                        ? col.render(item, index)
                                                        : String((item as Record<string, unknown>)[col.key] ?? '')}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Paginador Institucional */}
            {pagination && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 py-1 text-xs text-slate-600">
                    <div>
                        {pagination.totalItems !== undefined ? (
                            <span>
                                Mostrando{' '}
                                <strong className="font-semibold text-slate-800">
                                    {(pagination.currentPage - 1) * (pagination.pageSize || 10) + 1}
                                </strong>{' '}
                                a{' '}
                                <strong className="font-semibold text-slate-800">
                                    {Math.min(
                                        pagination.currentPage * (pagination.pageSize || 10),
                                        pagination.totalItems
                                    )}
                                </strong>{' '}
                                de{' '}
                                <strong className="font-semibold text-slate-800">
                                    {pagination.totalItems}
                                </strong>{' '}
                                registros
                            </span>
                        ) : (
                            <span>
                                Página{' '}
                                <strong className="font-semibold text-slate-800">
                                    {pagination.currentPage}
                                </strong>{' '}
                                de{' '}
                                <strong className="font-semibold text-slate-800">
                                    {pagination.totalPages}
                                </strong>
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            disabled={pagination.currentPage <= 1}
                            onClick={() => pagination.onPageChange(pagination.currentPage - 1)}
                            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium transition disabled:opacity-40 disabled:cursor-not-allowed shadow-xs focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                            aria-label="Página anterior"
                        >
                            &larr; Anterior
                        </button>

                        <div className="flex items-center gap-1">
                            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
                                (pageNum) => (
                                    <button
                                        key={pageNum}
                                        type="button"
                                        onClick={() => pagination.onPageChange(pageNum)}
                                        className={`w-7 h-7 rounded-full text-xs font-semibold transition ${
                                            pageNum === pagination.currentPage
                                                ? 'bg-[#39A900] text-white shadow-xs'
                                                : 'text-slate-600 hover:bg-slate-100'
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                )
                            )}
                        </div>

                        <button
                            type="button"
                            disabled={pagination.currentPage >= pagination.totalPages}
                            onClick={() => pagination.onPageChange(pagination.currentPage + 1)}
                            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium transition disabled:opacity-40 disabled:cursor-not-allowed shadow-xs focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                            aria-label="Página siguiente"
                        >
                            Siguiente &rarr;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
