import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/CreateCategory.dto';
import { UpdateCategoryDto } from './dto/UpdateCategory.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
    constructor (@InjectRepository(Category) private categoryService: Repository<Category>){}

    async findAll(){
        return this.categoryService.find();
    };

    async findOne(id: number){
        const categoryFound = await this.categoryService.findOne({ where: { id }});
        if(!categoryFound){
            return new HttpException('Categoria no encontrada.', HttpStatus.CONFLICT)
        } else {
            return categoryFound
        }
    };

    async createCategory(newCategory: CreateCategoryDto){
        const nuevaCategory = await this.categoryService.findOne({ where: { name: newCategory.name } });
        if (nuevaCategory) {
            return new HttpException('Categoria ya existe.', HttpStatus.CONFLICT);
        } else {
            const categoryCreated = await this.categoryService.create(newCategory);
            return this.categoryService.save(categoryCreated);
        }
    };

    async updateCategory(id: number, categoryUpdate: UpdateCategoryDto){
        const categoryFound = await this.categoryService.findOne({ where: { id }});
        if(!categoryFound){
            return new HttpException('Categoria no encontrada.', HttpStatus.CONFLICT);
        } else {
            return this.categoryService.update({id}, categoryUpdate);
        }
    };

    async deleteCategory(id: number){
        const categoryFound = await this.categoryService.findOne({ where: {id} });
        if (categoryFound){
            return await this.categoryService.delete({id});
        } else {
            return new HttpException('Categoria no encontrada.', HttpStatus.CONFLICT);
        }
    };
};
