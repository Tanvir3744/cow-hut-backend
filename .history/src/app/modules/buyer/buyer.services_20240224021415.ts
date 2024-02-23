import { BAD_REQUEST } from 'http-status'
import ApiError from '../../../errors/apiError'
import { IBuyer, IBuyerFilter } from './buyer.interface'
import { Buyer } from './buyer.models'
import { IGenericResponse } from '../../../shared/IGenericResponse'
import { IpaginationOptions } from '../../../interface/IpaginationOptions'
import { BuyerSearchableFields } from './buyer.constants'
import { PaginationHelper } from '../../../helper/paginationHelper'
import { SortOrder } from 'mongoose'



const getSingleBuyer = async (id: string) => {
  const result = await Buyer.findById(id)
  if (!result) {
    throw new ApiError(BAD_REQUEST, 'something is went wrong!')
  }
  return result
}

const getAllBuyer = async (
  paginationOptions: IpaginationOptions,
  filters: IBuyerFilter,
): Promise<IGenericResponse<IBuyer[]>> => {
  // search and filteration features
  const { searchTerm, ...filtersData } = filters
  const searchAndFiltersCondition = []

  // search implementation
  if (searchTerm) {
      searchAndFiltersCondition.push({
          $or: BuyerSearchableFields.map(field => ({
              [field]: {
                  $regex: searchTerm,
                  $options: 'i',
              },
          })),
      });
    };

    // filteration features
    if (Object.keys(filtersData).length) {
        searchAndFiltersCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        })
    };

    // sorting features and pagination features
    const {page, limit, sortBy, sortOrder, skip } = PaginationHelper.calculatePagination(paginationOptions);

    const sortAndPaginationCondition : {[sortBy: string]: SortOrder} = {}
    if (sortBy && sortOrder) {
        sortAndPaginationCondition[sortBy] = sortOrder;
    }

    const whereCondition = searchAndFiltersCondition.length > 0 ? {$and: searchAndFiltersCondition} : {};
    const result = await Buyer.find(whereCondition).skip(skip).limit(limit).sort(sortAndPaginationCondition);
    const total = await Buyer.countDocuments();
    return {
        meta: {
            page, 
            limit,
            total
        },
        data: result
    }

}

const updateBuyer = async(payload: Partial<IBuyer>, id:string) => {

  const result = await Buyer.findByIdAndUpdate({_id: id}, payload, { new: true });
  return result;
}

const deleteBuyer = async (id: string) => {
  const result = await Buyer.findByIdAndDelete(id);
  return result;
}

export const BuyerServices = {
  getSingleBuyer,
  getAllBuyer,
  updateBuyer, 
  deleteBuyer, 
}
