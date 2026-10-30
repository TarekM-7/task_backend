import { body } from 'express-validator'

export const taskValidator = [
    body('taskName')
        .exists()
        .withMessage('Task name is required')
        .bail()
        .isString()
        .withMessage('Task name must be a string')
        .bail()
        .trim()
        .notEmpty()
        .withMessage('Task name cannot be empty'),
    body('description')
        .exists()
        .withMessage('Description is required')
        .bail()
        .isString()
        .withMessage('Description must be a string')
        .bail()
        .trim()
        .notEmpty()
        .withMessage('Description cannot be empty')
]
