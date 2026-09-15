'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SenaLogo } from '@/components/ui/SenaLogo';
import { UserProfile } from '@/types';

interface MockCredential {
    email: string;
    password: string;
    perfil: UserProfile;
}

const CREDENCIALES_PRUEBA: MockCredential[] = [
    {
        email: 'admin@sena.edu.co',
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
        email: 'planeacion@sena.edu.co',
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
        email: 'subdirector@sena.edu.co',
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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
    const [submitError, setSubmitError] = useState(false);

    const errores = {
        email: !email
            ? 'Ingrese su correo institucional.'
            : !EMAIL_REGEX.test(email)
            ? 'Ingrese un correo electrónico válido.'
            : '',
        password: !password ? 'Ingrese su contraseña.' : '',
    };

    const isFormValido = !errores.email && !errores.password;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ email: true, password: true });
        setSubmitError(false);

        if (!isFormValido) return;

        // [BACKEND INTEGRATION]:
        // Endpoint: POST /api/v1/auth/login
        // Payload: { email, password }
        const match = CREDENCIALES_PRUEBA.find(
            (c) => c.email.toLowerCase() === email.trim().toLowerCase() && c.password === password
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
                            <span>Credenciales inválidas. Verifique su correo y contraseña.</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                                Correo Institucional <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setSubmitError(false);
                                }}
                                onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                                placeholder="nombre@sena.edu.co"
                                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white transition focus:outline-none focus:ring-2 focus:ring-[#39A900] ${
                                    touched.email && errores.email ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                                }`}
                            />
                            {touched.email && errores.email && (
                                <p className="text-xs text-red-600 mt-1">{errores.email}</p>
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
