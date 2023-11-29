
const mouseEvents = ["mousedown","mousemove","touchstart","touchmove"];

// 

let paintColor = "black";
const whatColor = document.querySelector("#what-color");

const brushColor = document.querySelector("#brush-color");
const colorButton = document.querySelector("#color-button");
colorButton.addEventListener("click", changePaint);
brushColor.addEventListener("keyup", enterKeyColor);

changePaint();

// 

const canvasBox = document.querySelector("#canvas");
const gridDim = document.querySelector("#grid-dim");
createCanvas(16);

const canvasDim = document.querySelector("#canvas-dim");
const clearButton = document.querySelector("#clear-button");
clearButton.addEventListener("click", newCanvas);
canvasDim.addEventListener("keyup", enterKeyClear);

//

let mouseHold = false;
const inputDownStart = ["mousedown","touchstart"]
const inputUpEnd = ["mouseup","touchend"]
const body = document.querySelector("body");
inputDownStart.forEach((item) => {body.addEventListener(item, ()=>{mouseHold=true;});})
inputUpEnd.forEach((item) => {body.addEventListener(item, ()=>{mouseHold=false;});})

//

function colorCell() {
    let target = event.target
    if(mouseHold || event.type=="mousedown" || event.type=="touchstart") {target.style["background-color"] = paintColor;}
}

function changePaint() {
    if(brushColor.value=="") {
        paintColor = "black";
    } else {
        paintColor = brushColor.value;
    }
    whatColor.innerHTML = paintColor;
}

function enterKeyClear() {
    if(event.key=="Enter") {newCanvas();}
}

function enterKeyColor() {
    if(event.key=="Enter") {changePaint();}
}

function newCanvas() {
    let dim = canvasDim.value;
    if(dim>=2 && dim<=64 && dim%1==0) {
        createCanvas(dim);
    } else if(dim=="") {
        createCanvas(16);
    }
}

function createCanvas(dim) {
    deleteCanvas();
    for(let i=0; i<dim; i++) {
        let canvasRow = document.createElement("div");
        canvasRow.className = "canvas row";
        for(let j=0; j<dim; j++) {
            let canvasCell = document.createElement("div");
            canvasCell.className = "canvas cell";
            mouseEvents.forEach((item) => {canvasCell.addEventListener(item, colorCell);})
            canvasRow.appendChild(canvasCell);
        }
        canvasBox.appendChild(canvasRow);
    }
    gridDim.innerHTML = `${dim} x ${dim}`
}

function deleteCanvas() {
    while(canvasBox.lastElementChild) {
        canvasBox.removeChild(canvasBox.lastElementChild);
    }
}