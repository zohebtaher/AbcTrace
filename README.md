# Tracing Fun

## Background and overview

Reading and writing difficulties among children during the pandemic is becoming a major concern. As most language development is done through handwritten sheets and practice books in school , I decided to create simple tool to practice tracing letters. 

##Technologies
- Javascript
- HTML 5
- CSS
- Canvas
- NodeJS

## Functionality 

To create the game logic the underlying raw pixel data was required first. Using pixel manipulation(`getImageData()`) `ImageData` for the canvas obtained. The return value is a `Uint8ClampedArray` a one-dimensional array containing the data in the RGBA format , with integer values between 0 and 255. Once the data was obtained a simple logic using percentages was used to calculate completion of task.

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



