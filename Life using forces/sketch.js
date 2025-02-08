let n;
let arrayRed;
let arrayBlue;
let qtree;
let checkedPairs = new Set();

//will add comments later

function setup() {
  createCanvas(1000,1000);
  
  n = 200;
  arrayRed = new Array();
  arrayBlue = new Array();
  for(var i = 0;i< n;i++){
    arrayRed.push(new particle(random(height),random(width),5,1,i));
    arrayBlue.push(new particle(random(height),random(width),5,3,i));
  }
}

function draw() {
  background(255);
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
        repel(neighbour.data, particle,0.08);
      }
      else{
        attract(neighbour.data, particle,0.1);
      }
      
      let currentNearbyParticle = neighbour.data;
      
      //Making a simple encrypted string of pairs of particles and checking if they have been examined before. Here is where the ID assigned to the particle comes in use
      if(currentNearbyParticle !== particle){
        let idA = currentNearbyParticle.id;
        let idB = particle.id;
        let hashString = idA<idB ? `${idA}:${idB}` : `${idB}:${idA}`;
        if(!checkedPairs.has(hashString)){
          particle.collide(currentNearbyParticle);
          checkedPairs.add(hashString);
        }
      }
    
    }
  }
  
  for(let particle of arrayBlue){
    let range = new Circle(particle.position.x, particle.position.y, 50);
    
    let neighbours = qtree.detectPoints(range);
    for(let neighbour of neighbours){
      if(neighbour.data.colour != particle.colour){
        attract(neighbour.data, particle,0.08);
      }
      else{
        repel(neighbour.data, particle,0.1);
      }
    }
  }
  show();
  

  
}


function attract(point1,point2, intensity){
  let force = p5.Vector.sub(point1.position,point2.position);
  point2.applyForce(force.setMag(intensity));
  point1.applyForce(force.mult(-1));
}

function repel(point1,point2, intensity){
  let force = p5.Vector.sub(point1.position,point2.position);
  // print(force.x);
  point1.applyForce(force.setMag(intensity));
  point2.applyForce(force.mult(-1));
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