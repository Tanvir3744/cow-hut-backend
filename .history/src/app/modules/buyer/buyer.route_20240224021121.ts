import express from 'express'
import { BuyerController } from './buyer.controller'
import validateRequest from '../../middlewares/validateRequest';
import { BuyerValidationZodSchema } from './buyer.validation';
const router = express.Router()


router.get('/:id', BuyerController.getSingleBuyer);

router.patch('/:id',validateRequest(BuyerValidationZodSchema.updateBuyerZodSchema) ,BuyerController.updateBuyer);

router.delete("/:id", BuyerController.deleteBuyer);

router.get("/", BuyerController.getAllBuyer);

export const BuyerRoutes = router;
