import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import router from './routes'
import httpStatus from 'http-status'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import mongoose from 'mongoose'
import config from './config'

const app: Application = express()

//handle middleware
app.use(cors())
app.use(express.json())
app.use('/api/v1/', router)
app.use(express.urlencoded({ extended: true }))

//application route
app.use(globalErrorHandler)
/* app.use('/api/v1/users/', UserRoutes) */

/* app.get("/", (req:Request, res:Response) => {
    res.send("application is running successfully");
}) */

async function main() {
  try {
    await mongoose.connect(config.database_url as string)

    console.log('database has been connected')

    app.listen(config.port, () => {
      console.log(`app listening on port ${config.port}`)
    })
  } catch (error) {
    console.log('database dont want to connect ', error)
  }
}
main()

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Ooops! not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'api not found',
      },
    ],
  })
  next()
})

export default app
