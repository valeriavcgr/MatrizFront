'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SenaLogo } from '@/components/ui/SenaLogo';
import { UserProfile } from '@/types';

type TipoDocumento =
    | 'Cédula de ciudadanía'
    | 'Tarjeta de identidad'
    | 'Cédula de extranjería'
    | 'PEP'
    | 'Permiso de protección temporal';

const TIPOS_DOCUMENTO: TipoDocumento[] = [
    'Cédula de ciudadanía',
    'Tarjeta de identidad',
    'Cédula de extranjería',
    'PEP',
    'Permiso de protección temporal',
];

interface MockCredential {
    tipoDocumento: TipoDocumento;
    numeroDocumento: string;
    password: string;
    perfil: UserProfile;
}

const CREDENCIALES_PRUEBA: MockCredential[] = [
    {
        tipoDocumento: 'Cédula de ciudadanía',
        numeroDocumento: '123456789',
        password: 'Sena2026*',
        perfil: {
            id: 'user-admin',
            nombre: 'Carlos Mendoza R.',
            cargo: 'Administrador del Sistema',
            rol: 'ADMINISTRADOR',
            centro: 'CSF - Centro de Servicios Financieros',
            regional: 'Regional Distrito Capital',
            correo: 'admin@sena.edu.co',
            iniciales: 'AD',
        },
    },
    {
        tipoDocumento: 'Cédula de ciudadanía',
        numeroDocumento: '123456789',
        password: 'Sena2026*',
        perfil: {
            id: 'user-planeacion',
            nombre: 'Valeria Carrillo G.',
            cargo: 'Líder de Planeación Regional',
            rol: 'LIDER_PLANEACION',
            centro: 'CSF - Centro de Servicios Financieros',
            regional: 'Regional Distrito Capital',
            correo: 'planeacion@sena.edu.co',
            iniciales: 'LP',
        },
    },
    {
        tipoDocumento: 'Cédula de ciudadanía',
        numeroDocumento: '123456789',
        password: 'Sena2026*',
        perfil: {
            id: 'user-subdirector',
            nombre: 'Dr. Hernán Torres V.',
            cargo: 'Subdirector de Centro CSF',
            rol: 'SUBDIRECTOR',
            centro: 'CSF - Centro de Servicios Financieros',
            regional: 'Regional Distrito Capital',
            correo: 'subdirector@sena.edu.co',
            iniciales: 'SD',
        },
    },
];

const DOCUMENTO_REGEX = /^\d{9,12}$/;

export default function LoginPage() {
    const router = useRouter();
    const [tipoDocumento, setTipoDocumento] = useState<TipoDocumento>(TIPOS_DOCUMENTO[0]);
    const [numeroDocumento, setNumeroDocumento] = useState('');
    const [password, setPassword] = useState('');
    const [touched, setTouched] = useState<{ numeroDocumento?: boolean; password?: boolean }>({});
    const [submitError, setSubmitError] = useState(false);

    const errores = {
        numeroDocumento: !numeroDocumento
            ? 'Ingrese su número de documento.'
            : !DOCUMENTO_REGEX.test(numeroDocumento)
            ? 'El número de documento debe tener mínimo 9 dígitos.'
            : '',
        password: !password ? 'Ingrese su contraseña.' : '',
    };

    const isFormValido = !errores.numeroDocumento && !errores.password;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ numeroDocumento: true, password: true });
        setSubmitError(false);

        if (!isFormValido) return;

        // [BACKEND INTEGRATION]:
        // Endpoint: POST /api/v1/auth/login
        // Payload: { tipoDocumento, numeroDocumento, password }
        const match = CREDENCIALES_PRUEBA.find(
            (c) =>
                c.tipoDocumento === tipoDocumento &&
                c.numeroDocumento === numeroDocumento.trim() &&
                c.password === password
        );

        if (!match) {
            setSubmitError(true);
            return;
        }

        if (typeof window !== 'undefined') {
            window.localStorage.setItem('sena-matriz-active-role', match.perfil.rol);
        }

        router.push('/dashboard');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-sm">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8">
                    <div className="mb-6 flex justify-center">
                        <SenaLogo variant="full" className="h-24 w-auto" />
                    </div>


                    {submitError && (
                        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs text-red-700 flex items-start gap-2">
                            <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                />
                            </svg>
                            <span>Credenciales inválidas. Verifique su tipo y número de documento y contraseña.</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Tipo de Documento <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={tipoDocumento}
                                onChange={(e) => setTipoDocumento(e.target.value as TipoDocumento)}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                            >
                                {TIPOS_DOCUMENTO.map((t) => (
                                    <option key={t} value={t}>
                                        {t}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Número de Documento <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={15}
                                value={numeroDocumento}
                                onChange={(e) => {
                                    setNumeroDocumento(e.target.value.replace(/\D/g, ''));
                                    setSubmitError(false);
                                }}
                                onBlur={() => setTouched((prev) => ({ ...prev, numeroDocumento: true }))}
                                placeholder="Ej: 1000123456"
                                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900] ${
                                    touched.numeroDocumento && errores.numeroDocumento
                                        ? 'border-red-400 bg-red-50/20'
                                        : 'border-slate-300'
                                }`}
                            />
                            {touched.numeroDocumento && errores.numeroDocumento && (
                                <p className="text-xs text-red-600 mt-1">{errores.numeroDocumento}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Contraseña <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setSubmitError(false);
                                }}
                                onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
                                placeholder="••••••••"
                                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900] ${
                                    touched.password && errores.password ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                                }`}
                            />
                            {touched.password && errores.password && (
                                <p className="text-xs text-red-600 mt-1">{errores.password}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-full bg-[#39A900] hover:bg-[#329600] text-white text-sm font-semibold px-6 py-2.5 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:ring-offset-2"
                        >
                            Ingresar
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
}
