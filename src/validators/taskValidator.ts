import { body, param } from 'express-validator'
import { taskStatus } from '../models/Task'

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

export const taskIdValidator = [param('taskId').isMongoId().withMessage('Invalid Task ID')]

export const taskStatusValidator = [
    body('status')
        .exists()
        .withMessage('Status is required')
        .bail()
        .isString()
        .withMessage('Status must be a string')
        .bail()
        .isIn(Object.values(taskStatus))
        .withMessage('Invalid status')
]
