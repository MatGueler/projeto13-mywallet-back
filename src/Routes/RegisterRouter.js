import { registerUser } from '../Controllers/RegisterController.js'
import { Router } from 'express'

const server = Router()

server.post('/cadastro', registerUser)

export default server;