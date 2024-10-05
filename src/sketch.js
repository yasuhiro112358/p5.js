import p5 from 'p5';

const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(400, 400);
  };

  p.draw = () => {
    p.background(0); // set the background to black
    p.rect(0, 40, 100,50); // draw a rectangle
  };
};

new p5(sketch);
