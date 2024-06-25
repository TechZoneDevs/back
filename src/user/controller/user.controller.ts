import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findUsers() {
    return this.userService.findAll();
  }

  @Post()
  createUser(@Body() newUser: CreateUserDto) {
    return this.userService.createUser(newUser);
  }

  @Get(':id')
  findUser(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }

  @Delete(':id')
  deletedUser(@Param('id') id: number) {
    return this.userService.deleteUser(+id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: number, @Body() update: UpdateUserDto) {
    return this.userService.updateUser(+id, update);
  }
}
