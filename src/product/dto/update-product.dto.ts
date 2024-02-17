import { ImgEntity } from "src/imgs/img.entity"

export class UpdateProductDto{
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
    descuento: number
}