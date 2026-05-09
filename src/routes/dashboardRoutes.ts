import { Router } from "express";
import { GuestController } from "../controllers/GuestController";
import { authMiddleware } from "../middlewares/authMiddleware";

const dashboardRoutes = Router()
const controller = new GuestController()

dashboardRoutes.get('/', authMiddleware, controller.dashboard.bind(controller))

export default dashboardRoutes