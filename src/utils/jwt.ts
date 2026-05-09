import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
const JWT_SECRET = process.env.JWT_SECRET

export const generateToken = (payload: object) => {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    })
}

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, JWT_SECRET)
    } catch {
        return null
    }
}