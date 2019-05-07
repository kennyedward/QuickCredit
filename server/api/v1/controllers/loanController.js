import users from '../db/users';
import loans from '../db/loans';
import loanRepayments from '../db/loanRepayments';
import loanIdGenerator from '../helpers/IdGenerator';
import loanCalculator from '../helpers/loanCalculator';

const applyForLoan = (req, res) => {
  const user = users.find(person => person.id === req.authData.id);

  if (user) {
    if (user.status === 'unverified') {
      return res.status(400).json({
        status: 400,
        error: 'Your account is yet to be verified. Please hold on for verification.',
      });
    }
    const existingLoan = loans.find(loan => loan.user === req.authData.email);
    if (existingLoan) {
      return res.status(409).json({
        status: 409,
        error: 'You have an existing loan',
      });
    }
    const loan = loanCalculator(req.body.amount, req.body.tenor);
    const newLoan = {
      loanId: loanIdGenerator(),
      firstName: user.firstName,
      lastName: user.lastName,
      user: user.email,
      tenor: req.body.tenor,
      amount: req.body.amount,
      status: 'pending',
      repaid: false,
      balance: loan.balance,
      interest: loan.interest,
      paymentInstallment: loan.paymentInstallment,
      purpose: req.body.purpose,
      createdOn: new Date(),
    };
    loans.push(newLoan);
    return res.status(201).json({
      status: 201,
      data: newLoan,
    });
  }
  return res.json({
    status: 404,
    error: 'User not found',
  });
};

const adminApproveRejectLoan = (req, res) => {
  if (req.authData.isAdmin) {
    const { loanId } = req.params;
    const { status } = req.body;
    const existingLoan = loans.find(loan => loan.loanId === Number(loanId));
    if (existingLoan) {
      const data = {
        loanId: existingLoan.loanId,
        loanAmount: existingLoan.amount,
        tenor: existingLoan.tenor,
        status: existingLoan.status,
        monthlyInstallment: existingLoan.paymentInstallment,
        interest: existingLoan.interest,
      };
      if (existingLoan.status === 'pending') {
        data.status = status;
        return res.status(200).json({
          status: 200,
          data,
        });
      }
      if (existingLoan.status === 'approved') {
        data.status = status;
        return res.status(200).json({
          status: 200,
          data,
        });
      }
      if (existingLoan.status === 'rejected') {
        data.status = status;
        return res.status(200).json({
          status: 200,
          data,
        });
      }
    }
    return res.status(404).json({
      status: 404,
      error: 'Loan not found.',
    });
  }
  return res.status(403).json({
    status: 403,
    error: 'You\'re forbidden to perform this action.',
  });
};

const loanRepayment = (req, res) => {
  if (req.authData.isAdmin) {
    const { loanId } = req.params;
    const existingLoan = loans.find(loan => loan.loanId === Number(loanId));
    if (existingLoan) {
      const data = {
        loanId: existingLoan.loanId,
        createdOn: existingLoan.createdOn,
        amount: existingLoan.amount,
        monthlyInstallment: existingLoan.paymentInstallment,
        balance: existingLoan.balance,
      };
      if (existingLoan.status === 'approved' && existingLoan.repaid === false) {
        const { paidAmount } = req.body;
        data.id = loanIdGenerator();
        data.paidAmount = paidAmount;
        const balance = data.balance - paidAmount;
        existingLoan.balance = balance;
        loanRepayments.push(data);
        return res.status(201).json({
          status: 201,
          data,
        });
      }
      if (existingLoan.status === 'pending') {
        return res.status(200).json({
          status: 200,
          error: 'Your loan is yet to be approved',
        });
      }
      if (existingLoan.repaid === true) {
        return res.status(200).json({
          status: 200,
          error: 'You have paid all your loans.',
        });
      }
    }
    return res.status(404).json({
      status: 404,
      error: 'Loan not found.',
    });
  }
  return res.status(403).json({
    status: 403,
    error: 'You\'re forbidden to perform this action.',
  });
};

export default {
  applyForLoan,
  adminApproveRejectLoan,
  loanRepayment,
};
