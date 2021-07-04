# Tracing Fun

## Background and overview

Reading and writing difficulties among children during the pandemic is becoming a major concern. As most language development is done through handwritten sheets and practice books in school , I decided to create simple tool to practice tracing letters. [Tracing Fun](https://zohebtaher.github.io/AbcTrace/)

## Technologies
- Javascript: Most commonly used programming language in web development. Javascript was used in creating the game logic and manipulating the DOM. 
- HTML 5: Building block of the web, used to describe the structure of the web application 
- CSS: Styling and adding aesthetics for better User Interaction 
- Canvas : This API was used to draw  graphics and manipulate image data using Javascript
- NodeJS : Used for installing packages such as webpack,babel etc

![chrome-capture](https://user-images.githubusercontent.com/37554840/124369820-1b5b8d80-dc3e-11eb-88cf-1755713534fc.jpg)

## Functionality 

To create the game logic the underlying raw pixel data was required first. Using pixel manipulation(`getImageData()`) `ImageData` for the canvas obtained. The return value is a `Uint8ClampedArray` a one-dimensional array containing the data in the RGBA format , with integer values between 0 and 255. Once the data was obtained a simple logic using percentages was used to calculate completion of task.

![tracingfun-win (2)](https://user-images.githubusercontent.com/37554840/124369301-578bef80-dc38-11eb-932e-6eece0b270a5.gif)


```
function totalpixels(r, g, b) {
  const pixelData = context.getImageData(0, 0, myPics.width, myPics.height);
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


function calcThreshold() {
  if (totalpixels(250, 121, 56) / totalpixels(255, 250, 250) > 0.92) {
    
    display("win");

    context.clearRect(0, 0, myPics.width, myPics.height);
    toolSetup();
  }
}
```
The logic for handling errors was based on the concept that the canvas has an opacity (`a`) of 0 and the letter an opacity of 1.An error message is displayed when the line is drawn on a pixel with an opacity value of 0. 

```
function getpixelcolor(x, y) {
  let index = y * (pixels.width * 4) + x * 4;
  return {
    r: pixels.data[index],
    g: pixels.data[index + 1],
    b: pixels.data[index + 2],
    a: pixels.data[index + 3],
  };
}
function drawLine(context, x1, y1, x2, y2) {
  let color = getpixelcolor(x2, y2);
  if (color.a === 0) {
    displayError();
  } else {
    context.beginPath();
    context.strokeStyle = "rgb(250,121,56)";
    context.lineWidth = 28;
    context.lineCap = "round";
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
  }
}
```
![tracingfun-error (1)](https://user-images.githubusercontent.com/37554840/124369637-c61e7c80-dc3b-11eb-9764-072a9d017ca2.gif)


## Future Direction 
Currently the application is optimized for mouse click event listeners. Making it mobile friendly and  adding touch event listeners is the next step. 

