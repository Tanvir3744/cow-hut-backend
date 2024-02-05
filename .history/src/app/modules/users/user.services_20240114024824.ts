import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/apiError'
import { IpaginationOptions } from '../../../interface/IpaginationOptions'
import { IGenericResponse } from '../../../shared/IGenericResponse'
import { IUser, IUserFilters } from './user.interface'
import { User } from './user.model'
import status from 'http-status'
import { PaginationHelper } from '../../../helper/paginationHelper'
import { userSearchableFields } from './user.constants'

const createUser = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload)
  console.log(result)

  if (!result) {
    throw new ApiError(status.BAD_REQUEST, 'failed to create user')
  }

  return result
}

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id)
  return result
}

const getAllUsers = async (
  paginationOptions: IpaginationOptions,
  filters: IUserFilters,
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData} = filters
  const userFilterAndSearchCondition = []

  if (searchTerm) {
    userFilterAndSearchCondition.push({
      $or: userSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  //filtering data 
  if (Object.keys(filtersData).length) {
    userFilterAndSearchCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value
      }))
    })
  }

  // sorting users
  const {
    page,
    limit = 10,
    sortBy,
    sortOrder,
    skip,
  } = PaginationHelper.calculatePagination(paginationOptions)
  const sortCondition: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  // write where condition accroding to the desired data
  const whereCondition = userFilterAndSearchCondition.length > 0 ? { $and: userFilterAndSearchCondition } : {};

  const result = await User.find(whereCondition).sort(sortCondition).skip(skip).limit(limit)
  const total = await User.countDocuments()
  return {
    meta: {
      page, 
      limit, 
      total,
    },
    data: result,
  }
}


// update user information 
const updateUser = async (id: string, payload: <Partial>) => {

}

export const UserService = {
  createUser,
  getSingleUser,
  getAllUsers,
}
