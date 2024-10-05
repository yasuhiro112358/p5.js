import p5 from 'p5';

const sketch = (p) => { // p could be any variable name
  p.setup = () => {
    const canvas = p.createCanvas(480, 240); // create a canvas
    canvas.parent('#canvas-container'); // attach the canvas to a div with id 'canvas

    // p.background(127); // 0-255 (black-white) 
    // p.background(255, 0, 0); // RGB
    // p.background(255, 0, 0, 50); // RGBA
    
    p.colorMode(p.HSB); // set the color mode to HSB
    p.background(180, 100, 100); // HSB color
    
    // p.background('#ff0000'); // hex color
    // p.background('red'); // color name
    // p.background('rgb(255, 0, 0)'); // color string
    
    p.frameRate(60); // set the frame rate (FPS)
  };

  let x = 0; // declare a variable to store the x-coordinate of the rectangle 
  p.draw = () => { // p5.js calls this function 60 times per second by default 
    // p.background(0); // set the background to black
    // p.rect(40, 40, 50, 50); // draw a rectangle

    p.rect(x, 40, 50, 50); // draw a rectangle at the x-coordinate
    x++;
  };
};

new p5(sketch); // create a new instance of p5 with the sketch function
