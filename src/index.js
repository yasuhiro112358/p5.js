import p5 from 'p5';


console.log('Hello, world!');


const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(400, 400);
  };

  p.draw = () => {
    p.background(220);
  };
};

new p5(sketch);
