'use client';

import { AppShell } from '@/components/layout/AppShell';
import { CatalogoParametrizacion } from '@/components/parametrizacion/CatalogoParametrizacion';
import { jornadasService } from '@/services/jornadas.service';

export default function ParametrizacionJornadasPage() {
    return (
        <AppShell
            title="Parametrización - Jornadas de Formación"
            subtitle="Registro, consulta, actualización y activación de las jornadas de formación"
        >
            <CatalogoParametrizacion
                servicio={jornadasService}
                textos={{ singular: 'Jornada', plural: 'Jornadas', femenino: true, placeholder: 'Ej: Diurna' }}
            />
        </AppShell>
    );
}
