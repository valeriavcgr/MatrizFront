'use client';

import React, { useState } from 'react';
import { MatrizPriorizacion } from '@/types';
import { Modal } from '@/components/ui/Modal';

interface NuevaMatrizModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreated: (matriz: MatrizPriorizacion) => void;
    matricesExistentes: MatrizPriorizacion[];
}

interface NuevaMatrizFormProps {
    onClose: () => void;
    onCreated: (matriz: MatrizPriorizacion) => void;
    matricesExistentes: MatrizPriorizacion[];
}

const PROGRAMAS_DISPONIBLES = [
    'Tecnólogo en Análisis y Desarrollo de Software',
    'Técnico en Programación de Aplicaciones para Dispositivos Móviles',
    'Especialización Tecnológica en Gestión de Bases de Datos NoSQL',
    'Tecnólogo en Gestión Contable y de Información Financiera',
    'Técnico en Asistencia Administrativa',
];

// Centro y vigencia institucional fijos (Vigencia 2026, mismo valor que ya
// muestra el Header en toda la plataforma), no seleccionables por el usuario.
const CENTRO_INSTITUCIONAL = 'CSF - Centro de Servicios Financieros';
const VIGENCIA_INSTITUCIONAL = 2026;

const MODALIDADES_DISPONIBLES = ['Presencial', 'Virtual', 'A Distancia', 'Formación Dual / Mixta'];

const JORNADAS_DISPONIBLES = ['Diurna', 'Tarde / Mixta', 'Nocturna', 'Madrugada', 'Fines de Semana'];

const TIPOS_OFERTA_DISPONIBLES = [
    'Oferta Abierta',
    'Oferta Cerrada',

];

function toggleValue(list: string[], value: string) {
    return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

/**
 * Formulario interno con inicialización directa de estado para compatibilidad con React 19.
 */
const NuevaMatrizForm: React.FC<NuevaMatrizFormProps> = ({ onClose, onCreated, matricesExistentes }) => {
    const [programaNombre, setProgramaNombre] = useState('');
    const [modalidad, setModalidad] = useState<string[]>([]);
    const [jornada, setJornada] = useState<string[]>([]);
    const [tipoOferta, setTipoOferta] = useState<string[]>([]);
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

    const errores = {
        programa: !programaNombre ? 'Debe seleccionar un programa académico institucional.' : '',
        modalidad: modalidad.length === 0 ? 'Seleccione al menos una modalidad de formación.' : '',
        jornada: jornada.length === 0 ? 'Seleccione al menos una jornada de atención.' : '',
        tipoOferta: tipoOferta.length === 0 ? 'Seleccione al menos un tipo de oferta.' : '',
    };

    const isFormValido = !errores.programa && !errores.modalidad && !errores.jornada && !errores.tipoOferta;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ programa: true, modalidad: true, jornada: true, tipoOferta: true });

        if (!isFormValido) return;

        const numero = matricesExistentes.length + 1;
        const hoy = new Date().toISOString().slice(0, 10);

        // [BACKEND INTEGRATION]:
        // Endpoint: POST /api/v1/matrices
        // Payload: { programaNombre, vigencia, modalidad, jornada, tipoOferta }
        const nuevaMatriz: MatrizPriorizacion = {
            id: `mat-${numero}`,
            codigo: `MP-${numero.toString().padStart(3, '0')}`,
            programaId: `prog-${numero}`,
            programaNombre,
            vigencia: VIGENCIA_INSTITUCIONAL,
            centroFormacion: CENTRO_INSTITUCIONAL,
            regional: 'Regional Distrito Capital',
            estado: 'Borrador',
            criterios: [],
            pesoTotal: 0,
            cuotas: 0,
            fechaCreacion: hoy,
            fechaActualizacion: hoy,
            responsable: 'Valeria Carrillo G. (Líder Planeación)',
            modalidad,
            jornada,
            tipoOferta,
        };

        onCreated(nuevaMatriz);
        onClose();
    };

    const renderCheckboxGroup = (
        titulo: string,
        opciones: string[],
        seleccionadas: string[],
        onToggle: (value: string) => void,
        error: string
    ) => (
        <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {titulo} <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
                {opciones.map((opcion) => {
                    const checked = seleccionadas.includes(opcion);
                    return (
                        <label
                            key={opcion}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium cursor-pointer transition ${
                                checked
                                    ? 'bg-[#39A900]/10 border-[#39A900] text-[#277700]'
                                    : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => {
                                    onToggle(opcion);
                                    setTouched((prev) => ({ ...prev, [titulo]: true }));
                                }}
                                className="w-3.5 h-3.5 text-[#39A900] rounded-sm focus:ring-[#39A900]"
                            />
                            {opcion}
                        </label>
                    );
                })}
            </div>
            {error && (
                <p className="text-xs text-red-600 mt-1.5 flex items-center gap-1">
                    <span>&bull;</span> {error}
                </p>
            )}
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Programa académico */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Programa Académico <span className="text-red-500">*</span>
                </label>
                <select
                    value={programaNombre}
                    onChange={(e) => {
                        setProgramaNombre(e.target.value);
                        setTouched((prev) => ({ ...prev, programa: true }));
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900] ${
                        touched.programa && errores.programa ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                    }`}
                    required
                >
                    <option value="">Seleccione un programa institucional...</option>
                    {PROGRAMAS_DISPONIBLES.map((p) => (
                        <option key={p} value={p}>
                            {p}
                        </option>
                    ))}
                </select>
                {touched.programa && errores.programa && (
                    <p className="text-xs text-red-600 mt-1">{errores.programa}</p>
                )}
            </div>

            {renderCheckboxGroup('Modalidad', MODALIDADES_DISPONIBLES, modalidad, (v) => setModalidad((prev) => toggleValue(prev, v)), touched.Modalidad ? errores.modalidad : '')}
            {renderCheckboxGroup('Jornada', JORNADAS_DISPONIBLES, jornada, (v) => setJornada((prev) => toggleValue(prev, v)), touched.Jornada ? errores.jornada : '')}
            {renderCheckboxGroup('Tipo de Oferta', TIPOS_OFERTA_DISPONIBLES, tipoOferta, (v) => setTipoOferta((prev) => toggleValue(prev, v)), touched['Tipo de Oferta'] ? errores.tipoOferta : '')}

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
                    className="px-6 py-2.5 rounded-full bg-[#39A900] hover:bg-[#329600] text-white text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:ring-offset-2"
                >
                    Guardar y Continuar con Criterios
                </button>
            </div>
        </form>
    );
};

/**
 * Modal Institucional de Creación de Matriz de Priorización.
 * Es el primer paso del flujo: al guardar, el llamador debe abrir el `CriteriosModal`
 * existente apuntando a la matriz recién creada.
 */
export const NuevaMatrizModal: React.FC<NuevaMatrizModalProps> = ({
    isOpen,
    onClose,
    onCreated,
    matricesExistentes,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Nueva Matriz de Priorización"
            subtitle="Datos institucionales base antes de asignar los criterios del Plan de Gobierno"
            maxWidth="xl"
        >
            <NuevaMatrizForm
                key={matricesExistentes.length}
                onClose={onClose}
                onCreated={onCreated}
                matricesExistentes={matricesExistentes}
            />
        </Modal>
    );
};
