import { Product } from "src/product/product.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Location{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    city: string

    @Column()
    localidad: string

    @ManyToOne(()=> Product, product => product.location)
    locationProducto: Product[]

    @ManyToOne(()=> User, user=> user.location)
    locationUser: User[]
}