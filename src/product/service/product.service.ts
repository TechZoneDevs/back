import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CategoryService } from 'src/category/category.service';
import { Category } from 'src/category/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private ProductService: Repository<Product>,
     private CategoryService: CategoryService,
  ) {}

  async findAll() {
    return this.ProductService.find({
      relations: ['categories']
    });
  }

  async findOne(id: number) {
    const productFound = await this.ProductService.findOne({ where: { id } });
    if (!productFound)
      return new HttpException('Product no encontrado', HttpStatus.CONFLICT);

    return productFound;
  }

  async createProduct(newProduct: CreateProductDto) {
    const productFound = await this.ProductService.findOne({
      where: { name: newProduct.name },
    });
    if (productFound){
      return new HttpException('Ya existe un producto con ese nombre.', HttpStatus.CONFLICT);
    } else {
    console.log(newProduct);
    const categoriasToAdd = newProduct.categoriesId;
    const cateEncontradas = await this.CategoryService.findCategories(categoriasToAdd);
    console.log(cateEncontradas);
    let respone = <Category[]>cateEncontradas
    newProduct.categories = respone;
    return this.ProductService.save(newProduct);
    }
  }

  // async getProductsByCategoryId(id: number) {
  //   return this.ProductService.find({ where: { idCategory: id } });
  // }

  async updateProduct(id: number, ProductUpdate: UpdateProductDto) {
    const productFound = await this.ProductService.findOne({ where: { id } });
    if (!productFound){
      return new HttpException('Product no encontrado', HttpStatus.CONFLICT);
    } else {
      return this.ProductService.update({ id }, ProductUpdate);
    }
  }

  async deleteProduct(id: number) {
    const deletedProduct = await this.ProductService.delete({ id });
    if (deletedProduct.affected === 0)
      return new HttpException('Product no eliminado', HttpStatus.CONFLICT);
    return deletedProduct;
  }
}
