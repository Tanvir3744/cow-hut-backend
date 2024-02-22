import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
const router = express.Router();

router.post('/create-seller', UserController.createSeller);


/* router.get("/:id", UserController.getSingleUser)
router.patch('/:id',validateRequest(userValidation.updateUserZodSchema) ,UserController.updateUser)
router.get('/', UserController.getAllUsers);
router.delete("/:id", UserController.deleteUser); */


export const UserRoutes = router;