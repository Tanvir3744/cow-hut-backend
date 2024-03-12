import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import router from './routes'
import httpStatus from 'http-status'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

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
