import { Module } from '@nestjs/common';
import { OrderController } from './controller/order.controller';
import { OrderService } from './service/order.service';
import { Order } from './order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [ TypeOrmModule.forFeature([Order]), forwardRef(() => ProductModule), UserModule],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
