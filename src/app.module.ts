import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoriaModule } from './categoria/categoria.module';
import { LocationsModule } from './locations/locations.module';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentModule } from './payment/payment.module';
import { ImgsModule } from './imgs/imgs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      password: 'mailo1',
      port: 3306,
      username: 'root',
      database: 'techzone',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      connectTimeout: 30000,
      logging: true
    }),
    UserModule, ProductModule, CategoriaModule, LocationsModule, OrderModule, PaymentModule, ImgsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
