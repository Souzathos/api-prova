import { AuthController } from '../controllers/AuthController'
import { Router } from 'express';
import userRoutes from './userRoutes';
import guestRoutes from './guestRoutes';
import dashboardRoutes from './dashboardRoutes'

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/guests', guestRoutes)
routes.use('/dashboard', dashboardRoutes)


export default routes