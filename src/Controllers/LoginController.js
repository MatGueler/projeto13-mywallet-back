import { v4 as uuid } from 'uuid'
import joi from 'joi'
import bcrypt from 'bcrypt'
import { db } from '../dbMongo/Mongo.js'


export async function loginUser(req, res) {

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

}