import { IProject } from '../models/Project'

declare global {
    namespace Express {
        interface Request {
            project: IProject
        }
    }
}
