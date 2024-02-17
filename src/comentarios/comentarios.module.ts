import { Module } from '@nestjs/common';
import { ComentariosController } from './controller/comentarios.controller';
import { ComentariosService } from './service/comentarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comentario } from './comentario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comentario])],
  controllers: [ComentariosController],
  providers: [ComentariosService]
})
export class ComentariosModule {}
