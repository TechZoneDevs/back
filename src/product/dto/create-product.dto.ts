import { ImgEntity } from "src/imgs/img.entity"

export class CreateProductDto{
    name: string
    price: number
    imgs: ImgEntity[]
    vendedorId: number
    marca: string
    status: string
    description: string
    stock: number
    idLocation: number
    idCategory: number
}