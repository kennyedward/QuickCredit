import express from 'express';

import userController from '../controllers/userController';
import userValidator from '../middleware/userValidator';

const usersRouter = express.Router();

usersRouter.post('/auth/signup', userValidator.valiidateSignUp, userController.userSignUp);
usersRouter.post('/auth/login', userValidator.valiidateLogin, userController.userLogin);

export default usersRouter;
