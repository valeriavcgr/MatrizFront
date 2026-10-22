import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoOferta } from '../../database/entities/index.js';
import { TiposOfertaController } from './tipos-oferta.controller.js';
import { TiposOfertaService } from './tipos-oferta.service.js';

@Module({
    imports: [TypeOrmModule.forFeature([TipoOferta])],
    controllers: [TiposOfertaController],
    providers: [TiposOfertaService],
})
export class TiposOfertaModule {}
