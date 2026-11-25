import { body } from 'express-validator'

export const authValidator = [
    body('name')
        .exists()
        .withMessage('Name is required')
        .bail()
        .isString()
        .withMessage('Name must be a string')
        .bail()
        .trim()
        .notEmpty()
        .withMessage('Name cannot be empty'),
    body('password')
        .exists()
        .withMessage('Password is required')
        .bail()
        .isString()
        .withMessage('Password must be a string')
        .bail()
        .notEmpty()
        .withMessage('Password cannot be empty')
        .bail()
        .isLength({ min: 8 })
        .withMessage('Password must have at least 8 characters'),
    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match')
        }
        return true
    }),
    body('email')
        .exists()
        .withMessage('Email is required')
        .bail()
        .isString()
        .withMessage('Email must be a string')
        .bail()
        .trim()
        .notEmpty()
        .withMessage('Email cannot be empty')
        .bail()
        .isEmail()
        .withMessage('Email is not valid')
]
