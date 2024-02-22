import { NextFunction, Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { SellerServices } from './seller.services'
import sendResponse from '../../../shared/sendResponse'
import { OK } from 'http-status'
import pick from '../../../shared/pick'
import { paginationData } from '../../../shared/filteringData'
import { ISeller } from './seller.interface'
import { sellerFilterableFields } from './seller.constants'

/* const createSeller = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body
  console.log('this is seller data', data, req.body)
  const result = await SellerServices.createSeller(data)

  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'Seller has been created Succesfully',
    data: result,
  })
  console.log(result, 'this is controllers data')
}) */

const getSingleSeller = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await SellerServices.getSingleSeller(id)
  sendResponse(res, {
    statusCode: OK,
    success: true,
    message: 'Seller retrived successfully',
    data: result,
  })
})

const getAllSeller = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = pick(req.query, paginationData)
    const filters = pick(req.query, sellerFilterableFields)
    const result = await SellerServices.getAllSeller(paginationOptions, filters)

    sendResponse<ISeller[]>(res, {
      statusCode: OK,
      success: true,
      message: 'Sellers retrived successfully',
      data: result.data,
      meta: result.meta,
    })
    next()
  },
)

const updateSeller = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const updatedData = req.body
    const result = await SellerServices.updateSeller(id, updatedData)
    sendResponse<ISeller>(res, {
      statusCode: OK,
      success: true,
      message: 'Sellers information has updated successfully',
      data: result,
    }),
      next()
  },
)

const deleteSeller = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const result = await SellerServices.deleteSeller(id)
    sendResponse<ISeller>(res, {
      statusCode: OK,
      success: true,
      message: 'Seller deleted Successfully',
      data: result,
    }),
      next()
  },
)

export const SellerController = {
  getSingleSeller,
  getAllSeller,
  updateSeller,
  deleteSeller,
}
