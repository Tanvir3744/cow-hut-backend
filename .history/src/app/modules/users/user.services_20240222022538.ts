import ApiError from '../../../errors/apiError'
import mongoose from 'mongoose';
import { ISeller } from '../seller/seller.interface'
import { IUser} from './user.interface'
import { User } from './user.model'
import { Seller } from '../seller/seller.models';
import status from 'http-status'


const createSeller = async (user: IUser, seller: ISeller): Promise<IUser | null> => {
  user.role = 'seller';

  let newUserAllData = null;
  const session = await mongoose.startSession();
  
  try {
    session.startTransaction();

    const newSeller = await Seller.create([seller], { session });
    console.log(newSeller, 'this is new seller')

    if (!newSeller.length) {
      throw new ApiError(status.BAD_REQUEST, 'Failed to createSeller');
    }

    user.seller = newSeller[0]._id;
    console.log(user.seller, 'this is user dot seller')

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(status.BAD_REQUEST, 'Failed to create User');
    }

    newUserAllData = newUser[0];
    

    await session.commitTransaction();
    await session.endSession();

  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    
    throw error;
  }

  if (newUserAllData) {
    console.log(newUserAllData._id, 'new user all data')
    newUserAllData = await User.findById(newUserAllData?.id).populate('seller')
  }
  console.log(newUserAllData, 'this is new user all data id -> ', newUserAllData?.id)
  return newUserAllData;
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
  createSeller,
}
