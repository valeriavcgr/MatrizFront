'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CriterioPriorizacion, TableColumn } from '@/types';
import { AppShell } from '@/components/layout/AppShell';
import { DataTable } from '@/components/ui/DataTable';
import { WeightProgressBar } from '@/components/ui/WeightProgressBar';
import { CriteriosModal } from '@/components/matriz/CriteriosModal';
import { Badge } from '@/components/ui/Badge';

export default function CriteriosMatrizPage() {
    // Estado del modal de criterios
    const [isCriteriosModalOpen, setIsCriteriosModalOpen] = useState(false);
    const [criterioAEditar, setCriterioAEditar] = useState<CriterioPriorizacion | null>(null);
    const [notificacion, setNotificacion] = useState<{ tipo: 'success' | 'error' | 'info'; mensaje: string } | null>(null);

    // Criterios iniciales articulados al Plan de Gobierno Institucional
    // [BACKEND INTEGRATION]:
    // Endpoint: GET /api/v1/matrices/MP-001
    // useEffect(() => {
    //   fetch('/api/v1/matrices/MP-001')
    //     .then(res => res.json())
    //     .then(data => setCriterios(data.criterios));
    // }, []);
    const [criterios, setCriterios] = useState<CriterioPriorizacion[]>([
        {
            id: 'crit-01',
            criterio: 'Construir sobre lo Construido',
            peso: 30,
            justificacion: 'Alta pertinencia regional y continuidad de procesos formativos exitosos en la sede.',
            soporte: 'diagnostico_regional_2026.pdf',
            valor: 90,
            fechaCreacion: '2026-02-10',
        },
        {
            id: 'crit-02',
            criterio: 'Empleabilidad',
            peso: 25,
            justificacion: 'Tasa de colocación histórica superior al 78% en el sector productivo de tecnologías.',
            soporte: 'informe_ape_colocacion.pdf',
            valor: 85,
            fechaCreacion: '2026-02-12',
        },
        {
            id: 'crit-03',
            criterio: 'Economía Campesina - CampeSena',
            peso: 20,
            justificacion: 'Impacto directo en la modernización de procesos asociativos rurales y comercialización.',
            soporte: 'estudio_campesena_csf.pdf',
            valor: 88,
            fechaCreacion: '2026-02-14',
        },
    ]);

    // Calcular el peso total en tiempo real
    const totalPeso = criterios.reduce((sum, c) => sum + c.peso, 0);
    const isSumatoriaCompleta = totalPeso === 100;

    // Manejador para agregar o editar un criterio
    const handleGuardarCriterio = (criterioData: Omit<CriterioPriorizacion, 'id'>) => {
        if (criterioAEditar) {
            // [BACKEND INTEGRATION]: PUT /api/v1/matrices/MP-001/criterios/{id}
            setCriterios(
                criterios.map((c) =>
                    c.id === criterioAEditar.id ? { ...criterioData, id: c.id } : c
                )
            );
            mostrarNotificacion('success', `Criterio "${criterioData.criterio}" actualizado con éxito.`);
        } else {
            // [BACKEND INTEGRATION]: POST /api/v1/matrices/MP-001/criterios
            const nuevoCriterio: CriterioPriorizacion = {
                ...criterioData,
                id: `crit-${criterios.length + 1}`,
                fechaCreacion: '2026-02-15',
            };
            setCriterios([...criterios, nuevoCriterio]);
            mostrarNotificacion('success', `Criterio "${criterioData.criterio}" asignado a la matriz.`);
        }
        setCriterioAEditar(null);
    };

    // Manejador para eliminar un criterio
    const handleEliminarCriterio = (id: string, nombre: string) => {
        if (confirm(`¿Confirma que desea retirar el criterio "${nombre}" de la matriz?`)) {
            // [BACKEND INTEGRATION]: DELETE /api/v1/matrices/MP-001/criterios/{id}
            setCriterios(criterios.filter((c) => c.id !== id));
            mostrarNotificacion('info', `Criterio "${nombre}" retirado de la matriz.`);
        }
    };

    // Notificación temporal accesible
    const mostrarNotificacion = (tipo: 'success' | 'error' | 'info', mensaje: string) => {
        setNotificacion({ tipo, mensaje });
        setTimeout(() => setNotificacion(null), 4500);
    };

    // Guardar borrador de la matriz
    const handleGuardarMatriz = () => {
        // [BACKEND INTEGRATION]: POST /api/v1/matrices/MP-001/borrador
        mostrarNotificacion('info', 'Matriz de priorización guardada como borrador.');
    };

    // Guardar y avanzar a trimestralización (exige el 100%)
    const handleGuardarYContinuar = () => {
        if (!isSumatoriaCompleta) {
            mostrarNotificacion(
                'error',
                `No es posible avanzar: la sumatoria actual es de ${totalPeso}%. Debe completar exactamente el 100%.`
            );
            return;
        }

        // [BACKEND INTEGRATION]: POST /api/v1/matrices/MP-001/aprobar-para-trimestralizacion
        mostrarNotificacion(
            'success',
            '¡Matriz validada al 100%! Redirigiendo a Trimestralización de cuotas...'
        );
    };

    // Definición de columnas de la tabla institucional
    const columns: TableColumn<CriterioPriorizacion>[] = [
        {
            key: 'criterio',
            header: 'Criterio (Plan de Gobierno)',
            headerClassName: 'w-1/4',
            render: (item) => (
                <div>
                    <div className="font-semibold text-slate-900">{item.criterio}</div>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5">ID: {item.id}</div>
                </div>
            ),
        },
        {
            key: 'peso',
            header: 'Peso (%)',
            align: 'center',
            headerClassName: 'w-24',
            render: (item) => (
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-[#277700] border border-green-200">
                    {item.peso}%
                </span>
            ),
        },
        {
            key: 'justificacion',
            header: 'Justificación Técnica',
            render: (item) => (
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed max-w-md">
                    {item.justificacion}
                </p>
            ),
        },
        {
            key: 'soporte',
            header: 'Soporte Documental',
            render: (item) => (
                <button
                    type="button"
                    onClick={() => {
                        // [BACKEND INTEGRATION]: GET /api/v1/documentos/download?file={item.soporte}
                        alert(`Descargando documento soporte institucional: ${item.soporte}`);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-[#00324D] hover:text-[#39A900] font-medium transition group focus:outline-none"
                    title={`Abrir soporte: ${item.soporte}`}
                >
                    <svg className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span className="underline truncate max-w-[140px]">{item.soporte}</span>
                </button>
            ),
        },
        {
            key: 'valor',
            header: 'Calificación',
            align: 'center',
            headerClassName: 'w-24',
            render: (item) => (
                <span className="font-bold text-slate-800 text-sm">
                    {item.valor}<span className="text-xs font-normal text-slate-400">/100</span>
                </span>
            ),
        },
        {
            key: 'acciones',
            header: 'Acciones',
            align: 'right',
            headerClassName: 'w-28',
            render: (item) => (
                <div className="flex items-center justify-end gap-1.5">
                    <button
                        type="button"
                        onClick={() => {
                            setCriterioAEditar(item);
                            setIsCriteriosModalOpen(true);
                        }}
                        className="p-1.5 text-slate-500 hover:text-[#00324D] hover:bg-slate-100 rounded-lg transition"
                        title="Editar criterio"
                        aria-label={`Editar criterio ${item.criterio}`}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleEliminarCriterio(item.id, item.criterio)}
                        className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Retirar criterio"
                        aria-label={`Retirar criterio ${item.criterio}`}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                    </button>
                </div>
            ),
        },
    ];

    return (
        <AppShell
            title="Matriz de Priorización - Criterios"
            subtitle="Asignación y ponderación de variables del Plan de Gobierno para la oferta formativa"
            initialRole="LIDER_PLANEACION"
        >
            {/* Notificación flotante / banner de retroalimentación */}
            {notificacion && (
                <div
                    className={`p-4 rounded-xl border flex items-center justify-between shadow-sm transition-all animate-fade-in ${
                        notificacion.tipo === 'success'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                            : notificacion.tipo === 'error'
                            ? 'bg-red-50 border-red-200 text-red-800'
                            : 'bg-sky-50 border-sky-200 text-sky-800'
                    }`}
                    role="alert"
                >
                    <div className="flex items-center gap-2 text-sm font-medium">
                        {notificacion.tipo === 'success' && (
                            <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        )}
                        {notificacion.tipo === 'error' && (
                            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        )}
                        {notificacion.tipo === 'info' && (
                            <svg className="w-5 h-5 text-sky-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                        )}
                        <span>{notificacion.mensaje}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setNotificacion(null)}
                        className="text-xs font-bold hover:underline ml-4"
                    >
                        Cerrar
                    </button>
                </div>
            )}

            {/* Ficha técnica institucional de la matriz */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs font-bold text-slate-500 uppercase">
                                Matriz ID: MP-001
                            </span>
                            <Badge variant="sena" size="sm">
                                Tecnólogo en Análisis y Desarrollo de Software
                            </Badge>
                            <Badge variant={isSumatoriaCompleta ? 'success' : 'warning'} size="sm" dot>
                                {isSumatoriaCompleta ? 'Ponderación Completa' : 'Pendiente Ponderar'}
                            </Badge>
                        </div>
                        <h2 className="text-base font-bold text-slate-900">
                            Centro de Servicios Financieros (CSF) &bull; Regional Distrito Capital
                        </h2>
                    </div>

                    {/* Botón para abrir modal de agregar criterio */}
                    <button
                        type="button"
                        onClick={() => {
                            setCriterioAEditar(null);
                            setIsCriteriosModalOpen(true);
                        }}
                        className="inline-flex items-center justify-center gap-2 bg-[#39A900] hover:bg-[#329600] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition shadow-xs focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:ring-offset-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Agregar Criterio
                    </button>
                </div>

                {/* Control estricto de sumatoria al 100% */}
                <div className="pt-4">
                    <WeightProgressBar totalWeight={totalPeso} />
                </div>
            </div>

            {/* Tabla de criterios de priorización */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                        Criterios Registrados ({criterios.length})
                    </h3>
                    <span className="text-xs text-slate-500">
                        Haga clic en un criterio o en los iconos de acción para gestionarlo.
                    </span>
                </div>

                <DataTable<CriterioPriorizacion>
                    data={criterios}
                    columns={columns}
                    keyExtractor={(item) => item.id}
                    emptyTitle="No hay criterios configurados en esta matriz"
                    emptyDescription="Comience agregando variables oficiales del Plan de Gobierno institucional para establecer los pesos de ponderación."
                    emptyActionLabel="Agregar Primer Criterio"
                    onEmptyAction={() => {
                        setCriterioAEditar(null);
                        setIsCriteriosModalOpen(true);
                    }}
                />
            </div>

            {/* Botones de acción institucional y pie de formulario */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
                <Link
                    href="/dashboard"
                    className="w-full sm:w-auto text-center px-6 py-2.5 rounded-full border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-100 transition"
                >
                    &larr; Volver al Inicio
                </Link>

                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end">
                    <button
                        type="button"
                        onClick={handleGuardarMatriz}
                        className="px-6 py-2.5 rounded-full border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold transition shadow-xs"
                    >
                        Guardar Borrador
                    </button>

                    <button
                        type="button"
                        onClick={handleGuardarYContinuar}
                        className={`px-7 py-2.5 rounded-full text-sm font-bold shadow-sm transition flex items-center gap-2 ${
                            isSumatoriaCompleta
                                ? 'bg-[#39A900] hover:bg-[#329600] text-white focus:ring-2 focus:ring-[#39A900]'
                                : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                        }`}
                    >
                        <span>Guardar y Continuar</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Modal de Criterios con Variables del Plan de Gobierno */}
            <CriteriosModal
                isOpen={isCriteriosModalOpen}
                onClose={() => {
                    setIsCriteriosModalOpen(false);
                    setCriterioAEditar(null);
                }}
                onSave={handleGuardarCriterio}
                criteriosExistentes={criterios}
                criterioAEditar={criterioAEditar}
            />
        </AppShell>
    );
}
