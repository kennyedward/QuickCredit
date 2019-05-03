import express from 'express';

import userController from '../controllers/userController';
import userValidator from '../middleware/userValidator';

const usersRouter = express.Router();

usersRouter.post('/auth/signup', userValidator.valiidateSignUp, userController.userSignUp);

export default usersRouter;
