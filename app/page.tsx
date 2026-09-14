import Image from "next/image";

<<<<<<< Updated upstream
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert h-5 w-[100px]"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the{" "}
            <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
              page.tsx
            </code>{" "}
            file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert h-[14px] w-4"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={14}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
=======
import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { StatCard } from '@/components/ui/StatCard';
import { BarChart } from '@/components/ui/BarChart';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { NuevaMatrizModal } from '@/components/matriz/NuevaMatrizModal';
import { CriteriosModal } from '@/components/matriz/CriteriosModal';
import { CriterioPriorizacion, EstadoMatriz, MatrizPriorizacion, TableColumn } from '@/types';

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
    const [matrices, setMatrices] = useState<MatrizPriorizacion[]>(MATRICES_INICIALES);
    const [isNuevaMatrizOpen, setIsNuevaMatrizOpen] = useState(false);
    const [matrizEnEdicion, setMatrizEnEdicion] = useState<MatrizPriorizacion | null>(null);

    const matricesActivas = matrices.filter((m) => m.estado !== 'Rechazada').length;
    const pendientesAval = matrices.filter((m) => m.pesoTotal === 100 && m.estado !== 'Aprobada').length;

    const handleMatrizCreada = (nuevaMatriz: MatrizPriorizacion) => {
        setMatrices((prev) => [nuevaMatriz, ...prev]);
        // Conexión directa con el flujo de criterios ya existente en /matriz
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
            title="Panel de Control"
            subtitle="Matriz de Priorización &middot; Resumen Institucional"
            initialRole="LIDER_PLANEACION"
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

            {/* Tarjeta de acción principal + tabla de matrices */}
            <section className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                            Últimas Matrices Registradas
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

            {/* Gráfica institucional */}
            <section className="space-y-3">
                <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                    Programas Registrados por Vigencia
                </h2>
                <BarChart data={PROGRAMAS_POR_VIGENCIA} />
            </section>

            {/* Paso 1: datos base de la nueva matriz */}
            <NuevaMatrizModal
                isOpen={isNuevaMatrizOpen}
                onClose={() => setIsNuevaMatrizOpen(false)}
                onCreated={handleMatrizCreada}
                matricesExistentes={matrices}
            />

            {/* Paso 2: se reutiliza el CriteriosModal ya existente en /matriz */}
            <CriteriosModal
                isOpen={matrizEnEdicion !== null}
                onClose={() => setMatrizEnEdicion(null)}
                onSave={handleGuardarCriterio}
                criteriosExistentes={matrizEnEdicion?.criterios ?? []}
                criterioAEditar={null}
            />
        </AppShell>
    );
>>>>>>> Stashed changes
}
