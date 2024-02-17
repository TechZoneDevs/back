import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ComentariosService } from '../service/comentarios.service';
import { CreateComentarioDto } from '../dto/create-comentario.dto';
import { UpdateComentarioDto } from '../dto/update-comentario.dto';

@Controller('comentarios:productId')
export class ComentariosController {
    constructor(private comentarioService: ComentariosService){}

    @Get()
    findComentarios(@Param('productId') productId:string){
        return this.comentarioService.findAll(+productId)
    }

    @Post()
    createComentario(@Param('productId') productId: string ,@Body() comentario: CreateComentarioDto){
        return this.comentarioService.createComentario( +productId, comentario)
    }

    @Get(':userId')
    findAllComentarios(@Param('userId') userId: string){
        return this.comentarioService.findAllComentsUser(+userId)
    }

    @Get(':id')
    findComentario(@Param('id') id:string){
        return this.comentarioService.findOne(+id)
    }

    @Delete(':id')
    deletedComentario(@Param('id') id:string){
        return this.comentarioService.deleteComentario(+id)
    }

    @Patch(':id')
    updateComentario(@Param('id') id: string, @Body() update: UpdateComentarioDto){
        return this.comentarioService.updateComentario(+id, update)
    }
}
