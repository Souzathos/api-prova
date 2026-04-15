import { CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Guest } from "./Guest";
import { User } from "./User";

@Entity('checkin')
export class CheckIn {
    @PrimaryGeneratedColumn()
    id:number

    @OneToOne(() => Guest, (guest) => guest.checkin)
    @JoinColumn()
    guest:Guest

    @ManyToOne(() => User, (user) => user.checkins)
    user: User

    @CreateDateColumn()
    checked_in_at: Date
}