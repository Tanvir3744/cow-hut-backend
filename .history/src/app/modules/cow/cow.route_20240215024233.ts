import express from 'express';
import { CowController } from './cow.controller';

const router = express.Router();

router.post('/create-cow', CowController.createCow);
router.get('/:id', CowController.getSingleCow);
router.get("/", CowController.getAllcow);
router.delete('/:id', CowController.deleteCow);
router.patch("/:id", CowController.updateCow);



