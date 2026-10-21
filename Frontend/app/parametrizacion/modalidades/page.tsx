'use client';

import React, { useState, useMemo } from 'react';
import { ModalidadFormacion, TableColumn } from '@/types';
import { AppShell } from '@/components/layout/AppShell';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';

interface ModalidadFormProps {
    onClose: () => void;
    onSave: (data: Omit<ModalidadFormacion, 'id'>) => void;
    modalidadAEditar?: ModalidadFormacion | null;
}

const ModalidadForm: React.FC<ModalidadFormProps> = ({
    onClose,
    onSave,
    modalidadAEditar,
}) => {
    const [codigo, setCodigo] = useState(modalidadAEditar ? modalidadAEditar.codigo : '');
    const [nombre, setNombre] = useState(modalidadAEditar ? modalidadAEditar.nombre : '');
    const [descripcion, setDescripcion] = useState(modalidadAEditar ? modalidadAEditar.descripcion : '');
    const [presencialidad, setPresencialidad] = useState(modalidadAEditar ? modalidadAEditar.presencialidad : '100% Presencial');
    const [plataforma, setPlataforma] = useState(modalidadAEditar ? modalidadAEditar.plataforma : 'Ambientes Físicos de Aprendizaje');
    const [estado, setEstado] = useState<'Activo' | 'Inactivo'>(modalidadAEditar?.estado || 'Activo');
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

    const errores = {
        codigo: !codigo.trim() ? 'El código es obligatorio.' : '',
        nombre: nombre.trim().length < 4 ? 'El nombre debe tener al menos 4 caracteres.' : '',
        descripcion: descripcion.trim().length < 10 ? 'La descripción técnica debe tener al menos 10 caracteres.' : '',
    };

    const isValido = !errores.codigo && !errores.nombre && !errores.descripcion;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ codigo: true, nombre: true, descripcion: true });

        if (!isValido) return;

        // [BACKEND INTEGRATION]: POST /api/v1/parametrizacion/modalidades
        onSave({
            codigo: codigo.trim().toUpperCase(),
            nombre: nombre.trim(),
            descripcion: descripcion.trim(),
            presencialidad,
            plataforma,
            estado,
        });

        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Código de Modalidad <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: MOD-PRE"
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
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Porcentaje de Presencialidad
                    </label>
                    <select
                        value={presencialidad}
                        onChange={(e) => setPresencialidad(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    >
                        <option value="100% Presencial">100% Presencial</option>
                        <option value="100% Virtual">100% Virtual (Ecosistema LMS)</option>
                        <option value="Híbrida (50% / 50%)">Híbrida (50% / 50%)</option>
                        <option value="A Distancia (70% Virtual / 30% Presencial)">A Distancia (70% / 30%)</option>
                        <option value="Formación Dual / Empresa">Formación Dual / Empresa</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Nombre de la Modalidad <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Ej: Presencial en Centro de Formación"
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
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Plataforma / Entorno de Impartición
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: Zajuna / Ambientes Especializados CSF"
                        value={plataforma}
                        onChange={(e) => setPlataforma(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Estado
                    </label>
                    <select
                        value={estado}
                        onChange={(e) => setEstado(e.target.value as 'Activo' | 'Inactivo')}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    >
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Descripción Pedagógica e Institucional <span className="text-red-500">*</span>
                </label>
                <textarea
                    rows={3}
                    placeholder="Detalle de la metodología de aprendizaje y medios de acompañamiento tutorial..."
                    value={descripcion}
                    onChange={(e) => {
                        setDescripcion(e.target.value);
                        setTouched((prev) => ({ ...prev, descripcion: true }));
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white transition resize-none focus:outline-none focus:ring-2 focus:ring-[#39A900] ${
                        touched.descripcion && errores.descripcion ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                    }`}
                    required
                />
            </div>

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
                    className="px-6 py-2.5 rounded-full bg-[#39A900] hover:bg-[#329600] text-white text-sm font-semibold shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                >
                    {modalidadAEditar ? 'Guardar Cambios' : 'Registrar Modalidad'}
                </button>
            </div>
        </form>
    );
};

export default function ParametrizacionModalidadesPage() {
    const [busqueda, setBusqueda] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalidadAEditar, setModalidadAEditar] = useState<ModalidadFormacion | null>(null);
    const [notificacion, setNotificacion] = useState<string | null>(null);

    // [BACKEND INTEGRATION]: GET /api/v1/parametrizacion/modalidades
    const [modalidades, setModalidades] = useState<ModalidadFormacion[]>([
        {
            id: 'mod-01',
            codigo: 'MOD-PRE',
            nombre: 'Presencial',
            descripcion: 'Formación impartida con asistencia regular y física del aprendiz en los talleres y ambientes de aprendizaje del centro.',
            presencialidad: '100% Presencial',
            plataforma: 'Ambientes Físicos CSF',
            estado: 'Activo',
        },
        {
            id: 'mod-02',
            codigo: 'MOD-VIR',
            nombre: 'Virtual',
            descripcion: 'Proceso formativo en línea apoyado 100% en tecnologías de la información mediante el ecosistema virtual del SENA.',
            presencialidad: '100% Virtual',
            plataforma: 'LMS Zajuna Institucional',
            estado: 'Activo',
        },
        {
            id: 'mod-03',
            codigo: 'MOD-DIS',
            nombre: 'A Distancia',
            descripcion: 'Combinación estructurada de trabajo autónomo en plataforma con sesiones presenciales concentradas de práctica de laboratorio.',
            presencialidad: 'A Distancia (70% / 30%)',
            plataforma: 'Mixta: Zajuna + Laboratorios',
            estado: 'Activo',
        },
        {
            id: 'mod-04',
            codigo: 'MOD-DUA',
            nombre: 'Formación Dual / Mixta',
            descripcion: 'Alternancia de periodos formativos en ambientes SENA y en la empresa coinversora o patrocinadora del proceso.',
            presencialidad: 'Formación Dual / Empresa',
            plataforma: 'Centro + Empresa Patrocinadora',
            estado: 'Activo',
        },
    ]);

    const modalidadesFiltradas = useMemo(() => {
        return modalidades.filter(
            (m) =>
                m.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                m.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
                m.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
                m.plataforma.toLowerCase().includes(busqueda.toLowerCase())
        );
    }, [modalidades, busqueda]);

    const triggerNotificacion = (msg: string) => {
        setNotificacion(msg);
        setTimeout(() => setNotificacion(null), 4000);
    };

    const handleGuardar = (data: Omit<ModalidadFormacion, 'id'>) => {
        if (modalidadAEditar) {
            setModalidades(
                modalidades.map((m) => (m.id === modalidadAEditar.id ? { ...data, id: m.id } : m))
            );
            triggerNotificacion(`Modalidad ${data.codigo} actualizada.`);
        } else {
            const nuevo: ModalidadFormacion = {
                ...data,
                id: `mod-0${modalidades.length + 1}`,
            };
            setModalidades([nuevo, ...modalidades]);
            triggerNotificacion(`Modalidad ${data.codigo} registrada.`);
        }
        setModalidadAEditar(null);
    };

    const handleToggle = (id: string) => {
        setModalidades(
            modalidades.map((m) => {
                if (m.id === id) {
                    const nuevoEstado = m.estado === 'Activo' ? 'Inactivo' : 'Activo';
                    triggerNotificacion(`Modalidad ${m.codigo} actualizada a: ${nuevoEstado}`);
                    return { ...m, estado: nuevoEstado };
                }
                return m;
            })
        );
    };

    const columns: TableColumn<ModalidadFormacion>[] = [
        {
            key: 'codigo',
            header: 'Código',
            align: 'center',
            headerClassName: 'w-28',
            render: (item) => (
                <span className="font-mono text-xs font-bold text-[#00324D] bg-slate-100 px-2.5 py-1 rounded-md">
                    {item.codigo}
                </span>
            ),
        },
        {
            key: 'nombre',
            header: 'Modalidad',
            headerClassName: 'w-44',
            render: (item) => (
                <div>
                    <div className="font-semibold text-slate-900 leading-tight">{item.nombre}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{item.presencialidad}</div>
                </div>
            ),
        },
        {
            key: 'descripcion',
            header: 'Descripción Pedagógica',
            render: (item) => (
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.descripcion}
                </p>
            ),
        },
        {
            key: 'plataforma',
            header: 'Entorno / Plataforma',
            headerClassName: 'w-48',
            render: (item) => (
                <span className="text-xs font-medium text-slate-700">{item.plataforma}</span>
            ),
        },
        {
            key: 'estado',
            header: 'Estado',
            align: 'center',
            headerClassName: 'w-28',
            render: (item) => (
                <Badge variant={item.estado === 'Activo' ? 'success' : 'danger'} size="sm" dot>
                    {item.estado}
                </Badge>
            ),
        },
        {
            key: 'acciones',
            header: 'Acciones',
            align: 'right',
            headerClassName: 'w-24',
            render: (item) => (
                <div className="flex items-center justify-end gap-1">
                    <button
                        type="button"
                        onClick={() => {
                            setModalidadAEditar(item);
                            setIsModalOpen(true);
                        }}
                        className="p-1.5 text-slate-500 hover:text-[#00324D] hover:bg-slate-100 rounded-lg transition"
                        title="Editar modalidad"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleToggle(item.id)}
                        className={`p-1.5 rounded-lg transition ${
                            item.estado === 'Activo' ? 'text-amber-600 hover:bg-amber-50' : 'text-[#39A900] hover:bg-green-50'
                        }`}
                        title={item.estado === 'Activo' ? 'Inactivar' : 'Activar'}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                        </svg>
                    </button>
                </div>
            ),
        },
    ];

    return (
        <AppShell
            title="Parametrización - Modalidades de Formación"
            subtitle="Configuración de modalidades educativas presenciales, virtuales y esquemas duales"
            initialRole="ADMINISTRADOR"
        >
            {notificacion && (
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-sm font-medium flex items-center justify-between shadow-xs animate-fade-in">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{notificacion}</span>
                    </div>
                    <button type="button" onClick={() => setNotificacion(null)} className="text-xs font-bold hover:underline">
                        Cerrar
                    </button>
                </div>
            )}

            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <button
                    type="button"
                    onClick={() => {
                        setModalidadAEditar(null);
                        setIsModalOpen(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 bg-[#39A900] hover:bg-[#329600] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition shadow-xs focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    + Nueva Modalidad
                </button>

                <div className="relative w-full md:w-80">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar modalidad o entorno..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-300 text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#39A900] transition"
                    />
                </div>
            </div>

            <DataTable<ModalidadFormacion>
                data={modalidadesFiltradas}
                columns={columns}
                keyExtractor={(item) => item.id}
                emptyTitle="No se encontraron modalidades"
                emptyDescription="No hay modalidades que coincidan con la búsqueda actual."
                emptyActionLabel="Restablecer Búsqueda"
                onEmptyAction={() => setBusqueda('')}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setModalidadAEditar(null);
                }}
                title={modalidadAEditar ? 'Editar Modalidad' : 'Nueva Modalidad Formativa'}
                subtitle="Parámetros técnicos de impartición educativa institucional"
                maxWidth="lg"
            >
                <ModalidadForm
                    key={modalidadAEditar ? modalidadAEditar.id : 'nuevo'}
                    onClose={() => {
                        setIsModalOpen(false);
                        setModalidadAEditar(null);
                    }}
                    onSave={handleGuardar}
                    modalidadAEditar={modalidadAEditar}
                />
            </Modal>
        </AppShell>
    );
}
