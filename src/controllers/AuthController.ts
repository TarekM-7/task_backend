import { RequestHandler } from 'express'
import User from '../models/User'

export class AuthController {
    static createAccount: RequestHandler = async (req, res) => {
        const { name, email, password } = req.body

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(409).json({ errors: [{ msg: 'User already registered' }] })
        }

        const user = new User({ name, email, password })
        await user.save()

        res.status(201).json({ message: 'Account created, check your email to confirm it' })
    }
}
