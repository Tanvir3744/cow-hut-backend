"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const createSellerZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: 'password is required'
        }).optional(),
        seller: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'first name is required',
                }).optional(),
                lastName: zod_1.z.string({
                    required_error: 'last name of seller is required',
                }).optional(),
            }),
            address: zod_1.z.string({
                required_error: 'address is required',
            }).optional(),
            phoneNumber: zod_1.z.string({
                required_error: 'phone number is required',
            }).optional(),
            income: zod_1.z.number({
                required_error: 'income is required',
            }).optional(),
            budget: zod_1.z.number({
                required_error: 'budget is required',
            }).optional(),
        })
    }),
});
const createBuyerZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: 'password is required'
        }).optional(),
        seller: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'first name is required',
                }).optional(),
                lastName: zod_1.z.string({
                    required_error: 'last name of seller is required',
                }).optional(),
            }),
            address: zod_1.z.string({
                required_error: 'address is required',
            }).optional(),
            phoneNumber: zod_1.z.string({
                required_error: 'phone number is required',
            }).optional(),
            income: zod_1.z.number({
                required_error: 'income is required',
            }).optional(),
            budget: zod_1.z.number({
                required_error: 'budget is required',
            }).optional(),
        })
    }),
});
exports.userValidation = {
    createSellerZodSchema,
    createBuyerZodSchema,
};
