import { db } from '../dbMongo/Mongo.js'
import dayjs from 'dayjs'

export async function reciveTransfer(req, res) {

    const verificationToken = res.locals.verificationToken

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

}

export async function payTransfer(req, res) {

    const verificationToken = res.locals.verificationToken

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

}