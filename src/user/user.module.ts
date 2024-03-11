import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ProtectedUserService } from './protected/protectedUser.service';
import { ProtectedUserController } from './protected/protectedUser.controller';
import { UserMiddleware } from './protected/user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController,ProtectedUserController],
  providers: [UserService,UserMiddleware,ProtectedUserService],
  exports: [UserService,ProtectedUserService]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(UserMiddleware)
    .forRoutes(ProtectedUserController)
  }
}