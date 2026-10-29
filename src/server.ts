import express from 'express'
import projectRoutes from './routes/projectRoutes'
import { handleErrors, notFound } from './middleware/errors'

const server = express()

server.use(express.json())

server.use('/api/projects', projectRoutes)

server.use(notFound)
server.use(handleErrors)

export default server
