import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { categoriaGlobal } from '../categoriasGlobales.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryGlobalDto } from '../dto/create-categoriaGlobal.dto';

@Injectable()
export class CategoriasGlobalesService {
    constructor(
        @InjectRepository(categoriaGlobal) private categoryGlobalService: Repository<categoriaGlobal>
    ){}

    async findAll(){
        return await this.categoryGlobalService.find()
    }

    async findOne(id: number){
        const categoryFound = await this.categoryGlobalService.findOne({where: {id}})
        if(!categoryFound) return new HttpException('user no encontrado', HttpStatus.CONFLICT)

        return categoryFound
    }

    async createCategory(newCategory: CreateCategoryGlobalDto){
        const categoryFound = await this.categoryGlobalService.findOne({where: {name: newCategory.name}})
        if(categoryFound)return new HttpException('category ya existente', HttpStatus.CONFLICT)
        const categoryCreated = await this.categoryGlobalService.create(newCategory)

        if(categoryCreated) return this.categoryGlobalService.save(categoryCreated)
    }


    async deleteCategory(id: number){
        const deletedCategory = await this.categoryGlobalService.delete({id})
        if(deletedCategory.affected === 0) return  new HttpException('category no eliminada', HttpStatus.CONFLICT)
        return deletedCategory
    }
}
