import { OK } from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import { ICow } from './cow.interface'
import { NextFunction, Request, Response } from 'express'
import pick from '../../../shared/pick'
import { CowServices } from './cow.services'
import { cowFilterableFields } from './cow.constants'
import { paginationData } from '../../../shared/filteringData'

const createCow = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body
  const result = await CowServices.createCow(data)
  await result.populate("seller").execPopulate();
  console.log(result, 'cow controller console.log')

  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'cow data has been created Succesfully',
    data: result,
  })
  console.log(result, 'this is controllers data')
})

const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await CowServices.getSingleCow(id)
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'Cow data retrived successfully',
    data: result,
  })
})

const getAllcow = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationData)
    const filters = pick(req.query, cowFilterableFields)
    const result = await CowServices.getAllCow(paginationOptions, filters)

    sendResponse<ICow[]>(res, {
      statusCode: OK,
      success: true,
      message: 'information of cow retrived successfully',
      data: result.data,
      meta: result.meta,
    })
    next()
  },
)

const updateCow = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const updatedData = req.body
    const result = await CowServices.updateCow(id, updatedData)
    sendResponse<ICow>(res, {
      statusCode: OK,
      success: true,
      message: ' informations about has updated successfully',
      data: result,
    }),
      next()
  },
)

const deleteCow = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const result = await CowServices.deleteCow(id)
    sendResponse<ICow>(res, {
      statusCode: OK,
      success: true,
      message: 'Cow deleted Successfully',
      data: result,
    }),
      next()
  },
)

export const CowController = {
  getSingleCow,
  getAllcow,
  updateCow,
  deleteCow,
  createCow,
}
