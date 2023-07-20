/**
 * @Todo2 : replace image banner with user selection
 * @Todo3 : store user choice in local storage
 * @Todo4 : try annimated user image selection 
 */


/**
 * @description event listener ==> wait html content is totaly load
 */
document.addEventListener("DOMContentLoaded", function() {
var topBanner = document.querySelector('.top-banner');

var imageIndex = 0;
var imagesBanner = [];

/**
 * @Todo Add a random for selected differents images every times 
 * @name loadBannerImages
 * @desc push images into [imagesBanner];
 */
function loadBannerImages() {
    for (var i = 1; i <= 3; i++) {
    let image = new Image();
    image.src = 'assets/banner/banner' + i + '.jpg'; 
    imagesBanner.push(image);
    }
}


/**
 * @name changeBannerImage
 * @returns {void}
 * @description clear top-banner div before inserting new images from images array.
 */
function changeBannerImage() {
    topBanner.innerHTML = '';
    topBanner.appendChild(imagesBanner[imageIndex]);

    imageIndex++;
    if (imageIndex >= imagesBanner.length) {
        imageIndex = 0;
    }
}



loadBannerImages();
changeBannerImage();
setInterval(changeBannerImage, 2000);
getImage();
});


//store grid images for user selection
let imagesGrid = [];
let localStorage = [];
    
/**
 * @function 
 * @returns
 * @description not dynamic method ==> NodeJs 
 */
function getImage() { 
    
    for(i = 1; i <= 12; i++) {
        let image = new Image(200);
        image.src = "assets/miniature/banner" + i + ".jpg";
        image.style.margin = "5px";
        image.style.boxShadow = "3px 3px 1px rgba(0, 0, 20, .15)";
        image.style.borderRadius = "3%";
        image.style.position = "relative";
        imagesGrid.push(image);
        
    }
    
    addImageToGrid(imagesGrid);   
}

/**
 * @todo:  
 *       - Refacto function (SRP);
 *       - Function to define how many container create :  container <= 4 images;
 * @name addImageToGrid
 * @param {Array[image]} imagesToPick
 * @description Create container and assign images in it and link event listener.
 */
function addImageToGrid(imagesToPick){
    
    
    let containerGrid = setGrid();
    

    let containerColumn = {
        "c1" : document.getElementById("c1"),
        "c2" : document.getElementById("c2"),
        "c3" : document.getElementById("c3"),
    };


    let count = 0;

    //Loop through [images], @todo defined column dynamicly with [image.lenght]
    for (i = 0; i < imagesToPick.length; i++) {
          
        if(count <= 4 ) {
            imagesToPick[i].style.gridColumn = i + 1;
            containerColumn.c1.append(imagesToPick[i]);
        }
        if(count >= 4 && count <= 8) {
            imagesToPick[i].style.gridColumn = i + 1;
            containerColumn.c2.append(imagesToPick[i]);
        }
        if(count >= 8 && count <= 12) {
            imagesToPick[i].style.gridColumn = i + 1;
            containerColumn.c3.append(imagesToPick[i]);
        }

        if(count == 12) count = 0;
        count++;   
        
        onClick(imagesToPick[i]);
        //Call asynch func to link event listener
        onOver(imagesToPick[i]);
        outover(imagesToPick[i]);
        
       
    }
}

function onClick(imagesToPick) {
    imagesToPick.addEventListener("click", event => {
        
        toggleBorderImage(event.target);
        localStorageManager(event.target.id);
        if(isLocalStorageAvailable()) {
            
            
        };  
    })
}

function toggleBorderImage(toggleImage){
    toggleImage.classList.toggle("border-blue");
}

function isLocalStorageAvailable(){
    try {
        let testKey = "__testLocalStorage__";
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * @name onOver
 * @param {image} imagesOnOver (image to attache event listener)
 * @description Listener on mouseover : Scale image on over.
 */
function onOver(imageOnOver) {
    imageOnOver.addEventListener("mouseover", event => {
        event.target.style.transform = "scale(1.5)";
        event.target.style.zIndex = "1";        
      });
}

/**
 * @name outover
 * @param {image} imageOutOver
 * @description Listener on mouseout : restore image size after over.
 */
function outover(imageOutOver) {
   
    imageOutOver.addEventListener("mouseout", event => {
        event.target.style.transform = "scale(1)";
        event.target.style.zIndex = "0";
 
       
    });

}

function localStorageManager(imageID) {
    let clickedImages = JSON.parse(localStorage.getItem("clickedImages")) || [];
    const index = clickedImages.indexOf(imageID);
}

function removeFromLocalStorageArray(image) {
    localStorage.removeItem = image;
    console.log(localStorage);
}

/**
 * @name setGrid
 * @returns {Element} containerGrid
 * @description Add css style to "container-banner" return the Element.
 */
function setGrid() {
    let containerGrid = document.getElementById("container-banner");
    containerGrid.style.display = "flex";
    containerGrid.style.flexDirection = "column";
    containerGrid.style.width = "100%";
    containerGrid.style.justifyContent = "space-between";
    containerGrid.style.alignItems = "center";  

    return containerGrid;
}
   
