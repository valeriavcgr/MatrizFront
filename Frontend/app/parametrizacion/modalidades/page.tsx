'use client';

import { AppShell } from '@/components/layout/AppShell';
import { CatalogoParametrizacion } from '@/components/parametrizacion/CatalogoParametrizacion';
import { modalidadesService } from '@/services/modalidades.service';

export default function ParametrizacionModalidadesPage() {
    return (
        <AppShell
            title="Parametrización - Modalidades de Formación"
            subtitle="Registro, consulta, actualización y activación de las modalidades de formación"
        >
            <CatalogoParametrizacion
                servicio={modalidadesService}
                textos={{ singular: 'Modalidad', plural: 'Modalidades', femenino: true, placeholder: 'Ej: Presencial' }}
            />
        </AppShell>
    );
}
