import { reciveTransfer, payTransfer } from '../Controllers/TransferController.js'
import { Router } from 'express'

const server = Router()

server.post('/entrada', reciveTransfer)

server.post('/saida', payTransfer)

export default server;