/**
 * Sistema de Tipos e Interfaces - Plataforma SENA Matriz
 * Definición estricta de modelos de datos del dominio institucional
 */

import React from 'react';

/**
 * Listado oficial de variables de análisis del Plan de Gobierno Institucional
 */
export const VARIABLES_PLAN_GOBIERNO = [
    'Construir sobre lo Construido',
    'Economía Campesina - CampeSena',
    'Economía Popular - Full Popular',
    'Justicia Climática',
    'El Cambio es con las Mujeres',
    'Empleabilidad',
    'Empresarismo',
    'Plan Tecnológico',
    'Disponibilidad de Ambientes',
    'Oferta Especial Empresarial',
    'Proyectos de Inversión',
    'Convenios',
    'Demanda Social',
    'Contrato de Aprendizaje',
    'Permanencia en la Formación',
    'Relación - Matriculado Certificado',
    'Worldskills',
    'Costos',
] as const;

export type VariablePlanGobierno = (typeof VARIABLES_PLAN_GOBIERNO)[number];

/**
 * Criterio de priorización asignado a una matriz formativa
 */
export interface CriterioPriorizacion {
    id: string;
    criterio: VariablePlanGobierno;
    peso: number; // Porcentaje numérico (0 - 100)
    justificacion: string;
    soporte: string;
    valor: number;
    fechaCreacion?: string;
}

/**
 * Estados posibles de una matriz de priorización
 */
export type EstadoMatriz = 'Borrador' | 'En Revisión' | 'Aprobada' | 'Rechazada';

/**
 * Matriz de priorización de programas de formación
 */
export interface MatrizPriorizacion {
    id: string;
    codigo: string;
    programaId: string;
    programaNombre: string;
    vigencia: number;
    centroFormacion: string;
    regional: string;
    estado: EstadoMatriz;
    criterios: CriterioPriorizacion[];
    pesoTotal: number;
    cuotas: number;
    fechaCreacion: string;
    fechaActualizacion: string;
    responsable: string;
    modalidad?: string[];
    jornada?: string[];
    tipoOferta?: string[];
}

/**
 * Niveles de formación académica ofrecidos por el SENA
 */
export type NivelFormacion =
    | 'Tecnólogo'
    | 'Técnico'
    | 'Especialización Tecnológica'
    | 'Operario'
    | 'Auxiliar'
    | 'Curso Especial';

/**
 * Estados de un programa académico
 */
export type EstadoPrograma = 'Activo' | 'Inactivo' | 'En Actualización';

/**
 * Programa académico parametrizado en la institución
 */
export interface ProgramaAcademico {
    id: string;
    codigo: string;
    nombre: string;
    nivel: NivelFormacion;
    duracion: string;
    estado: EstadoPrograma;
    centro: string;
    modalidad?: 'Presencial' | 'Virtual' | 'A Distancia' | 'Mixta';
    cuposDisponibles?: number;
    fechaRegistro?: string;
}

/**
 * Centro de Formación del SENA
 */
export interface CentroFormacion {
    id: string;
    codigo: string;
    nombre: string;
    regional: string;
    subdirector: string;
    municipio?: string;
    sedes?: number;
    estado?: 'Activo' | 'Inactivo';
}

/**
 * Modalidad de Formación (tabla `modalidad`).
 */
export type Modalidad = ItemCatalogo;

/**
 * Jornada de Formación (tabla `jornadas`).
 */
export type Jornada = ItemCatalogo;

/**
 * Registro de un catálogo simple de parametrización (tipos de oferta,
 * modalidades, jornadas). El código lo asigna la BD; no se borran,
 * se activan / desactivan.
 */
export interface ItemCatalogo {
    codigo: number;
    nombre: string;
    estado: boolean;
}

/**
 * Tipo de Oferta de Formación (tabla `tipo_oferta`).
 */
export type TipoOferta = ItemCatalogo;

/**
 * Roles de usuario en el sistema SENA Matriz
 */
export type UserRole = 'ADMINISTRADOR' | 'LIDER_PLANEACION' | 'SUBDIRECTOR';

/**
 * Tipos de documento con los que se puede iniciar sesión (tabla `tipo_documento`).
 * La longitud debe coincidir con REGLAS_DOCUMENTO del backend (common/validators/reglas.ts).
 */
export const TIPOS_DOCUMENTO = [
    { codigo: 'CC', nombre: 'Cédula de ciudadanía', min: 7, max: 10 },
    { codigo: 'CE', nombre: 'Cédula de extranjería', min: 6, max: 10 },
] as const;

export type CodigoTipoDocumento = (typeof TIPOS_DOCUMENTO)[number]['codigo'];

/**
 * Datos que envía el formulario de login a POST /auth/login
 */
export interface CredencialesLogin {
    tipoDocumento: CodigoTipoDocumento;
    numeroDocumento: string;
    contrasena: string;
}

/**
 * Usuario autenticado tal como lo devuelve el backend
 */
export interface UsuarioSesion {
    tipoDocumento: string;
    numeroDocumento: string;
    nombres: string;
    apellidos: string;
    correo: string;
    rol: UserRole;
}

/**
 * Respuesta de POST /auth/login
 */
export interface RespuestaLogin {
    accessToken: string;
    usuario: UsuarioSesion;
}

/**
 * Perfil del usuario autenticado
 */
export interface UserProfile {
    id: string;
    nombre: string;
    cargo: string;
    rol: UserRole;
    centro: string;
    regional: string;
    correo: string;
    iniciales: string;
}

/**
 * Definición de columnas para la tabla de datos genérica
 */
export interface TableColumn<T> {
    key: string;
    header: string;
    className?: string;
    headerClassName?: string;
    align?: 'left' | 'center' | 'right';
    render?: (item: T, index: number) => React.ReactNode;
}

/**
 * Reporte institucional disponible en el sistema
 */
export interface ReporteItem {
    id: string;
    titulo: string;
    descripcion: string;
    categoria: 'Matrices' | 'Vigencias' | 'Centros' | 'Cupos' | 'Gobierno';
    formatosDisponibles: ('PDF' | 'EXCEL' | 'CSV')[];
    ultimaGeneracion?: string;
    estado: 'Disponible' | 'Generando' | 'Requiere Actualización';
}

/**
 * Filtros de búsqueda para reportes
 */
export interface ReporteFiltros {
    vigencia?: number;
    centroId?: string;
    regional?: string;
    estadoMatriz?: EstadoMatriz;
}
