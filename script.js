/**
 * @description event listener on reload adding banner to nav.
 */
document.addEventListener("DOMContentLoaded", function() {
    var topBanner = document.querySelector('.top-banner');
    
    var imageIndex = 0;
    var imagesBanner = [];

    /**
     * @Todo Add a random for selected differents images every times
     * 
     * Load first 3 images to display it in banner.
     * 
     * @Function loadImages
     * @Return Array of images contains in assets folder
     */
    function loadImages() {
        for (var i = 1; i <= 3; i++) {
        let image = new Image();
        image.src = 'assets/banner/image' + i + '.jpg'; 
        imagesBanner.push(image);
        }
    }

    /**
     * @function changeBannerImage
     * @returns images
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

   


    loadImages();
    changeBannerImage();
    setInterval(changeBannerImage, 2000);
    getImage();
  });

function displayImages(event) {
    console.log("a");
}
 
let imagesGrid = [];
 /**
     * @function 
     * @returns
     * @description not dynamic method ==> NodeJs 
     */
    function getImage() { 
        for(i = 1; i <= 9; i++) {
            let image = new Image();
            image.src = "assets/banner" + i + ".jpg";
            imagesGrid.push(image);
            setGrid();
    }

    function setGrid() {
        let containerGrid = document.getElementsByClassName("container-banner");
        imagesGrid.forEach(el => {
            let gridImage = document.createElement("img");
            gridImage.width = 100;
            gridImage.height = 100;
            gridImage.src[el];
            containerGrid.append = gridImage;
        })
        
    }
    console.log(imagesGrid);

}