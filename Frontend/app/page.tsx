'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SenaLogo } from '@/components/ui/SenaLogo';
import { ErrorApi } from '@/lib/api';
import { guardarSesion, leerUsuario } from '@/lib/sesion';
import { iniciarSesion } from '@/services/auth.service';
import { CodigoTipoDocumento, TIPOS_DOCUMENTO } from '@/types';

export default function LoginPage() {
    const router = useRouter();
    const [tipoDocumento, setTipoDocumento] = useState<CodigoTipoDocumento>(TIPOS_DOCUMENTO[0].codigo);
    const [numeroDocumento, setNumeroDocumento] = useState('');
    const [password, setPassword] = useState('');
    const [touched, setTouched] = useState<{ numeroDocumento?: boolean; password?: boolean }>({});
    const [submitError, setSubmitError] = useState('');
    const [enviando, setEnviando] = useState(false);

    // Si ya hay una sesión abierta, no se vuelve a pedir el login.
    useEffect(() => {
        if (leerUsuario()) router.replace('/dashboard');
    }, [router]);

    const regla = TIPOS_DOCUMENTO.find((t) => t.codigo === tipoDocumento) ?? TIPOS_DOCUMENTO[0];

    const errores = {
        numeroDocumento: !numeroDocumento
            ? 'Ingrese su número de documento.'
            : numeroDocumento.length < regla.min || numeroDocumento.length > regla.max
            ? `El número de documento debe tener entre ${regla.min} y ${regla.max} dígitos.`
            : '',
        password: !password ? 'Ingrese su contraseña.' : '',
    };

    const isFormValido = !errores.numeroDocumento && !errores.password;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ numeroDocumento: true, password: true });
        setSubmitError('');

        if (!isFormValido || enviando) return;

        setEnviando(true);
        try {
            const { accessToken, usuario } = await iniciarSesion({
                tipoDocumento,
                numeroDocumento,
                contrasena: password,
            });
            guardarSesion(accessToken, usuario);
            // replace: el login sale del historial y Atrás no vuelve a él.
            router.replace('/dashboard');
        } catch (error) {
            // Muestra el mensaje del backend: credenciales incorrectas, usuario inactivo, servidor caído...
            setSubmitError(error instanceof ErrorApi ? error.message : 'Ocurrió un error inesperado');
            setEnviando(false);
        }
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
                            <span>{submitError}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Tipo de Documento <span className="text-red-500">*</span>
                            </label>
                            <select
                                value={tipoDocumento}
                                onChange={(e) => setTipoDocumento(e.target.value as CodigoTipoDocumento)}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                            >
                                {TIPOS_DOCUMENTO.map((t) => (
                                    <option key={t.codigo} value={t.codigo}>
                                        {t.nombre}
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
                                maxLength={regla.max}
                                value={numeroDocumento}
                                onChange={(e) => {
                                    setNumeroDocumento(e.target.value.replace(/\D/g, ''));
                                    setSubmitError('');
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
                                    setSubmitError('');
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
                            disabled={enviando}
                            className="w-full rounded-full bg-[#39A900] hover:bg-[#329600] disabled:opacity-60 disabled:cursor-wait text-white text-sm font-semibold px-6 py-2.5 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-[#39A900] focus:ring-offset-2"
                        >
                            {enviando ? 'Ingresando...' : 'Ingresar'}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
}
