'use client';

import { AppShell } from '@/components/layout/AppShell';
import { CatalogoParametrizacion } from '@/components/parametrizacion/CatalogoParametrizacion';
import { tiposOfertaService } from '@/services/tipos-oferta.service';

export default function ParametrizacionTiposOfertaPage() {
    return (
        <AppShell
            title="Parametrización - Tipos de Oferta"
            subtitle="Registro, consulta, actualización y activación de los tipos de oferta formativa"
        >
            <CatalogoParametrizacion
                servicio={tiposOfertaService}
                textos={{ singular: 'Tipo de Oferta', plural: 'Tipos de Oferta', placeholder: 'Ej: Oferta Abierta' }}
            />
        </AppShell>
    );
}
