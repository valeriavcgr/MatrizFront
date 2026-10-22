'use client';

import React, { useState, useMemo } from 'react';
import { JornadaFormacion, TableColumn } from '@/types';
import { AppShell } from '@/components/layout/AppShell';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';

interface JornadaFormProps {
    onClose: () => void;
    onSave: (data: Omit<JornadaFormacion, 'id'>) => void;
    jornadaAEditar?: JornadaFormacion | null;
}

const JornadaForm: React.FC<JornadaFormProps> = ({
    onClose,
    onSave,
    jornadaAEditar,
}) => {
    const [codigo, setCodigo] = useState(jornadaAEditar ? jornadaAEditar.codigo : '');
    const [nombre, setNombre] = useState(jornadaAEditar ? jornadaAEditar.nombre : '');
    const [horario, setHorario] = useState(jornadaAEditar ? jornadaAEditar.horario : '06:00 a 12:00');
    const [diasAtencion, setDiasAtencion] = useState(jornadaAEditar ? jornadaAEditar.diasAtencion : 'Lunes a Viernes');
    const [descripcion, setDescripcion] = useState(jornadaAEditar ? jornadaAEditar.descripcion : '');
    const [estado, setEstado] = useState<'Activo' | 'Inactivo'>(jornadaAEditar?.estado || 'Activo');
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

    const errores = {
        codigo: !codigo.trim() ? 'El código es obligatorio.' : '',
        nombre: nombre.trim().length < 4 ? 'El nombre debe tener al menos 4 caracteres.' : '',
        horario: !horario.trim() ? 'El horario es obligatorio.' : '',
    };

    const isValido = !errores.codigo && !errores.nombre && !errores.horario;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ codigo: true, nombre: true, horario: true });

        if (!isValido) return;

        // [BACKEND INTEGRATION]: POST /api/v1/parametrizacion/jornadas
        onSave({
            codigo: codigo.trim().toUpperCase(),
            nombre: nombre.trim(),
            horario: horario.trim(),
            diasAtencion,
            descripcion: descripcion.trim(),
            estado,
        });

        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Código de Jornada <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: JOR-DIU"
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
                        Franja Horaria <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: 06:00 a 12:00"
                        value={horario}
                        onChange={(e) => {
                            setHorario(e.target.value);
                            setTouched((prev) => ({ ...prev, horario: true }));
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                        required
                    />
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Nombre de la Jornada <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Ej: Jornada Diurna"
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
                        Días de Atención
                    </label>
                    <select
                        value={diasAtencion}
                        onChange={(e) => setDiasAtencion(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    >
                        <option value="Lunes a Viernes">Lunes a Viernes</option>
                        <option value="Lunes a Sábado">Lunes a Sábado</option>
                        <option value="Fines de Semana (Sáb-Dom)">Fines de Semana (Sáb-Dom)</option>
                        <option value="Flexible / Asincrónico">Flexible / Asincrónico</option>
                    </select>
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
                    Descripción / Observaciones
                </label>
                <textarea
                    rows={2}
                    placeholder="Detalles sobre disponibilidad de ambientes o turnos rotativos..."
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white transition resize-none focus:outline-none focus:ring-2 focus:ring-[#39A900]"
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
                    {jornadaAEditar ? 'Guardar Cambios' : 'Registrar Jornada'}
                </button>
            </div>
        </form>
    );
};

export default function ParametrizacionJornadasPage() {
    const [busqueda, setBusqueda] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [jornadaAEditar, setJornadaAEditar] = useState<JornadaFormacion | null>(null);
    const [notificacion, setNotificacion] = useState<string | null>(null);

    // [BACKEND INTEGRATION]: GET /api/v1/parametrizacion/jornadas
    const [jornadas, setJornadas] = useState<JornadaFormacion[]>([
        {
            id: 'jor-01',
            codigo: 'JOR-DIU',
            nombre: 'Diurna',
            horario: '06:00 a 12:00',
            diasAtencion: 'Lunes a Viernes',
            descripcion: 'Horario matutino para formación técnica y tecnológica con dedicación exclusiva.',
            estado: 'Activo',
        },
        {
            id: 'jor-02',
            codigo: 'JOR-TAR',
            nombre: 'Tarde / Mixta',
            horario: '12:00 a 18:00',
            diasAtencion: 'Lunes a Viernes',
            descripcion: 'Franja vespertina articulada con programas de media técnica y formación continua.',
            estado: 'Activo',
        },
        {
            id: 'jor-03',
            codigo: 'JOR-NOC',
            nombre: 'Nocturna',
            horario: '18:00 a 22:00',
            diasAtencion: 'Lunes a Viernes',
            descripcion: 'Orientada preferentemente a trabajadores en ejercicio y aprendices con compromisos laborales.',
            estado: 'Activo',
        },
        {
            id: 'jor-04',
            codigo: 'JOR-MAD',
            nombre: 'Madrugada',
            horario: '22:00 a 06:00',
            diasAtencion: 'Lunes a Sábado',
            descripcion: 'Horario especializado para procesos industriales continuos y talleres técnicos.',
            estado: 'Activo',
        },
        {
            id: 'jor-05',
            codigo: 'JOR-FIN',
            nombre: 'Fines de Semana',
            horario: '07:00 a 17:00',
            diasAtencion: 'Fines de Semana (Sáb-Dom)',
            descripcion: 'Destinada a formación flexible con concentración horaria los sábados y domingos.',
            estado: 'Activo',
        },
    ]);

    const jornadasFiltradas = useMemo(() => {
        return jornadas.filter(
            (j) =>
                j.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                j.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
                j.horario.toLowerCase().includes(busqueda.toLowerCase()) ||
                j.diasAtencion.toLowerCase().includes(busqueda.toLowerCase())
        );
    }, [jornadas, busqueda]);

    const triggerNotificacion = (msg: string) => {
        setNotificacion(msg);
        setTimeout(() => setNotificacion(null), 4000);
    };

    const handleGuardar = (data: Omit<JornadaFormacion, 'id'>) => {
        if (jornadaAEditar) {
            setJornadas(
                jornadas.map((j) => (j.id === jornadaAEditar.id ? { ...data, id: j.id } : j))
            );
            triggerNotificacion(`Jornada ${data.codigo} actualizada.`);
        } else {
            const nuevo: JornadaFormacion = {
                ...data,
                id: `jor-0${jornadas.length + 1}`,
            };
            setJornadas([nuevo, ...jornadas]);
            triggerNotificacion(`Jornada ${data.codigo} registrada.`);
        }
        setJornadaAEditar(null);
    };

    const handleToggle = (id: string) => {
        setJornadas(
            jornadas.map((j) => {
                if (j.id === id) {
                    const nuevoEstado = j.estado === 'Activo' ? 'Inactivo' : 'Activo';
                    triggerNotificacion(`Jornada ${j.codigo} actualizada a: ${nuevoEstado}`);
                    return { ...j, estado: nuevoEstado };
                }
                return j;
            })
        );
    };

    const columns: TableColumn<JornadaFormacion>[] = [
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
            header: 'Jornada',
            headerClassName: 'w-36',
            render: (item) => (
                <div className="font-semibold text-slate-900 leading-tight">{item.nombre}</div>
            ),
        },
        {
            key: 'horario',
            header: 'Franja Horaria',
            align: 'center',
            headerClassName: 'w-36',
            render: (item) => (
                <span className="font-mono text-xs font-semibold text-[#277700] bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                    {item.horario}
                </span>
            ),
        },
        {
            key: 'diasAtencion',
            header: 'Días de Atención',
            headerClassName: 'w-44',
            render: (item) => (
                <span className="text-xs text-slate-700 font-medium">{item.diasAtencion}</span>
            ),
        },
        {
            key: 'descripcion',
            header: 'Descripción',
            render: (item) => (
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.descripcion}
                </p>
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
                            setJornadaAEditar(item);
                            setIsModalOpen(true);
                        }}
                        className="p-1.5 text-slate-500 hover:text-[#00324D] hover:bg-slate-100 rounded-lg transition"
                        title="Editar jornada"
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
            title="Parametrización - Jornadas de Formación"
            subtitle="Administración de turnos formativos diurnos, nocturnos y de fin de semana"
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
                        setJornadaAEditar(null);
                        setIsModalOpen(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 bg-[#39A900] hover:bg-[#329600] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition shadow-xs focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Nueva Jornada
                </button>

                <div className="relative w-full md:w-80">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar por jornada u horario..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-300 text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#39A900] transition"
                    />
                </div>
            </div>

            <DataTable<JornadaFormacion>
                data={jornadasFiltradas}
                columns={columns}
                keyExtractor={(item) => item.id}
                emptyTitle="No se encontraron jornadas formativas"
                emptyDescription="No hay jornadas que coincidan con el término de búsqueda ingresado."
                emptyActionLabel="Restablecer Búsqueda"
                onEmptyAction={() => setBusqueda('')}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setJornadaAEditar(null);
                }}
                title={jornadaAEditar ? 'Editar Jornada' : 'Nueva Jornada de Formación'}
                subtitle="Definición de turnos institucionales y horarios de atención"
                maxWidth="lg"
            >
                <JornadaForm
                    key={jornadaAEditar ? jornadaAEditar.id : 'nuevo'}
                    onClose={() => {
                        setIsModalOpen(false);
                        setJornadaAEditar(null);
                    }}
                    onSave={handleGuardar}
                    jornadaAEditar={jornadaAEditar}
                />
            </Modal>
        </AppShell>
    );
}
