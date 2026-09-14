'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';

export type DecisionType = 'aprobar' | 'devolver';

interface RevisionModalProps {
    isOpen: boolean;
    decisionType: DecisionType | null;
    onClose: () => void;
    onSubmit: (observaciones: string) => void;
}

interface RevisionFormProps {
    decisionType: DecisionType;
    onClose: () => void;
    onSubmit: (observaciones: string) => void;
}

const COPY: Record<DecisionType, { title: string; subtitle: string; submitLabel: string; placeholder: string }> = {
    aprobar: {
        title: 'Otorgar Aval Institucional',
        subtitle: 'Concepto técnico favorable de la Subdirección de Centro',
        submitLabel: 'Confirmar Aval',
        placeholder: 'Describa el sustento técnico del aval otorgado...',
    },
    devolver: {
        title: 'Devolver Matriz para Corrección',
        subtitle: 'Observaciones que el Líder de Planeación deberá subsanar',
        submitLabel: 'Registrar Observación',
        placeholder: 'Describa los ajustes requeridos antes de un nuevo aval...',
    },
};

/**
 * Formulario interno con inicialización directa de estado para compatibilidad con React 19.
 */
const RevisionForm: React.FC<RevisionFormProps> = ({ decisionType, onClose, onSubmit }) => {
    const [observaciones, setObservaciones] = useState('');
    const [touched, setTouched] = useState(false);

    const copy = COPY[decisionType];
    const error =
        observaciones.trim().length < 10 ? 'Las observaciones deben contener al menos 10 caracteres.' : '';
    const isValido = !error;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTouched(true);

        if (!isValido) return;

        // [BACKEND INTEGRATION]:
        // Endpoint: POST /api/v1/aval/{solicitudId}/decision
        // Payload: { decision: decisionType, observaciones }
        onSubmit(observaciones.trim());
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        {copy.subtitle} <span className="text-red-500">*</span>
                    </label>
                    <span className={`text-[11px] ${observaciones.length >= 10 ? 'text-slate-500' : 'text-amber-600 font-medium'}`}>
                        {observaciones.length} / mín. 10 caracteres
                    </span>
                </div>
                <textarea
                    rows={4}
                    placeholder={copy.placeholder}
                    value={observaciones}
                    onChange={(e) => {
                        setObservaciones(e.target.value);
                        setTouched(true);
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white transition resize-none focus:outline-none focus:ring-2 focus:ring-[#39A900] ${
                        touched && error ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                    }`}
                    required
                />
                {touched && error && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <span>&bull;</span> {error}
                    </p>
                )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-full border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-100 transition focus:outline-none focus:ring-2 focus:ring-slate-400"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={!isValido}
                    className="px-6 py-2.5 rounded-full bg-[#39A900] hover:bg-[#329600] text-white text-sm font-semibold shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:ring-offset-2"
                >
                    {copy.submitLabel}
                </button>
            </div>
        </form>
    );
};

/**
 * Modal Institucional de Revisión de Aval, compartido entre las decisiones de
 * aprobación y devolución de una solicitud.
 */
export const RevisionModal: React.FC<RevisionModalProps> = ({ isOpen, decisionType, onClose, onSubmit }) => {
    if (!decisionType) return null;

    const copy = COPY[decisionType];

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={copy.title} subtitle={copy.subtitle} maxWidth="md">
            <RevisionForm key={decisionType} decisionType={decisionType} onClose={onClose} onSubmit={onSubmit} />
        </Modal>
    );
};
