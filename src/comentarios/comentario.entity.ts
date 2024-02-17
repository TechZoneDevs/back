import { Product } from "src/product/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Comentario{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    comentario: string

    @Column()
    idUserComenta: number

    @ManyToOne(()=> Product, product=> product.comentarios)
    comentarioProducto: Product
}