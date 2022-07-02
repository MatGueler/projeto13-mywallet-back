import express from 'express'
import cors from 'cors'
import { MongoClient, ObjectId } from "mongodb";
import joi from 'joi'
import dotenv from 'dotenv'
import dayjs from 'dayjs'

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

    const userSchema = joi.object({
        name: joi.string().required(),
        password: joi.string().required(),
        email: joi.string().required()
    });

    const body = {
        name,
        password,
        email
    }

    const validation = userSchema.validate(body, { abortEarly: true });

    if (validation.error) {
        console.log(validation.error.details)
        res.sendStatus(422)
        return
    }

    await db.collection("users").insertOne(body)

    // const valid = await db.collection("users").findOne({
    //     email
    // })
    // if (valid) {
    //     res.sendStatus(409)
    //     return
    // }

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
        res.status(409).send('usuario não encontrado')
        return
    }

    await db.collection("online").insertOne({ userId: valid._id })

    res.status(200).send(body)

})

// Menu
server.get('/menu', async (req, res) => {

    const id = ObjectId("62bde16b8a7194f30bc83691")

    const statement = await db.collection("statement").find({
        id
    }).toArray()

    res.status(200).send(statement)

})

// Entrada
server.post('/entrada', async (req, res) => {

    const id = ObjectId("62bde16b8a7194f30bc83691")

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