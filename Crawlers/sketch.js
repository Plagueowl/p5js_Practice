//This code demonstrates a bunch of objects (Movers) bein attracted to a central object (Atrractor)

//The movers have a leg that helps them crawl around the screen. The leg is moving using Simple harmonic motion

let attractor1,movers = [];
function setup() {
  createCanvas(600,600);
  attractor1 = new attractor(300,300,50);
  for(let i = 0;i<10;i++){
    movers.push(new mover(random(50,500),random(200,500),random(10,40),1,0,0,0,0));  //creating an array of movers
  }
}

function draw() {
  background(255);
  attractor1.show();
  for(let i = 0;i<10;i++){
    
    attractor1.attract(movers[i]);
    movers[i].update();
    movers[i].show();
  }
  
  
}

class mover{
  constructor(x,y,r,m,Vx,Vy, Ax,Ay){  //initiating all scalars and vectors
    this.position = createVector(x,y);
    this.velocity = createVector(Vx,Vy);
    this.acceleration = createVector(Ax,Ay);
    this.mass = m;
    this.radius = r;
    this.crawlerVector = createVector(x,y);
  }
  update(){
    this.velocity.add(this.acceleration);  
    this.velocity.limit(6);    
    this.position.add(this.velocity);
    this.crawlerVector = this.position.copy();
    this.crawlerVector.add(p5.Vector.setMag(this.velocity,this.radius * (1+sin(this.velocity.mag()/4 * PI))));      //This is the SHM equation. The 1 in (1+ sin) is for displacing the center of the SHM crawler. If you remove it it will start moving across the object
    this.acceleration.mult(0);   //If you don't do this then the velocity becomes too much, and changes all of a sudden.
  }
  
  applyForce(force){
    this.acceleration.add(force.div(this.mass));
  }
  
  show(){
    stroke(4);
    fill(125);
    circle(this.position.x,this.position.y,this.radius*2);
    //leg
    fill(0);
    line(this.position.x,this.position.y,this.crawlerVector.x,this.crawlerVector.y);
    circle(this.crawlerVector.x,this.crawlerVector.y,this.radius/4);
    
    
  }
}

class attractor{
  constructor(x,y,r){
    this.position = createVector(x,y);
    this.radius = r;
  }
  attract(mover){
    let direction = p5.Vector.sub(this.position,mover.position);
    mover.applyForce(direction.setMag(0.1));
  }
  
  show(){
    stroke(4);
    noFill();
    circle(this.position.x,this.position.y,this.radius*2);
  }
}


