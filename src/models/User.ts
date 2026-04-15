import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CheckIn } from "./CheckIn";

@Entity('users')
export class User{ 
    @PrimaryGeneratedColumn()
    id:number

    @Column({length:100, nullable: false})
    name:string

    @Column({unique: true, length:100, nullable:false})
    email:string

    @Column({unique: true, length:11, nullable:false})
    cpf:string

    @Column({length:255, nullable:false})
    password:string

    @Column({nullable:false})
    role: 'admin' | 'recepcionista'
    
    // 1º argumento -> uma arrow function (sem chaves) que retorna a entidade relacionada
    // 2º argumento -> uma arrow function (sem chaves) que recebe o atributo da entidade relacionada e indica que chave liga na tabela (chave estrangeira)
    @OneToMany(() => CheckIn, (checkin) => checkin.user)
    checkins: CheckIn[]
}