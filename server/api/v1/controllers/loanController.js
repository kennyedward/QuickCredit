import loanCalculator from '../helpers/loanCalculator';
import loanValidator from '../helpers/loanValidator';
import loanStatusValidator from '../helpers/loanStatus';
import db from '../db/index';

class LoanController {
  // eslint-disable-next-line consistent-return
  static async applyForLoan(req, res) {
    try {
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
    } catch (e) {
      const invalidAmount = 'new row for relation "loans" violates check constraint "loans_amount_check"';
      if (e.message === invalidAmount) {
        res.json({
          status: 409,
          error: 'Amount must be greater than 0',
        });
      }
    }
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

  static async loanRepayment(req, res) {
    const { loanId } = req.params;
    const loanDataQuery = await db.query(`SELECT * FROM loans
    WHERE id = $1`, [Number(loanId)]);
    const exisitingLoanData = loanDataQuery.rows[0];
    if (exisitingLoanData) {
      if (exisitingLoanData.status === 'approved' && exisitingLoanData.repaid === false) {
        const { paidAmount } = req.body;
        if (paidAmount > exisitingLoanData.balance) {
          return res.status(422).json({
            status: 422,
            error: 'The amount paid is greater than the balance for the user',
          });
        }
        let newBalance = 0;
        newBalance = Number(exisitingLoanData.balance) - paidAmount;
        const updateLoanDataQuery = await db.query('UPDATE loans SET balance = $1 WHERE id = $2 returning *', [newBalance, exisitingLoanData.id]);
        const updatedLoanData = updateLoanDataQuery.rows[0];
        if (Number(updatedLoanData.balance) === 0) {
          await db.query('UPDATE loans SET repaid = $1 WHERE id = $2 returning *', [true, exisitingLoanData.id]);
        }
        const values = [
          exisitingLoanData.id,
          paidAmount,
        ];
        const text = `INSERT INTO
        repayments(loanid, amount)
        VALUES($1, $2)
        returning *`;
        const repaymentQuery = await db.query(text, values);
        const loanRepaid = repaymentQuery.rows[0];
        return res.status(201).json({
          status: 201,
          data: {
            id: loanRepaid.id,
            loanId: loanRepaid.loanid,
            amount: parseFloat(loanRepaid.amount),
            createdon: loanRepaid.createdon,
            monthlyInstallment: parseFloat(updatedLoanData.paymentinstallment),
          },
        });
      }
      if (exisitingLoanData.status === 'pending') {
        return res.status(200).json({
          status: 200,
          error: 'Your loan is yet to be approved',
        });
      }
      if (exisitingLoanData.repaid === true) {
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

  static async getRepayment(req, res) {
    const { loanId } = req.params;
    if (req.authData.isadmin) {
      try {
        const allRepayment = await db.query(`SELECT * FROM repayments
        WHERE loanid = $1`, [Number(loanId)]);
        if (allRepayment.rows.length === 0) {
          return res.status(404).json({
            status: 404,
            error: 'Loan repayment transaction NOT found for this loan.',
          });
        }
        return res.status(200).json({
          status: 200,
          data: allRepayment.rows,
        });
      } catch (error) {
        res.status(500).json({
          status: 500,
          error: 'Internal Server error',
        });
      }
    }
    try {
      const checkUserLoan = await db.query(`SELECT * FROM loans
    WHERE id = $1 AND useremail = $2`, [Number(loanId), req.authData.email]);
      if (checkUserLoan.rows[0]) {
        const allLoanIdRepayment = await db.query(`SELECT * FROM repayments
        WHERE loanid = $1`, [checkUserLoan.rows[0].id]);
        if (allLoanIdRepayment.rows) {
          return res.status(200).json({
            status: 200,
            data: allLoanIdRepayment.rows,
          });
        }
        return res.status(404).json({
          status: 404,
          data: 'Loan repayment transaction NOT found for this loan.',
        });
      }
      return res.status(403).json({
        status: 403,
        error: 'You can\'t view this loan repayment transaction',
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: 'Internal Server error',
      });
    }
    return res.status(404).json({
      status: 404,
      error: 'Loan not found.',
    });
  }

  static async getAllLoan(req, res) {
    const { status } = req.query;
    const { repaid } = req.query;
    if (typeof status !== 'undefined' && typeof repaid !== 'undefined') {
      if (status !== 'approved') {
        return res.status(400).json({ status: 400, error: 'status can only have the value: \'approved\'' });
      }
      if (repaid.toString() !== 'true' && repaid.toString() !== 'false') {
        return res.status(400).json({ status: 400, error: 'repaid can only have the value: \'true\' or \'false\'' });
      }
      const currentLoans = await db.query(`SELECT * FROM loans
        WHERE status = $1 AND repaid = $2`, [status, repaid]);
      if (currentLoans.rows.length === 0) {
        return res.status(404).json({
          status: 404,
          error: 'There are no loans listed yet',
        });
      }
      return res.status(200).json({
        status: 200,
        data: currentLoans.rows,
      });
    }
    const allLoans = await db.query('SELECT * FROM loans');
    if (!allLoans.rows) {
      return res.status(404).json({
        status: 404,
        error: 'There are no loans listed',
      });
    }
    return res.status(200).json({
      status: 200,
      data: allLoans.rows,
    });
  }

  static async getALoan(req, res) {
    const { loanId } = req.params;
    const queryExistingLoanData = await db.query(`SELECT * FROM loans
    WHERE id = $1`, [loanId]);
    if (!queryExistingLoanData.rows[0]) {
      return res.status(404).json({
        status: 404,
        error: 'Loan not found.',
      });
    }
    return res.status(200).json({
      status: 200,
      data: queryExistingLoanData.rows[0],
    });
  }
}

export default LoanController;
