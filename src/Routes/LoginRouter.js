import { loginUser } from '../Controllers/LoginController.js'
import { Router } from 'express'

const server = Router()

server.post('/', loginUser)

export default server;