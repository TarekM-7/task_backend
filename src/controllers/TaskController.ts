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

    static getTaskById: RequestHandler = async (req, res) => {
        const { taskId } = req.params
        const task = await Task.findById(taskId)
        if (!task) {
            return res.status(404).json({ errors: [{ msg: 'Task not found' }] })
        }
        if (task.project.toString() !== req.project._id.toString()) {
            return res.status(400).json({ errors: [{ msg: 'Not a valid action' }] })
        }
        res.json({ data: task })
    }
}
