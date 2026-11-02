import { IProject } from '../models/Project'
import { ITask } from '../models/Task'

declare global {
    namespace Express {
        interface Request {
            project: IProject
            task: ITask
        }
    }
}
