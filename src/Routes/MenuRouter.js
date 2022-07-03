import { menuUser, deleteTransfer } from '../Controllers/MenuControler.js'
import { Router } from 'express'

const server = Router()

server.get('/menu', menuUser);

server.delete('/menu', deleteTransfer);

export default server;