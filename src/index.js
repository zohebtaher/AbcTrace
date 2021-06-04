// import abcTrace from './tool'

// const canvas = document.getElementById('tool-canvas')

// new abcTrace(canvas)

// When true, moving the mouse draws on the canvas
let isDrawing = false;
let x = 0;
let y = 0;
let pixels = null;
let alphabetpixels = null;
let alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
let letter = null;

function toolSetup() {
  drawletter();
  pixels = context.getImageData(0, 0, myPics.width, myPics.height);
  //   alphabetpixels = totalpixels(158, 101, 101);
}

function displayError() {
  isDrawing = false;
  alert("Oh Oh Try Again !");
  context.clearRect(0, 0, myPics.width, myPics.height);
  drawletter(letter);
}

function getpixelcolor(x, y) {
  let index = y * (pixels.width * 4) + x * 4;
  return {
    r: pixels.data[index],
    g: pixels.data[index + 1],
    b: pixels.data[index + 2],
    a: pixels.data[index + 3],
  };
}

function totalpixels(r, g, b) {
  const pixelData = context.getImageData(0, 0, 640, 680);
  const all = pixelData.data.length;
  let amount = 0;
  for (i = 0; i < all; i += 4) {
    if (
      pixelData.data[i] === r &&
      pixelData.data[i + 1] === g &&
      pixelData.data[i + 2] === b
    ) {
      amount++;
    }
  }
  return amount;
}

function calcThreshold() {
  if (totalpixels(173, 255, 47) / totalpixels(255, 250, 250) > 0.89) {
    alert("Yay Good Job !!");
    context.clearRect(0, 0, myPics.width, myPics.height);
    toolSetup();
  }
}

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
    calcThreshold();
  }
});

window.addEventListener("touchend", (e) => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    isDrawing = false;
    calcThreshold();
  }
});

function drawLine(context, x1, y1, x2, y2) {
  let color = getpixelcolor(x2, y2);
  if (color.a === 0) {
    displayError();
  } else {
    context.beginPath();
    context.strokeStyle = "rgb(173,255,47)";
    context.lineWidth = 25;
    context.lineCap = "round";
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
  }
}

function drawletter(empty) {
  let chars = alphabets.split("");
  letter = empty || chars[parseInt(Math.random() * chars.length, 10)];
  context.font = "430px Arial";
  context.fillStyle = "rgb(255,250,250)";
  context.textBaseline = "middle";
  const centerx = (myPics.width - context.measureText(letter).width) / 2;
  const centery = myPics.height / 2;

  context.fillText(letter, centerx, centery);
}

toolSetup();

console.log(totalpixels(255, 255, 0));
console.log(totalpixels(165, 42, 42));
console.log(totalpixels(158, 101, 101));
