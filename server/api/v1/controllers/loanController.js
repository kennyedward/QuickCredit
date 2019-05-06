import users from '../db/users';
import loans from '../db/loans';
import loanIdGenerator from '../helpers/loanIdGenerator';
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

export default {
  applyForLoan,
};
