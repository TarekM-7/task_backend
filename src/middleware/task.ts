import { RequestHandler } from 'express'
import Task from '../models/Task'

export const taskExists: RequestHandler = async (req, res, next) => {
    const { taskId } = req.params
    const task = await Task.findById(taskId)
    if (!task) {
        return res.status(404).json({ errors: [{ msg: 'Task not found' }] })
    }
    req.task = task
    next()
}

export const taskBelongsToProject: RequestHandler = (req, res, next) => {
    if (req.task.project.toString() !== req.project._id.toString()) {
        return res.status(400).json({ errors: [{ msg: 'Not a valid action' }] })
    }
    next()
}
