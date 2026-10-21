import { redirect } from 'next/navigation';

/**
 * Redirección automática de /parametrizacion a la primera sub-ruta activa: /parametrizacion/programas
 */
export default function ParametrizacionIndexPage() {
    redirect('/parametrizacion/programas');
}
