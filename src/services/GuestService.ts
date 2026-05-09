import { Like } from "typeorm";
import { AppDataSource } from "../config/data-source";
import { Guest } from "../models/Guest";

export class GuestService {
    private repo = AppDataSource.getRepository(Guest)

    async register(data: any) {
        const exists = await this.repo.findOne({where: {email: data.email}})
        if(exists) throw new Error('Email ja cadastrado')
        const cpfExists = await this.repo.findOne({where: {cpf: data.cpf}})
        if(cpfExists) throw new Error('CPF ja cadastrado')

        const guest = this.repo.create(data)

        return this.repo.save(guest)
    }

    async list(name?: string) {
        const guests = await this.repo.find({
            where: name ? {name: Like(`%${name}%`)} : {}
        })

        return guests
    }


    async update(guestId: number, data: any) {
        const exists = await this.repo.findOneBy({id: guestId})
        if(!exists) throw new Error('Convidado nao encontrado')

        await this.repo.update(guestId, data)
        return this.repo.findOne({where: {id: guestId}})
    }

    async delete(id: number) {
         const exists = await this.repo.findOneBy({id})
        if(!exists) throw new Error('Convidado nao encontrado')

        await this.repo.delete(id)
    }

    async checkin(id: number, user: any) {
        const guest = await this.repo.findOneBy({id})
        if(!guest) throw new Error('Convidado nao encontrado')
        if(guest.checked_in) throw new Error('Checkin ja realizado ')
        
        guest.checked_in = true

        return this.repo.save(guest)
    }

    async dashboard() {
        const guests = await this.repo.find()

        const total = guests.length

        const checked_in = guests.filter(g => g.checked_in).length

        const pending = total - checked_in

        const occupancy = total === 0 ? 0 : Number(((checked_in/total) * 100)).toFixed(2)

        return {
            total,
            checked_in, 
            pending, 
            occupancy
        }
    }
}