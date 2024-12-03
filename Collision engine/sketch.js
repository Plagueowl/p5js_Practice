let ball1;
function setup() {
  createCanvas(600,600);
  ball1 = new particle(5,5,2,3,70);
  
}

function draw() {
  background(0);
  
  ball1.show();

  ball1.collide();
}


//this class contains all the components required to make the collision engine. eg particle position, velocity, collision physics
class particle{
  
  //initiates position and velocity vector
  constructor(x,y , velocityX, velocityY, r){
    this.position = createVector(x,y);
    this.radius = r;
    this.velocity = createVector(velocityX,velocityY);
  }
  //draws a circle for this example
  
  show(){
    circle(this.position.x,this.position.y,this.radius);
    this.position.add(this.velocity);
  }


  //collision engine, covers edges and particle itself
  collide(){
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

  
  
}

