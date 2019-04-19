let picture = document.getElementById("picture");
let realImgHolder = document.querySelector(".realImageUploadHolder");
let imgPlacehoder = document.querySelector(".imgPlacehoder");
let requestVerfication = document.querySelector(".requestVerfication");


// requestVerfication.addEventListener("click", () => {
//     picture.addEventListener("change", (e) => {
//         realImgHolder.setAttribute("style", "display: block");
//         realImgHolder.src = URL.createObjectURL(e.target.files[0]);
//         imgPlacehoder.setAttribute("style", "display: none;");
//         window.location = "user-verification-request-sent.html";
//     });
// })



    picture.addEventListener("change", (e) => {
        realImgHolder.setAttribute("style", "display: block");
        realImgHolder.src = URL.createObjectURL(e.target.files[0]);
        imgPlacehoder.setAttribute("style", "display: none;");
    });