import {z} from 'zod'

export const guestSchema = z.object({
    name: z.string().min(3),
    cpf: z.string().regex(/^\d{11}$/, 'CPF deve conter exatamente 11 números'),
    email: z.email(),
    phone: z.string(),
    table_number: z.number()
}) 