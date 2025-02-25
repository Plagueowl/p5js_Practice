let palette = [
  [200, 200, 200], //white
  [200, 0, 0], //red
  [0, 200, 0], //green
  [0, 0, 200], //blue
  [200, 200, 0], //yellow
  [286, 85, 211], //purple
  [0, 255, 255], //cyan
  [238,120,238], //violet
  [178, 34, 34], //firebrick
  [128, 128, 128], //grey
];

class particle{
  
  constructor(x,y,r,colour,id,mass = 1,Vx = 0,Vy = 0,Ax = 0,Ay = 0){
    this.position = createVector(x,y);
    this.velocity = createVector(Vx,Vy);
    this.acceleration = createVector(Ax,Ay);
    this.colour = colour;
    this.radius = r;
    this.mass = mass;
    this.id = id;

    
  }
  
  update(){
    this.velocity.add(this.acceleration);  
    this.velocity.limit(3); 
    this.position.add(this.velocity);
    this.acceleration.mult(0);   //If you don't do this then the velocity becomes too much, and changes all of a sudden.
    this.velocity.mult(0.99);
  }
  
  applyForce(force){
    this.acceleration.add(force.div(this.mass));
  }
  
  show(){
    
    fill(palette[this.colour]);
    circle(this.position.x,this.position.y,this.radius*2);
    
    
  }
  
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

        //correct if particles intersect, else they stick and move as one.
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