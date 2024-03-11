import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { UserService } from "../service/user.service";
import { UserMiddleware } from "./user.middleware";
import { ProtectedUserService } from "./protectedUser.service";
@Controller('userauth')
export class ProtectedUserController {
    constructor(private userService: UserService, private PUserService:ProtectedUserService){}

    @Get()
    @UseGuards(UserMiddleware)
    getUser(@Req() req){
        // console.log(req.auth.payload);
        
        return this.userService.findAll();
    }

    @Post()
    @UseGuards(UserMiddleware)
    createUser(@Req() req){        
        return this.PUserService.createUser(req)
        
    }

}