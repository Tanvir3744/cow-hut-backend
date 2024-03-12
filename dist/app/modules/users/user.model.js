"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose_1 = require("mongoose");
exports.userSchema = new mongoose_1.Schema({
    password: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        required: false,
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Seller',
    },
    buyer: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Buyer',
    },
}, { timestamps: true, toJSON: { virtuals: true } });
exports.User = (0, mongoose_1.model)('User', exports.userSchema);
