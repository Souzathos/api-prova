import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CheckIn } from "./CheckIn";

@Entity('guests')
export class Guest{ 
    @PrimaryGeneratedColumn()
    id:number

    @Column({length:100, nullable: false})
    nome:string

    @Column({unique: true, length:100, nullable:false})
    email:string

    @Column({unique: true, length:11, nullable:false})
    cpf:string

    @Column({nullable: false, unique: true})
    phone:string

    @Column({nullable:false})
    table_number: number

    @OneToOne(() => CheckIn, (checkin) => checkin.guest)
    checkin: CheckIn
}