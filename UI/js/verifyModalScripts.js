let modal = document.getElementById("myModal");
let modalClose = document.getElementById("modalClose");
let verifyRadio = document.querySelectorAll(".verifyRadio")
let unVerifyRadio = document.querySelectorAll(".unVerifyRadio")

modal.setAttribute("style", "padding-top: 10rem;")

for (i = 0; i < verifyRadio.length; i++) {
    verifyRadio[i].addEventListener("click", (e) => {
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