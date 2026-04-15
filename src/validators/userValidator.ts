/*
    
*/

import {z} from 'zod'

export const userSchema = z.object({
    name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
    email: z.email('Email inválido'),
    cpf: z.string().regex(/^\d{11}$/, 'CPF deve conter exatamente 11 números'),
    /*
        .regex()
        Valida usando expressão regular (RegEx)

        ^\d{11}$
           ^ inicio da string 
           \d numeros
           {11} exatamente 11 numeros
           $ fim da string


           Ou seja: Só aceita CPF COM 11 DIGITOS NUMÉRICOS
    */

    password: z.string().min(8, 'Senha deve ter no minimo 8 caracteres'),
    role: z.enum(['admin', 'recepcionista'])

})