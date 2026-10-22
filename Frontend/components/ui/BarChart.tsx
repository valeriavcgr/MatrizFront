'use client';

import React from 'react';

export interface BarChartDatum {
    label: string;
    value: number;
}

interface BarChartProps {
    data: BarChartDatum[];
    height?: number;
    barColorClassName?: string;
    className?: string;
}

/**
 * Gráfica de barras verticales institucional, sin dependencias externas.
 * Escala cada barra en proporción al valor máximo del conjunto de datos.
 */
export const BarChart: React.FC<BarChartProps> = ({
    data,
    height = 220,
    barColorClassName = 'bg-[#39A900]',
    className = '',
}) => {
    const maxValue = Math.max(1, ...data.map((d) => d.value));

    return (
        <div className={`bg-white border border-slate-200 rounded-2xl p-5 shadow-xs ${className}`}>
            <div className="flex items-end gap-4 sm:gap-6" style={{ height }}>
                {data.map((item) => {
                    const percent = Math.round((item.value / maxValue) * 100);
                    return (
                        <div key={item.label} className="flex-1 h-full flex flex-col items-center justify-end gap-2">
                            <span className="text-xs font-bold text-slate-700">{item.value}</span>
                            <div
                                className="w-full max-w-14 flex items-end justify-center"
                                style={{ height: '100%' }}
                            >
                                <div
                                    className={`w-full rounded-t-md ${barColorClassName} transition-all duration-500 ease-out`}
                                    style={{ height: `${percent}%` }}
                                    title={`${item.label}: ${item.value}`}
                                />
                            </div>
                            <span className="text-[11px] font-medium text-slate-500">{item.label}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
