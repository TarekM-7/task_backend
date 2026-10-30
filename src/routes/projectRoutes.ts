import { Router } from 'express'
import { ProjectController } from '../controllers/ProjectController'
import { idProjectValidator, projectValidator } from '../validators/projectValidator'
import { handleInputErrors } from '../middleware/validation'
import { TaskController } from '../controllers/TaskController'
import { validateProjectExists } from '../middleware/project'

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
    '/:id/tasks',
    idProjectValidator,
    handleInputErrors,
    validateProjectExists,
    TaskController.createTask
)

export default router
