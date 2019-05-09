import express from 'express';

import loanController from '../controllers/loanController';
import jwt from '../middleware/jwt';
import loanValidator from '../middleware/loanValidator';

const loanRouter = express.Router();

loanRouter.post('/', jwt.validateToken, loanValidator.valiidateLoan, loanController.applyForLoan);
loanRouter.patch('/:loanId', jwt.validateToken, loanValidator.validateLoanStatus, loanController.adminApproveRejectLoan);
loanRouter.post('/:loanId/repayment', jwt.validateToken, loanValidator.valiidateLoanRepayment, loanController.loanRepayment);
loanRouter.get('/:loanId/repayment', jwt.validateToken, loanValidator.validateLoanId, loanController.getRepayment);

export default loanRouter;
