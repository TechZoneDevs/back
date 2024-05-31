import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
  } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/CreateCategory.dto';
import { UpdateCategoryDto } from './dto/UpdateCategory.dto';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService){}

    @Get()
    findCagetories(){
        return this.categoryService.findAll();
    };

    @Post()
    createCategory(@Body() newCategory: CreateCategoryDto){
        return this.categoryService.createCategory(newCategory);
    };

    @Get(':id')
    findCategory(@Param('id') id: number){
        return this.categoryService.findOne(id);
    };

    @Delete(':id')
    deleteCategory(@Param('id') id: number){
        return this.categoryService.deleteCategory(id);
    };

    @Patch(':id')
    updateCategory(@Body() updateCategory: UpdateCategoryDto, @Param('id') id: number){
        return this.categoryService.updateCategory(id, updateCategory);
    }
}
