//This is the code for simulating a pendulum. There is damping logic as well which I'm working on
//I am trying to make the pendulum wave simulation, I will learn about frequency, the length adjustments, etc and then rewrite this code to make proper waves.

let pendulums;
let n;
function setup() {
  createCanvas(600, 600);
  n = 15;
  pendulums = new Array();
  let lengths = [230,211,196,183,170,159,149,140,131,124,117,110,105,99,94,89];
  for (var i = 0;i< n;i++){
    pendulums.push(new pendulum(300,150,lengths[i],20,PI/4));
  }
}

function draw() {
  background(220);
  for(let object of pendulums){
    object.show();
    object.update();
    // if(frameCount % 5 == 0){
    //   object.dampen();

    // }
  }
}

class pendulum{
  constructor(x,y,l,radius,theta,gravity = 2, mass = 1){
    this.position = createVector(x,y);
    this.l = l;
    this.radius = radius;
    this.theta = theta;
    this.gravity = gravity;
    this.mass = mass;
    this.angularAcceleration = 0;
    this.angularVelocity = 0;
  }

  show(){
    line(this.position.x,this.position.y,this.position.x + this.l * sin(this.theta), this.position.y + this.l * cos(this.theta));

    circle(this.position.x + this.l * sin(this.theta), this.position.y + this.l * cos(this.theta), this.radius);
  }

  update(){
    //calculate the angular acceleration ( gravity * sin(theta) )
    this.angularAcceleration = -this.gravity * sin(this.theta)/this.l;
    this.angularVelocity += this.angularAcceleration;
    this.theta += this.angularVelocity;
  }
  dampen(){
    this.theta *= 0.99;
  }

}
