import { db, objectId } from '../dbMongo/Mongo.js'

export async function menuUser(req, res) {

    const verificationToken = res.locals.verificationToken

    const id = objectId(verificationToken.userId)

    const statement = await db.collection("statement").find({
        id
    }).toArray()

    res.status(200).send(statement)

}

export async function deleteTransfer(req, res) {

    const { transferId } = req.body

    const verificationToken = res.locals.verificationToken

    const id = objectId(verificationToken.userId)

    try {
        await db.collection('statement').deleteOne({
            _id: objectId(transferId)
        })

        const statement = await db.collection('statement').find({
            id
        }).toArray()

        res.status(200).send(statement)
    }
    catch {
        res.status(500)
    }
}