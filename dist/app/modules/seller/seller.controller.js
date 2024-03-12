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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const seller_services_1 = require("./seller.services");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = require("http-status");
const pick_1 = __importDefault(require("../../../shared/pick"));
const filteringData_1 = require("../../../shared/filteringData");
const seller_constants_1 = require("./seller.constants");
const getSingleSeller = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield seller_services_1.SellerServices.getSingleSeller(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.OK,
        success: true,
        message: 'Seller retrived successfully',
        data: result,
    });
}));
const getAllSeller = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOptions = (0, pick_1.default)(req.query, filteringData_1.paginationData);
    const filters = (0, pick_1.default)(req.query, seller_constants_1.sellerFilterableFields);
    const result = yield seller_services_1.SellerServices.getAllSeller(paginationOptions, filters);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.OK,
        success: true,
        message: 'Sellers retrived successfully',
        data: result.data,
        meta: result.meta,
    });
    next();
}));
const updateSeller = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = req.body;
    const result = yield seller_services_1.SellerServices.updateSeller(id, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.OK,
        success: true,
        message: 'Sellers information has updated successfully',
        data: result,
    }),
        next();
}));
const deleteSeller = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield seller_services_1.SellerServices.deleteSeller(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.OK,
        success: true,
        message: 'Seller deleted Successfully',
        data: result,
    }),
        next();
}));
exports.SellerController = {
    getSingleSeller,
    getAllSeller,
    updateSeller,
    deleteSeller,
};
