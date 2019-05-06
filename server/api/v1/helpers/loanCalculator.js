const loanCalculator = (amount, tenor) => {
  const interestRate = 0.05;
  const interest = interestRate * amount;
  const balance = amount + interest;
  const paymentInstallment = balance / tenor;

  return {
    interest,
    balance,
    paymentInstallment,
  };
};
export default loanCalculator;
