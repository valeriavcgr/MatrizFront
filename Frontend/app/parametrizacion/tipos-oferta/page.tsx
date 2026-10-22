'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { TipoOferta, TableColumn } from '@/types';
import { AppShell } from '@/components/layout/AppShell';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { api, ErrorApi } from '@/lib/api';

const RUTA = '/parametrizacion/tipos-oferta';
const NOMBRE_MIN = 3;
const NOMBRE_MAX = 50;

interface TipoOfertaFormProps {
    onClose: () => void;
    onSaved: (tipo: TipoOferta, esNuevo: boolean) => void;
    tipoAEditar?: TipoOferta | null;
}

/**
 * Formulario de registro / edición. Solo se diligencia el nombre:
 * el código lo asigna el sistema y el estado se cambia desde la tabla.
 */
const TipoOfertaForm: React.FC<TipoOfertaFormProps> = ({ onClose, onSaved, tipoAEditar }) => {
    const [nombre, setNombre] = useState(tipoAEditar ? tipoAEditar.nombre : '');
    const [touched, setTouched] = useState(false);
    const [guardando, setGuardando] = useState(false);
    const [errorServidor, setErrorServidor] = useState<string | null>(null);

    const nombreLimpio = nombre.trim().replace(/\s+/g, ' ');
    const errorNombre =
        nombreLimpio.length < NOMBRE_MIN
            ? `El nombre debe tener al menos ${NOMBRE_MIN} caracteres.`
            : nombreLimpio.length > NOMBRE_MAX
              ? `El nombre debe tener máximo ${NOMBRE_MAX} caracteres.`
              : '';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched(true);
        if (errorNombre) return;

        setGuardando(true);
        setErrorServidor(null);
        try {
            const tipo = tipoAEditar
                ? await api<TipoOferta>(`${RUTA}/${tipoAEditar.codigo}`, {
                      method: 'PATCH',
                      body: { nombre: nombreLimpio },
                  })
                : await api<TipoOferta>(RUTA, { method: 'POST', body: { nombre: nombreLimpio } });
            onSaved(tipo, !tipoAEditar);
            onClose();
        } catch (error) {
            setErrorServidor(error instanceof ErrorApi ? error.message : 'No fue posible guardar el tipo de oferta');
        } finally {
            setGuardando(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {errorServidor && (
                <div className="p-3 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm">{errorServidor}</div>
            )}

            {tipoAEditar && (
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Código
                    </label>
                    <div className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-sm font-mono text-slate-600">
                        {tipoAEditar.codigo}
                    </div>
                </div>
            )}

            <div>
                <label
                    htmlFor="nombre-tipo-oferta"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                    Nombre del Tipo de Oferta <span className="text-red-500">*</span>
                </label>
                <input
                    id="nombre-tipo-oferta"
                    type="text"
                    placeholder="Ej: Oferta Abierta"
                    value={nombre}
                    maxLength={NOMBRE_MAX + 10}
                    onChange={(e) => {
                        setNombre(e.target.value);
                        setTouched(true);
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900] ${
                        touched && errorNombre ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                    }`}
                    autoFocus
                    required
                />
                <div className="flex justify-between mt-1 text-[11px]">
                    <span className="text-red-500">{touched ? errorNombre : ''}</span>
                    <span className="text-slate-400">
                        {nombreLimpio.length}/{NOMBRE_MAX}
                    </span>
                </div>
                {!tipoAEditar && (
                    <p className="text-[11px] text-slate-500 mt-1">El código se asigna automáticamente al registrar.</p>
                )}
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
                    disabled={!!errorNombre || guardando}
                    className="px-6 py-2.5 rounded-full bg-[#39A900] hover:bg-[#329600] text-white text-sm font-semibold shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                >
                    {guardando ? 'Guardando...' : tipoAEditar ? 'Guardar Cambios' : 'Registrar Tipo de Oferta'}
                </button>
            </div>
        </form>
    );
};

type FiltroEstado = 'todos' | 'activos' | 'inactivos';

export default function ParametrizacionTiposOfertaPage() {
    const [tipos, setTipos] = useState<TipoOferta[]>([]);
    const [cargando, setCargando] = useState(true);
    const [errorCarga, setErrorCarga] = useState<string | null>(null);
    const [busqueda, setBusqueda] = useState('');
    const [filtroEstado, setFiltroEstado] = useState<FiltroEstado>('todos');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tipoAEditar, setTipoAEditar] = useState<TipoOferta | null>(null);
    const [notificacion, setNotificacion] = useState<{ texto: string; error?: boolean } | null>(null);

    const triggerNotificacion = (texto: string, error = false) => {
        setNotificacion({ texto, error });
        setTimeout(() => setNotificacion(null), 4000);
    };

    const cargarTipos = useCallback(async () => {
        setCargando(true);
        setErrorCarga(null);
        try {
            setTipos(await api<TipoOferta[]>(RUTA));
        } catch (error) {
            setErrorCarga(error instanceof ErrorApi ? error.message : 'No fue posible cargar los tipos de oferta');
        } finally {
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        // Carga inicial desde el API: actualizar el estado aquí es intencional.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        void cargarTipos();
    }, [cargarTipos]);

    const tiposFiltrados = useMemo(() => {
        const texto = busqueda.toLowerCase();
        return tipos.filter(
            (t) =>
                (filtroEstado === 'todos' || t.estado === (filtroEstado === 'activos')) &&
                (t.nombre.toLowerCase().includes(texto) || String(t.codigo).includes(texto)),
        );
    }, [tipos, busqueda, filtroEstado]);

    const handleGuardado = (tipo: TipoOferta, esNuevo: boolean) => {
        setTipos((actuales) =>
            esNuevo ? [tipo, ...actuales] : actuales.map((t) => (t.codigo === tipo.codigo ? tipo : t)),
        );
        triggerNotificacion(`Tipo de oferta "${tipo.nombre}" ${esNuevo ? 'registrado' : 'actualizado'}.`);
    };

    const handleToggle = async (tipo: TipoOferta) => {
        try {
            const actualizado = await api<TipoOferta>(`${RUTA}/${tipo.codigo}/estado`, {
                method: 'PATCH',
                body: { estado: !tipo.estado },
            });
            setTipos((actuales) => actuales.map((t) => (t.codigo === actualizado.codigo ? actualizado : t)));
            triggerNotificacion(
                `Tipo de oferta "${actualizado.nombre}" ${actualizado.estado ? 'activado' : 'desactivado'}.`,
            );
        } catch (error) {
            triggerNotificacion(error instanceof ErrorApi ? error.message : 'No fue posible cambiar el estado', true);
        }
    };

    const cerrarModal = () => {
        setIsModalOpen(false);
        setTipoAEditar(null);
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
            render: (item) => <div className="font-semibold text-slate-900 leading-tight">{item.nombre}</div>,
        },
        {
            key: 'estado',
            header: 'Estado',
            align: 'center',
            headerClassName: 'w-28',
            render: (item) => (
                <Badge variant={item.estado ? 'success' : 'danger'} size="sm" dot>
                    {item.estado ? 'Activo' : 'Inactivo'}
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
                        onClick={() => handleToggle(item)}
                        className={`p-1.5 rounded-lg transition ${
                            item.estado ? 'text-amber-600 hover:bg-amber-50' : 'text-[#39A900] hover:bg-green-50'
                        }`}
                        title={item.estado ? 'Desactivar' : 'Activar'}
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
            subtitle="Registro, consulta, actualización y activación de los tipos de oferta formativa"
            initialRole="ADMINISTRADOR"
        >
            {notificacion && (
                <div
                    className={`p-4 rounded-xl border text-sm font-medium flex items-center justify-between shadow-xs animate-fade-in ${
                        notificacion.error
                            ? 'border-red-200 bg-red-50 text-red-800'
                            : 'border-emerald-200 bg-emerald-50 text-emerald-800'
                    }`}
                >
                    <span>{notificacion.texto}</span>
                    <button type="button" onClick={() => setNotificacion(null)} className="text-xs font-bold hover:underline">
                        Cerrar
                    </button>
                </div>
            )}

            {errorCarga && (
                <div className="p-4 rounded-xl border border-red-200 bg-red-50 text-red-800 text-sm font-medium flex items-center justify-between">
                    <span>{errorCarga}</span>
                    <button type="button" onClick={() => void cargarTipos()} className="text-xs font-bold hover:underline">
                        Reintentar
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

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <select
                        value={filtroEstado}
                        onChange={(e) => setFiltroEstado(e.target.value as FiltroEstado)}
                        className="px-4 py-2 rounded-full border border-slate-300 text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#39A900] transition"
                        aria-label="Filtrar por estado"
                    >
                        <option value="todos">Todos los estados</option>
                        <option value="activos">Activos</option>
                        <option value="inactivos">Inactivos</option>
                    </select>
                    <div className="relative w-full md:w-72">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar por nombre o código..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-300 text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#39A900] transition"
                        />
                    </div>
                </div>
            </div>

            <DataTable<TipoOferta>
                data={tiposFiltrados}
                columns={columns}
                keyExtractor={(item) => item.codigo}
                isLoading={cargando}
                emptyTitle="No se encontraron tipos de oferta"
                emptyDescription="No hay tipos de oferta que coincidan con la búsqueda."
                emptyActionLabel="Restablecer Filtros"
                onEmptyAction={() => {
                    setBusqueda('');
                    setFiltroEstado('todos');
                }}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={cerrarModal}
                title={tipoAEditar ? 'Editar Tipo de Oferta' : 'Nuevo Tipo de Oferta'}
                subtitle="Catálogo de tipos de oferta formativa"
                maxWidth="md"
            >
                <TipoOfertaForm
                    key={tipoAEditar ? tipoAEditar.codigo : 'nuevo'}
                    onClose={cerrarModal}
                    onSaved={handleGuardado}
                    tipoAEditar={tipoAEditar}
                />
            </Modal>
        </AppShell>
    );
}
