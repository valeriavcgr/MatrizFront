'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { NuevaMatrizModal } from '@/components/matriz/NuevaMatrizModal';
import { CriteriosModal } from '@/components/matriz/CriteriosModal';
import { CriterioPriorizacion, EstadoMatriz, MatrizPriorizacion, TableColumn } from '@/types';

// [BACKEND INTEGRATION]:
// Endpoint: GET /api/v1/matrices
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

const ESTADO_BADGE: Record<EstadoMatriz, 'neutral' | 'info' | 'success' | 'danger'> = {
    Borrador: 'neutral',
    'En Revisión': 'info',
    Aprobada: 'success',
    Rechazada: 'danger',
};

export default function MatrizPage() {
    const [matrices, setMatrices] = useState<MatrizPriorizacion[]>(MATRICES_INICIALES);
    const [isNuevaMatrizOpen, setIsNuevaMatrizOpen] = useState(false);
    const [matrizEnEdicion, setMatrizEnEdicion] = useState<MatrizPriorizacion | null>(null);

    const handleMatrizCreada = (nuevaMatriz: MatrizPriorizacion) => {
        setMatrices((prev) => [nuevaMatriz, ...prev]);
        // Conexión directa con el flujo de criterios
        setMatrizEnEdicion(nuevaMatriz);
    };

    const handleGuardarCriterio = (criterioData: Omit<CriterioPriorizacion, 'id'>) => {
        if (!matrizEnEdicion) return;

        setMatrices((prev) =>
            prev.map((m) => {
                if (m.id !== matrizEnEdicion.id) return m;

                const nuevoCriterio: CriterioPriorizacion = {
                    ...criterioData,
                    id: `crit-${m.id}-${m.criterios.length + 1}`,
                };
                const nuevosCriterios = [...m.criterios, nuevoCriterio];
                const pesoTotal = nuevosCriterios.reduce((sum, c) => sum + c.peso, 0);

                return {
                    ...m,
                    criterios: nuevosCriterios,
                    pesoTotal,
                    estado: pesoTotal === 100 ? 'En Revisión' : 'Borrador',
                    fechaActualizacion: new Date().toISOString().slice(0, 10),
                };
            })
        );
        setMatrizEnEdicion(null);
    };

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
            title="Matriz de Priorización"
            subtitle="Gestión y creación de matrices de priorización institucional"
            initialRole="LIDER_PLANEACION"
        >
            {/* Tarjeta de acción principal + tabla de matrices */}
            <section className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                            Matrices Registradas
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Seguimiento de ponderación y estado por programa académico.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setIsNuevaMatrizOpen(true)}
                        className="inline-flex items-center justify-center gap-2 bg-[#39A900] hover:bg-[#329600] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition shadow-xs focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:ring-offset-2 self-start sm:self-auto"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Nueva Matriz
                    </button>
                </div>

                <DataTable<MatrizPriorizacion>
                    data={matrices}
                    columns={columns}
                    keyExtractor={(item) => item.id}
                    emptyTitle="No hay matrices registradas"
                    emptyDescription="Comience creando la primera matriz de priorización institucional."
                    emptyActionLabel="Crear Primera Matriz"
                    onEmptyAction={() => setIsNuevaMatrizOpen(true)}
                />
            </section>

            {/* Paso 1: datos base de la nueva matriz */}
            <NuevaMatrizModal
                isOpen={isNuevaMatrizOpen}
                onClose={() => setIsNuevaMatrizOpen(false)}
                onCreated={handleMatrizCreada}
                matricesExistentes={matrices}
            />

            {/* Paso 2: asignación del primer criterio */}
            <CriteriosModal
                isOpen={matrizEnEdicion !== null}
                onClose={() => setMatrizEnEdicion(null)}
                onSave={handleGuardarCriterio}
                criteriosExistentes={matrizEnEdicion?.criterios ?? []}
                criterioAEditar={null}
            />
        </AppShell>
    );
}
