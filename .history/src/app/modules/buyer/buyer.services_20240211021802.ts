import { BAD_REQUEST } from 'http-status'
import ApiError from '../../../errors/apiError'
import { IBuyer, IBuyerFilter } from './buyer.interface'
import { Buyer } from './buyer.models'
import { IGenericResponse } from '../../../shared/IGenericResponse'
import { IpaginationOptions } from '../../../interface/IpaginationOptions'
import { BuyerSearchableFields } from './buyer.constants'
import { PaginationHelper } from '../../../helper/paginationHelper'
import { SortOrder } from 'mongoose'

const createBuyer = async (payload: string): Promise<IBuyer | null> => {
  const result = await Buyer.create(payload)
  return result
}

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


}

export const BuyerServices = {
  createBuyer,
  getSingleBuyer,
  getAllBuyer,
}
