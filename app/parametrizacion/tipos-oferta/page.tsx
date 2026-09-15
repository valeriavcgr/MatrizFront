'use client';

import React, { useState, useMemo } from 'react';
import { TipoOferta, TableColumn } from '@/types';
import { AppShell } from '@/components/layout/AppShell';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';

interface TipoOfertaFormProps {
    onClose: () => void;
    onSave: (data: Omit<TipoOferta, 'id'>) => void;
    tipoAEditar?: TipoOferta | null;
}

const TipoOfertaForm: React.FC<TipoOfertaFormProps> = ({
    onClose,
    onSave,
    tipoAEditar,
}) => {
    const [codigo, setCodigo] = useState(tipoAEditar ? tipoAEditar.codigo : '');
    const [nombre, setNombre] = useState(tipoAEditar ? tipoAEditar.nombre : '');
    const [publicoObjetivo, setPublicoObjetivo] = useState(tipoAEditar ? tipoAEditar.publicoObjetivo : 'Ciudadanía en General');
    const [requiereConvenio, setRequiereConvenio] = useState<boolean>(tipoAEditar?.requiereConvenio || false);
    const [descripcion, setDescripcion] = useState(tipoAEditar ? tipoAEditar.descripcion : '');
    const [estado, setEstado] = useState<'Activo' | 'Inactivo'>(tipoAEditar?.estado || 'Activo');
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

    const errores = {
        codigo: !codigo.trim() ? 'El código es obligatorio.' : '',
        nombre: nombre.trim().length < 4 ? 'El nombre debe tener al menos 4 caracteres.' : '',
        descripcion: descripcion.trim().length < 10 ? 'La descripción debe tener al menos 10 caracteres.' : '',
    };

    const isValido = !errores.codigo && !errores.nombre && !errores.descripcion;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ codigo: true, nombre: true, descripcion: true });

        if (!isValido) return;

        // [BACKEND INTEGRATION]: POST /api/v1/parametrizacion/tipos-oferta
        onSave({
            codigo: codigo.trim().toUpperCase(),
            nombre: nombre.trim(),
            publicoObjetivo,
            requiereConvenio,
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
                        Código <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: OFE-ABI"
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
                        Público Objetivo
                    </label>
                    <select
                        value={publicoObjetivo}
                        onChange={(e) => setPublicoObjetivo(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    >
                        <option value="Ciudadanía en General">Ciudadanía en General</option>
                        <option value="Empresas y Gremios">Empresas y Gremios</option>
                        <option value="Entidades Públicas / Territoriales">Entidades Públicas / Territoriales</option>
                        <option value="Comunidades Étnicas y Campesinas">Comunidades Étnicas y Campesinas</option>
                        <option value="Población Víctima del Conflicto">Población Víctima del Conflicto</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Nombre del Tipo de Oferta <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Ej: Oferta Abierta / Regular"
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
                <div className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                    <input
                        type="checkbox"
                        id="check-convenio"
                        checked={requiereConvenio}
                        onChange={(e) => setRequiereConvenio(e.target.checked)}
                        className="w-4 h-4 text-[#39A900] rounded-sm focus:ring-[#39A900]"
                    />
                    <label htmlFor="check-convenio" className="text-xs font-semibold text-slate-700 cursor-pointer">
                        ¿Requiere Convenio Legal Vinculante?
                    </label>
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
                    Descripción y Lineamientos <span className="text-red-500">*</span>
                </label>
                <textarea
                    rows={3}
                    placeholder="Especificaciones de asignación de cupos, requisitos de postulación..."
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
                    {tipoAEditar ? 'Guardar Cambios' : 'Registrar Tipo de Oferta'}
                </button>
            </div>
        </form>
    );
};

export default function ParametrizacionTiposOfertaPage() {
    const [busqueda, setBusqueda] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tipoAEditar, setTipoAEditar] = useState<TipoOferta | null>(null);
    const [notificacion, setNotificacion] = useState<string | null>(null);

    // [BACKEND INTEGRATION]: GET /api/v1/parametrizacion/tipos-oferta
    const [tipos, setTipos] = useState<TipoOferta[]>([
        {
            id: 'ofe-01',
            codigo: 'OFE-ABI',
            nombre: 'Oferta Abierta (Regular)',
            descripcion: 'Convocatoria pública nacional dirigida a cualquier ciudadano colombiano o residente que cumpla los requisitos.',
            publicoObjetivo: 'Ciudadanía en General',
            requiereConvenio: false,
            estado: 'Activo',
        },
        {
            id: 'ofe-02',
            codigo: 'OFE-EMP',
            nombre: 'Oferta Especial Empresarial',
            descripcion: 'Formación a la medida coordinada con empresas para responder a demandas específicas de productividad y talento humano.',
            publicoObjetivo: 'Empresas y Gremios',
            requiereConvenio: true,
            estado: 'Activo',
        },
        {
            id: 'ofe-03',
            codigo: 'OFE-CON',
            nombre: 'Oferta por Convenio Interinstitucional',
            descripcion: 'Programas respaldados por convenios formales con alcaldías, gobernaciones, ministerios o fundaciones.',
            publicoObjetivo: 'Entidades Públicas / Territoriales',
            requiereConvenio: true,
            estado: 'Activo',
        },
        {
            id: 'ofe-04',
            codigo: 'OFE-POP',
            nombre: 'Oferta Economía Popular y Campesina',
            descripcion: 'Estrategias diferenciales dirigidas a asociaciones comunitarias, trabajadores informales y unidades productivas del campo.',
            publicoObjetivo: 'Comunidades Étnicas y Campesinas',
            requiereConvenio: false,
            estado: 'Activo',
        },
    ]);

    const tiposFiltrados = useMemo(() => {
        return tipos.filter(
            (t) =>
                t.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                t.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
                t.publicoObjetivo.toLowerCase().includes(busqueda.toLowerCase()) ||
                t.descripcion.toLowerCase().includes(busqueda.toLowerCase())
        );
    }, [tipos, busqueda]);

    const triggerNotificacion = (msg: string) => {
        setNotificacion(msg);
        setTimeout(() => setNotificacion(null), 4000);
    };

    const handleGuardar = (data: Omit<TipoOferta, 'id'>) => {
        if (tipoAEditar) {
            setTipos(tipos.map((t) => (t.id === tipoAEditar.id ? { ...data, id: t.id } : t)));
            triggerNotificacion(`Tipo de oferta ${data.codigo} actualizado.`);
        } else {
            const nuevo: TipoOferta = {
                ...data,
                id: `ofe-0${tipos.length + 1}`,
            };
            setTipos([nuevo, ...tipos]);
            triggerNotificacion(`Tipo de oferta ${data.codigo} registrado.`);
        }
        setTipoAEditar(null);
    };

    const handleToggle = (id: string) => {
        setTipos(
            tipos.map((t) => {
                if (t.id === id) {
                    const nuevoEstado = t.estado === 'Activo' ? 'Inactivo' : 'Activo';
                    triggerNotificacion(`Oferta ${t.codigo} marcada como: ${nuevoEstado}`);
                    return { ...t, estado: nuevoEstado };
                }
                return t;
            })
        );
    };

    const columns: TableColumn<TipoOferta>[] = [
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
            header: 'Tipo de Oferta',
            headerClassName: 'w-48',
            render: (item) => (
                <div>
                    <div className="font-semibold text-slate-900 leading-tight">{item.nombre}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{item.publicoObjetivo}</div>
                </div>
            ),
        },
        {
            key: 'requiereConvenio',
            header: 'Convenio',
            align: 'center',
            headerClassName: 'w-32',
            render: (item) => (
                <Badge variant={item.requiereConvenio ? 'info' : 'neutral'} size="sm">
                    {item.requiereConvenio ? 'Requiere Convenio' : 'Convocatoria Libre'}
                </Badge>
            ),
        },
        {
            key: 'descripcion',
            header: 'Lineamientos Institucionales',
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
                            setTipoAEditar(item);
                            setIsModalOpen(true);
                        }}
                        className="p-1.5 text-slate-500 hover:text-[#00324D] hover:bg-slate-100 rounded-lg transition"
                        title="Editar tipo de oferta"
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
            title="Parametrización - Tipos de Oferta"
            subtitle="Reglas de convocatoria institucional, convenios empresariales y programas especiales"
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
                        setTipoAEditar(null);
                        setIsModalOpen(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 bg-[#39A900] hover:bg-[#329600] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition shadow-xs focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Nuevo Tipo de Oferta
                </button>

                <div className="relative w-full md:w-80">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar por tipo de oferta o público..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-300 text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#39A900] transition"
                    />
                </div>
            </div>

            <DataTable<TipoOferta>
                data={tiposFiltrados}
                columns={columns}
                keyExtractor={(item) => item.id}
                emptyTitle="No se encontraron tipos de oferta"
                emptyDescription="No hay tipos de oferta que coincidan con la búsqueda."
                emptyActionLabel="Restablecer Búsqueda"
                onEmptyAction={() => setBusqueda('')}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setTipoAEditar(null);
                }}
                title={tipoAEditar ? 'Editar Tipo de Oferta' : 'Nuevo Tipo de Oferta'}
                subtitle="Configuración de modalidades de convocatoria y público beneficiario"
                maxWidth="lg"
            >
                <TipoOfertaForm
                    key={tipoAEditar ? tipoAEditar.id : 'nuevo'}
                    onClose={() => {
                        setIsModalOpen(false);
                        setTipoAEditar(null);
                    }}
                    onSave={handleGuardar}
                    tipoAEditar={tipoAEditar}
                />
            </Modal>
        </AppShell>
    );
}
