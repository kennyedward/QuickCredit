class LoanValidator {
  static validateLoanRepayment(req, res, next) {
    let validationMessage = '';
    const paidAmount = parseFloat(req.body.paidAmount);
    if (!paidAmount) {
      validationMessage += 'Paid amount is required';
    }
    return (validationMessage.length === 0) ? next()
      : res.status(400).json({ status: 400, error: validationMessage });
  }

  static validateLoanStatus(req, res, next) {
    let validationMessage = '';
    const status = req.body.status.trim();
    if (!status) {
      validationMessage += 'Status is required';
    } else if (status.trim() !== 'approved' && status !== 'rejected' && status !== 'pending') {
      validationMessage += 'Status can only be either \'approved\', \'rejected\' or \'pending\'';
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
