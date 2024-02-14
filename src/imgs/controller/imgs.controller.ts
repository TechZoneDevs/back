import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ImgsService } from '../service/imgs.service';
import { CreateimgDto } from '../dto/create-img.dto';
import { UpdateImgDto } from '../dto/update-img.dto';

@Controller('imgs')
export class ImgsController {
    constructor(private imgServices: ImgsService){}

    @Get()
    findProducts(){
        return this.imgServices.findAll()
    }

    @Post()
    createProduct(@Body() newImg: CreateimgDto){
        return this.imgServices.createimg(newImg)
    }

    @Get(':id')
    findProduct(@Param('id') id:string){
        return this.imgServices.findOne(+id)
    }

    @Delete(':id')
    deletedProduct(@Param('id') id:string){
        return this.imgServices.deleteimg(+id)
    }

    @Patch(':id')
    updateProduct(@Param('id') id: string, @Body() update: UpdateImgDto){
        return this.imgServices.updateimg(+id, update)
    }
}
