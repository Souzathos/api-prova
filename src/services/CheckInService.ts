import { AppDataSource } from "../config/dataSource";
import { CheckIn } from "../models/CheckIn";
import { Guest } from "../models/Guest";

export class CheckInService {
    private repo = AppDataSource.getRepository(CheckIn)
    private guestRepo = AppDataSource.getRepository(Guest)


    async create(guestId:number, user:any) {
        // 1. valida guest
        const guest = await this.guestRepo.findOneBy({id: guestId})

        if(!guest) throw new Error('Convidado não encontrado')

        // 2. Bloqueia duplicidade
        const already = await this.repo.findOne({where: {guest: {id: guestId}}})
        if(already) throw new Error('Check-in já realizado')

        
        // 3. Cria check-in
        const checkin = this.repo.create({
            guest, 
            user
        })

        return this.repo.save(checkin)
    }
}