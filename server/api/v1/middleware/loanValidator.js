class LoanValidator {
  static validateLoanRepayment(req, res, next) {
    let validationMessage = '';

    if (!req.body.paidAmount) {
      validationMessage += 'Paid amount is required';
    } else if (typeof req.body.paidAmount !== 'number') {
      validationMessage += 'Paid amount must be a number';
    }
    return (validationMessage.length === 0) ? next()
      : res.status(400).json({ status: 400, error: validationMessage });
  }

  static validateLoanId(req, res, next) {
    let validationMessage = '';
    let { loanId } = req.params;
    loanId = parseInt(loanId, 10);
    if (!loanId) {
      validationMessage += 'Loan ID is invalid.';
    }
    return (validationMessage.length === 0) ? next()
      : res.status(400).json({ status: 400, error: validationMessage });
  }
}

export default LoanValidator;
