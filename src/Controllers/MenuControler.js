import { db, objectId } from '../dbMongo/Mongo.js'

export async function menuUser(req, res) {

    const { authorization } = req.headers

    const token = authorization?.replace('Bearer ', '')

    const verificationToken = await db.collection("online").findOne({
        token
    })

    const id = objectId(verificationToken.userId)

    const statement = await db.collection("statement").find({
        id
    }).toArray()

    res.status(200).send(statement)

}