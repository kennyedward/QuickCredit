import loans from '../db/loans';
import loanRepayments from '../db/loanRepayments';
import loanIdGenerator from '../helpers/IdGenerator';
import loanCalculator from '../helpers/loanCalculator';
import loanValidator from '../helpers/loanValidator';
import loanStatusValidator from '../helpers/loanStatus';
import db from '../db/index';

class LoanController {
  static async applyForLoan(req, res) {
    const { id, email } = req.authData;
    const queryUsersTable = await db.query(`SELECT * FROM users
    WHERE id = $1`, [id]);
    const returnedUser = queryUsersTable.rows[0];
    if (returnedUser) {
      if (returnedUser.status === 'unverified') {
        return res.status(400).json({
          status: 400,
          error: 'Your account is yet to be verified. Please hold on for verification.',
        });
      }
      req.authData.status = returnedUser.status;
      const queryLoanData = await db.query(`SELECT * FROM loans
    WHERE useremail = $1`, [email]);
      const queryLoanDataHolder = queryLoanData.rows[0];
      if (queryLoanData.rows.length === 0 || queryLoanData.rows[0].repaid) {
        const verificationMessage = loanValidator.validateLoan(req.body.amount, req.body.tenor);
        if (verificationMessage !== '') {
          return res.status(400).json({
            status: 400,
            error: verificationMessage,
          });
        }
        const loan = loanCalculator(req.body.amount, req.body.tenor);
        const values = [
          returnedUser.email,
          'pending',
          false,
          req.body.tenor,
          req.body.amount,
          loan.paymentInstallment,
          loan.balance,
          loan.interest,
        ];
        const text = `INSERT INTO
                loans(useremail, status, repaid, tenure, amount, paymentinstallment, balance, interest)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8)
                returning *`;
        const newLoan = await db.query(text, values);
        const createdLoan = newLoan.rows[0];
        const {
          useremail, tenure, repaid, status,
        } = createdLoan;
        return res.status(201).json({
          status: 201,
          data: {
            loanId: createdLoan.id,
            firstName: returnedUser.firstname,
            lastName: returnedUser.lastname,
            email: useremail,
            tenure,
            amount: parseFloat(createdLoan.amount),
            paymentInstallment: parseFloat(createdLoan.paymentinstallment),
            status,
            balance: parseFloat(createdLoan.balance),
            interest: parseFloat(createdLoan.interest),
            repaid,
          },
        });
      }
      if (queryLoanDataHolder.repaid === false) {
        return res.status(409).json({
          status: 409,
          error: 'You have an existing loan',
        });
      }
      if (queryLoanDataHolder.status === 'pending') {
        return res.status(202).json({
          status: 202,
          error: 'You have a pending loan',
        });
      }
    }
    return res.json({
      status: 404,
      error: 'User not found',
    });
  }

  static async adminApproveRejectLoan(req, res) {
    const { loanId } = req.params;
    const loanQuery = await db.query(`SELECT * FROM loans
    WHERE id = $1`, [Number(loanId)]);
    const returnedLoan = loanQuery.rows[0];
    if (returnedLoan) {
      if (returnedLoan.status === 'approved') {
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
      if (returnedLoan.status === 'pending' || returnedLoan.status === 'rejected') {
        const updateLoanQuery = await db.query('UPDATE loans SET status = $1 WHERE id = $2 returning *', [status, returnedLoan.id]);
        const updatedLoan = updateLoanQuery.rows[0];
        return res.status(200).json({
          status: 200,
          data: {
            loanId: updatedLoan.id,
            loanAmount: parseFloat(updatedLoan.amount),
            tenor: updatedLoan.tenure,
            status: updatedLoan.status,
            monthlyInstallment: parseFloat(updatedLoan.paymentinstallment),
            interest: parseFloat(updatedLoan.interest),
            balance: parseFloat(updatedLoan.balance),
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
