import express from 'express';

import loanController from '../controllers/loanController';
import jwt from '../middleware/jwt';
import loanValidator from '../middleware/loanValidator';
import checker from '../middleware/checker';

const loanRouter = express.Router();

loanRouter.post('/', jwt.validateToken, loanController.applyForLoan);
loanRouter.patch('/:loanId', jwt.validateToken, checker.checkAdminStatus, loanValidator.validateLoanId, loanController.adminApproveRejectLoan);
loanRouter.post('/:loanId/repayment', jwt.validateToken, checker.checkAdminStatus, loanValidator.validateLoanRepayment, loanController.loanRepayment);
loanRouter.get('/:loanId/repayments', jwt.validateToken, loanValidator.validateLoanId, loanController.getRepayment);
loanRouter.get('/', jwt.validateToken, checker.checkAdminStatus, loanController.getAllLoan);
loanRouter.get('/:loanId', jwt.validateToken, checker.checkAdminStatus, loanValidator.validateLoanId, loanController.getALoan);

export default loanRouter;
