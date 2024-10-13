import express from 'express';
import { userSchema } from '../user/user.validation';
import { UserController } from '../user/user.controller';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(userSchema.createUserSchema),
  UserController.createUser,
);
router.post(
  '/login',
  validateRequest(userSchema.loginUserSchema),
  UserController.loginUser,
);

export const AuthRoutes = router;
