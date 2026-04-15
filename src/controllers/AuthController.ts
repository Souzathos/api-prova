import { AuthService } from "../services/AuthService";
import { userSchema } from "../validators/userValidator";
import { Request, Response} from 'express'

const service = new AuthService()

export class AuthController {
    async register (req:Request, res: Response ){
        try {
            const data = userSchema.parse(req.body)
            // .parse valida os dados que vao vir do body.

            const user = await service.register(data)

            const safe = {...user}
            delete (safe as any).password

            return res.status(201).json(safe)
        } catch(error: any) {
            return res.status(400).json({message: error.message})
        }
    }
}
