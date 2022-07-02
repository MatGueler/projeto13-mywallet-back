import express from 'express'
import cors from 'cors'
import { MongoClient, ObjectId } from "mongodb";
import joi from 'joi'
import dotenv from 'dotenv'
import dayjs from 'dayjs'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

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
server.post('/cadastro', async (req, res) => {

    const { name, password, email } = req.body;

    const crypsPassword = bcrypt.hashSync(password, 10)

    const userSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required()
    });

    const body = {
        name,
        email,
        password
    }

    const validation = userSchema.validate(body, { abortEarly: true });

    if (validation.error) {
        console.log(validation.error.details)
        res.sendStatus(422)
        return
    }

    const valid = await db.collection("users").findOne({
        email
    })
    if (valid) {
        res.sendStatus(409)
        return
    }

    await db.collection("users").insertOne({ ...body, password: crypsPassword })

    res.status(200).send(body)

})

// Login
server.post('/', async (req, res) => {

    const { email, password } = req.body;

    const userSchema = joi.object({
        email: joi.string().required(),
        password: joi.string().required()
    });

    const body = {
        email,
        password
    }

    const validation = userSchema.validate(body, { abortEarly: true });

    if (validation.error) {
        console.log(validation.error.details)
        res.sendStatus(422)
        return
    }

    const valid = await db.collection("users").findOne({
        email
    })
    if (!valid) {
        res.status(409).send('Usuario não encontrado')
        return
    }

    const verifyPassword = bcrypt.compareSync(password, valid.password)

    if (!verifyPassword) {
        return res.status(401).send('Senha ou email incorretos!')
    }

    const token = uuid()

    const myName = valid.name

    await db.collection("online").insertOne({
        userId: valid._id,
        token
    })

    res.status(200).send({ token, myName })

})

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