let modal = document.getElementById("myModal");
let modalClose = document.getElementById("modalClose");
// let openModal = document.getElementById("openModal")

let allClicks = document.querySelectorAll(".specificLoan")

for (i = 0; i < allClicks.length; i++ ) {
    allClicks[i].addEventListener("click", (e) => {
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