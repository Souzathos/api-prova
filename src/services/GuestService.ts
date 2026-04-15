import { Like } from "typeorm";
import { AppDataSource } from "../config/dataSource";
import { CheckIn } from "../models/CheckIn";
import { Guest } from "../models/Guest";
import { User } from "../models/User";

export class GuestService {
    private repo = AppDataSource.getRepository(Guest)
    private userRepo = AppDataSource.getRepository(User)
    private checkInRepo = AppDataSource.getRepository(CheckIn)

    // name opcional
    async list(name?: string) {
        const guests = await this.repo.find({
            where: name ? { name: Like(`%${name}%`) } : {},
            relations: ['checkin']
        })


        return guests.map(g => ({
            ...g,
            checked_in: !!g.checkin
        }))
    }

    async create(data: any) {
        const exists = await this.repo.findOneBy({ cpf: data.cpf })
        const userExists = await this.userRepo.findOneBy({ cpf: data.cpf })
        if (exists || userExists) throw new Error('CPF ja cadastrado')

        return this.repo.save(this.repo.create(data))
    }

    async update(id: number, data: any) {
        await this.repo.update(id, data)
        return this.repo.findOne({
            where: { id },
            relations: ['checkin']
        })
    }

    async checkin(guestId:number, user: any) {
        const guest = await this.repo.findOneBy({id: guestId})
        if(!guest) throw new Error('Convidado não encontrado')

        const exists = await this.checkInRepo.findOne({
            where: {guest: {id: guestId}}
        })

        if(exists) throw new Error('Check-in já realizado') 
        
        const checkin = this.checkInRepo.create({
            guest, //convidado
            user // staff responsavel
        })

        return this.checkInRepo.save(checkin)
    }

    async delete(id:number) {
        const guest = await this.repo.findOneBy({id})
        if(!guest) throw new Error('Convidado não encontrado')

        await this.repo.delete(id)
    }

    async dashboard() {
        // da um find em todos os guests
        const guests = await this.repo.find({
            relations: ['checkin']
        })

        // total de guests
        const total = guests.length
        // filtra os confirmados
        const confirmed = guests.filter(g => g.checkin).length
        // numero de pendentes
        const pending = total - confirmed

        const occupancy = total === 0 ? 0 : Number(((confirmed / total ) * 100 ).toFixed(2))

        return {
            total, 
            confirmed,
            pending,
            occupancy
        }
    }

}