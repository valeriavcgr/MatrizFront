import { Module } from '@nestjs/common';
import { JornadasModule } from './jornadas/jornadas.module.js';
import { ModalidadesModule } from './modalidades/modalidades.module.js';
import { TiposOfertaModule } from './tipos-oferta/tipos-oferta.module.js';

/**
 * Dominio Programas de Formación: catálogos de parametrización
 * (tipos de oferta, modalidades, jornadas), programas y centros.
 * Cada submódulo nuevo se agrega aquí, no en AppModule.
 */
@Module({
    imports: [TiposOfertaModule, ModalidadesModule, JornadasModule],
})
export class ProgramasFormacionModule {}
