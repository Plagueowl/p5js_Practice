//This is a simple simulation of a circle accelerating towards the mouse. If you swing your mouse right, it will start revolving around your mouse. 
//I'm saving this because the revolving behaviour was so unexpected and I'm so happy that this simulation worked without even thinking about the natural revolving behaviour.


function setup() {
  createCanvas(500, 500);
  ball1 = new Particle(20,20,15,0,0,0,0);
  ball2 = new Particle(60,80,15,0,0,0,0);

}

function draw() {
  background(220);
  ball1.update();
  ball1.show();
}


class Particle{
  constructor(x , y, r, Vx, Vy, Ax, Ay){
    this.position = createVector(x,y);
    this.radius = r;
    this.velocity = createVector(Vx,Vy);
    this.acceleration = createVector(Ax,Ay);
  }
  update(){
    this.acceleration = p5.Vector.sub(createVector(mouseX,mouseY),this.position);
    this.acceleration.mult(0.01);
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(5);
  }
  show(){
    circle(this.position.x,this.position.y,this.radius);
  }

  
}