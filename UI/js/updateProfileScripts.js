let picture = document.querySelector("#picture");
let realImgHolder = document.querySelector(".realImageUploadHolder");
let imgPlacehoder = document.querySelector(".imgPlacehoder");


picture.addEventListener("change", (e) => {
    realImgHolder.setAttribute("style", "display: block");
    realImgHolder.src = URL.createObjectURL(e.target.files[0]);
    imgPlacehoder.setAttribute("style", "display: none;");
});