import { db } from '../dbMongo/Mongo.js'

async function validateUser(req, res, next) {

    const { authorization } = req.headers

    const body = req.body

    const token = authorization?.replace('Bearer ', '')

    const verificationToken = await db.collection("online").findOne({
        token
    })

    if (!verificationToken) {
        return res.sendStatus(401);
    }

    res.locals.verificationToken = verificationToken
    res.locals.body = body

    next()
}

export default validateUser;