'use client';

import React from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { StatCard } from '@/components/ui/StatCard';
import { BarChart } from '@/components/ui/BarChart';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { EstadoMatriz, MatrizPriorizacion, TableColumn } from '@/types';

// [BACKEND INTEGRATION]:
// Endpoint: GET /api/v1/matrices?recientes=true
const MATRICES_INICIALES: MatrizPriorizacion[] = [
    {
        id: 'mat-1',
        codigo: 'MP-001',
        programaId: 'prog-1',
        programaNombre: 'Tecnólogo en Análisis y Desarrollo de Software',
        vigencia: 2026,
        centroFormacion: 'CSF - Centro de Servicios Financieros',
        regional: 'Regional Distrito Capital',
        estado: 'En Revisión',
        criterios: [],
        pesoTotal: 75,
        cuotas: 35,
        fechaCreacion: '2026-02-01',
        fechaActualizacion: '2026-02-14',
        responsable: 'Valeria Carrillo G. (Líder Planeación)',
    },
    {
        id: 'mat-2',
        codigo: 'MP-002',
        programaId: 'prog-2',
        programaNombre: 'Técnico en Programación de Aplicaciones para Dispositivos Móviles',
        vigencia: 2026,
        centroFormacion: 'CSF - Centro de Servicios Financieros',
        regional: 'Regional Distrito Capital',
        estado: 'Aprobada',
        criterios: [],
        pesoTotal: 100,
        cuotas: 30,
        fechaCreacion: '2026-01-20',
        fechaActualizacion: '2026-02-12',
        responsable: 'Valeria Carrillo G. (Líder Planeación)',
    },
    {
        id: 'mat-3',
        codigo: 'MP-003',
        programaId: 'prog-3',
        programaNombre: 'Especialización Tecnológica en Gestión de Bases de Datos NoSQL',
        vigencia: 2026,
        centroFormacion: 'CSF - Centro de Servicios Financieros',
        regional: 'Regional Distrito Capital',
        estado: 'Borrador',
        criterios: [],
        pesoTotal: 40,
        cuotas: 25,
        fechaCreacion: '2026-02-15',
        fechaActualizacion: '2026-02-16',
        responsable: 'Valeria Carrillo G. (Líder Planeación)',
    },
];

// Consistente con los totales por año ya sembrados en /vigencias
const PROGRAMAS_POR_VIGENCIA = [
    { label: '2025', value: 16 },
    { label: '2026', value: 18 },
    { label: '2027', value: 0 },
];

const ESTADO_BADGE: Record<EstadoMatriz, 'neutral' | 'info' | 'success' | 'danger'> = {
    Borrador: 'neutral',
    'En Revisión': 'info',
    Aprobada: 'success',
    Rechazada: 'danger',
};

export default function DashboardPage() {
    const matrices = MATRICES_INICIALES;

    const matricesActivas = matrices.filter((m) => m.estado !== 'Rechazada').length;
    const pendientesAval = matrices.filter((m) => m.pesoTotal === 100 && m.estado !== 'Aprobada').length;

    const columns: TableColumn<MatrizPriorizacion>[] = [
        {
            key: 'codigo',
            header: 'Codigo',
            align: 'center',
            headerClassName: 'w-28',
            render: (item) => (
                <span className="font-mono text-xs font-bold text-[#00324D] bg-slate-100 px-2 py-1 rounded-md">
                    {item.codigo}
                </span>
            ),
        },
        {
            key: 'programaNombre',
            header: 'Programa',
            render: (item) => (
                <div>
                    <div className="font-semibold text-slate-900 text-xs leading-tight">{item.programaNombre}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{item.centroFormacion}</div>
                </div>
            ),
        },
        {
            key: 'vigencia',
            header: 'Año de Vigencia',
            align: 'center',
            headerClassName: 'w-32',
            render: (item) => <span className="font-black text-slate-900 text-sm">{item.vigencia}</span>,
        },
        {
            key: 'estado',
            header: 'Estado',
            align: 'center',
            headerClassName: 'w-32',
            render: (item) => (
                <Badge variant={ESTADO_BADGE[item.estado]} size="sm" dot>
                    {item.estado}
                </Badge>
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
            key: 'fechaCreacion',
            header: 'Fecha de Creación',
            align: 'center',
            headerClassName: 'w-36',
            render: (item) => (
                <span className="text-[11px] text-slate-500 font-mono">{item.fechaCreacion}</span>
            ),
        },
    ];

    return (
        <AppShell
            title="Panel de Control"
        >
            {/* Indicadores institucionales */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard
                    label="Matrices Activas"
                    value={matricesActivas}
                    tone="sena"
                    icon={
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    }
                />
                <StatCard
                    label="Programas"
                    value={6}
                    tone="navy"
                    icon={
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    }
                />
                <StatCard
                    label="Pendientes de Aval"
                    value={pendientesAval}
                    tone="amber"
                    icon={
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    }
                />
                <StatCard
                    label="Vigencias Abiertas"
                    value={2}
                    tone="sky"
                    icon={
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    }
                />
                <StatCard
                    label="Cuotas Asignadas"
                    value={165}
                    tone="navy"
                    icon={
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a4 4 0 10-4-4" />
                        </svg>
                    }
                />
            </section>

            {/* Vista previa de solo lectura: la gestión completa vive en /matriz */}
            <section className="space-y-3">
                <div>
                    <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                        Últimas Matrices Registradas
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Seguimiento de ponderación y estado por programa académico.
                    </p>
                </div>

                <DataTable<MatrizPriorizacion>
                    data={matrices.slice(0, 3)}
                    columns={columns}
                    keyExtractor={(item) => item.id}
                    emptyTitle="No hay matrices registradas"
                    emptyDescription="Aún no se han creado matrices de priorización institucional."
                />
            </section>

            {/* Gráfica institucional */}
            <section className="space-y-3">
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                    Programas Registrados por Vigencia
                </h2>
                <BarChart data={PROGRAMAS_POR_VIGENCIA} />
            </section>
        </AppShell>
    );
}
