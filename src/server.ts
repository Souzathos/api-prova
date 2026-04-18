import express from 'express'
import { AppDataSource } from './config/dataSource'
import routes from './routes'
import * as dotenv from 'dotenv'
import cors from 'cors'


dotenv.config()
const port = process.env.PORT
const app = express()
app.use(cors())

app.use(express.json())

AppDataSource.initialize().then(() => {
    console.log('banco bombando')

    app.use(routes)

    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`)
    })
})