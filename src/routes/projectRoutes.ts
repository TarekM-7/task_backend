import { Router } from 'express'
import { ProjectController } from '../controllers/ProjectController'
import {
    idProjectValidator,
    projectIdValidator,
    projectValidator
} from '../validators/projectValidator'
import { handleInputErrors } from '../middleware/validation'
import { TaskController } from '../controllers/TaskController'
import { validateProjectExists } from '../middleware/project'
import { taskValidator } from '../validators/taskValidator'

const router = Router()

router.post('/', projectValidator, handleInputErrors, ProjectController.createProject)

router.get('/', ProjectController.getAllProjects)
router.get('/:id', idProjectValidator, handleInputErrors, ProjectController.getProjectById)

router.put(
    '/:id',
    idProjectValidator,
    projectValidator,
    handleInputErrors,
    ProjectController.updateProject
)

router.delete('/:id', idProjectValidator, handleInputErrors, ProjectController.deleteProject)

router.post(
    '/:projectId/tasks',
    projectIdValidator,
    taskValidator,
    handleInputErrors,
    validateProjectExists,
    TaskController.createTask
)

router.get(
    '/:projectId/tasks',
    projectIdValidator,
    handleInputErrors,
    validateProjectExists,
    TaskController.getProjectTasks
)

router.get(
    '/:projectId/tasks/:taskId',
    projectIdValidator,
    handleInputErrors,
    validateProjectExists,
    TaskController.getTaskById
)

export default router
