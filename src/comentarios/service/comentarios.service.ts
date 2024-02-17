import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comentario } from '../comentario.entity';
import { UpdateComentarioDto } from '../dto/update-comentario.dto';
import { CreateComentarioDto } from '../dto/create-comentario.dto';

@Injectable()
export class ComentariosService {
    constructor(
        @InjectRepository(Comentario) private comentarioService: Repository<Comentario>
    ){}

    async findAll(productId: number){
        return await this.comentarioService.find({where: {id: productId}})
    }

    async findOne(id: number){
        const ComentarioFound = await this.comentarioService.findOne({where: {id}})
        if(!ComentarioFound) return new HttpException('Comentario no encontrado', HttpStatus.CONFLICT)

        return ComentarioFound
    }

    async findAllComentsUser(userId:number){
        return await this.comentarioService.find({where: {idUserComenta: userId}})
    }

    async createComentario(productId: number, newComentario: CreateComentarioDto){
        const comentario = this.comentarioService.create({
            ...newComentario,
            comentarioProducto: { id: productId }
        });

        if(comentario) return this.comentarioService.save(comentario)
    }

    async updateComentario(id: number, update: UpdateComentarioDto ){
        const ComentarioFound = await this.comentarioService.findOne({where: {id}})
        if(!ComentarioFound) return new HttpException('Comentario no encontrado', HttpStatus.CONFLICT)
        return this.comentarioService.update({id}, update)
    }

    async deleteComentario(id: number){
        const deletedComentario = await this.comentarioService.delete({id})
        if(deletedComentario.affected === 0) return  new HttpException('Comentario no eliminado', HttpStatus.CONFLICT)
        return deletedComentario
    }
}
