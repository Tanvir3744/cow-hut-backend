import express from 'express'
import { BuyerController } from './buyer.controller'
const router = express.Router()

router.post('/create-buyer', BuyerController.createBuyer);

router.get('/:id', BuyerController.getSingleBuyer);

router.patch('/:id', BuyerController.updateBuyer);

router.delete("/:id", BuyerController.deleteBuyer);

router.get("/", BuyerController.getAllBuyer);

export const BuyerRoutes = router;
