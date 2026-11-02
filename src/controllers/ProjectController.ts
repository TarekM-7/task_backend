import { RequestHandler } from 'express'
import Project from '../models/Project'

export class ProjectController {
    static createProject: RequestHandler = async (req, res) => {
        const { projectName, clientName, description } = req.body
        const project = new Project({ projectName, clientName, description })

        await project.save()
        res.status(201).json({
            data: project
        })
    }

    static getAllProjects: RequestHandler = async (req, res) => {
        const projects = await Project.find({})
        res.json({ data: projects })
    }

    static getProjectById: RequestHandler = async (req, res) => {
        const { id } = req.params
        const project = await Project.findById(id).populate('tasks')
        if (!project) {
            return res.status(404).json({ errors: [{ msg: 'Project not found' }] })
        }
        res.json({ data: project })
    }

    static updateProject: RequestHandler = async (req, res) => {
        const { id } = req.params
        const { projectName, clientName, description } = req.body
        const project = await Project.findById(id)
        if (!project) {
            return res.status(404).json({ errors: [{ msg: 'Project not found' }] })
        }

        project.projectName = projectName
        project.clientName = clientName
        project.description = description
        await project.save()
        res.json({ data: project })
    }

    static deleteProject: RequestHandler = async (req, res) => {
        const { id } = req.params
        const project = await Project.findByIdAndDelete(id)
        if (!project) {
            return res.status(404).json({ errors: [{ msg: 'Project not found' }] })
        }
        res.status(204).end()
    }
}
