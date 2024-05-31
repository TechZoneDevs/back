import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from '../service/product.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  findProducts() {
    return this.productService.findAll();
  }

  @Post()
  createProduct(@Body() newProduct: CreateProductDto) {
    return this.productService.createProduct(newProduct);
  }

  @Get(':id')
  findProduct(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Delete(':id')
  deletedProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(+id);
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() update: UpdateProductDto) {
    return this.productService.updateProduct(+id, update);
  }
}
