import { ErrorRequestHandler, RequestHandler } from 'express'

export const handleErrors: ErrorRequestHandler = (err, req, res, next) => {
    const status = err.status || 500

    if (status === 500) console.error(err)
    const message = status === 500 ? 'Internal server error' : err.message
    res.status(status).json({ errors: [{ msg: message }] })
}

export const notFound: RequestHandler = (req, res) => {
    return res.status(404).json({ errors: [{ msg: 'Route not found' }] })
}
