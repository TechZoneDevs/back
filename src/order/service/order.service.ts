import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../order.entity';
import { UserService } from 'src/user/service/user.service';
import { ProductService } from 'src/product/service/product.service';
import { DeepPartial, Repository } from 'typeorm';
import { Product } from 'src/product/product.entity';
import { User } from 'src/user/user.entity';
import { CreateOrderDto } from '../dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private OrderService: Repository<Order>,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  async createOrder(OrderDto: CreateOrderDto) {
    //Find User
    const userId = OrderDto.userId;
    const userFound = await this.userService.findOne(userId);

    if (!(userFound instanceof User)) {
      return new HttpException('Usuario no encontrado.', HttpStatus.CONFLICT);
    }

    const productIds = Array.isArray(OrderDto.productId)
      ? OrderDto.productId
      : [OrderDto.productId];
    const productsFound = await Promise.all(
      productIds.map(async (productId) => {
        try {
          const product = await this.productService.findOne(productId);
          if (product instanceof Product) {
            return product;
          } else {
            throw new Error('Producto no encontrado');
          }
        } catch (error) {
          throw new Error(
            `Error al buscar el producto con ID ${productId}: ${error.message}`,
          );
        }
      }),
    );

    const validProductsFound = productsFound.filter(
      (product) => product instanceof Product,
    );

    if (validProductsFound.length !== productIds.length) {
      return new HttpException('Uno o algunos de los productos no fueron encontrados.', HttpStatus.CONFLICT);
    }

    const OrderPartial: DeepPartial<Order> = {
      user: userFound,
      products: validProductsFound,
    };

    const createdOrder = await this.OrderService.create(OrderPartial);
    await this.OrderService.save(createdOrder);

    return createdOrder;
  }

  async findOrderProductsById(orders: []){
    const foundProducts = await this.OrderService.findByIds(orders);
    if (!foundProducts){
      return new HttpException('Categorias no encontrada.', HttpStatus.CONFLICT);
    } else {
      return foundProducts;
    }
  }

  async findByUserId(userId: number) {
    const foundOrdersByUserId = await this.OrderService.find({ relations: ['user', 'products'],
      where: { user: { id: userId } }});
    if (foundOrdersByUserId) {
      return foundOrdersByUserId;
    } else {
      return new HttpException('No fue encontrada ninguna orden con este User ID.', HttpStatus.CONFLICT);
    };
  };

  async findById(id: number) {
    const foundOrdersByUserId = this.OrderService.findOne({ where: { id }, relations: ['user', 'products'] });
    // if (foundOrdersByUserId) {
      return foundOrdersByUserId;
    // } else {
    //   return new HttpException('No fue encontrada ninguna orden con este Order ID.', HttpStatus.CONFLICT);
    // };
  };

  async findAll() {
    const allOrders =  await this.OrderService.find({ relations: ['user', 'products'] });
    if (allOrders.length == 0) {
      return new HttpException('No existen ordenes registradas.', HttpStatus.CONFLICT);
    } else {
      return allOrders;
    }
  };
};
