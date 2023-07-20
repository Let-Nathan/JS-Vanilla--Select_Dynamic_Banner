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
 * @desc load first 3 images in assets/banner files 
 */
function loadBannerImages() {
    for (var i = 1; i <= 3; i++) {
        let image = new Image();
        image.src = 'assets/banner/banner' + i + '.jpg'; 
        imagesBanner.push(image);
    }
}

/**
 * @name triggerButtonConfirm
 * @return {void}
 * @description Trigger onclick on button submit 
 */
function triggerButtonConfirm() {
    let buttonConfirm = document.getElementById("button-submit");
    buttonConfirm.addEventListener("click", event => {
    const clickedImages = JSON.parse(localStorage.getItem("clickedImages")) || [];
       
    //if true raz imagesBanner : to store new value && imageIndex : restore loop through start (prevent start from wrong index)
    if(clickedImages.length != 0) {
      
        imagesBanner = [];
        imageIndex = 0;
        //add all images in banner array
        for(i = 0; i < clickedImages.length; i++) {
            let image = new Image();
            image.src = "assets/banner/" + clickedImages[i];
            imagesBanner.push(image);
           
        }
    } else {
   
        //if false : reload the banner content with default images.   
        loadBannerImages();  
        changeBannerImage();
    }
    })
}
/**
 * @name changeBannerImage
 * @returns {void}
 * @description clear div "top-banner" before inserting new images[index] from images array.
 */
function changeBannerImage() {
    topBanner.innerHTML = '';
    topBanner.appendChild(imagesBanner[imageIndex]);
    imageIndex++;

    //prevent index goes "out of bound" ;)
    if (imageIndex >= imagesBanner.length) {
        imageIndex = 0;
    }
}

/**
 * @name getLocalStorageImg
 * @return {void}
 * @description check in local storage if value are associated with key "clikedImages", true : value push in [imagesBanner] / false : nothing happen
 */
function getLocalStorageImg() {
    const clickedImages = JSON.parse(localStorage.getItem("clickedImages"));
    if(clickedImages.length != 0 && clickedImages != null) {   
        for(i = 0; i < clickedImages.length; i++) {
            //banner
            let image = new Image();
                image.src = "assets/banner/" + clickedImages[i];
                imagesBanner.push(image);        
        }
    }        
}

    //Initialisation of top banner if localstorage empty
    if(JSON.parse(localStorage.getItem("clickedImages")) === null || JSON.parse(localStorage.getItem("clickedImages")).length === 0) {
        loadBannerImages();
    } else {
        getLocalStorageImg();
        
    }

    //execution for pages function (on reload)
    changeBannerImage();
    setInterval(changeBannerImage, 2000);
    getImage();
    triggerButtonConfirm();
});

//store images for user selection
let imagesGrid = [];
  
/**
 * @function 
 * @returns
 * @description not dynamic method should use NodeJs to check inside folder. 
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

/**
 * @todo:  
 *       - Refacto function (SRP);
 *       - Function to define how many container to create dynamicly. Rule = container <= 4 images block;
 * 
 * @name addImageToGrid
 * @param {Array[image]} imagesToPick
 * @description Create container and assign images in it and link event listener.
 */
function addImageToGrid(imagesToPick){
    //init grid css element    
    let containerGrid = setGrid();

    //init 3 container
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
        onOver(imagesToPick[i]);
        outover(imagesToPick[i]);  
    }
}

/**
 * @name onClick
 * @param {image} imagesToPick
 * @description Linked previously on every image. Used to split image on two function. Add toggle & store in local storage.
 */
function onClick(imagesToPick) {
    imagesToPick.addEventListener("click", event => {
        //add : remove ===> toggle
        toggleBorderImage(event.target);
        //add : remove ===> local storage
        localStorageManager(getImageIdentifier(event.target));
    })
}

/**
 * @name toggleBorderImage
 * @param {image} toggleImage
 * @description toggle image with css value "border-blue". 
 */
function toggleBorderImage(toggleImage){
    toggleImage.classList.toggle("border-blue");
}

/**
 * @name getImageIdentifier
 * @param {image} imageElement 
 * @returns image with formated identifier (banner1, banner2...)
 */
function getImageIdentifier(imageElement) {
    let imageSrc = imageElement.src;
    const defaultPath = "http://127.0.0.1:5500/assets/miniature/";
    return imageSrc.replace(defaultPath, "");
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
    if (index === -1) {
        // If the image is not already in clickedImages, add it
        clickedImages.push(imageID);
    } else {
        // Otherwise, remove it from the clickedImages array
        clickedImages.splice(index, 1);
    }
    // Save the updated clickedImages array in localStorage
    localStorage.setItem("clickedImages", JSON.stringify(clickedImages));
}
