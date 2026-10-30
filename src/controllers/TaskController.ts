import { RequestHandler } from 'express'
import Task from '../models/Task'

export class TaskController {
    static createTask: RequestHandler = async (req, res) => {
        const { taskName, description } = req.body
        const task = new Task({ taskName, description, project: req.project._id })
        req.project.tasks.push(task._id)
        await Promise.all([task.save(), req.project.save()])
        return res.status(201).json({
            data: task
        })
    }

    static getProjectTasks: RequestHandler = async (req, res) => {
        const tasks = await Task.find({ project: req.project._id })
        res.json({ data: tasks })
    }
}
