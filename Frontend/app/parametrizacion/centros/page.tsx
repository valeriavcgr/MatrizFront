'use client';

import React, { useState, useMemo } from 'react';
import { CentroFormacion, TableColumn } from '@/types';
import { AppShell } from '@/components/layout/AppShell';
import { DataTable } from '@/components/ui/DataTable';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';

interface CentroFormProps {
    onClose: () => void;
    onSave: (centro: Omit<CentroFormacion, 'id'>) => void;
    centroAEditar?: CentroFormacion | null;
}

const CentroForm: React.FC<CentroFormProps> = ({
    onClose,
    onSave,
    centroAEditar,
}) => {
    const [codigo, setCodigo] = useState(centroAEditar ? centroAEditar.codigo : '');
    const [nombre, setNombre] = useState(centroAEditar ? centroAEditar.nombre : '');
    const [regional, setRegional] = useState(centroAEditar ? centroAEditar.regional : 'Distrito Capital');
    const [subdirector, setSubdirector] = useState(centroAEditar ? centroAEditar.subdirector : '');
    const [municipio, setMunicipio] = useState(centroAEditar?.municipio || 'Bogotá D.C.');
    const [sedes, setSedes] = useState(centroAEditar?.sedes ? centroAEditar.sedes.toString() : '2');
    const [estado, setEstado] = useState<'Activo' | 'Inactivo'>(centroAEditar?.estado || 'Activo');
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

    const errores = {
        codigo: !codigo.trim() ? 'El código del centro es obligatorio.' : '',
        nombre: nombre.trim().length < 5 ? 'El nombre del centro debe contener al menos 5 caracteres.' : '',
        subdirector: !subdirector.trim() ? 'El nombre del subdirector es obligatorio.' : '',
    };

    const isValido = !errores.codigo && !errores.nombre && !errores.subdirector;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ codigo: true, nombre: true, subdirector: true });

        if (!isValido) return;

        // [BACKEND INTEGRATION]: POST /api/v1/parametrizacion/centros
        onSave({
            codigo: codigo.trim().toUpperCase(),
            nombre: nombre.trim(),
            regional,
            subdirector: subdirector.trim(),
            municipio,
            sedes: Number(sedes) || 1,
            estado,
        });

        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Código del Centro <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: CSF"
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

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Regional SENA <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={regional}
                        onChange={(e) => setRegional(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    >
                        <option value="Distrito Capital">Distrito Capital</option>
                        <option value="Antioquia">Antioquia</option>
                        <option value="Valle del Cauca">Valle del Cauca</option>
                        <option value="Santander">Santander</option>
                        <option value="Atlántico">Atlántico</option>
                        <option value="Cundinamarca">Cundinamarca</option>
                        <option value="Cauca">Cauca</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Nombre del Centro de Formación <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Ej: Centro de Servicios Financieros"
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Subdirector(a) Responsable <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: Dr. Hernán Torres V."
                        value={subdirector}
                        onChange={(e) => {
                            setSubdirector(e.target.value);
                            setTouched((prev) => ({ ...prev, subdirector: true }));
                        }}
                        className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900] ${
                            touched.subdirector && errores.subdirector ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                        }`}
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Municipio Sede Principal
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: Bogotá D.C."
                        value={municipio}
                        onChange={(e) => setMunicipio(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Número de Sedes Físicas
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="20"
                        value={sedes}
                        onChange={(e) => setSedes(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Estado Institucional
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
                    {centroAEditar ? 'Guardar Cambios' : 'Registrar Centro'}
                </button>
            </div>
        </form>
    );
};

export default function ParametrizacionCentrosPage() {
    const [busqueda, setBusqueda] = useState('');
    const [filtroRegional, setFiltroRegional] = useState<string>('todas');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [centroAEditar, setCentroAEditar] = useState<CentroFormacion | null>(null);
    const [notificacion, setNotificacion] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    // [BACKEND INTEGRATION]: GET /api/v1/parametrizacion/centros
    const [centros, setCentros] = useState<CentroFormacion[]>([
        {
            id: 'cen-01',
            codigo: 'CSF',
            nombre: 'Centro de Servicios Financieros',
            regional: 'Distrito Capital',
            subdirector: 'Dr. Hernán Torres V.',
            municipio: 'Bogotá D.C.',
            sedes: 3,
            estado: 'Activo',
        },
        {
            id: 'cen-02',
            codigo: 'CBA',
            nombre: 'Centro de Biotecnología Agropecuaria',
            regional: 'Cundinamarca',
            subdirector: 'Ing. Martha Lucía Peña',
            municipio: 'Mosquera',
            sedes: 2,
            estado: 'Activo',
        },
        {
            id: 'cen-03',
            codigo: 'CTPI',
            nombre: 'Centro de Teleinformática y Producción Industrial',
            regional: 'Cauca',
            subdirector: 'Dra. Sandra Milena Gómez',
            municipio: 'Popayán',
            sedes: 2,
            estado: 'Activo',
        },
        {
            id: 'cen-04',
            codigo: 'CMM',
            nombre: 'Centro de Materiales y Ensayos',
            regional: 'Distrito Capital',
            subdirector: 'Ing. Roberto Andrade C.',
            municipio: 'Bogotá D.C.',
            sedes: 1,
            estado: 'Activo',
        },
        {
            id: 'cen-05',
            codigo: 'CIM',
            nombre: 'Centro de Industria y Construcción',
            regional: 'Antioquia',
            subdirector: 'Dr. Jaime Alberto Gil',
            municipio: 'Medellín',
            sedes: 4,
            estado: 'Activo',
        },
    ]);

    const centrosFiltrados = useMemo(() => {
        return centros.filter((c) => {
            const matchesText =
                c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                c.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
                c.subdirector.toLowerCase().includes(busqueda.toLowerCase()) ||
                (c.municipio && c.municipio.toLowerCase().includes(busqueda.toLowerCase()));

            const matchesRegional = filtroRegional === 'todas' || c.regional === filtroRegional;

            return matchesText && matchesRegional;
        });
    }, [centros, busqueda, filtroRegional]);

    const totalPages = Math.max(1, Math.ceil(centrosFiltrados.length / pageSize));
    const paginatedCentros = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return centrosFiltrados.slice(start, start + pageSize);
    }, [centrosFiltrados, currentPage, pageSize]);

    const triggerNotificacion = (msg: string) => {
        setNotificacion(msg);
        setTimeout(() => setNotificacion(null), 4000);
    };

    const handleGuardarCentro = (data: Omit<CentroFormacion, 'id'>) => {
        if (centroAEditar) {
            // [BACKEND INTEGRATION]: PUT /api/v1/parametrizacion/centros/{id}
            setCentros(centros.map((c) => (c.id === centroAEditar.id ? { ...data, id: c.id } : c)));
            triggerNotificacion(`Centro ${data.codigo} actualizado con éxito.`);
        } else {
            // [BACKEND INTEGRATION]: POST /api/v1/parametrizacion/centros
            const nuevo: CentroFormacion = {
                ...data,
                id: `cen-0${centros.length + 1}`,
            };
            setCentros([nuevo, ...centros]);
            triggerNotificacion(`Centro ${data.codigo} registrado exitosamente.`);
        }
        setCentroAEditar(null);
    };

    const handleToggleEstado = (id: string) => {
        setCentros(
            centros.map((c) => {
                if (c.id === id) {
                    const nuevoEstado = c.estado === 'Activo' ? 'Inactivo' : 'Activo';
                    triggerNotificacion(`Centro ${c.codigo} marcado como: ${nuevoEstado}`);
                    return { ...c, estado: nuevoEstado };
                }
                return c;
            })
        );
    };

    const columns: TableColumn<CentroFormacion>[] = [
        {
            key: 'codigo',
            header: 'Sigla',
            align: 'center',
            headerClassName: 'w-32',
            render: (item) => (
                <span className="font-mono text-xs font-bold text-[#00324D] bg-slate-100 px-2.5 py-1 rounded-md">
                    {item.codigo}
                </span>
            ),
        },
        {
            key: 'nombre',
            header: 'Centro de Formación',
            render: (item) => (
                <div>
                    <div className="font-semibold text-slate-900 leading-tight">{item.nombre}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                        {item.municipio || 'Sede Regional'} &bull; {item.sedes || 1} Sedes
                    </div>
                </div>
            ),
        },
        {
            key: 'regional',
            header: 'Regional',
            align: 'center',
            headerClassName: 'w-40',
            render: (item) => (
                <Badge variant="info" size="sm">
                    {item.regional}
                </Badge>
            ),
        },
        {
            key: 'subdirector',
            header: 'Subdirector(a) Responsable',
            headerClassName: 'w-52',
            render: (item) => (
                <span className="text-xs font-medium text-slate-700">{item.subdirector}</span>
            ),
        },
        {
            key: 'estado',
            header: 'Estado',
            align: 'center',
            headerClassName: 'w-28',
            render: (item) => (
                <Badge variant={item.estado === 'Activo' ? 'success' : 'danger'} size="sm" dot>
                    {item.estado || 'Activo'}
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
                            setCentroAEditar(item);
                            setIsModalOpen(true);
                        }}
                        className="p-1.5 text-slate-500 hover:text-[#00324D] hover:bg-slate-100 rounded-lg transition"
                        title="Editar centro"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleToggleEstado(item.id)}
                        className={`p-1.5 rounded-lg transition ${
                            item.estado === 'Activo' ? 'text-amber-600 hover:bg-amber-50' : 'text-[#39A900] hover:bg-green-50'
                        }`}
                        title={item.estado === 'Activo' ? 'Inactivar centro' : 'Activar centro'}
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
            title="Parametrización - Centros de Formación"
            subtitle="Gestión y registro de centros de formación y subdirecciones regionales SENA"
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

            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <button
                        type="button"
                        onClick={() => {
                            setCentroAEditar(null);
                            setIsModalOpen(true);
                        }}
                        className="inline-flex items-center justify-center gap-2 bg-[#39A900] hover:bg-[#329600] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition shadow-xs focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Nuevo Centro de Formación
                    </button>

                    <div className="relative w-full md:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar por centro, código o subdirector..."
                            value={busqueda}
                            onChange={(e) => {
                                setBusqueda(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-300 text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#39A900] transition"
                        />
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 text-xs">
                    <span className="font-semibold text-slate-600">Filtrar por Regional:</span>
                    <select
                        value={filtroRegional}
                        onChange={(e) => {
                            setFiltroRegional(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 outline-none focus:ring-1 focus:ring-[#39A900]"
                    >
                        <option value="todas">Todas las Regionales</option>
                        <option value="Distrito Capital">Distrito Capital</option>
                        <option value="Antioquia">Antioquia</option>
                        <option value="Valle del Cauca">Valle del Cauca</option>
                        <option value="Santander">Santander</option>
                        <option value="Cundinamarca">Cundinamarca</option>
                        <option value="Cauca">Cauca</option>
                    </select>

                    {(busqueda || filtroRegional !== 'todas') && (
                        <button
                            type="button"
                            onClick={() => {
                                setBusqueda('');
                                setFiltroRegional('todas');
                                setCurrentPage(1);
                            }}
                            className="text-red-600 hover:underline font-medium ml-auto"
                        >
                            Limpiar filtros
                        </button>
                    )}
                </div>
            </div>

            <DataTable<CentroFormacion>
                data={paginatedCentros}
                columns={columns}
                keyExtractor={(item) => item.id}
                emptyTitle="No se encontraron centros de formación"
                emptyDescription="No hay centros que coincidan con la búsqueda o filtro seleccionado."
                emptyActionLabel="Restablecer Filtros"
                onEmptyAction={() => {
                    setBusqueda('');
                    setFiltroRegional('todas');
                }}
                pagination={{
                    currentPage,
                    totalPages,
                    totalItems: centrosFiltrados.length,
                    pageSize,
                    onPageChange: setCurrentPage,
                }}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setCentroAEditar(null);
                }}
                title={centroAEditar ? 'Editar Centro de Formación' : 'Nuevo Centro de Formación'}
                subtitle="Configuración territorial y dependencias regionales del SENA"
                maxWidth="lg"
            >
                <CentroForm
                    key={centroAEditar ? centroAEditar.id : 'nuevo'}
                    onClose={() => {
                        setIsModalOpen(false);
                        setCentroAEditar(null);
                    }}
                    onSave={handleGuardarCentro}
                    centroAEditar={centroAEditar}
                />
            </Modal>
        </AppShell>
    );
}
