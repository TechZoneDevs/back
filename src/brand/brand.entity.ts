import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()

export class Brand {
    @PrimaryGeneratedColumn()
    id: number;

    @Column( { unique: true } )
    name: string;

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    createdAd: Date;
    
}