'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/ui/DataTable';
import { RevisionModal, DecisionType } from '@/components/aval/RevisionModal';
import { TableColumn } from '@/types';

interface SolicitudAval {
    id: string;
    matrizCodigo: string;
    programa: string;
    centro: string;
    cuotas: number;
    estado: 'Pendiente de Revisión' | 'Aprovado' | 'Observado';
    solicitante: string;
    fechaSolicitud: string;
    observaciones?: string;
}

// Fecha real del día, no una fecha de ejemplo fija
const HOY = new Date().toISOString().slice(0, 10);

export default function AvalPage() {
    const [solicitudes, setSolicitudes] = useState<SolicitudAval[]>([
        {
            id: 'avl-01',
            matrizCodigo: 'MP-001',
            programa: 'Tecnólogo en Análisis y Desarrollo de Software',
            centro: 'CSF - Servicios Financieros',
            cuotas: 24,
            estado: 'Pendiente de Revisión',
            solicitante: 'Valeria Carrillo G. (Líder Planeación)',
            fechaSolicitud: HOY,
        },
        {
            id: 'avl-02',
            matrizCodigo: 'MP-002',
            programa: 'Técnico en Programación Móvil',
            centro: 'CSF - Servicios Financieros',
            cuotas: 18,
            estado: 'Aprovado',
            solicitante: 'Valeria Carrillo G. (Líder Planeación)',
            fechaSolicitud: HOY,
        },
    ]);

    const [revision, setRevision] = useState<{ id: string; decisionType: DecisionType } | null>(null);

    const handleAbrirRevision = (id: string, decisionType: DecisionType) => {
        setRevision({ id, decisionType });
    };

    const handleConfirmarRevision = (observaciones: string) => {
        if (!revision) return;

        // [BACKEND INTEGRATION]: POST /api/v1/aval/{id}/decision
        setSolicitudes(
            solicitudes.map((s) =>
                s.id === revision.id
                    ? {
                          ...s,
                          estado: revision.decisionType === 'aprobar' ? 'Aprovado' : 'Observado',
                          observaciones,
                      }
                    : s
            )
        );
        setRevision(null);
    };

    const columns: TableColumn<SolicitudAval>[] = [
        {
            key: 'matrizCodigo',
            header: 'Código',
            align: 'center',
            headerClassName: 'w-28',
            render: (item) => (
                <span className="font-mono text-xs font-bold text-[#00324D] bg-slate-100 px-2 py-1 rounded-md">
                    {item.matrizCodigo}
                </span>
            ),
        },
        {
            key: 'programa',
            header: 'Programa',
            render: (item) => (
                <div>
                    <div className="font-semibold text-slate-900 text-xs leading-tight">{item.programa}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{item.centro}</div>
                </div>
            ),
        },
        {
            key: 'solicitante',
            header: 'Solicitante',
            render: (item) => (
                <span className="text-xs font-medium text-slate-800">{item.solicitante}</span>
            ),
        },
        {
            key: 'cuotas',
            header: 'Cuotas',
            align: 'center',
            headerClassName: 'w-24',
            render: (item) => <span className="font-bold text-[#00324D] text-sm">{item.cuotas}</span>,
        },
        {
            key: 'fechaSolicitud',
            header: 'Fecha Solicitud',
            align: 'center',
            headerClassName: 'w-32',
            render: (item) => (
                <span className="text-[11px] text-slate-500 font-mono">{item.fechaSolicitud}</span>
            ),
        },
        {
            key: 'estado',
            header: 'Estado Aval',
            align: 'center',
            headerClassName: 'w-40',
            render: (item) => (
                <div className="flex flex-col items-center gap-1">
                    <Badge
                        variant={
                            item.estado === 'Aprovado'
                                ? 'success'
                                : item.estado === 'Observado'
                                ? 'danger'
                                : 'warning'
                        }
                        size="sm"
                        dot
                    >
                        {item.estado}
                    </Badge>
                    {item.estado === 'Observado' && item.observaciones && (
                        <p className="text-[11px] text-slate-500 italic max-w-[160px] text-center leading-tight">
                            &ldquo;{item.observaciones}&rdquo;
                        </p>
                    )}
                </div>
            ),
        },
        {
            key: 'acciones',
            header: 'Acción',
            align: 'right',
            headerClassName: 'w-44',
            render: (item) => (
                <div className="flex items-center justify-end gap-2">
                    {item.estado === 'Pendiente de Revisión' ? (
                        <>
                            <button
                                type="button"
                                onClick={() => handleAbrirRevision(item.id, 'devolver')}
                                className="border border-amber-400 text-amber-700 hover:bg-amber-50 text-xs font-bold px-3 py-1.5 rounded-full transition"
                            >
                                Devolver
                            </button>
                            <button
                                type="button"
                                onClick={() => handleAbrirRevision(item.id, 'aprobar')}
                                className="bg-[#39A900] hover:bg-[#329600] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xs transition"
                            >
                                Aprovar Matriz
                            </button>
                        </>
                    ) : item.estado === 'Aprovado' ? (
                        <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 text-[#39A900]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Aval Firmado
                        </span>
                    ) : (
                        <span className="text-xs text-amber-700 font-bold flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 10h18M3 6h18M3 14h12M3 18h8"
                                />
                            </svg>
                            Devuelta con Observaciones
                        </span>
                    )}
                </div>
            ),
        },
    ];

    return (
        <AppShell
            title="Aval Institucional de Matrices de Formación"
            subtitle="Apruebe o devuelva matrices según los criterios establecidos para otorgar el aval formal de apertura de cupos"
            initialRole="SUBDIRECTOR"
        >
            <DataTable<SolicitudAval>
                data={solicitudes}
                columns={columns}
                keyExtractor={(item) => item.id}
            />

            <RevisionModal
                isOpen={revision !== null}
                decisionType={revision?.decisionType ?? null}
                onClose={() => setRevision(null)}
                onSubmit={handleConfirmarRevision}
            />
        </AppShell>
    );
}
