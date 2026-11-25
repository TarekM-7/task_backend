import { RequestHandler } from 'express'

export class AuthController {
    static createAccount: RequestHandler = async (req, res) => {
        res.send('From api Auth')
    }
}
