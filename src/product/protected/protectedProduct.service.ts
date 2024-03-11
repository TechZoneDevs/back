import { Injectable } from "@nestjs/common";
import { User } from "src/user/user.entity";
import { Product } from "../product.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ProtectedProductService {
    constructor(
        @InjectRepository(Product) private ProductService: Repository<Product>,
        @InjectRepository(User) private UserService: Repository<User> 
    ){}
}