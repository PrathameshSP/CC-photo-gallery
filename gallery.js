let galleryImages = document.querySelectorAll(".gallery-img"); //storing all images in variable from class
let getLatestOpenedImg ; 
let windowWidth = window.innerWidth; //storing browser width in variable

if (galleryImages) {
    galleryImages.forEach(function(image, index) {

         image.onclick = function() {
            let getElementCss = window.getComputedStyle(image); //storing styles applied to the image from css
            let getFullImgUrl = getElementCss.getPropertyValue("background-image");
            let getImgUrlPos = getFullImgUrl.split("/img/thumbs/");
            let setNewImgUrl = getImgUrlPos[1].replace('")', ''); //All this mess to get the exact url of the image

            getLatestOpenedImg = index + 1;

            let container = document.body;
            let newImgWindow = document.createElement("div"); //Creating html elements in body using js 
            container.appendChild(newImgWindow);
            newImgWindow.setAttribute("class", "img-window");
            newImgWindow.setAttribute("onclick", "closeImg()"); 

            let newImg = document.createElement("img");
            newImgWindow.appendChild(newImg);
            newImg.setAttribute("src", "img/" + setNewImgUrl);  
            newImg.setAttribute("id", "current-img");  

            newImg.onload = function() {
                let imgWidth = this.width;
                let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 80;

                let newNextBtn = document.createElement("a");
                let NextBtnText = document.createTextNode("Next");
                newNextBtn.appendChild(NextBtnText);
                container.appendChild(newNextBtn);
                newNextBtn.setAttribute("class", "img-next-btn");
                newNextBtn.setAttribute("onclick", "changeImg(1)"); 
                newNextBtn.style.cssText = "right: " + calcImgToEdge + "px;";

                let newPrevBtn = document.createElement("a");
                let PrevBtnText = document.createTextNode("Prev");
                newPrevBtn.appendChild(PrevBtnText);
                container.appendChild(newPrevBtn);
                newPrevBtn.setAttribute("class", "img-prev-btn");
                newPrevBtn.setAttribute("onclick", "changeImg(0)"); 
                newPrevBtn.style.cssText = "left: " + calcImgToEdge + "px;";
            }
            
        } 

    });

}

function closeImg() {
    document.querySelector(".img-window").remove();
    document.querySelector(".img-next-btn").remove();
    document.querySelector(".img-prev-btn").remove();
}

function changeImg(changeDir) {
    document.querySelector("#current-img").remove();

    let getImgWindow = document.querySelector(".img-window");
    let newImg = document.createElement("img");
    getImgWindow.appendChild(newImg);

    let calcNewImg;
    if(changeDir === 1) {
        calcNewImg = getLatestOpenedImg + 1;
        if(calcNewImg > galleryImages.length) {
            calcNewImg = 1;
        }
    }
    else if(changeDir ===0) {
        calcNewImg = getLatestOpenedImg - 1;
        if(calcNewImg < 1) {
            calcNewImg = galleryImages.length;
        }
    }

    newImg.setAttribute("src", "img/img" + calcNewImg + ".png");
    newImg.setAttribute("id", "current-img");

    getLatestOpenedImg = calcNewImg;

    newImg.onload = function() {
        let imgWidth = this.width;
        let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 80;

        let nextBtn = document.querySelector(".img-next-btn")
        nextBtn.style.cssText = "right: " + calcImgToEdge + "px;";
        
        let prevBtn = document.querySelector(".img-prev-btn")
        prevBtn.style.cssText = "left: " + calcImgToEdge + "px;";
    }

}