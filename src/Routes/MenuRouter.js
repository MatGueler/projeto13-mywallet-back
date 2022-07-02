import { menuUser } from '../Controllers/MenuControler.js'
import { Router } from 'express'

const server = Router()

server.get('/menu', menuUser)

export default server;