import { RequestHandler } from 'express'
import Project from '../models/Project'
import Task from '../models/Task'

export class TaskController {
    static createTask: RequestHandler = async (req, res) => {
        const { id } = req.params
        const project = await Project.findById(id)
        if (!project) {
            return res.status(404).json({ errors: [{ msg: 'Project not found' }] })
        }
        const { taskName, description } = req.body
        const task = new Task({ taskName, description, project: project._id })
        project.tasks.push(task._id)
        await Promise.all([task.save(), project.save()])
        return res.status(201).json({
            data: task
        })
    }
}
