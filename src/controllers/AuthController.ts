import { RequestHandler } from 'express'
import User from '../models/User'
import { hashPassword } from '../utils/auth'
import { generateToken } from '../utils/token'
import Token from '../models/Token'
import { AuthEmail } from '../emails/AuthEmail'

export class AuthController {
    static createAccount: RequestHandler = async (req, res) => {
        const { name, email, password } = req.body

        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(409).json({ errors: [{ msg: 'User already registered' }] })
        }

        const user = new User({ name, email, password })
        user.password = await hashPassword(password)

        const token = new Token()
        token.token = generateToken()
        token.user = user._id

        await Promise.all([user.save(), token.save()])

        await AuthEmail.sendConfirmationEmail({
            email: user.email,
            name: user.name,
            token: token.token
        })

        res.status(201).json({ message: 'Account created, check your email to confirm it' })
    }

    static confirmAccount: RequestHandler = async (req, res) => {
        const { token } = req.body

        const tokenExists = await Token.findOne({ token })

        if (!tokenExists) {
            return res.status(404).json({ errors: [{ msg: 'Invalid token' }] })
        }

        const user = await User.findById(tokenExists.user)
        if (!user) {
            return res.status(404).json({ errors: [{ msg: 'User not found' }] })
        }

        user.confirmed = true

        await Promise.all([user.save(), tokenExists.deleteOne()])

        res.json({ message: 'Account confirmed successfully' })
    }
}
