import express from 'express';

import loanController from '../controllers/loanController';
import jwt from '../middleware/jwt';
import loanValidator from '../middleware/loanValidator';

const loanRouter = express.Router();

loanRouter.post('/', jwt.validateToken, loanValidator.valiidateLoan, loanController.applyForLoan);

export default loanRouter;
