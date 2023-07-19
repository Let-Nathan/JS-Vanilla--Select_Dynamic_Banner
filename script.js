
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
    clean();
    let windowSize = displayWindowsSize();
    let maxSquare = Math.round(calcule_maxSquare(windowSize.width));
    let maxRow = Math.round(calcule_maxRow(windowSize.heigth));
    dynamicGrid(maxSquare, maxRow);
    blockFactory(maxSquare, maxRow);

});

function clean() {
    let grid = document.querySelector("#container-grid");
    grid.innerHTML = "";
}

function blockFactory(maxSquare, maxRow) {
    for(i = 1; i <= maxSquare; i++) {
        creatBlock(i, maxSquare);
       
        for(j = 0; j <= maxRow; j++) {
            creatBlock(i, maxRow, j);
        }
    }
}

/**
 * @name creatBlock
 * @return DOM block
 */
function creatBlock(blockNbr, maxRow, j) {
    let containerGrid = document.getElementById("container-grid");
    let block = document.createElement("div");
    block.className = "block" + blockNbr;
    block.style.backgroundColor = "whith";
    block.style.border = "solid";
    block.style.borderColor = "black";
    block.style.height = 300;
    block.style.maxHeight = 300;
    block.style.width = 300;
    block.style.maxWidth = 300;
    block.style.gridColumn = blockNbr;
    block.style.gridRow = j;
   
    containerGrid.appendChild(block);
    
}

/**
 * 
 * @param {int} maxSquare 
 * @param {int} maxRow
 */
function dynamicGrid(maxSquare, maxRow){
    let containerGrid = document.getElementById("container-grid");
    containerGrid.style.display = "grid";
    containerGrid.style.width = "100%";
    containerGrid.style.gridColumn = maxSquare; 
    containerGrid.style.gridRow = maxRow;

}


/**
 * @Todo posibility to change dynamicly block width
 */
function calcule_maxSquare(windowWidth) {
    let maxSquare = windowWidth / 300;
    maxSquare > 12 ? maxSquare = 12 : maxSquare < 1 ? maxSquare = 1 : maxSquare;
    return maxSquare;
}

/**
 * @Todo posibility to change dynamicly block width
 */
function calcule_maxRow(windowHeight) {
    let maxHeight = windowHeight / 300;
    maxHeight > 12 ? maxHeight = 12 : maxHeight < 1 ? maxHeight = 1 : maxHeight;
    return maxHeight;
}