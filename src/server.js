import express from 'express'
import cors from 'cors'
import { MongoClient, ObjectId } from "mongodb";
import dotenv from 'dotenv'
import dayjs from 'dayjs'
import { registerUser } from './Controllers/RegisterController.js'
import { loginUser } from './Controllers/LoginController.js'

dotenv.config();

const mongoClient = new MongoClient(process.env.URL_CONNECT_MONGO);
let db;

mongoClient.connect().then(() => {
    db = mongoClient.db("mywallet");
});

const server = express();
server.use(express.json());
server.use(cors());

// Cadastro
server.post('/cadastro', registerUser)

// Login
server.post('/', loginUser)

// Menu
server.get('/menu', async (req, res) => {

    const { authorization } = req.headers

    const token = authorization?.replace('Bearer ', '')

    const verificationToken = await db.collection("online").findOne({
        token
    })

    const id = ObjectId(verificationToken.userId)

    const statement = await db.collection("statement").find({
        id
    }).toArray()

    res.status(200).send(statement)

})

// Entrada
server.post('/entrada', async (req, res) => {

    const { authorization } = req.headers

    const token = authorization?.replace('Bearer ', '')

    const verificationToken = await db.collection("online").findOne({
        token
    })

    const id = verificationToken.userId

    const date = dayjs().format('DD/MM')

    const { price, description, type } = req.body

    try {
        const statement = await db.collection("statement").insertOne({
            id,
            date,
            description,
            price,
            type
        })

        res.status(200).send(statement)
    } catch {
        res.sendStatus(500)
    }

})

// Saida
server.post('/saida', async (req, res) => {

    const { authorization } = req.headers

    const token = authorization?.replace('Bearer ', '')

    const verificationToken = await db.collection("online").findOne({
        token
    })

    const id = verificationToken.userId

    const date = dayjs().format('DD/MM')

    const { price, description, type } = req.body

    try {
        const statement = await db.collection("statement").insertOne({
            id,
            date,
            description,
            price,
            type
        })

        res.status(200).send(statement)
    } catch {
        res.sendStatus(500)
    }

})

server.listen(5000)