'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/ui/DataTable';
import { TableColumn } from '@/types';

interface SolicitudAval {
    id: string;
    matrizCodigo: string;
    programa: string;
    centro: string;
    ponderacion: number;
    estado: 'Pendiente de Aval' | 'Aval Aprobado' | 'Observado';
    solicitante: string;
    fechaSolicitud: string;
}

export default function AvalPage() {
    const [solicitudes, setSolicitudes] = useState<SolicitudAval[]>([
        {
            id: 'avl-01',
            matrizCodigo: 'MP-001',
            programa: 'Tecnólogo en Análisis y Desarrollo de Software',
            centro: 'CSF - Servicios Financieros',
            ponderacion: 100,
            estado: 'Pendiente de Aval',
            solicitante: 'Valeria Carrillo G. (Líder Planeación)',
            fechaSolicitud: '2026-02-14',
        },
        {
            id: 'avl-02',
            matrizCodigo: 'MP-002',
            programa: 'Técnico en Programación Móvil',
            centro: 'CSF - Servicios Financieros',
            ponderacion: 100,
            estado: 'Aval Aprobado',
            solicitante: 'Valeria Carrillo G. (Líder Planeación)',
            fechaSolicitud: '2026-02-12',
        },
    ]);

    const handleAprobar = (id: string) => {
        setSolicitudes(
            solicitudes.map((s) => (s.id === id ? { ...s, estado: 'Aval Aprobado' } : s))
        );
        alert('¡Matriz avalada formalmente por la Subdirección del Centro!');
    };

    const columns: TableColumn<SolicitudAval>[] = [
        {
            key: 'matrizCodigo',
            header: 'Matriz ID',
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
            header: 'Programa Académico',
            render: (item) => (
                <div>
                    <div className="font-semibold text-slate-900 text-xs leading-tight">{item.programa}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{item.centro}</div>
                </div>
            ),
        },
        {
            key: 'ponderacion',
            header: 'Ponderación',
            align: 'center',
            headerClassName: 'w-28',
            render: (item) => (
                <Badge variant={item.ponderacion === 100 ? 'success' : 'warning'} size="sm">
                    {item.ponderacion}%
                </Badge>
            ),
        },
        {
            key: 'solicitante',
            header: 'Solicitante y Fecha',
            render: (item) => (
                <div>
                    <div className="text-xs font-medium text-slate-800">{item.solicitante}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{item.fechaSolicitud}</div>
                </div>
            ),
        },
        {
            key: 'estado',
            header: 'Estado Aval',
            align: 'center',
            headerClassName: 'w-36',
            render: (item) => (
                <Badge
                    variant={item.estado === 'Aval Aprobado' ? 'success' : 'warning'}
                    size="sm"
                    dot
                >
                    {item.estado}
                </Badge>
            ),
        },
        {
            key: 'acciones',
            header: 'Firma / Decisión',
            align: 'right',
            headerClassName: 'w-32',
            render: (item) => (
                <div className="flex items-center justify-end">
                    {item.estado === 'Pendiente de Aval' ? (
                        <button
                            type="button"
                            onClick={() => handleAprobar(item.id)}
                            className="bg-[#39A900] hover:bg-[#329600] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xs transition"
                        >
                            Otorgar Aval
                        </button>
                    ) : (
                        <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                            <svg className="w-3.5 h-3.5 text-[#39A900]" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Aval Firmado
                        </span>
                    )}
                </div>
            ),
        },
    ];

    return (
        <AppShell
            title="Aval Institucional de Matrices de Formación"
            subtitle="Módulo de revisión, concepto técnico y firma de aval para la oferta formativa"
            initialRole="SUBDIRECTOR"
        >
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Bandeja de Solicitudes de Aval &bull; Subdirección de Centro
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                    Revise las matrices que alcanzaron el 100% de ponderación de criterios para otorgar el aval formal de apertura de cupos.
                </p>
            </div>

            <DataTable<SolicitudAval>
                data={solicitudes}
                columns={columns}
                keyExtractor={(item) => item.id}
            />
        </AppShell>
    );
}
