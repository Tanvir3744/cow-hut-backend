"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyerValidationZodSchema = void 0;
const zod_1 = require("zod");
const createBuyerZodShcema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'First name is required',
            }),
            lastName: zod_1.z.string({
                required_error: 'Last name is required',
            }),
        }),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }),
        phoneNumber: zod_1.z.string({
            required_error: 'Phone number is required',
        }),
        budget: zod_1.z.number({
            required_error: 'Budget is required',
        }),
        income: zod_1.z.number({
            required_error: 'Income is required',
        }).optional(),
    }),
});
// schema for updating the buyer schema and prevent unusual errors;
const updateBuyerZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'First name is required',
            }).optional(),
            lastName: zod_1.z.string({
                required_error: 'Last name is required',
            }).optional(),
        }).optional(),
        address: zod_1.z.string({
            required_error: 'Address is required',
        }).optional(),
        phoneNumber: zod_1.z.string({
            required_error: 'Phone number is required',
        }).optional(),
        budget: zod_1.z.number({
            required_error: 'Budget is required',
        }).optional(),
        income: zod_1.z.number({
            required_error: 'Income is required',
        }).optional(),
    }).optional(),
});
exports.BuyerValidationZodSchema = {
    createBuyerZodShcema,
    updateBuyerZodSchema,
};
