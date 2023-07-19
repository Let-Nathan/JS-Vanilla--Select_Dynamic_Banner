
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
    console.log(displayWindowsSize());
});

/**
 * @name creatBlock
 * @return DOM block
 */
function creatBlock() {
    let containerGrid = document.getElementById("container-grid");
    let block = document.createElement("div");
    block.className = "block";
    block.style.backgroundColor = "black";
    block.style.height = 250;
    block.style.width = 250;
    containerGrid.appendChild(block);
}