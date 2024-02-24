import { UUID } from "crypto";
import { Categoria } from "src/categoria/categoria.entity";
import { Comentario } from "src/comentarios/comentario.entity";
import { ImgEntity } from "src/imgs/img.entity";
import { Location } from "src/locations/location.entity";
import { Order } from "src/order/order.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Product{
    @PrimaryGeneratedColumn("uuid")
    id: UUID

    @Column()
    name: string

    @Column()
    price: number

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

    @OneToMany(()=> ImgEntity, img => img.imgURL,{nullable:true})
    imgs: ImgEntity[]

    @OneToMany(()=> Comentario, comentario => comentario.comentarioProducto)
    comentarios: Comentario[]

    @ManyToOne(()=> Location, location => location.locationProducto)
    location : Location

    @OneToMany(()=>Categoria, categoria => categoria.productos)
    categoria: Categoria

    @ManyToMany(() => User, user => user.publicaciones)
    @JoinTable({
        name: "product_user",
        joinColumn: { name: "product_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "user_id", referencedColumnName: "id" },
    })
    vendedor: User[];
    

    @ManyToMany(()=> Order, order => order.products)
    @JoinTable({
        name: "product_order",
        joinColumn: { name: "product_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "order_id", referencedColumnName: "id" },
    })
    productsOrder: Order[]

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAd: Date;
}