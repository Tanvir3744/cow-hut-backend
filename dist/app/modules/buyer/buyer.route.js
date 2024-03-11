"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const buyer_controller_1 = require("./buyer.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const buyer_validation_1 = require("./buyer.validation");
const router = express_1.default.Router();
router.get('/:id', buyer_controller_1.BuyerController.getSingleBuyer);
router.patch('/:id', (0, validateRequest_1.default)(buyer_validation_1.BuyerValidationZodSchema.updateBuyerZodSchema), buyer_controller_1.BuyerController.updateBuyer);
router.delete("/:id", buyer_controller_1.BuyerController.deleteBuyer);
router.get("/", buyer_controller_1.BuyerController.getAllBuyer);
exports.BuyerRoutes = router;
