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
exports.CowServices = void 0;
const http_status_1 = __importStar(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const cow_models_1 = require("./cow.models");
const cow_constants_1 = require("./cow.constants");
const paginationHelper_1 = require("../../../helper/paginationHelper");
/* import mongoose, { SortOrder } from 'mongoose' */
const createCow = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_models_1.Cows.create(payload);
    yield result.populate('seller');
    if (!result) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, 'failed to create seller');
    }
    return result;
});
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_models_1.Cows.findById(id).populate("seller");
    if (!result) {
        throw new apiError_1.default(http_status_1.BAD_REQUEST, 'Seller did not found');
    }
    return result;
});
const getAllCow = (paginationOptions, filters) => __awaiter(void 0, void 0, void 0, function* () {
    //search and pagination start from here
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const searchAndFilterCondition = [];
    // search term logic
    if (searchTerm) {
        searchAndFilterCondition.push({
            $or: cow_constants_1.cowSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // filtering logic
    if (Object.keys(filtersData).length) {
        searchAndFilterCondition.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    //sorting starts from here
    const { page, limit = 10, skip, sortBy, sortOrder, } = paginationHelper_1.PaginationHelper.calculatePagination(paginationOptions);
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    // where condition starts from here
    const whereCondition = searchAndFilterCondition.length > 0
        ? { $and: searchAndFilterCondition }
        : {};
    const result = yield cow_models_1.Cows.find(whereCondition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield cow_models_1.Cows.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const updateCow = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_models_1.Cows.findByIdAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_models_1.Cows.findByIdAndDelete(id);
    return result;
});
exports.CowServices = {
    createCow,
    getSingleCow,
    getAllCow,
    updateCow,
    deleteCow,
};
