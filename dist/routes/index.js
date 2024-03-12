"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../app/modules/users/user.route");
const seller_route_1 = require("../app/modules/seller/seller.route");
const cow_route_1 = require("../app/modules/cow/cow.route");
const buyer_route_1 = require("../app/modules/buyer/buyer.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/seller',
        route: seller_route_1.SellerRoutes,
    },
    {
        path: '/buyer',
        route: buyer_route_1.BuyerRoutes,
    },
    {
        path: '/cows',
        route: cow_route_1.cowRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route)); // this is demonstarting -> router.use('/users', UserRoutes);
exports.default = router;
