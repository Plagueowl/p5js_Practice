let n;
let arrayRed;
let arrayBlue;
let qtree;
let checkedPairs = new Set();
function setup() {
  createCanvas(800,800);
  // frameRate(10);
  n = 400;
  arrayRed = new Array();
  arrayBlue = new Array();
  for(var i = 0;i< n;i++){
    arrayRed.push(new particle(random(height),random(width),5,1,i));
  }
  for(var i = 0;i< 1500;i++){
    arrayBlue.push(new particle(random(height),random(width),5,3,i));
    
  }
}

function draw() {
  background(0);
  checkedPairs.clear();

  let boundary = new Rectangle(width/2,height/2,width,height);
  let qtree = new QuadTree(boundary,4);
  for(var i = 0;i<n;i++){
    qtree.insert(new Point(arrayRed[i].position.x,arrayRed[i].position.y,arrayRed[i]));
    qtree.insert(new Point(arrayBlue[i].position.x,arrayBlue[i].position.y,arrayBlue[i]));
  }
  
  for(let particle of arrayRed){
    let range = new Circle(particle.position.x, particle.position.y, 50);
    
    let neighbours = qtree.detectPoints(range);
    
    for(let neighbour of neighbours){
      if(neighbour.data.colour != particle.colour){
        repel(neighbour.data, particle,5);
      }
      else{
        attract(neighbour.data, particle,1);
      }
      
//       let currentNearbyParticle = neighbour.data;
      
      // //Making a simple encrypted string of pairs of particles and checking if they have been examined before. Here is where the ID assigned to the particle comes in use
      // if(currentNearbyParticle !== particle){
      //   let idA = currentNearbyParticle.id;
      //   let idB = particle.id;
      //   let hashString = idA<idB ? `${idA}:${idB}` : `${idB}:${idA}`;
      //   if(!checkedPairs.has(hashString)){
      //     particle.collide(currentNearbyParticle);
      //     checkedPairs.add(hashString);
      //   }
      // }
    
    }
  }
  
  for(let particle of arrayBlue){
    let range = new Circle(particle.position.x, particle.position.y, 50);
    
    let neighbours = qtree.detectPoints(range);
    for(let neighbour of neighbours){
      if(neighbour.data.colour != particle.colour){
        repel(neighbour.data, particle,5);
      }
      // else{
        // repel(neighbour.data, particle,1);
      // }
    }
  }
  show();
  // qtree.show();
  

  
}


function attract(point1,point2, intensity){
  let distance = p5.Vector.sub(point1.position,point2.position);
  
  if(distance.mag() > 0 && distance.mag() < 80){
    let force = distance.copy().setMag(intensity/distance.mag());
    point1.applyForce(force.mult(-0.5));
    point2.applyForce(force.mult(0.5));
  }
}

function repel(point1,point2, intensity){
  let distance = p5.Vector.sub(point1.position,point2.position);
    
  if(distance.mag() > 0 && distance.mag() < 80){

    let force = distance.copy().setMag(intensity/distance.mag());
    point1.applyForce(force.mult(0.5));
    point2.applyForce(force.mult(-0.5));
  }
}
function show(){
  for(let particle of arrayRed){
    particle.update();
    particle.show();
    particle.edges();
    // print(particle.acceleration.x);
  }
  for(let particle of arrayBlue){
    particle.update();
    particle.show();
    particle.edges();
  }
}