import {Router} from 'express'
import { GuestController } from '../controllers/GuestControlelr'
import { authMiddleware } from '../middlewares/authMiddleware'
import { roleMiddleware } from '../middlewares/roleMiddlewares'

const guestRoutes = Router()
const guest = new GuestController()

guestRoutes.post('/register', authMiddleware, roleMiddleware('admin'), guest.create.bind(guest))
guestRoutes.get('/', authMiddleware, guest.list.bind(guest))
guestRoutes.put('/:id', authMiddleware, guest.update.bind(guest))
guestRoutes.delete('/:id', authMiddleware, roleMiddleware('admin'), guest.delete.bind(guest))

guestRoutes.post('/:id/checkin', authMiddleware, guest.checkin.bind(guest))


export default guestRoutes