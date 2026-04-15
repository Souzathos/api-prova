import {Request, Response, NextFunction} from 'express'
import { verifyToken } from '../utils/jwt';

export const authMiddleware = (req:Request, res:Response, next:NextFunction) => {
    const header = req.headers.authorization; // pega o token

    // se nao tiver token
    // ou se o token nao começar com 'Bearer '
    if(!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({message: 'Token não fornecido'})
    }

    // Bearer 
    const token = header.split(' ')[1]
    const decoded = verifyToken(token)

    if(!decoded) {
        return res.status(401).json({ message: "Token inválido"})
    }

    (req as any).user = decoded

    next() // se não tiver o next, não continua a requisição (trava)
}