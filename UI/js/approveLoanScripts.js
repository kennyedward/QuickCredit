let modal = document.getElementById("myModal");
let modalClose = document.getElementById("modalClose");
let approveCheck = document.querySelectorAll(".approveCheck")

modal.setAttribute("style", "padding-top: 10rem;")

for (i = 0; i < approveCheck.length; i++) {
    approveCheck[i].addEventListener("click", (e) => {
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