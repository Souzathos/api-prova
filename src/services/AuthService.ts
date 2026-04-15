import { AppDataSource } from "../config/dataSource";
import { User } from "../models/User";
import bcrypt from 'bcrypt'

export class AuthService {
    private repo = AppDataSource.getRepository(User)

    async register(data:any){
        const exists = await this.repo.findOneBy({email : data.email})

        if(exists){
            throw new Error('Email já cadastrado')
        }

        const hash = await bcrypt.hash(data.password, 10)

        const user = this.repo.create({...data, password: hash})

        return this.repo.save(user)
    }

}