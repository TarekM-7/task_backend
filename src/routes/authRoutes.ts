import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import { authValidator, loginValidator, tokenValidator } from '../validators/authValidator'
import { handleInputErrors } from '../middleware/validation'

const router = Router()

router.post('/create-account', authValidator, handleInputErrors, AuthController.createAccount)

router.post('/confirm-account', tokenValidator, handleInputErrors, AuthController.confirmAccount)

router.post('/login', loginValidator, handleInputErrors, AuthController.login)

export default router
