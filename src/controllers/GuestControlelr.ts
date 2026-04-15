import { GuestService } from "../services/GuestService";
import { Request, Response } from 'express'
import { guestSchema } from "../validators/guestValidator";
import { CheckInService } from "../services/CheckInService";

const service = new GuestService()
const checkInService = new CheckInService()

export class GuestController {
    async create(req: Request, res: Response) {
        try {
            const data = guestSchema.parse(req.body)
            const guest = await service.create(data)

            return res.status(201).json({
                sucess: true,
                data: guest
            })
        } catch (error: any) {
            return res.status(400).json({
                sucess: false,
                message: error.message
            })
        }
    }

    async list(req: Request, res: Response) {
        try {
            const { name } = req.query
            const data = await service.list(name as string)

            return res.status(200).json({
                sucess: true,
                data
            })

        } catch(error) {
            return res.status(500).json({
                sucess:false,
                message: error.message
            })
        }

    }

    async update(req:Request, res:Response) {
        try {
            const guest = await service.update(Number(req.params.id), req.body)

            return res.status(200).json({
                sucess:true,
                data: guest
            })
        } catch(error: any) {
            return res.status(400).json({
                sucess: false,
                message: error.message
            })
        }
    }

    async checkin(req:Request, res:Response) {
        try{
            const user = (req as any).user
            const guestId = Number(req.params.id)

            const result = await checkInService.create(guestId, user)

            return res.status(200).json({
                sucess: true,
                data: result,
                meta: {
                    realizado_por: user.email
                }
            })
        } catch(error: any) {
            return res.status(400).json({
                sucess:false,
                message: error.message
            })
        }
    }

    async dashboard(req:Request, res:Response) {
        try {
            const data = await service.dashboard()

            return res.status(200).json({
                sucess:true,
                data
            })
        } catch(error:any) {
            return res.status(500).json({
                sucess:false,
                message: error.message
            })
        }
    }

    async delete(req:Request, res:Response) {
        try{ 
            const user = (req as any).user
            const guest = await service.delete(Number(req.params.id))

            return res.status(200).json({
                sucess: true,
                data:guest,
                meta:  {
                    realizado_por: user.email
                }
            })
 
        } catch(error:any) {
            return res.status(500).json({
                sucess:false,
                message: error.message
            })
        }
    }
}
