'use client';

import React from 'react';

export type StatCardTone = 'sena' | 'navy' | 'amber' | 'sky';

interface StatCardProps {
    label: string;
    value: string | number;
    icon: React.ReactNode;
    tone?: StatCardTone;
}

const TONE_STYLES: Record<StatCardTone, { bg: string; text: string; border: string }> = {
    sena: { bg: 'bg-green-50', text: 'text-[#277700]', border: 'border-green-200' },
    navy: { bg: 'bg-slate-100', text: 'text-[#00324D]', border: 'border-slate-200' },
    amber: { bg: 'bg-amber-50', text: 'text-[#854D0E]', border: 'border-amber-200' },
    sky: { bg: 'bg-sky-50', text: 'text-sky-800', border: 'border-sky-200' },
};

/**
 * Tarjeta institucional de indicador (KPI) para el Panel de Control.
 */
export const StatCard: React.FC<StatCardProps> = ({ label, value, icon, tone = 'sena' }) => {
    const styles = TONE_STYLES[tone];

    return (
        <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shadow-xs">
            <div
                className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 border ${styles.bg} ${styles.text} ${styles.border}`}
            >
                {icon}
            </div>
            <div className="min-w-0">
                <p className="text-2xl font-bold text-slate-900 leading-none">{value}</p>
                <p className="text-xs text-slate-500 mt-1.5 font-medium truncate">{label}</p>
            </div>
        </div>
    );
};
