const navIcon = document.querySelector(".navIcon");
const closeBtn = document.querySelector(".closeBtn");

navIcon.addEventListener("click", () => {
    document.getElementById("sideMenu").style.width = "100%";
    document.getElementById("closeBtn").style.display = "block";

})

const removeCloseBtn = () => {
    document.getElementById("closeBtn").style.display = "none";
}

window.onload = removeCloseBtn;

closeBtn.addEventListener("click", () => {
    document.getElementById("sideMenu").style.width = "0";
    document.getElementById("closeBtn").style.display = "none";
})