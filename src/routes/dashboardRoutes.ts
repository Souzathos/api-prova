import {Router} from 'express'
import { GuestController } from '../controllers/GuestControlelr'
import { authMiddleware } from '../middlewares/authMiddleware'
import { roleMiddleware } from '../middlewares/roleMiddlewares'


const dashRoutes = Router()
const guest = new GuestController()

dashRoutes.get('/', authMiddleware, roleMiddleware('admin'), guest.dashboard.bind(guest))

export default dashRoutes