/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
// import abcTrace from './tool'

// const canvas = document.getElementById('tool-canvas')

// new abcTrace(canvas)

// When true, moving the mouse draws on the canvas
let isDrawing = false;
let x = 0;
let y = 0;
// let pixels =

const myPics = document.getElementById("tool-canvas");
const context = myPics.getContext("2d");

// event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

// Add the event listeners for mousedown, mousemove, and mouseup
myPics.addEventListener("mousedown", (e) => {
  x = e.offsetX;
  y = e.offsetY;
  isDrawing = true;
});

myPics.addEventListener("touchstart", (e) => {
  x = e.offsetX;
  y = e.offsetY;
  isDrawing = true;
});

myPics.addEventListener("mousemove", (e) => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
  }
});

myPics.addEventListener("touchmove", (e) => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
  }
});

window.addEventListener("mouseup", (e) => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});

window.addEventListener("touchend", (e) => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});

function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = "black";
  context.lineWidth = 20;
  context.lineCap = "round";
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  context.stroke();
  context.closePath();
}

function drawletter(letter) {
  const centerx = (myPics.width - context.measureText(letter).width) / 3;
  const centery = myPics.height / 2;

  context.font = "300px Arial";
  context.fillStyle = "rgb(255,255,0)";
  context.textBaseline = "middle";
  context.fillText(letter, centerx, centery);
}

drawletter("A");

// console.log("Webpack is working!");

/******/ })()
;
//# sourceMappingURL=bundle.js.map