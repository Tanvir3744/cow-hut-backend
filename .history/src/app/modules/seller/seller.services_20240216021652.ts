/* import httpStatus, { BAD_REQUEST } from "http-status"; */
import { BAD_REQUEST } from "http-status";}
import ApiError from "../../../errors/apiError";
import { Seller } from "./seller.models"
import { ISeller, ISellerFilters } from "./seller.interface";
import { IGenericResponse } from "../../../shared/IGenericResponse";
import { IpaginationOptions } from "../../../interface/IpaginationOptions";
import { PaginationHelper } from "../../../helper/paginationHelper";
import { SortOrder } from "mongoose";
import { SellerSearchableFileds } from "./seller.constants";


/* const createSeller = async (payload: ISeller): Promise<ISeller> => {
    const result = await Seller.create(payload);
    if (!result) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'failed to create seller');
    }
    return result;
} */

const getSingleSeller = async (id: string): Promise<ISeller | null> => {
    const result = await Seller.findById(id);
    if (!result) {
        throw new ApiError(BAD_REQUEST, 'Seller did not found');
    }
    return result;
}

const getAllSeller = async (paginationOptions: IpaginationOptions, filters: ISellerFilters): Promise<IGenericResponse<ISeller[]>> => {

    //search and pagination start from here
    const {searchTerm, ...filtersData} = filters;
    const searchAndFilterCondition = [];

    // search term logic
    if (searchTerm) {
        searchAndFilterCondition.push({
            $or: SellerSearchableFileds.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                }
            }))
        })
    }

    // filtering logic

    if (Object.keys(filtersData).length) {
        searchAndFilterCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        })
    }


    //sorting starts from here
    const { page, limit = 10, skip, sortBy, sortOrder } = PaginationHelper.calculatePagination(paginationOptions);
    const sortCondition:{[key: string]: SortOrder} ={}
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }

    // where condition starts from here
    const whereCondition = searchAndFilterCondition.length > 0 ? { $and: searchAndFilterCondition } : {};

    const result = await  Seller.find(whereCondition).sort(sortCondition).skip(skip).limit(limit);
    const total =  await Seller.countDocuments();
    return {
        meta: {
            page, 
            limit,
            total,
        }, 
        data: result,
    };
}


const updateSeller = async (id: string, payload:Partial<ISeller>) => {
    const result = await Seller.findByIdAndUpdate({ _id: id }, payload, {new: true});
    return result;
} 

const deleteSeller = async (id:string) => {
    const result = await Seller.findByIdAndDelete(id);
    return result;
}


export const SellerServices = {
    createSeller,
    getSingleSeller,
    getAllSeller,
    updateSeller, 
    deleteSeller
}