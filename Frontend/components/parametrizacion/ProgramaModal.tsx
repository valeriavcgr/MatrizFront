'use client';

import React, { useState } from 'react';
import { NivelFormacion, EstadoPrograma, ProgramaAcademico } from '@/types';
import { Modal } from '@/components/ui/Modal';

interface ProgramaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (programa: Omit<ProgramaAcademico, 'id'>) => void;
    programaAEditar?: ProgramaAcademico | null;
}

interface ProgramaFormProps {
    onClose: () => void;
    onSave: (programa: Omit<ProgramaAcademico, 'id'>) => void;
    programaAEditar?: ProgramaAcademico | null;
}

const NIVELES: NivelFormacion[] = [
    'Tecnólogo',
    'Técnico',
    'Especialización Tecnológica',
    'Operario',
    'Auxiliar',
    'Curso Especial',
];

const ESTADOS: EstadoPrograma[] = ['Activo', 'Inactivo', 'En Actualización'];

/**
 * Formulario interno con inicialización directa de estado para compatibilidad con React 19.
 */
const ProgramaForm: React.FC<ProgramaFormProps> = ({
    onClose,
    onSave,
    programaAEditar,
}) => {
    const [codigo, setCodigo] = useState(
        programaAEditar ? programaAEditar.codigo : ''
    );
    const [nombre, setNombre] = useState(programaAEditar ? programaAEditar.nombre : '');
    const [nivel, setNivel] = useState<NivelFormacion>(
        programaAEditar ? programaAEditar.nivel : 'Tecnólogo'
    );
    const [duracion, setDuracion] = useState(
        programaAEditar ? programaAEditar.duracion : '24 meses'
    );
    const [estado, setEstado] = useState<EstadoPrograma>(
        programaAEditar ? programaAEditar.estado : 'Activo'
    );
    const [centro, setCentro] = useState(programaAEditar ? programaAEditar.centro : 'CSF');
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

    // Validaciones
    const errores = {
        codigo: !codigo.trim() ? 'El código institucional del programa es obligatorio.' : '',
        nombre:
            nombre.trim().length < 5
                ? 'El nombre del programa debe contener al menos 5 caracteres.'
                : '',
        duracion: !duracion.trim() ? 'La duración estimada es obligatoria.' : '',
    };

    const isValido = !errores.codigo && !errores.nombre && !errores.duracion;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ codigo: true, nombre: true, duracion: true });

        if (!isValido) return;

        // [BACKEND INTEGRATION]:
        // Endpoint: POST /api/v1/parametrizacion/programas
        // Payload: { codigo, nombre, nivel, duracion, estado, centro }
        onSave({
            codigo: codigo.trim().toUpperCase(),
            nombre: nombre.trim(),
            nivel,
            duracion: duracion.trim(),
            estado,
            centro: centro.trim(),
        });

        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Código */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Código Oficial <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: PROG-005"
                        value={codigo}
                        onChange={(e) => {
                            setCodigo(e.target.value);
                            setTouched((prev) => ({ ...prev, codigo: true }));
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900] ${
                            touched.codigo && errores.codigo ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                        }`}
                        required
                    />
                    {touched.codigo && errores.codigo && (
                        <p className="text-xs text-red-600 mt-1">{errores.codigo}</p>
                    )}
                </div>

                {/* Centro */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Centro de Formación <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={centro}
                        onChange={(e) => setCentro(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    >
                        <option value="CSF">CSF - Centro de Servicios Financieros</option>
                        <option value="CBA">CBA - Centro de Biotecnología Agropecuaria</option>
                        <option value="CTPI">CTPI - Centro de Teleinformática y Producción Industrial</option>
                        <option value="CMM">CMM - Centro de Materiales y Ensayos</option>
                    </select>
                </div>
            </div>

            {/* Nombre del Programa */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Nombre del Programa Académico <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Ej: Tecnólogo en Inteligencia Artificial y Procesamiento de Datos"
                    value={nombre}
                    onChange={(e) => {
                        setNombre(e.target.value);
                        setTouched((prev) => ({ ...prev, nombre: true }));
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900] ${
                        touched.nombre && errores.nombre ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                    }`}
                    required
                />
                {touched.nombre && errores.nombre && (
                    <p className="text-xs text-red-600 mt-1">{errores.nombre}</p>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Nivel de Formación */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Nivel Formativo <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={nivel}
                        onChange={(e) => setNivel(e.target.value as NivelFormacion)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    >
                        {NIVELES.map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Duración */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Duración Estimada <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: 24 meses"
                        value={duracion}
                        onChange={(e) => {
                            setDuracion(e.target.value);
                            setTouched((prev) => ({ ...prev, duracion: true }));
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                        required
                    />
                </div>

                {/* Estado */}
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Estado Inicial <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={estado}
                        onChange={(e) => setEstado(e.target.value as EstadoPrograma)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    >
                        {ESTADOS.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Botones de acción */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-full border border-slate-300 text-slate-700 text-sm font-medium hover:bg-slate-100 transition focus:outline-none"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={!isValido}
                    className="px-6 py-2.5 rounded-full bg-[#39A900] hover:bg-[#329600] text-white text-sm font-semibold shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:ring-offset-2"
                >
                    {programaAEditar ? 'Guardar Cambios' : 'Registrar Programa'}
                </button>
            </div>
        </form>
    );
};

/**
 * Modal Institucional para Registro y Parametrización de Programas Académicos SENA.
 */
export const ProgramaModal: React.FC<ProgramaModalProps> = ({
    isOpen,
    onClose,
    onSave,
    programaAEditar,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={programaAEditar ? 'Editar Programa Académico' : 'Nuevo Programa de Formación'}
            subtitle="Catálogo de oferta institucional y parámetros formativos SENA"
            maxWidth="lg"
        >
            <ProgramaForm
                key={programaAEditar ? programaAEditar.id : 'nuevo'}
                onClose={onClose}
                onSave={onSave}
                programaAEditar={programaAEditar}
            />
        </Modal>
    );
};
