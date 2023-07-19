
/**
 * @name displayWindowsSize
 * @returns Object
 * @description Widht & Height of window
 */
function displayWindowsSize(){
    let windowWidth = document.documentElement.clientWidth;
    let windowHeight = document.documentElement.clientHeight;
    return {
        "width" : windowWidth,
        "heigth" : windowHeight,
    }
}

window.addEventListener("resize", function(){
    let windowSize = displayWindowsSize();

});

/**
 * @name creatBlock
 * @return DOM block
 */
function creatBlock(width, height) {
    let containerGrid = document.getElementById("container-grid");
    let block = document.createElement("div");
    block.className = "block";
    block.style.backgroundColor = "black";
    block.style.height = 300;
    block.style.width = 300;
    containerGrid.appendChild(block);
    
}

function calculeMaxColumn(windowWidth) {

    return 
}

function dynamicalSizeGrid() {
    let grid = document.querySelector('#container-grid');

}