import { Router } from 'express'
import { AuthController } from '../controllers/AuthController'
import { authValidator } from '../validators/authValidator'
import { handleInputErrors } from '../middleware/validation'

const router = Router()

router.post('/create-account', authValidator, handleInputErrors, AuthController.createAccount)

export default router
