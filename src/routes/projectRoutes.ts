import { Router } from 'express'
import { ProjectController } from '../controllers/ProjectController'
import {
    idProjectValidator,
    projectIdValidator,
    projectValidator
} from '../validators/projectValidator'
import { handleInputErrors } from '../middleware/validation'
import { TaskController } from '../controllers/TaskController'
import { projectExists } from '../middleware/project'
import { taskIdValidator, taskStatusValidator, taskValidator } from '../validators/taskValidator'
import { taskExists } from '../middleware/task'

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
    projectExists,
    TaskController.createTask
)

router.get(
    '/:projectId/tasks',
    projectIdValidator,
    handleInputErrors,
    projectExists,
    TaskController.getProjectTasks
)

router.get(
    '/:projectId/tasks/:taskId',
    projectIdValidator,
    taskIdValidator,
    handleInputErrors,
    projectExists,
    taskExists,
    TaskController.getTaskById
)

router.put(
    '/:projectId/tasks/:taskId',
    projectIdValidator,
    taskIdValidator,
    taskValidator,
    handleInputErrors,
    projectExists,
    taskExists,
    TaskController.updateTask
)

router.delete(
    '/:projectId/tasks/:taskId',
    projectIdValidator,
    taskIdValidator,
    handleInputErrors,
    projectExists,
    taskExists,
    TaskController.deleteTask
)

router.post(
    '/:projectId/tasks/:taskId/status',
    projectIdValidator,
    taskIdValidator,
    taskStatusValidator,
    handleInputErrors,
    projectExists,
    taskExists,
    TaskController.updateStatus
)

export default router
