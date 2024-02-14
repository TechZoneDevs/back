import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from '../categoria.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(Categoria) private categoryService: Repository<Categoria>
    ){}

    async findAll(){
        return await this.categoryService.find()
    }

    async findOne(id: number){
        const categoryFound = await this.categoryService.findOne({where: {id}})
        if(!categoryFound) return new HttpException('user no encontrado', HttpStatus.CONFLICT)

        return categoryFound
    }

    async createCategory(newCategory: CreateCategoryDto){
        const categoryFound = await this.categoryService.findOne({where: {name: newCategory.name}})
        if(categoryFound)return new HttpException('category ya existente', HttpStatus.CONFLICT)
        const categoryCreated = await this.categoryService.create(newCategory)

        if(categoryCreated) return this.categoryService.save(categoryCreated)
    }

    async updateCategory(id: number, categoryUpdate: UpdateCategoryDto){
        const categoryFound = await this.categoryService.findOne({where: {id}})
        if(!categoryFound) return new HttpException('user no encontrado', HttpStatus.CONFLICT)
        return this.categoryService.update({id}, categoryUpdate)
    }

    async deleteCategory(id: number){
        const deletedCategory = await this.categoryService.delete({id})
        if(deletedCategory.affected === 0) return  new HttpException('category no eliminada', HttpStatus.CONFLICT)
        return deletedCategory
    }

}
