import express from 'express';

import loanController from '../controllers/loanController';
import jwt from '../middleware/jwt';

const loanRouter = express.Router();

loanRouter.post('/', jwt.validateToken, loanController.applyForLoan);

export default loanRouter;
