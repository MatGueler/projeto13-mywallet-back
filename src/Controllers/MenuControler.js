import { db, objectId } from '../dbMongo/Mongo.js'

export async function menuUser(req, res) {

    const verificationToken = res.locals.verificationToken

    const id = objectId(verificationToken.userId)

    const statement = await db.collection("statement").find({
        id
    }).toArray()

    res.status(200).send(statement)

}

