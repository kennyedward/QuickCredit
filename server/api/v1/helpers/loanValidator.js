const validateLoan = (amount, tenor) => {
  let validateMessage = '';
  if (!amount) {
    validateMessage += 'Loan amount is required';
  } else if (typeof amount !== 'number') {
    validateMessage += 'Loan amount must be a number';
  } else if (!tenor) {
    validateMessage += 'Loan tenor is required';
  } else if (typeof tenor !== 'number') {
    validateMessage += 'Loan tenor must be a number';
  } else if (!Number.isInteger(tenor)) {
    validateMessage += 'Loan tenor must be an integer';
  } else if (tenor < 1 || tenor > 12) {
    validateMessage += 'Loan tenor must be between 1 and 12';
  }
  return validateMessage;
};

export default {
  validateLoan,
};
