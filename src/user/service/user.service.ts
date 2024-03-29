import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userService: Repository<User>
    ){}

    async findAll(){
        return this.userService.find()
    }

    async findOne(id: number){
        const userFound = await this.userService.findOne({where: {id}})
        if(!userFound) return new HttpException('user no encontrado', HttpStatus.CONFLICT)

        return userFound
    }

    async createUser(newUser: CreateUserDto){
        const userFound = await this.userService.findOne({where: {name: newUser.name}})
        if(userFound)return new HttpException('user ya existente', HttpStatus.CONFLICT)
        const userCreated = await this.userService.create(newUser)

        if(userCreated) return this.userService.save(userCreated)
    }

    async updateUser(id: number, userUpdate: UpdateUserDto){
        const userFound = await this.userService.findOne({where: {id}})
        if(!userFound) return new HttpException('user no encontrado', HttpStatus.CONFLICT)
        return this.userService.update({id}, userUpdate)
    }

    async deleteUser(id: number){
        const deletedUser = await this.userService.delete({id})
        if(deletedUser.affected === 0) return  new HttpException('user no eliminado', HttpStatus.CONFLICT)
        return deletedUser
    }

}
