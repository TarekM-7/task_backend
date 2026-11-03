import express from 'express'
import cors from 'cors'
import { corsConfig } from './config/cors'
import projectRoutes from './routes/projectRoutes'
import { handleErrors, notFound } from './middleware/errors'

const server = express()

server.use(cors(corsConfig))
server.use(express.json())

server.use('/api/projects', projectRoutes)

server.use(notFound)
server.use(handleErrors)

export default server
