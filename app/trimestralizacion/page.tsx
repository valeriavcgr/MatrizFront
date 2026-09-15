'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Badge } from '@/components/ui/Badge';
import { DataTable } from '@/components/ui/DataTable';
import { TableColumn } from '@/types';

interface CuotaTrimestre {
    id: string;
    programa: string;
    codigo: string;
    trimestre1: number;
    trimestre2: number;
    trimestre3: number;
    trimestre4: number;
    totalAnual: number;
}

export default function TrimestralizacionPage() {
    const [cuotas] = useState<CuotaTrimestre[]>([
        {
            id: 'cuo-01',
            programa: 'Tecnólogo en Análisis y Desarrollo de Software',
            codigo: 'PROG-001',
            trimestre1: 35,
            trimestre2: 35,
            trimestre3: 35,
            trimestre4: 35,
            totalAnual: 140,
        },
        {
            id: 'cuo-02',
            programa: 'Técnico en Programación Móvil',
            codigo: 'PROG-002',
            trimestre1: 30,
            trimestre2: 0,
            trimestre3: 30,
            trimestre4: 0,
            totalAnual: 60,
        },
        {
            id: 'cuo-03',
            programa: 'Especialización Tecnológica en Bases de Datos',
            codigo: 'PROG-003',
            trimestre1: 25,
            trimestre2: 25,
            trimestre3: 0,
            trimestre4: 25,
            totalAnual: 75,
        },
    ]);

    const columns: TableColumn<CuotaTrimestre>[] = [
        {
            key: 'codigo',
            header: 'Código',
            align: 'center',
            headerClassName: 'w-28',
            render: (item) => (
                <span className="font-mono text-xs font-bold text-[#00324D] bg-slate-100 px-2 py-1 rounded-md">
                    {item.codigo}
                </span>
            ),
        },
        {
            key: 'programa',
            header: 'Programa Académico',
            render: (item) => (
                <span className="font-semibold text-slate-900 text-xs">{item.programa}</span>
            ),
        },
        {
            key: 'trimestre1',
            header: 'Trimestre I',
            align: 'center',
            render: (item) => <span className="font-bold text-slate-700">{item.trimestre1}</span>,
        },
        {
            key: 'trimestre2',
            header: 'Trimestre II',
            align: 'center',
            render: (item) => <span className="font-bold text-slate-700">{item.trimestre2}</span>,
        },
        {
            key: 'trimestre3',
            header: 'Trimestre III',
            align: 'center',
            render: (item) => <span className="font-bold text-slate-700">{item.trimestre3}</span>,
        },
        {
            key: 'trimestre4',
            header: 'Trimestre IV',
            align: 'center',
            render: (item) => <span className="font-bold text-slate-700">{item.trimestre4}</span>,
        },
        {
            key: 'totalAnual',
            header: 'Total Cupos',
            align: 'center',
            headerClassName: 'w-28',
            render: (item) => (
                <Badge variant="sena" size="sm">
                    {item.totalAnual} cupos
                </Badge>
            ),
        },
    ];

    return (
        <AppShell
            title="Trimestralización de Oferta Formativa"
            subtitle="Distribución temporal de cupos por trimestre formativo para la vigencia activa"
            initialRole="LIDER_PLANEACION"
        >
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Programación Anual de Cupos &bull; Vigencia 2026
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Centro de Servicios Financieros &bull; Total cupos proyectados: 275 aprendices
                    </p>
                </div>
                <button
                    type="button"
                    onClick={() => alert('Sincronizando cuotas con el sistema institucional...')}
                    className="bg-[#39A900] hover:bg-[#329600] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-xs transition"
                >
                    Ajustar Distribución de Cuotas
                </button>
            </div>

            <DataTable<CuotaTrimestre>
                data={cuotas}
                columns={columns}
                keyExtractor={(item) => item.id}
            />
        </AppShell>
    );
}
