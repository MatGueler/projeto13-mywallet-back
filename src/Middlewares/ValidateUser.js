import { db } from '../dbMongo/Mongo.js'

async function validateUser(req, res, next) {

    const { authorization } = req.headers

    const token = authorization?.replace('Bearer ', '')

    const verificationToken = await db.collection("online").findOne({
        token
    })

    if (!verificationToken) {
        return res.sendStatus(401);
    }

    res.locals.verificationToken = verificationToken

    next()
}

export default validateUser;