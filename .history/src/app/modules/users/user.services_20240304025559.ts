import ApiError from '../../../errors/apiError'
import mongoose from 'mongoose';
import { ISeller } from '../seller/seller.interface'
import { IUser} from './user.interface'
import { User } from './user.model'
import { Seller } from '../seller/seller.models';
import status, { BAD_REQUEST } from 'http-status'
import config from '../../../config';
import { IBuyer } from '../buyer/buyer.interface';
import { Buyer } from '../buyer/buyer.models';

// creating new seller along with user ;

const createSeller = async (seller: ISeller, user: IUser): Promise<IUser | null> => {
  user.role = 'seller';

  if (!user.password) {
    user.password = config.default_seller_pass as string;
  }

  let newUserAllData = null;
  const session = await mongoose.startSession();
  
  try {
    session.startTransaction();

    const newSeller = await Seller.create(seller, { session });

    if (!newSeller.length) {
      throw new ApiError(status.BAD_REQUEST, 'Failed to createSeller');
    }

    user.seller = newSeller[0];

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
    newUserAllData = await User.findOne(newUserAllData._id).populate('seller');
  }
  return newUserAllData;
}

// creating new buyer along with user; 

const createBuyer =async (buyer: IBuyer, user: IUser):Promise<IUser | null> => {
  user.role = "buyer";

  if (!user.password) {
    user.password = config.default_buyer_pass as string;
  }

  let newUserAllData = null;
  const session =await mongoose.startSession();
  try {
    session.startTransaction();

    // creating new buyer 
    const createNewBuyer = await Buyer.create([buyer], { session });
    
    //if buyer is failed to create;
    if (!createBuyer.length) {
      throw new ApiError(BAD_REQUEST, 'Buyer has failed to create');
    }

    //push new buyer data into user model ;
    user.buyer = createNewBuyer[0];

    const createNewUser = await User.create([user], { session });

    // if creation of new user is fail for some reason 
    if (!createNewUser.length) {
      throw new ApiError(BAD_REQUEST, 'User failed to create... Please Try Again!');
    };

    // push new user into newUserAllData variable...
    newUserAllData = createNewUser[0];


    // ending and committing transaction
    await session.commitTransaction();
    await session.endSession()
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  // if user and buyer has been created successfully then populate this all data;
  if (newUserAllData) {
    newUserAllData = await User.findOne({ _id: newUserAllData._id }).populate({
      path: 'buyer',
    })
  }

  return newUserAllData;
}


/* 
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
}  */

export const UserService = {
  createSeller,
  createBuyer,
}
