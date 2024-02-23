import { Request, RequestHandler, Response } from 'express';
import { UserService } from './user.services';
import status from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';


// create seller controller along with user;
const createSeller:RequestHandler = catchAsync(async (req: Request, res: Response) => {
    const { seller, ...data } = req.body;
    console.log(data, "this is data from user controller")
    const result = await UserService.createSeller(seller, data);
    sendResponse(res, {
        statusCode:status.OK ,
        success: true,
        message: "Successfully user has been created",
        data: result,
    });
})

// create buyer controller along with user;
const createBuyer: RequestHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { buyer, ...data } = req.body;
    const result = await UserService.createBuyer(buyer, data);

    sendResponse(res, {
        statusCode: status.OK,
        success: true, 
        message: 'Buyer has created successfully', 
        data: result,
    })
}) 

/* const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserService.getSingleUser(id);
    sendResponse(res, {
        statusCode: status.OK,
        success: true, 
        message: "User Successfully retrived",
        data: result
    })
    
})

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationData)
    console.log(paginationData)
    const filters = pick(req.query,['role', 'searchTerm'])
    const result = await UserService.getAllUsers(paginationOptions, filters);
    
    sendResponse(res, {
        statusCode: status.OK,
        success: true, 
        message: 'retrived all users',
        data: result.data,
    })
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
    const  id = req.params.id;
    const updateData = req.body;
    const result = await UserService.updateUser(id, updateData);
    sendResponse<IUser>(res, {
        statusCode: status.OK, 
        success: true, 
        message: 'User has been sucessfully updated',
        data: result
    })
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await UserService.deleteUser(id);
    sendResponse<IUser>(res, {
        statusCode: status.OK,
        success: true,
        message: 'user has been deleted successfully!', 
        data: result,
    })
}) */

export const UserController = {
    createSeller,
}