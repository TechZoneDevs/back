import { ImgEntity } from "src/imgs/img.entity"
import { User } from "src/user/user.entity"

export class CreateProductDto{
    name: string
    price: number
    imgs: ImgEntity[]
    marca: string | null
    status: string
    description: string
    stock: number
    vendedor: User[]
    descuento: number | null
}