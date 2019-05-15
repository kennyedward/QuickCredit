let notify = document.querySelector("#notify");
let pink = document.querySelector(".pink");
let greenHighlight = document.querySelector(".greenMobile");
let whiteHighlight = document.querySelector(".whiteHighlight");
let alertMsg = document.querySelector(".alertMsg");

let selector = greenHighlight || whiteHighlight || alertMsg;


notify.addEventListener("click", () => {
    selector.setAttribute("style", "border: 1.5px solid; padding: 1rem;")
    pink.setAttribute("style", "background: #4C5EBB;");
    pink.textContent = "0";
});