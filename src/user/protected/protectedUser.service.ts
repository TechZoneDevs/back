import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "src/user/user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class ProtectedUserService {
    constructor(
        @InjectRepository(User) private UserService: Repository<User> 
    ){}

    async createUser(req) {
        try {
            if (req.auth){
                
                // const userFound = await this.UserService.findOne({ where: { email: req.auth.payload.custom_email_claim } });
                // if (!userFound) {
                //     return new HttpException('user ya existente', HttpStatus.CONFLICT);
                // }
                // console.log(req.auth);
                
                const newUser:CreateUserDto = {
                    name:req.auth.payload.custom_name_claim,
                    email:req.auth.payload.custom_email_claim,
                    biografia:"Sin datos",
                    imgAvatar:req.auth.payload.custom_picture_claim,
                    idLocation:1,
                    password:"",
                    status:true
                }

                const userCreated = await this.UserService.create(newUser)
                if(userCreated) return this.UserService.save(userCreated)
            
            }
        } catch (error) {
            return error;
        }

    }
}