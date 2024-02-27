import { Categoria } from "src/categoria/categoria.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class categoriaGlobal{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(()=> Categoria, categoria => categoria.pertenece)
    contiene: Categoria[]
}