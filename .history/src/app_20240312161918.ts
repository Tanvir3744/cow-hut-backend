import express, {Application, NextFunction, Request, Response} from 'express';
import cors from 'cors';
import router from './routes';
import httpStatus from 'http-status';

const app: Application = express();

//handle middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//application route
/* app.use('/api/v1/users/', UserRoutes) */
app.use('/api/v1/', router)

app.get("/", (req:Request, res:Response) => {
    res.send("application is running successfully");
})

/* app.use((req:Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Ooops! not found",
        errorMessages: [{
            path:req.originalUrl,
            message: 'api not found'
        }]
    });
    next();
}) */


export default app;