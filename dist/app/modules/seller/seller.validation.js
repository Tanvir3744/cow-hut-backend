"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerValidationZodSchema = void 0;
const zod_1 = require("zod");
const updateSellerZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        seller: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'first name is required'
                }).optional(),
                lastName: zod_1.z.string({
                    required_error: 'last name of seller is required',
                }).optional(),
            }).optional(),
            address: zod_1.z.string({
                required_error: 'address is required',
            }).optional(),
            phoneNumber: zod_1.z.string({
                required_error: "phone number is reqired",
            }).optional(),
            income: zod_1.z.number({
                required_error: 'income is required',
            }).optional(),
            budget: zod_1.z.number({
                required_error: 'budget is reqired',
            })
        })
    })
});
exports.SellerValidationZodSchema = {
    updateSellerZodSchema,
};
