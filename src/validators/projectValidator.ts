import { body, param } from 'express-validator'

export const projectValidator = [
    body('projectName')
        .exists()
        .withMessage('Project name is required')
        .bail()
        .isString()
        .withMessage('Project name must be a string')
        .bail()
        .trim()
        .notEmpty()
        .withMessage('Project name cannot be empty'),
    body('clientName')
        .exists()
        .withMessage('Client name is required')
        .bail()
        .isString()
        .withMessage('Client name must be a string')
        .bail()
        .trim()
        .notEmpty()
        .withMessage('Client name cannot be empty'),
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

export const idProjectValidator = [param('id').isMongoId().withMessage('Invalid ID')]
