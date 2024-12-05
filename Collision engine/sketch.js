let ball1,ball2;
function setup() {
  createCanvas(600,600);
  ball1 = new particle(500,110,3,2,70,10);
  ball2 = new particle(50,70,3,5,50,10);
  
}

function draw() {
  background(0);
  ball1.show();
  ball2.show();

  ball1.collide(ball2);

  ball1.update();
  ball2.update();



  ball1.edges();
  ball2.edges();

}


//this class contains all the components required to make the collision engine. eg particle position, velocity, collision physics
class particle{
  
  //initiates position and velocity vector
  constructor(x,y , velocityX, velocityY, r,mass){
    this.position = createVector(x,y);
    this.radius = r;
    this.velocity = createVector(velocityX,velocityY);
    this.mass = mass;
  }
  //draws a circle for this example
  
  show(){
    circle(this.position.x,this.position.y,this.radius);
  }
  update(){
    this.position.add(this.velocity);
  }


  //collision engine, covers edges and particle itself

  edges(){
    //check edges
    if (this.position.x > height - this.radius) {
      this.position.x = height - this.radius;
      this.velocity.x *= -1;
    } else if (this.position.x < this.radius) {
      this.position.x = this.radius;
      this.velocity.x *= -1;
    }

    if (this.position.y > height - this.radius) {
      this.position.y = height - this.radius;
      this.velocity.y *= -1;
    } 
    else if (this.position.y < this.radius) {
      this.position.y = this.radius;
      this.velocity.y *= -1;
    }
  }
  collide(other){

    let impactVector = p5.Vector.sub(other.position,this.position);
    let distance = impactVector.mag();
    if(distance< this.radius + other.radius){

      //correct if particles intersect, else they stick and move.
      let overlap = distance-(other.radius + this.radius);
      let direction = impactVector.copy();
      direction.setMag(overlap*0.5);
      this.position.add(direction);
      other.position.sub(direction);
      distance = this.radius + other.radius;
      impactVector.setMag(distance);
    // final velocity formulas, denoted from conservation of momentum and kinetic energy

      
      let velocitySub = p5.Vector.sub(other.velocity, this.velocity);
      let numerator = 2*other.mass * p5.Vector.dot(velocitySub,impactVector);
      let denominator = (this.mass + other.mass) *distance*distance;
      let copy = impactVector.copy();
      this.velocity.add(p5.Vector.mult(copy,(numerator/denominator)));
      copy = impactVector.copy();

      numerator = -2*this.mass * p5.Vector.dot(velocitySub,impactVector);
      other.velocity.add(p5.Vector.mult(copy,(numerator/denominator)));
    }

  }

  
  
}

