"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerServices = void 0;
/* import httpStatus, { BAD_REQUEST } from "http-status"; */
const http_status_1 = require("http-status");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const seller_models_1 = require("./seller.models");
const paginationHelper_1 = require("../../../helper/paginationHelper");
const seller_constants_1 = require("./seller.constants");
const getSingleSeller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield seller_models_1.Seller.findById(id);
    if (!result) {
        throw new apiError_1.default(http_status_1.BAD_REQUEST, 'Seller did not found');
    }
    return result;
});
const getAllSeller = (paginationOptions, filters) => __awaiter(void 0, void 0, void 0, function* () {
    //search and pagination start from here
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const searchAndFilterCondition = [];
    // search term logic
    if (searchTerm) {
        searchAndFilterCondition.push({
            $or: seller_constants_1.SellerSearchableFileds.map((field) => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                }
            }))
        });
    }
    // filtering logic
    if (Object.keys(filtersData).length) {
        searchAndFilterCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        });
    }
    //sorting starts from here
    const { page, limit = 10, skip, sortBy, sortOrder } = paginationHelper_1.PaginationHelper.calculatePagination(paginationOptions);
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    // where condition starts from here
    const whereCondition = searchAndFilterCondition.length > 0 ? { $and: searchAndFilterCondition } : {};
    const result = yield seller_models_1.Seller.find(whereCondition).sort(sortCondition).skip(skip).limit(limit);
    const total = yield seller_models_1.Seller.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updateSeller = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield seller_models_1.Seller.findByIdAndUpdate({ _id: id }, payload, { new: true });
    return result;
});
const deleteSeller = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield seller_models_1.Seller.findByIdAndDelete(id);
    return result;
});
exports.SellerServices = {
    getSingleSeller,
    getAllSeller,
    updateSeller,
    deleteSeller
};
