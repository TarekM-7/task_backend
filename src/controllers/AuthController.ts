import { RequestHandler } from 'express'
import User from '../models/User'
import { hashPassword } from '../utils/auth'
import { generateToken } from '../utils/token'
import Token from '../models/Token'
import { transporter } from '../config/nodemailer'

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

        await transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: 'UpTask - Confirma tu cuenta',
            text: 'UpTask - Confirma tu cuenta',
            html: '<p>Probando Email</p>'
        })

        res.status(201).json({ message: 'Account created, check your email to confirm it' })
    }
}
