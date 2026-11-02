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

    static getTaskById: RequestHandler = (req, res) => {
        res.json({ data: req.task })
    }

    static updateTask: RequestHandler = async (req, res) => {
        const { taskName, description } = req.body
        req.task.taskName = taskName
        req.task.description = description
        await req.task.save()
        res.json({ data: req.task })
    }

    static deleteTask: RequestHandler = async (req, res) => {
        req.project.tasks = req.project.tasks.filter(
            (id) => id?.toString() !== req.task._id.toString()
        )

        await req.task.deleteOne()
        await req.project.save()
        res.status(204).end()
    }

    static updateStatus: RequestHandler = async (req, res) => {
        const { status } = req.body
        req.task.status = status

        await req.task.save()
        res.json({ data: req.task })
    }
}
