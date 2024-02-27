import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCategoryGlobalDto } from '../dto/create-categoriaGlobal.dto';
import { CategoriasGlobalesService } from '../service/categorias-globales.service';

@Controller('categorias-globales')
export class CategoriasGlobalesController {
    constructor(private CategoryGlobalService: CategoriasGlobalesService){}

    @Get()
    findUsers(){
        return this.CategoryGlobalService.findAll()
    }

    @Post()
    createCategory(@Body() newCategory: CreateCategoryGlobalDto){
        return this.CategoryGlobalService.createCategory(newCategory)
    }

    @Get(':id')
    findCategory(@Param('id') id:string){
        return this.CategoryGlobalService.findOne(+id)
    }

    @Delete(':id')
    deletedUser(@Param('id') id:string){
        return this.CategoryGlobalService.deleteCategory(+id)
    }

   
}
