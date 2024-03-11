import { Controller, Get, UseGuards } from "@nestjs/common";
import { ProductService } from "../service/product.service";
import { ProductMiddleware } from "./product.middleware";

@Controller('product/auth')
export class ProtectedProductController {
    constructor(private productService: ProductService){}

    @Get()
    @UseGuards(ProductMiddleware)
    async getProduct(){
        return this.productService.findAll();
    }

}
