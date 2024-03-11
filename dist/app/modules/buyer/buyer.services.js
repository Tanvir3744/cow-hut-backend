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
exports.BuyerServices = void 0;
const http_status_1 = require("http-status");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const buyer_models_1 = require("./buyer.models");
const buyer_constants_1 = require("./buyer.constants");
const paginationHelper_1 = require("../../../helper/paginationHelper");
const getSingleBuyer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield buyer_models_1.Buyer.findById(id);
    if (!result) {
        throw new apiError_1.default(http_status_1.BAD_REQUEST, 'something is went wrong!');
    }
    return result;
});
const getAllBuyer = (paginationOptions, filters) => __awaiter(void 0, void 0, void 0, function* () {
    // search and filteration features
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const searchAndFiltersCondition = [];
    // search implementation
    if (searchTerm) {
        searchAndFiltersCondition.push({
            $or: buyer_constants_1.BuyerSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    ;
    // filteration features
    if (Object.keys(filtersData).length) {
        searchAndFiltersCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value
            }))
        });
    }
    ;
    // sorting features and pagination features
    const { page, limit, sortBy, sortOrder, skip } = paginationHelper_1.PaginationHelper.calculatePagination(paginationOptions);
    const sortAndPaginationCondition = {};
    if (sortBy && sortOrder) {
        sortAndPaginationCondition[sortBy] = sortOrder;
    }
    const whereCondition = searchAndFiltersCondition.length > 0 ? { $and: searchAndFiltersCondition } : {};
    const result = yield buyer_models_1.Buyer.find(whereCondition).skip(skip).limit(limit).sort(sortAndPaginationCondition);
    const total = yield buyer_models_1.Buyer.countDocuments();
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
});
const updateBuyer = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield buyer_models_1.Buyer.findByIdAndUpdate({ _id: id }, payload, { new: true });
    return result;
});
const deleteBuyer = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield buyer_models_1.Buyer.findByIdAndDelete(id);
    return result;
});
exports.BuyerServices = {
    getSingleBuyer,
    getAllBuyer,
    updateBuyer,
    deleteBuyer,
};
