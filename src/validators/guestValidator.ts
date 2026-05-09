import {z} from 'zod'

export const guestSchema = z.object({
    name: z.string().min(3, 'Nome muitio pequeno'),
    email: z.email('Email inválido'),
    cpf: z.string().min(11, 'CPF deve ter exatamente 11 numeros').max(11, 'CPF deve ter exatamente 11 numeros'),
    phone: z.string().min(11, 'Numero invalido'),
    table_number: z.number(),
    checked_in: z.boolean()
})