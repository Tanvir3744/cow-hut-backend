"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cows = void 0;
const mongoose_1 = require("mongoose");
const cowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        enum: [
            'Dhaka',
            'Chattogram',
            'Barishal',
            'Rajshahi',
            'Sylhet',
            'Comilla',
            'Rangpur',
            'Mymensingh',
        ],
        required: true,
    },
    breed: {
        type: String,
        enum: [
            'Brahman',
            'Nellore',
            'Sahiwal',
            'Gir',
            'Indigenous',
            'Tharparkar',
            'Kankrej',
        ],
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        enum: ['for sale', 'sold out'],
        required: true,
    },
    category: {
        type: String,
        enum: ['Dairy', 'Beef', 'DualPurpose'],
        required: true,
    },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Seller",
        required: true,
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Cows = (0, mongoose_1.model)('Cows', cowSchema);
