// Set to keep track of checked particle pairs.
let checkedPairs = new Set();
let idGen = 1;

//This class creates a whole bunch of particles and stores them in an array. All the functions will apply to all the particles created.
class particleSystem{
  
  constructor(number, colour){
    this.numberOfParticles = number;
    this.colour = colour;
    this.particles = new Array();
    
    for(var i = 0;i< this.numberOfParticles;i++){
      this.particles.push(new particle(random(height),random(width),5,colour,idGen++));
    }
  }
  
  //quadtree is needed to apply forces as I did not make the attraction/repulsion functions to take another particle system as an argument. It can be done that way as well but qtree saves a lot of computation.
  attract(colour, intensity, qtree){
    
    for(let Particle of this.particles){
      let range = new Circle(Particle.position.x, Particle.position.y, 50);

      let neighbours = qtree.detectPoints(range);

      for(let neighbour of neighbours){
        
        if(neighbour.data.colour == colour){
          let distance = p5.Vector.sub(Particle.position,neighbour.data.position);

          if(distance.mag() > 0 && distance.mag() < 80){
            let force = distance.copy().setMag(intensity/distance.mag());
            Particle.applyForce(force.mult(-0.5));
            neighbour.data.applyForce(force.mult(0.5));
          }

        }
      }
    }
  }

  
  repel(colour, intensity, qtree){    
    
    for(let Particle of this.particles){
      let range = new Circle(Particle.position.x, Particle.position.y, 50);

      let neighbours = qtree.detectPoints(range);
      
      for(let neighbour of neighbours){
        if(neighbour.data.colour == colour){
          let distance = p5.Vector.sub(Particle.position,neighbour.data.position);

          if(distance.mag() > 0 && distance.mag() < 80){
            let force = distance.copy().setMag(intensity/distance.mag());
            Particle.applyForce(force.mult(0.5));
            neighbour.data.applyForce(force.mult(-0.5));
          }
        }
  
      }
    }
  }
  
  
  show(){
    for(let Particle of this.particles){
      Particle.show();
    }
  }
  
  
  update(qtree){
    checkedPairs.clear();
    
    for(let Particle of this.particles){
      Particle.update();
      Particle.edges();
      
      //for checking the collision status. Please check the Collision engine project for more details.
      let range = new Circle(Particle.position.x, Particle.position.y, 20);
      let neighbours = qtree.detectPoints(range);
      
      for(let neighbour of neighbours){
        let currentNearbyParticle = neighbour.data;
      //Making a simple encrypted string of pairs of particles and checking if they have been examined before. Here is where the ID assigned to the particle comes in use
        if(currentNearbyParticle !== Particle){
          let idA = currentNearbyParticle.id;
          let idB = Particle.id;

          let hashString = idA<idB ? `${idA}:${idB}` : `${idB}:${idA}`;
          if(!checkedPairs.has(hashString)){
            Particle.collide(currentNearbyParticle);
            checkedPairs.add(hashString);
          }
        }
      }
    }
  }
}