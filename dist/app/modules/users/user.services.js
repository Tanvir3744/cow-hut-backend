"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("./user.model");
const seller_models_1 = require("../seller/seller.models");
const http_status_1 = __importStar(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const buyer_models_1 = require("../buyer/buyer.models");
// creating new seller along with user ;
const createSeller = (seller, user) => __awaiter(void 0, void 0, void 0, function* () {
    user.role = 'seller';
    if (!user.password) {
        user.password = config_1.default.default_seller_pass;
    }
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newSeller = yield seller_models_1.Seller.create(seller, { session });
        if (!newSeller.length) {
            throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to createSeller');
        }
        user.seller = newSeller[0];
        const newUser = yield user_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create User');
        }
        newUserAllData = newUser[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (newUserAllData) {
        newUserAllData = yield user_model_1.User.findOne(newUserAllData._id).populate('seller');
    }
    return newUserAllData;
});
// creating new buyer along with user; 
const createBuyer = (buyer, user) => __awaiter(void 0, void 0, void 0, function* () {
    user.role = "buyer";
    if (!user.password) {
        user.password = config_1.default.default_buyer_pass;
    }
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // creating new buyer 
        const createNewBuyer = yield buyer_models_1.Buyer.create([buyer], { session });
        //if buyer is failed to create;
        if (!createBuyer.length) {
            throw new apiError_1.default(http_status_1.BAD_REQUEST, 'Buyer has failed to create');
        }
        //push new buyer data into user model ;
        user.buyer = createNewBuyer[0];
        const createNewUser = yield user_model_1.User.create([user], { session });
        // if creation of new user is fail for some reason 
        if (!createNewUser.length) {
            throw new apiError_1.default(http_status_1.BAD_REQUEST, 'User failed to create... Please Try Again!');
        }
        ;
        // push new user into newUserAllData variable...
        newUserAllData = createNewUser[0];
        // ending and committing transaction
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    // if user and buyer has been created successfully then populate this all data;
    if (newUserAllData) {
        newUserAllData = yield user_model_1.User.findOne({ _id: newUserAllData._id }).populate({
            path: 'buyer',
        });
    }
    return newUserAllData;
});
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
exports.UserService = {
    createSeller,
    createBuyer,
};
