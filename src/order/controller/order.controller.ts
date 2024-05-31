import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { CreateOrderDto } from '../dto/create-order.dto';

@Controller('order')
export class OrderController {
  constructor(private OrderService: OrderService) {}

  @Post()
  create(@Body() userCarrito: CreateOrderDto) {
    return this.OrderService.createOrder(userCarrito);
  }

  @Get(':userId')
  getUserCarrito(@Param('userId') userId: string) {
    return this.OrderService.findByUserId(+userId);
  }

  @Get()
  getAllUserCarrito() {
    return this.OrderService.findAll();
  }

  @Get(':id')
  getOrderById(@Param('id') id: string) {
    return this.OrderService.findById(+id);
  }
}
