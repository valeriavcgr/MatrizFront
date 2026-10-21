'use client';

import React, { useState } from 'react';
import {
    CriterioPriorizacion,
    VariablePlanGobierno,
    VARIABLES_PLAN_GOBIERNO,
} from '@/types';
import { Modal } from '@/components/ui/Modal';

interface CriteriosModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (criterio: Omit<CriterioPriorizacion, 'id'>) => void;
    criteriosExistentes: CriterioPriorizacion[];
    criterioAEditar?: CriterioPriorizacion | null;
}

interface CriteriosFormProps {
    onClose: () => void;
    onSave: (criterio: Omit<CriterioPriorizacion, 'id'>) => void;
    criteriosExistentes: CriterioPriorizacion[];
    criterioAEditar?: CriterioPriorizacion | null;
}

/**
 * Formulario interno con inicialización directa de estado para evitar efectos secundarios en React 19.
 */
const CriteriosForm: React.FC<CriteriosFormProps> = ({
    onClose,
    onSave,
    criteriosExistentes,
    criterioAEditar,
}) => {
    // Calcular el peso ya asignado a otros criterios (excluyendo el que se edita)
    const pesoOcupado = criteriosExistentes
        .filter((c) => !criterioAEditar || c.id !== criterioAEditar.id)
        .reduce((sum, c) => sum + c.peso, 0);

    const pesoDisponible = Math.max(0, 100 - pesoOcupado);

    // Inicialización directa del estado desde props sin useEffect
    const [variableSeleccionada, setVariableSeleccionada] = useState<VariablePlanGobierno | ''>(
        criterioAEditar ? criterioAEditar.criterio : ''
    );
    const [peso, setPeso] = useState<string>(
        criterioAEditar
            ? criterioAEditar.peso.toString()
            : pesoDisponible > 0
            ? Math.min(25, pesoDisponible).toString()
            : ''
    );
    const [justificacion, setJustificacion] = useState<string>(
        criterioAEditar ? criterioAEditar.justificacion : ''
    );
    const [soporteNombre, setSoporteNombre] = useState<string>(
        criterioAEditar ? criterioAEditar.soporte : 'soporte_tecnico.pdf'
    );
    const [valor, setValor] = useState<number>(criterioAEditar ? criterioAEditar.valor : 85);
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

    const numPeso = Number(peso);

    // Validaciones en tiempo real
    const errores = {
        variable: !variableSeleccionada ? 'Debe seleccionar una variable oficial del Plan de Gobierno.' : '',
        peso:
            !peso || isNaN(numPeso) || numPeso <= 0
                ? 'El peso debe ser un número mayor a 0%.'
                : numPeso > pesoDisponible
                ? `El peso excede el límite disponible (${pesoDisponible}% restante para alcanzar el 100%).`
                : '',
        justificacion:
            justificacion.trim().length < 10
                ? 'La justificación técnica debe contener al menos 10 caracteres explicativos.'
                : '',
    };

    const isFormValido = !errores.variable && !errores.peso && !errores.justificacion;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ variable: true, peso: true, justificacion: true });

        if (!isFormValido || !variableSeleccionada) return;

        // [BACKEND INTEGRATION]:
        // Endpoint: POST /api/v1/matrices/{matrizId}/criterios
        // Payload: { criterio: variableSeleccionada, peso: numPeso, justificacion, soporte: soporteNombre, valor }
        onSave({
            criterio: variableSeleccionada,
            peso: numPeso,
            justificacion: justificacion.trim(),
            soporte: soporteNombre,
            valor: valor,
        });

        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Indicador de peso restante disponible */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between text-xs">
                <div className="text-slate-600">
                    Ponderación asignada previamente:{' '}
                    <strong className="text-slate-800 font-semibold">{pesoOcupado}%</strong>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                    <span>Disponible para este criterio:</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#39A900]/15 text-[#277700] font-bold">
                        {pesoDisponible}%
                    </span>
                </div>
            </div>

            {/* Variable oficial del Plan de Gobierno */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Variable de Análisis (Plan de Gobierno SENA) <span className="text-red-500">*</span>
                </label>
                <select
                    value={variableSeleccionada}
                    onChange={(e) => {
                        setVariableSeleccionada(e.target.value as VariablePlanGobierno);
                        setTouched((prev) => ({ ...prev, variable: true }));
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900] ${
                        touched.variable && errores.variable
                            ? 'border-red-400 bg-red-50/20'
                            : 'border-slate-300'
                    }`}
                    required
                >
                    <option value="">Seleccione una variable oficial institucional...</option>
                    {VARIABLES_PLAN_GOBIERNO.map((item) => {
                        const yaExiste =
                            criteriosExistentes.some((c) => c.criterio === item) &&
                            (!criterioAEditar || criterioAEditar.criterio !== item);

                        return (
                            <option key={item} value={item} disabled={yaExiste}>
                                {item} {yaExiste ? '(Ya registrado en esta matriz)' : ''}
                            </option>
                        );
                    })}
                </select>
                {touched.variable && errores.variable && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <span>&bull;</span> {errores.variable}
                    </p>
                )}
            </div>

            {/* Peso Porcentual */}
            <div>
                <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Peso Porcentual (%) <span className="text-red-500">*</span>
                    </label>
                    {pesoDisponible > 0 && (
                        <button
                            type="button"
                            onClick={() => {
                                setPeso(pesoDisponible.toString());
                                setTouched((prev) => ({ ...prev, peso: true }));
                            }}
                            className="text-[11px] text-[#277700] hover:underline font-semibold"
                        >
                            Asignar el 100% restante ({pesoDisponible}%)
                        </button>
                    )}
                </div>

                <div className="relative">
                    <input
                        type="number"
                        min="1"
                        max="100"
                        placeholder={`Ej: ${Math.min(25, pesoDisponible || 25)}`}
                        value={peso}
                        onChange={(e) => {
                            setPeso(e.target.value);
                            setTouched((prev) => ({ ...prev, peso: true }));
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900] pr-12 ${
                            touched.peso && errores.peso
                                ? 'border-red-400 bg-red-50/20'
                                : 'border-slate-300'
                        }`}
                        required
                    />
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400 text-sm font-bold">
                        %
                    </div>
                </div>

                {touched.peso && errores.peso ? (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <span>&bull;</span> {errores.peso}
                    </p>
                ) : (
                    <p className="text-[11px] text-slate-500 mt-1">
                        La sumatoria total de todos los criterios debe completar el 100% para la aprobación institucional.
                    </p>
                )}
            </div>

            {/* Justificación Técnica */}
            <div>
                <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Justificación Técnica Institucional <span className="text-red-500">*</span>
                    </label>
                    <span
                        className={`text-[11px] ${
                            justificacion.length >= 10 ? 'text-slate-500' : 'text-amber-600 font-medium'
                        }`}
                    >
                        {justificacion.length} / mín. 10 caracteres
                    </span>
                </div>
                <textarea
                    rows={3}
                    placeholder="Describa el impacto regional, pertinencia sectorial y coherencia con las directrices del plan de gobierno..."
                    value={justificacion}
                    onChange={(e) => {
                        setJustificacion(e.target.value);
                        setTouched((prev) => ({ ...prev, justificacion: true }));
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white transition resize-none focus:outline-none focus:ring-2 focus:ring-[#39A900] ${
                        touched.justificacion && errores.justificacion
                            ? 'border-red-400 bg-red-50/20'
                            : 'border-slate-300'
                    }`}
                    required
                />
                {touched.justificacion && errores.justificacion && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <span>&bull;</span> {errores.justificacion}
                    </p>
                )}
            </div>

            {/* Soporte Documental y Calificación Estimada */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Soporte Documental (PDF)
                    </label>
                    <div className="flex items-center gap-2 border border-slate-200 rounded-xl p-2 bg-slate-50/50">
                        <svg className="w-5 h-5 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fillRule="evenodd"
                                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <input
                            type="text"
                            value={soporteNombre}
                            onChange={(e) => setSoporteNombre(e.target.value)}
                            className="w-full bg-transparent text-xs text-slate-700 outline-none font-mono"
                            placeholder="nombre_archivo.pdf"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Valor Puntuación Base (0 - 100)
                    </label>
                    <input
                        type="number"
                        min="0"
                        max="100"
                        value={valor}
                        onChange={(e) => setValor(Number(e.target.value))}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    />
                </div>
            </div>

            {/* Botones de acción */}
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
                    disabled={!isFormValido}
                    className="px-6 py-2.5 rounded-full bg-[#39A900] hover:bg-[#329600] text-white text-sm font-semibold shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:ring-offset-2"
                >
                    {criterioAEditar ? 'Actualizar Criterio' : 'Guardar Criterio'}
                </button>
            </div>
        </form>
    );
};

/**
 * Modal Institucional de Asignación y Configuración de Criterios de Priorización.
 */
export const CriteriosModal: React.FC<CriteriosModalProps> = ({
    isOpen,
    onClose,
    onSave,
    criteriosExistentes,
    criterioAEditar,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={criterioAEditar ? 'Editar Criterio de Priorización' : 'Asignación de Criterio de Priorización'}
            subtitle="Parámetros institucionales articulados al Plan de Gobierno y pertinencia regional SENA"
            maxWidth="xl"
        >
            <CriteriosForm
                key={criterioAEditar ? criterioAEditar.id : 'nuevo'}
                onClose={onClose}
                onSave={onSave}
                criteriosExistentes={criteriosExistentes}
                criterioAEditar={criterioAEditar}
            />
        </Modal>
    );
};
