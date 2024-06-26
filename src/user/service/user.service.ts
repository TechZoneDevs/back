import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { loginUser } from '../dto/login-user.dto';
import { LocationService } from 'src/location/service/location.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userService: Repository<User>,
    private LocationService: LocationService
) {}

  async findAll() {
    return this.userService.find({ relations: ["location"] });
  }

  async findOne(id: number) {
    const userFound = await this.userService.findOne({ where: { id }, relations: ["location", "orders"] });
    if (!userFound)
      return new HttpException('user no encontrado', HttpStatus.CONFLICT);
    return userFound;
  }

  //No Auth Login
  async login(user: loginUser){
    const userLogged = await this.userService.findOne({
      where:{
        email: user.email,
        password: user.password
      }});
    
    if (userLogged){
      return {userLogged, status: true}
    } else {
      return new HttpException('Correo o contraseña incorrectos.', HttpStatus.CONFLICT);
    }
  };

  async createUser(newUser: CreateUserDto) {
    const userFound = await this.userService.findOne({
      where: { name: newUser.email },
    });
    if (userFound){
      return new HttpException('user ya existente', HttpStatus.CONFLICT);
    }
    if(newUser.locationId){
      const verifyLocation = await this.LocationService.findOne(newUser.locationId);
      if(!verifyLocation){
        return new HttpException(`La location que intentas asignar al usuario no existe.`, 400);
      }
      const userCreated = this.userService.create(newUser);
      if (userCreated) return this.userService.save(userCreated);
    }
  }
  async updateUser(id: number, userUpdate: UpdateUserDto) {
    const userFound = await this.userService.findOne({ where: { id } });
    if (!userFound)
      return new HttpException('user no encontrado', HttpStatus.CONFLICT);
    return this.userService.update({ id }, userUpdate);
  }

  async deleteUser(id: number) {
    const deletedUser = await this.userService.delete({ id });
    if (deletedUser.affected === 0)
      return new HttpException('user no eliminado', HttpStatus.CONFLICT);
    return deletedUser;
  }
}
