import httpStatus, { BAD_REQUEST } from 'http-status'
import ApiError from '../../../errors/apiError'
import { ICow, ICowFilters } from './cow.interface'
import { Cow } from './cow.models'
import { IpaginationOptions } from '../../../interface/IpaginationOptions'
import { IGenericResponse } from '../../../shared/IGenericResponse'
import { cowSearchableFields } from './cow.constants'
import { PaginationHelper } from '../../../helper/paginationHelper'
import { SortOrder } from 'mongoose'

const createCow = async (payload: ICow): Promise<ICow> => {
  const result = await Cow.create(payload)
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create seller')
    }
   
  return result
}

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id)
  if (!result) {
    throw new ApiError(BAD_REQUEST, 'Seller did not found')
  }
  return result
}

const getAllCow = async (
  paginationOptions: IpaginationOptions,
  filters: ICowFilters,
): Promise<IGenericResponse<ICow[]>> => {
  //search and pagination start from here
  const { searchTerm, ...filtersData } = filters
  const searchAndFilterCondition = []

  // search term logic
  if (searchTerm) {
    searchAndFilterCondition.push({
      $or: cowSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  // filtering logic

  if (Object.keys(filtersData).length) {
    searchAndFilterCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  //sorting starts from here
  const {
    page,
    limit = 10,
    skip,
    sortBy,
    sortOrder,
  } = PaginationHelper.calculatePagination(paginationOptions)
  const sortCondition: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  // where condition starts from here
  const whereCondition =
    searchAndFilterCondition.length > 0
      ? { $and: searchAndFilterCondition }
      : {}

  const result = await Cow.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await Cow.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const updateCow = async (id: string, payload: Partial<ICow>) => {
  const result = await Cow.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}

const deleteCow = async (id: string) => {
  const result = await Cow.findByIdAndDelete(id)
  return result
}

export const CowServices = {
  createCow,
  getSingleCow,
  getAllCow,
  updateCow,
  deleteCow,
}
