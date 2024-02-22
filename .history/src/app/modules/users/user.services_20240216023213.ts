/* import { SortOrder } from 'mongoose' */
import ApiError from '../../../errors/apiError'
import { startSession } from 'mongoose';
import { ISeller } from '../seller/seller.interface'
/* import { IpaginationOptions } from '../../../interface/IpaginationOptions'
import { IGenericResponse } from '../../../shared/IGenericResponse' */
import { IUser} from './user.interface'
import { User } from './user.model'
import { Seller } from '../seller/seller.models';
import status from 'http-status'
/* import { PaginationHelper } from '../../../helper/paginationHelper'
import { userSearchableFields } from './user.constants' */

const createSeller = async (user: IUser, seller: ISeller): Promise<IUser | null> => {
  user.role = 'seller';

  const newUserAllData = null;
  const session = new startSession();

  try {
    session.startTransaction();

    const newSeller = await Seller.create([seller], { session });

    if (!newSeller.length) {
      throw new ApiError(status.BAD_REQUEST, 'Failed to createSeller');
    }

    user.student = newStudent[0]._id;

    const newUser = await User.create([user], { session });

  } catch (error) {
    console.log(error)
  }

  const result = await User.create(user)



 
  return result
}

/* const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id)
  return result
}

const getAllUsers = async (
  paginationOptions: IpaginationOptions,
  filters: IUserFilters,
): Promise<IGenericResponse<IUser[]>> => {
  const { searchTerm, ...filtersData } = filters;
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
const updateUser = async (id: string, payload: Partial<IUser>):Promise<IUser | null> => {
  const result = await User.findByIdAndUpdate({_id: id}, payload, { new: true })
  return result
}

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
} */

export const UserService = {
  createUser: createSeller,
  
}
