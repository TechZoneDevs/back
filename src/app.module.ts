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
import { ConfigModule } from '@nestjs/config'; 
import { ComentariosModule } from './comentarios/comentarios.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        connectTimeout: 30000,
        logging: true
      })
    }),
    UserModule,
    ProductModule,
    CategoriaModule,
    LocationsModule,
    OrderModule,
    PaymentModule,
    ImgsModule,
    ComentariosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
