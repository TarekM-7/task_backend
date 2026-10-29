import 'dotenv/config'
import server from './server'
import colors from 'colors'
import { connectDB } from './config/db'

const port = Number(process.env.PORT) || 4400

const startServer = async () => {
    try {
        await connectDB()
        server.listen(port, (error) => {
            if (error) {
                console.error(error)
                console.log(colors.bgRed.bold(`Error connecting on port: ${port}`))
                process.exit(1)
            }
            console.log(colors.bgGreen.bold(`Listening on port: ${port}`))
        })
    } catch (error) {
        console.error(error)
        console.log(colors.bgRed.bold('Error starting the server'))
        process.exit(1)
    }
}

startServer()
