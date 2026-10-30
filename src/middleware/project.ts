import { RequestHandler } from 'express'
import Project from '../models/Project'

export const validateProjectExists: RequestHandler = async (req, res, next) => {
    const { projectId } = req.params
    const project = await Project.findById(projectId)
    if (!project) {
        return res.status(404).json({ errors: [{ msg: 'Project not found' }] })
    }
    req.project = project
    next()
}
