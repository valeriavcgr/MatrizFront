'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/ui/DataTable';
import { TableColumn } from '@/types';

interface ReporteRegistro {
    id: string;
    nombre: string;
    formato: 'PDF' | 'EXCEL' | 'CSV';
    fecha: string;
    usuario: string;
    tamano: string;
}

export default function ReportesPage() {
    const [generandoId, setGenerandoId] = useState<string | null>(null);
    const [exportandoFormato, setExportandoFormato] = useState<string | null>(null);
    const [notificacion, setNotificacion] = useState<string | null>(null);

    // Historial simulado de reportes generados
    // [BACKEND INTEGRATION]: GET /api/v1/reportes/historial
    const [historial, setHistorial] = useState<ReporteRegistro[]>([
        {
            id: 'rep-01',
            nombre: 'Reporte_General_Matrices_2026.xlsx',
            formato: 'EXCEL',
            fecha: '2026-02-14 11:30',
            usuario: 'Dr. Hernán Torres V.',
            tamano: '2.4 MB',
        },
        {
            id: 'rep-02',
            nombre: 'Consolidado_Plan_Gobierno_CSF.pdf',
            formato: 'PDF',
            fecha: '2026-02-12 16:45',
            usuario: 'Valeria Carrillo G.',
            tamano: '4.8 MB',
        },
        {
            id: 'rep-03',
            nombre: 'Distribucion_Cuotas_Trimestre_Q1_Q4.csv',
            formato: 'CSV',
            fecha: '2026-02-10 09:15',
            usuario: 'Carlos Mendoza R.',
            tamano: '850 KB',
        },
    ]);

    const reportesDisponibles = [
        {
            id: 'rep-gen',
            titulo: 'Reporte General de Matrices de Priorización',
            descripcion: 'Consolidado exhaustivo de todas las matrices institucionales con sus porcentajes de ponderación y estado actual de aval.',
            badge: 'Prioritario',
        },
        {
            id: 'rep-vig',
            titulo: 'Reporte Comparativo por Vigencia Fiscal',
            descripcion: 'Matrices formativas agrupadas cronológicamente con análisis de evolución de cuotas asignadas en las vigencias 2024, 2025 y 2026.',
            badge: 'Histórico',
        },
        {
            id: 'rep-cen',
            titulo: 'Reporte por Centros de Formación',
            descripcion: 'Desglose detallado por centros y regionales: Centro de Servicios Financieros (CSF), Biotecnología y Teleinformática.',
            badge: 'Regional',
        },
        {
            id: 'rep-tri',
            titulo: 'Distribución de Cuotas por Trimestre',
            descripcion: 'Proyección y calendarización de la oferta académica en los trimestres I, II, III y IV del calendario formativo institucional.',
            badge: 'Planificación',
        },
        {
            id: 'rep-gob',
            titulo: 'Alineación con Plan de Gobierno',
            descripcion: 'Métricas de correspondencia con las 18 variables oficiales: Economía Campesina, Popular, Justicia Climática y Empleabilidad.',
            badge: 'Estratégico',
        },
    ];

    const triggerNotificacion = (msg: string) => {
        setNotificacion(msg);
        setTimeout(() => setNotificacion(null), 4000);
    };

    // Generar reporte individual
    const handleGenerarReporte = (id: string, titulo: string) => {
        setGenerandoId(id);

        // [BACKEND INTEGRATION]:
        // Endpoint: POST /api/v1/reportes/generar
        // Payload: { reporteId: id, formato: 'PDF', vigencia: 2026 }
        setTimeout(() => {
            setGenerandoId(null);
            const nuevoRegistro: ReporteRegistro = {
                id: `rep-0${historial.length + 1}`,
                nombre: `${titulo.replace(/\s+/g, '_')}_2026.pdf`,
                formato: 'PDF',
                fecha: '2026-02-15 14:00',
                usuario: 'Dr. Hernán Torres V.',
                tamano: '3.1 MB',
            };
            setHistorial([nuevoRegistro, ...historial]);
            triggerNotificacion(`Se generó con éxito el documento: "${titulo}".`);
        }, 1200);
    };

    // Exportar consolidado
    const handleExportar = (formato: 'PDF' | 'EXCEL' | 'CSV') => {
        setExportandoFormato(formato);

        // [BACKEND INTEGRATION]:
        // Endpoint: GET /api/v1/reportes/export?formato={formato}&vigencia=2026
        setTimeout(() => {
            setExportandoFormato(null);
            triggerNotificacion(`Consolidado institucional exportado en formato ${formato}.`);
        }, 1000);
    };

    const columns: TableColumn<ReporteRegistro>[] = [
        {
            key: 'nombre',
            header: 'Archivo / Documento',
            render: (item) => (
                <div className="flex items-center gap-2.5">
                    <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[10px] ${
                            item.formato === 'PDF'
                                ? 'bg-red-100 text-red-700'
                                : item.formato === 'EXCEL'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-blue-100 text-blue-700'
                        }`}
                    >
                        {item.formato}
                    </div>
                    <div>
                        <div className="font-semibold text-slate-800 text-xs">{item.nombre}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{item.tamano}</div>
                    </div>
                </div>
            ),
        },
        {
            key: 'fecha',
            header: 'Fecha de Generación',
            headerClassName: 'w-40',
            render: (item) => (
                <span className="text-xs text-slate-600 font-mono">{item.fecha}</span>
            ),
        },
        {
            key: 'usuario',
            header: 'Generado Por',
            headerClassName: 'w-48',
            render: (item) => (
                <span className="text-xs font-medium text-slate-700">{item.usuario}</span>
            ),
        },
        {
            key: 'descargar',
            header: 'Acción',
            align: 'right',
            headerClassName: 'w-28',
            render: (item) => (
                <button
                    type="button"
                    onClick={() => {
                        // [BACKEND INTEGRATION]: GET /api/v1/reportes/{id}/download
                        alert(`Iniciando descarga de: ${item.nombre}`);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-[#00324D] hover:text-[#39A900] hover:bg-green-50 transition"
                >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Descargar
                </button>
            ),
        },
    ];

    return (
        <AppShell
            title="Generación y Análisis de Reportes"
            subtitle="Extracción de indicadores estratégicos, cumplimiento de planes y consolidación documental"
            initialRole="SUBDIRECTOR"
        >
            {/* Banner de notificación */}
            {notificacion && (
                <div
                    className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-sm font-medium flex items-center justify-between shadow-xs animate-fade-in"
                    role="alert"
                >
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{notificacion}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setNotificacion(null)}
                        className="text-xs font-bold hover:underline"
                    >
                        Cerrar
                    </button>
                </div>
            )}

            {/* Tarjetas KPI de Resumen Institucional */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Matrices en Proceso</div>
                    <div className="text-2xl font-black text-slate-900 mt-1">18</div>
                    <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                        <span>&uarr; 12%</span> vs. vigencia anterior
                    </div>
                </div>

                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Matrices con Aval</div>
                    <div className="text-2xl font-black text-[#277700] mt-1">14</div>
                    <div className="text-[11px] text-slate-500 mt-1">77.7% del total completadas</div>
                </div>

                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Cuotas Asignadas</div>
                    <div className="text-2xl font-black text-[#00324D] mt-1">1,450</div>
                    <div className="text-[11px] text-slate-500 mt-1">Aprendices proyectados 2026</div>
                </div>

                <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500">Variables de Gobierno</div>
                    <div className="text-2xl font-black text-amber-700 mt-1">18 / 18</div>
                    <div className="text-[11px] text-slate-500 mt-1">100% articuladas al plan</div>
                </div>
            </div>

            {/* Módulo de Exportación Rápida Multiformato */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                            Centro de Exportación Institucional
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Descargue el consolidado general de matrices con firmas digitales y sellos de aval en formato estándar.
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <button
                            type="button"
                            disabled={exportandoFormato !== null}
                            onClick={() => handleExportar('PDF')}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-red-200 bg-red-50 text-red-700 text-xs font-bold hover:bg-red-100 transition shadow-xs disabled:opacity-50"
                        >
                            <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                            </svg>
                            {exportandoFormato === 'PDF' ? 'Generando...' : 'Exportar PDF'}
                        </button>

                        <button
                            type="button"
                            disabled={exportandoFormato !== null}
                            onClick={() => handleExportar('EXCEL')}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition shadow-xs disabled:opacity-50"
                        >
                            <svg className="w-4 h-4 text-[#39A900]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 2l4 4h-4V4z" clipRule="evenodd" />
                            </svg>
                            {exportandoFormato === 'EXCEL' ? 'Generando...' : 'Exportar Excel'}
                        </button>

                        <button
                            type="button"
                            disabled={exportandoFormato !== null}
                            onClick={() => handleExportar('CSV')}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-300 bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200 transition shadow-xs disabled:opacity-50"
                        >
                            <svg className="w-4 h-4 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            {exportandoFormato === 'CSV' ? 'Generando...' : 'Exportar CSV'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Cuadrícula de Reportes Generables */}
            <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Informes Oficiales de Gestión
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {reportesDisponibles.map((rep) => {
                        const isCargando = generandoId === rep.id;
                        return (
                            <div
                                key={rep.id}
                                className="bg-white border border-slate-200 hover:border-[#39A900] p-5 rounded-2xl shadow-xs transition-all flex flex-col justify-between group"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-2">
                                        <Badge variant="sena" size="sm">
                                            {rep.badge}
                                        </Badge>
                                        <span className="text-[11px] text-slate-400 font-mono">2026</span>
                                    </div>
                                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#277700] transition-colors leading-snug mb-2">
                                        {rep.titulo}
                                    </h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        {rep.descripcion}
                                    </p>
                                </div>

                                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-[11px] text-slate-400 font-medium">Formato: PDF / Excel</span>
                                    <button
                                        type="button"
                                        disabled={isCargando}
                                        onClick={() => handleGenerarReporte(rep.id, rep.titulo)}
                                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-900 hover:bg-[#39A900] text-white text-xs font-semibold transition shadow-xs focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                                    >
                                        {isCargando ? (
                                            <>
                                                <span className="inline-block animate-spin w-3 h-3 border-2 border-white border-t-transparent rounded-full" />
                                                Procesando...
                                            </>
                                        ) : (
                                            <>
                                                <span>Generar</span>
                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Historial de Reportes Generados */}
            <div className="space-y-3 pt-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Historial de Generaciones Recientes
                    </h3>
                    <span className="text-xs text-slate-500">Últimos documentos procesados</span>
                </div>

                <DataTable<ReporteRegistro>
                    data={historial}
                    columns={columns}
                    keyExtractor={(item) => item.id}
                    emptyTitle="No hay reportes generados aún"
                    emptyDescription="Los informes que procese aparecerán registrados en este historial con su fecha y tamaño."
                />
            </div>
        </AppShell>
    );
}