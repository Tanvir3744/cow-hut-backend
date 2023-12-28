import { Request, Response, NextFunction, RequestHandler } from "express";

const catchAsync = (fn:RequestHandler ) => {
    return async (req:Request , res:Response, next: NextFunction) => {
        try {
            return await fn(req, res, next);
        } catch (err) {
            console.log(err)
            next(err)
            
        }
    }
}

export default catchAsync;