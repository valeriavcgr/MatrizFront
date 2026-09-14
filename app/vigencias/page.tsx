'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/ui/DataTable';
import { TableColumn } from '@/types';

interface VigenciaFiscal {
    id: string;
    anio: number;
    estado: 'En Ejecución' | 'Cerrada' | 'En Planeación';
    totalMatrices: number;
    cuposMeta: number;
    fechaInicio: string;
    fechaCierre: string;
}

export default function VigenciasPage() {
    const [vigencias] = useState<VigenciaFiscal[]>([
        {
            id: 'vig-01',
            anio: 2026,
            estado: 'En Ejecución',
            totalMatrices: 18,
            cuposMeta: 1450,
            fechaInicio: '01/01/2026',
            fechaCierre: '31/12/2026',
        },
        {
            id: 'vig-02',
            anio: 2025,
            estado: 'Cerrada',
            totalMatrices: 16,
            cuposMeta: 1320,
            fechaInicio: '01/01/2025',
            fechaCierre: '31/12/2025',
        },
        {
            id: 'vig-03',
            anio: 2027,
            estado: 'En Planeación',
            totalMatrices: 0,
            cuposMeta: 1550,
            fechaInicio: '01/01/2027',
            fechaCierre: '31/12/2027',
        },
    ]);

    const columns: TableColumn<VigenciaFiscal>[] = [
        {
            key: 'anio',
            header: 'Año Fiscal',
            align: 'center',
            headerClassName: 'w-32',
            render: (item) => (
                <span className="font-black text-slate-900 text-sm">{item.anio}</span>
            ),
        },
        {
            key: 'estado',
            header: 'Estado',
            align: 'center',
            headerClassName: 'w-36',
            render: (item) => (
                <Badge
                    variant={
                        item.estado === 'En Ejecución'
                            ? 'success'
                            : item.estado === 'En Planeación'
                            ? 'warning'
                            : 'neutral'
                    }
                    size="sm"
                    dot
                >
                    {item.estado}
                </Badge>
            ),
        },
        {
            key: 'totalMatrices',
            header: 'Matrices Registradas',
            align: 'center',
            render: (item) => <span className="font-semibold text-slate-700">{item.totalMatrices}</span>,
        },
        {
            key: 'cuposMeta',
            header: 'Meta de Cupos',
            align: 'center',
            render: (item) => (
                <span className="font-bold text-[#00324D]">{item.cuposMeta} aprendices</span>
            ),
        },
        {
            key: 'fechas',
            header: 'Periodo de Vigencia',
            render: (item) => (
                <span className="text-xs text-slate-500 font-mono">
                    {item.fechaInicio} - {item.fechaCierre}
                </span>
            ),
        },
    ];

    return (
        <AppShell
            title="Gestión de Vigencias Fiscales"
            subtitle="Configuración y seguimiento de periodos anuales de oferta formativa institucional"
            initialRole="ADMINISTRADOR"
        >
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Vigencias Institucionales SENA
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Periodos de planeación presupuestal y articulación con metas del gobierno nacional
                    </p>
                </div>
            </div>

            <DataTable<VigenciaFiscal>
                data={vigencias}
                columns={columns}
                keyExtractor={(item) => item.id}
            />
        </AppShell>
    );
}
