import express, {Application,  Request, Response, NextFunction} from 'express';
import cors from 'cors';
import router from './routes';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

//handle middleware
app.use(cors({ origin: 'http://localhost:5000', credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(globalErrorHandler)
//application route
/* app.use('/api/v1/users/', UserRoutes) */
app.use('/api/v1/', router)

/* app.get("/", (req:Request, res:Response) => {
    res.send("application is running successfully");
}) */

app.use((req:Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Ooops! not found",
        errorMessages: [{
            path:req.originalUrl,
            message: 'api not found'
        }]
    });
    next();
})


export default app;