import joi from 'joi'
import bcrypt from 'bcrypt'
import { db } from '../dbMongo/Mongo.js'

export async function registerUser(req, res) {

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
        alert(validation.error.details)
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

    res.sendStatus(200)

}