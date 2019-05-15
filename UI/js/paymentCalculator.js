let amount = document.getElementById("amount");
let installment = document.querySelector(".installment");
let interest = document.querySelector(".interest")
let tenure = document.getElementById("tenor");

const calc = () => {
    let loanAmount = Number(amount.value);
    let loanInterestRate = Number(loanAmount) * 0.05;
    let lengthOfRepayment = tenure.options[tenure.selectedIndex].value;
    let paymentInstallment = (loanAmount + loanInterestRate) / lengthOfRepayment;
    interest.textContent = '₦ '+ (Number(loanAmount) * 0.05).toFixed(2); 
    installment.textContent = '₦ ' + paymentInstallment.toFixed(2);
}

amount.addEventListener("keyup", () => {
    calc();
});

tenure.addEventListener("change", () => {
    calc();
});