import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoriaService } from '../service/categoria.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Controller('category')
export class CategoriaController {
  constructor(private CategoryService: CategoriaService) {}

  @Get()
  findUsers() {
    return this.CategoryService.findAll();
  }

  @Post()
  createCategory(@Body() newCategory: CreateCategoryDto) {
    return this.CategoryService.createCategory(newCategory);
  }

  @Get(':id')
  findCategory(@Param('id') id: string) {
    return this.CategoryService.findOne(+id);
  }

  @Delete(':id')
  deletedUser(@Param('id') id: string) {
    return this.CategoryService.deleteCategory(+id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() update: UpdateCategoryDto) {
    return this.CategoryService.updateCategory(+id, update);
  }
}
