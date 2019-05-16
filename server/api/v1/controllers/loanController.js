import users from '../db/users';
import loans from '../db/loans';
import loanRepayments from '../db/loanRepayments';
import loanIdGenerator from '../helpers/IdGenerator';
import loanCalculator from '../helpers/loanCalculator';
import loanValidator from '../helpers/loanValidator';
import loanStatusValidator from '../helpers/loanStatus';

class LoanController {
  static applyForLoan(req, res) {
    const user = users.find(person => person.id === req.authData.id);
    if (user) {
      if (user.status === 'unverified') {
        return res.status(400).json({
          status: 400,
          error: 'Your account is yet to be verified. Please hold on for verification.',
        });
      }
      const existingLoan = loans.find(loan => loan.user === req.authData.email);
      if (!existingLoan) {
        const verificationMessage = loanValidator.validateLoan(req.body.amount, req.body.tenor);
        if (verificationMessage !== '') {
          return res.status(400).json({
            status: 400,
            error: verificationMessage,
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
          createdOn: new Date(),
        };
        loans.push(newLoan);
        return res.status(201).json({
          status: 201,
          data: newLoan,
        });
      }
      if (existingLoan.repaid === false) {
        return res.status(409).json({
          status: 409,
          error: 'You have an existing loan',
        });
      }
      if (existingLoan.status === 'pending') {
        return res.status(409).json({
          status: 401,
          error: 'You have a pending loan',
        });
      }
    }
    return res.json({
      status: 404,
      error: 'User not found',
    });
  }

  static adminApproveRejectLoan(req, res) {
    const { loanId } = req.params;
    const existingLoan = loans.find(loan => loan.loanId === Number(loanId));
    if (existingLoan) {
      if (existingLoan.status === 'approved') {
        return res.status(409).json({
          status: 409,
          error: 'Your loan is already approved',
        });
      }
      const { status } = req.body;
      const verificationMessage = loanStatusValidator.checkStatus(status);
      if (verificationMessage !== '') {
        return res.status(400).json({
          status: 400,
          error: verificationMessage,
        });
      }
      if (existingLoan.status === 'pending' || existingLoan.status === 'rejected') {
        existingLoan.status = status;
        return res.status(200).json({
          status: 200,
          data: {
            loanId: existingLoan.loanId,
            loanAmount: existingLoan.amount,
            tenor: existingLoan.tenor,
            status: existingLoan.status,
            monthlyInstallment: existingLoan.paymentInstallment,
            interest: existingLoan.interest,
            balance: existingLoan.balance,
          },
        });
      }
    }
    return res.status(404).json({
      status: 404,
      error: 'Loan not found.',
    });
  }

  static loanRepayment(req, res) {
    const { loanId } = req.params;
    const existingLoan = loans.find(loan => loan.loanId === Number(loanId));
    if (existingLoan) {
      const repaymentTransaction = {
        id: loanIdGenerator(),
        loanId: existingLoan.loanId,
        createdOn: existingLoan.createdOn,
        amount: existingLoan.amount,
        monthlyInstallment: existingLoan.paymentInstallment,
        balance: existingLoan.balance,
        user: existingLoan.user,
      };
      if (existingLoan.status === 'approved' && existingLoan.repaid === false) {
        const { paidAmount } = req.body;
        repaymentTransaction.paidAmount = parseFloat(paidAmount);
        const balance = existingLoan.balance - paidAmount;
        existingLoan.balance = parseFloat(balance);
        repaymentTransaction.balance = existingLoan.balance;
        if (existingLoan.balance === 0 || existingLoan.balance < 0) {
          repaymentTransaction.balance = 0;
          existingLoan.repaid = true;
          existingLoan.balance = 0;
        }
        loanRepayments.push(repaymentTransaction);
        return res.status(201).json({
          status: 201,
          data: repaymentTransaction,
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

  static getRepayment(req, res) {
    const loanId = Number(req.params.loanId);
    const existingLoan = loans.find(loan => loan.loanId === loanId);
    if (existingLoan && (existingLoan.loanId === loanId)) {
      const loan = loans.find(userLoan => userLoan.user === req.authData.email);
      if (loan || req.authData.isAdmin) {
        const repaymentTransaction = loanRepayments
          .filter(repayment => repayment.loanId === loanId);
        if (repaymentTransaction) {
          if (repaymentTransaction.length === 0) {
            return res.status(404).json({
              status: 404,
              data: 'Loan repayment transaction NOT found for this loan.',
            });
          }
          return res.status(200).json({
            status: 200,
            data: repaymentTransaction,
          });
        }
      }
      return res.status(403).json({
        status: 403,
        error: 'You can\'t view this loan repayment transaction',
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Loan not found.',
    });
  }

  static getAllLoan(req, res) {
    const { status } = req.query;
    const { repaid } = req.query;
    if (typeof status !== 'undefined' && typeof repaid !== 'undefined') {
      if (status !== 'approved') {
        return res.status(400).json({ status: 400, error: 'status can only have the value: \'approved\'' });
      }
      if (repaid.toString() !== 'true' && repaid.toString() !== 'false') {
        return res.status(400).json({ status: 400, error: 'repaid can only have the value: \'true\' or \'false\'' });
      }
      const currentLoans = loans.filter(existingLoan => ((existingLoan.status === status)
        && ((existingLoan.repaid).toString() === repaid.toString())));
      return res.status(200).json({
        status: 200,
        data: currentLoans,
      });
    }
    if (!loans.length) {
      return res.status(404).json({
        status: 404,
        error: 'There are no loans listed',
      });
    }
    return res.status(200).json({
      status: 200,
      data: loans,
    });
  }

  static getALoan(req, res) {
    const loanId = Number(req.params.loanId);
    const existingLoan = loans.find(loan => loan.loanId === loanId);
    if (!existingLoan) {
      return res.status(404).json({
        status: 404,
        error: 'Loan not found.',
      });
    }
    return res.status(200).json({
      status: 200,
      data: existingLoan,
    });
  }
}

export default LoanController;
