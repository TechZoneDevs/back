import { Location } from "src/locations/location.entity";
import { Order } from "src/order/order.entity";
import { Product } from "src/product/product.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column({nullable: true})
    password: string

    @Column()
    imgAvatar: string

    @Column({nullable: true})
    biografia: string

    @Column()
    status: boolean

    @Column({nullable: true})
    idLocation: number

    @Column({nullable: true})
    role:string

    @OneToMany(()=> Order, order=> order.user)
    userOrder: Order[]

    @ManyToMany(()=> Product, product => product.vendedor)
    publicaciones: Product[];
    

    @OneToMany(()=> Location, location => location.locationUser)
    location: Location

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAd: Date;
}