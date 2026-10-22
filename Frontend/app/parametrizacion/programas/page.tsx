'use client';

import React, { useState, useMemo } from 'react';
import { ProgramaAcademico, TableColumn } from '@/types';
import { AppShell } from '@/components/layout/AppShell';
import { DataTable } from '@/components/ui/DataTable';
import { ProgramaModal } from '@/components/parametrizacion/ProgramaModal';
import { Badge } from '@/components/ui/Badge';

export default function ParametrizacionProgramasPage() {
    const [busqueda, setBusqueda] = useState('');
    const [filtroNivel, setFiltroNivel] = useState<string>('todos');
    const [filtroEstado, setFiltroEstado] = useState<string>('todos');
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    // Estado del modal de programa
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [programaAEditar, setProgramaAEditar] = useState<ProgramaAcademico | null>(null);
    const [notificacion, setNotificacion] = useState<string | null>(null);

    // Lista institucional de programas académicos
    // [BACKEND INTEGRATION]:
    // Endpoint: GET /api/v1/parametrizacion/programas
    // useEffect(() => {
    //   fetch('/api/v1/parametrizacion/programas')
    //     .then(res => res.json())
    //     .then(data => setProgramas(data));
    // }, []);
    const [programas, setProgramas] = useState<ProgramaAcademico[]>([
        {
            id: 'prog-1',
            codigo: 'PROG-001',
            nombre: 'Tecnólogo en Análisis y Desarrollo de Software',
            nivel: 'Tecnólogo',
            duracion: '24 meses',
            estado: 'Activo',
            centro: 'CSF - Servicios Financieros',
            modalidad: 'Presencial',
            cuposDisponibles: 35,
        },
        {
            id: 'prog-2',
            codigo: 'PROG-002',
            nombre: 'Técnico en Programación de Aplicaciones para Dispositivos Móviles',
            nivel: 'Técnico',
            duracion: '12 meses',
            estado: 'Activo',
            centro: 'CSF - Servicios Financieros',
            modalidad: 'Presencial',
            cuposDisponibles: 30,
        },
        {
            id: 'prog-3',
            codigo: 'PROG-003',
            nombre: 'Especialización Tecnológica en Gestión de Bases de Datos NoSQL',
            nivel: 'Especialización Tecnológica',
            duracion: '6 meses',
            estado: 'Activo',
            centro: 'CSF - Servicios Financieros',
            modalidad: 'Virtual',
            cuposDisponibles: 25,
        },
        {
            id: 'prog-4',
            codigo: 'PROG-004',
            nombre: 'Curso Especial en Transformación Digital e Inteligencia de Negocios',
            nivel: 'Curso Especial',
            duracion: '3 meses',
            estado: 'Inactivo',
            centro: 'CSF - Servicios Financieros',
            modalidad: 'Virtual',
            cuposDisponibles: 0,
        },
        {
            id: 'prog-5',
            codigo: 'PROG-005',
            nombre: 'Tecnólogo en Gestión Contable y de Información Financiera',
            nivel: 'Tecnólogo',
            duracion: '24 meses',
            estado: 'Activo',
            centro: 'CSF - Servicios Financieros',
            modalidad: 'Presencial',
            cuposDisponibles: 40,
        },
        {
            id: 'prog-6',
            codigo: 'PROG-006',
            nombre: 'Técnico en Asistencia Administrativa',
            nivel: 'Técnico',
            duracion: '12 meses',
            estado: 'Activo',
            centro: 'CSF - Servicios Financieros',
            modalidad: 'Presencial',
            cuposDisponibles: 35,
        },
    ]);

    // Filtrado en tiempo real
    const programasFiltrados = useMemo(() => {
        return programas.filter((p) => {
            const matchesText =
                p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                p.codigo.toLowerCase().includes(busqueda.toLowerCase()) ||
                p.centro.toLowerCase().includes(busqueda.toLowerCase());

            const matchesNivel = filtroNivel === 'todos' || p.nivel === filtroNivel;
            const matchesEstado = filtroEstado === 'todos' || p.estado === filtroEstado;

            return matchesText && matchesNivel && matchesEstado;
        });
    }, [programas, busqueda, filtroNivel, filtroEstado]);

    // Paginación calculada
    const totalPages = Math.max(1, Math.ceil(programasFiltrados.length / pageSize));
    const paginatedProgramas = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return programasFiltrados.slice(start, start + pageSize);
    }, [programasFiltrados, currentPage, pageSize]);

    // Mostrar notificación
    const triggerNotificacion = (msg: string) => {
        setNotificacion(msg);
        setTimeout(() => setNotificacion(null), 4000);
    };

    // Guardar nuevo o editar programa
    const handleGuardarPrograma = (nuevoData: Omit<ProgramaAcademico, 'id'>) => {
        if (programaAEditar) {
            // [BACKEND INTEGRATION]: PUT /api/v1/parametrizacion/programas/{id}
            setProgramas(
                programas.map((p) =>
                    p.id === programaAEditar.id ? { ...nuevoData, id: p.id } : p
                )
            );
            triggerNotificacion(`Programa ${nuevoData.codigo} actualizado correctamente.`);
        } else {
            // [BACKEND INTEGRATION]: POST /api/v1/parametrizacion/programas
            const nuevo: ProgramaAcademico = {
                ...nuevoData,
                id: `prog-${programas.length + 1}`,
                cuposDisponibles: 30,
            };
            setProgramas([nuevo, ...programas]);
            triggerNotificacion(`Programa ${nuevoData.codigo} registrado exitosamente.`);
        }
        setProgramaAEditar(null);
    };

    // Alternar estado de un programa
    const handleToggleEstado = (id: string) => {
        // [BACKEND INTEGRATION]: PATCH /api/v1/parametrizacion/programas/{id}/estado
        setProgramas(
            programas.map((p) => {
                if (p.id === id) {
                    const nuevoEstado = p.estado === 'Activo' ? 'Inactivo' : 'Activo';
                    triggerNotificacion(`Estado de ${p.codigo} actualizado a: ${nuevoEstado}`);
                    return { ...p, estado: nuevoEstado };
                }
                return p;
            })
        );
    };

    // Columnas de la tabla
    const columns: TableColumn<ProgramaAcademico>[] = [
        {
            key: 'codigo',
            header: 'Código',
            align: 'center',
            headerClassName: 'w-28',
            render: (item) => (
                <span className="font-mono text-xs font-bold text-[#00324D] bg-slate-100 px-2 py-1 rounded-md">
                    {item.codigo}
                </span>
            ),
        },
        {
            key: 'nombre',
            header: 'Nombre del Programa',
            render: (item) => (
                <div>
                    <div className="font-semibold text-slate-900 leading-tight">{item.nombre}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                        <span>Modalidad: {item.modalidad || 'Presencial'}</span>
                        <span>&bull;</span>
                        <span>Cupos: {item.cuposDisponibles || 0}</span>
                    </div>
                </div>
            ),
        },
        {
            key: 'nivel',
            header: 'Nivel Formación',
            align: 'center',
            headerClassName: 'w-36',
            render: (item) => (
                <Badge
                    variant={
                        item.nivel === 'Tecnólogo'
                            ? 'sena'
                            : item.nivel === 'Técnico'
                            ? 'info'
                            : 'neutral'
                    }
                    size="sm"
                >
                    {item.nivel}
                </Badge>
            ),
        },
        {
            key: 'duracion',
            header: 'Duración',
            align: 'center',
            headerClassName: 'w-28',
            render: (item) => (
                <span className="text-xs text-slate-700 font-medium">{item.duracion}</span>
            ),
        },
        {
            key: 'estado',
            header: 'Estado',
            align: 'center',
            headerClassName: 'w-28',
            render: (item) => (
                <Badge
                    variant={item.estado === 'Activo' ? 'success' : 'danger'}
                    size="sm"
                    dot
                >
                    {item.estado}
                </Badge>
            ),
        },
        {
            key: 'centro',
            header: 'Linea Modular',
            headerClassName: 'w-44',
            render: (item) => (
                <span className="text-xs text-slate-600 truncate block">{item.centro}</span>
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
                            setProgramaAEditar(item);
                            setIsModalOpen(true);
                        }}
                        className="p-1.5 text-slate-500 hover:text-[#00324D] hover:bg-slate-100 rounded-lg transition"
                        title="Editar programa"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => handleToggleEstado(item.id)}
                        className={`p-1.5 rounded-lg transition ${
                            item.estado === 'Activo'
                                ? 'text-amber-600 hover:bg-amber-50'
                                : 'text-[#39A900] hover:bg-green-50'
                        }`}
                        title={item.estado === 'Activo' ? 'Inactivar programa' : 'Activar programa'}
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
            title="Parametrización - Programas Académicos"
            subtitle="Administración del catálogo de programas para conformación de la oferta formativa"
            initialRole="ADMINISTRADOR"
        >
            {/* Banner de notificación */}
            {notificacion && (
                <div
                    className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 text-sm font-medium flex items-center justify-between shadow-xs animate-fade-in"
                    role="alert"
                >
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>{notificacion}</span>
                    </div>
                    <button
                        type="button"
                        onClick={() => setNotificacion(null)}
                        className="text-xs font-bold hover:underline"
                    >
                        Cerrar
                    </button>
                </div>
            )}

            {/* Barra de herramientas y filtros */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Botón Nuevo Programa */}
                    <button
                        type="button"
                        onClick={() => {
                            setProgramaAEditar(null);
                            setIsModalOpen(true);
                        }}
                        className="inline-flex items-center justify-center gap-2 bg-[#39A900] hover:bg-[#329600] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition shadow-xs focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:ring-offset-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Nuevo Programa
                    </button>

                    {/* Barra de Búsqueda */}
                    <div className="relative w-full md:w-80">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar por nombre, código o centro..."
                            value={busqueda}
                            onChange={(e) => {
                                setBusqueda(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-300 text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#39A900] transition"
                        />
                        {busqueda && (
                            <button
                                type="button"
                                onClick={() => setBusqueda('')}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                            >
                                <span className="text-xs">&times;</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Filtros secundarios */}
                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100 text-xs">
                    <span className="font-semibold text-slate-600">Filtrar por:</span>

                    {/* Nivel */}
                    <select
                        value={filtroNivel}
                        onChange={(e) => {
                            setFiltroNivel(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 outline-none focus:ring-1 focus:ring-[#39A900]"
                    >
                        <option value="todos">Todos los Niveles</option>
                        <option value="Tecnólogo">Tecnólogo</option>
                        <option value="Técnico">Técnico</option>
                        <option value="Especialización Tecnológica">Especialización</option>
                        <option value="Curso Especial">Curso Especial</option>
                    </select>

                    {/* Estado */}
                    <select
                        value={filtroEstado}
                        onChange={(e) => {
                            setFiltroEstado(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 outline-none focus:ring-1 focus:ring-[#39A900]"
                    >
                        <option value="todos">Todos los Estados</option>
                        <option value="Activo">Activos</option>
                        <option value="Inactivo">Inactivos</option>
                    </select>

                    {(busqueda || filtroNivel !== 'todos' || filtroEstado !== 'todos') && (
                        <button
                            type="button"
                            onClick={() => {
                                setBusqueda('');
                                setFiltroNivel('todos');
                                setFiltroEstado('todos');
                                setCurrentPage(1);
                            }}
                            className="text-red-600 hover:underline font-medium ml-auto"
                        >
                            Limpiar filtros
                        </button>
                    )}
                </div>
            </div>

            {/* Tabla de Programas */}
            <DataTable<ProgramaAcademico>
                data={paginatedProgramas}
                columns={columns}
                keyExtractor={(item) => item.id}
                emptyTitle="No se encontraron programas académicos"
                emptyDescription={
                    busqueda || filtroNivel !== 'todos' || filtroEstado !== 'todos'
                        ? 'No hay programas que coincidan con los criterios de búsqueda o filtros seleccionados.'
                        : 'No hay programas académicos registrados en el catálogo institucional.'
                }
                emptyActionLabel={
                    busqueda || filtroNivel !== 'todos' || filtroEstado !== 'todos'
                        ? 'Restablecer Filtros'
                        : 'Crear Primer Programa'
                }
                onEmptyAction={() => {
                    if (busqueda || filtroNivel !== 'todos' || filtroEstado !== 'todos') {
                        setBusqueda('');
                        setFiltroNivel('todos');
                        setFiltroEstado('todos');
                    } else {
                        setIsModalOpen(true);
                    }
                }}
                pagination={{
                    currentPage,
                    totalPages,
                    totalItems: programasFiltrados.length,
                    pageSize,
                    onPageChange: setCurrentPage,
                }}
            />

            {/* Modal para Crear / Editar Programa */}
            <ProgramaModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setProgramaAEditar(null);
                }}
                onSave={handleGuardarPrograma}
                programaAEditar={programaAEditar}
            />
        </AppShell>
    );
}