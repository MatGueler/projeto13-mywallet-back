import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import LoginRouter from './Routes/LoginRouter.js'
import MenuRouter from './Routes/MenuRouter.js'
import RegisterRouter from './Routes/RegisterRouter.js'
import TransferRouter from './Routes/TransferRouter.js'

dotenv.config()

const server = express();
server.use(express.json());
server.use(cors());

// Cadastro
server.use(RegisterRouter)

// Login
server.use(LoginRouter)

// Menu
server.use(MenuRouter)

// Entrada e Saída
server.use(TransferRouter)

server.listen(5000)