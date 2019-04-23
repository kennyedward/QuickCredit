let modal = document.getElementById("myModal");
let modalClose = document.getElementById("modalClose");
let allLoans = document.querySelectorAll(".specificLoanSelector")

for (i = 0; i < allLoans.length; i++ ) {
    allLoans[i].addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "block"
    })
}

modalClose.addEventListener("click", () => {
    modal.style.display = "none";
})

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
})