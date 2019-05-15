import express from 'express';

import userController from '../controllers/userController';
import userValidator from '../middleware/userValidator';
import jwt from '../middleware/jwt';

const usersRouter = express.Router();

usersRouter.post('/auth/signup', userValidator.validateSignUp, userController.userSignUp);
usersRouter.post('/auth/login', userValidator.validateLogin, userController.userLogin);
usersRouter.patch('/users/:userEmail/verify', jwt.validateToken, userValidator.validateVerificationStatus, userController.adminVerifyAccount);

export default usersRouter;
