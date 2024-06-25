import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../product.entity';
import { Repository, DeepPartial } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { CategoryService } from 'src/category/category.service';
import { LocationService } from 'src/location/service/location.service';
import { Category } from 'src/category/category.entity';
import { OrderService } from 'src/order/service/order.service';
import { Order } from 'src/order/order.entity';
import { UserService } from 'src/user/service/user.service';

@Injectable()
export class ProductService {
  constructor(
   
    @InjectRepository(Product) private ProductService: Repository<Product>,
     private readonly LocationService: LocationService,
     private readonly CategoryService: CategoryService,
     private readonly UserService: UserService,
     @Inject (forwardRef(() => OrderService))
     private readonly OrderService: OrderService,
  ) {}

  async findAll() {
    return this.ProductService.find({
      relations: ['location', 'user']
    });
  }

  async findOne(id: number) {
    const productFound = await this.ProductService.findOne({ where: { id }, relations: ['categories', 'location', 'brand','orders', 'user'] });
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
     if (newProduct.userId){
        const verifyUser = await this.UserService.findOne(newProduct.userId);
        if(!verifyUser){
          return new HttpException(`El usuario dueño del producto no existe.`, 400);
        }
      }
    if (newProduct.locationId){
      const verifyLocation = await this.LocationService.findOne(newProduct.locationId);
      if(!verifyLocation){
        return new HttpException(`La location donde intentas crear el producto no existe.`, 400);
      }
    }
    if (newProduct.ordersId){
      const ordersToAdd = newProduct.ordersId;
      const ordersEncontradas = await this.OrderService.findOrderProductsById(ordersToAdd);
      let respuesta = <Order[]>ordersEncontradas
      newProduct.orders = respuesta;
    }

    if(newProduct.categoriesId){
      const categoriasToAdd = newProduct.categoriesId;
      const cateEncontradas = await this.CategoryService.encuentraCategorias(categoriasToAdd);
      let respose = <Category[]>cateEncontradas
      newProduct.categories = respose;
    }
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
