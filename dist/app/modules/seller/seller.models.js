"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seller = void 0;
const mongoose_1 = require("mongoose");
const sellerSchema = new mongoose_1.Schema({
    name: {
        type: {
            firstName: {
                type: String,
                required: false,
            },
            lastName: {
                type: String,
                required: false,
            },
        },
    },
    address: {
        type: String,
        required: false,
    },
    phoneNumber: {
        type: String,
        required: false,
        unique: true,
    },
    budget: {
        type: Number,
        required: false,
    },
    income: {
        type: Number,
    },
}, {
    timestamps: true,
});
exports.Seller = (0, mongoose_1.model)('Seller', sellerSchema);
