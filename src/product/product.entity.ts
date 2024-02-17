import { Categoria } from "src/categoria/categoria.entity";
import { Comentario } from "src/comentarios/comentario.entity";
import { ImgEntity } from "src/imgs/img.entity";
import { Location } from "src/locations/location.entity";
import { Order } from "src/order/order.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number

    @Column()
    vendedorId: number

    @Column({nullable: true})
    marca: string

    @Column({nullable: true})
    descuento: number

    @Column()
    status: string

    @Column()
    description: string

    @Column()
    stock: number

    @Column()
    idLocation: number

    @Column()
    idCategory: number

    @ManyToOne(()=> ImgEntity, img => img.productoImg)
    imgs: ImgEntity[]

    @OneToMany(()=> Comentario, comentario => comentario.comentarioProducto)
    comentarios: Comentario[]

    @OneToMany(()=> Location, location => location.locationProducto)
    location = Location

    @OneToMany(()=>Categoria, categoria => categoria.productos)
    categoria: Categoria

    @OneToMany(()=> User, user => user.publicaciones)
    vendedor: User

    @ManyToMany(()=> Order, order => order.products)
    productsOrder: Order[]

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAd: Date;
}