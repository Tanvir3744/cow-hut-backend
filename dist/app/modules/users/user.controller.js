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
exports.UserController = void 0;
const user_services_1 = require("./user.services");
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
// create seller controller along with user;
const createSeller = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { seller } = _a, data = __rest(_a, ["seller"]);
    console.log(data, "this is data from user controller");
    const result = yield user_services_1.UserService.createSeller(seller, data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Successfully user has been created",
        data: result,
    });
}));
// create buyer controller along with user;
const createBuyer = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _b = req.body, { buyer } = _b, data = __rest(_b, ["buyer"]);
    const result = yield user_services_1.UserService.createBuyer(buyer, data);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Buyer has created successfully',
        data: result,
    });
    next();
}));
/* const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserService.getSingleUser(id);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "User Successfully retrived",
        data: result
    })
    
})

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationData)
    console.log(paginationData)
    const filters = pick(req.query,['role', 'searchTerm'])
    const result = await UserService.getAllUsers(paginationOptions, filters);
    
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: 'retrived all users',
        data: result.data,
    })
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
    const  id = req.params.id;
    const updateData = req.body;
    const result = await UserService.updateUser(id, updateData);
    sendResponse<IUser>(res, {
        statusCode: status.OK,
        success: true,
        message: 'User has been sucessfully updated',
        data: result
    })
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await UserService.deleteUser(id);
    sendResponse<IUser>(res, {
        statusCode: status.OK,
        success: true,
        message: 'user has been deleted successfully!',
        data: result,
    })
}) */
exports.UserController = {
    createSeller,
    createBuyer,
};
