
//This code renders smoothly even with 200 particles. You can uncomment the lines mentioned of this code to look at the quadtree and individual range of each particle

let n;
//array to store all particles.
let particles;

// Set to keep track of checked particle pairs.
let checkedPairs = new Set();

function setup() {
  createCanvas(1000,1000);
  n = 200;
  particles = new Array();
  for(var i = 0;i<n;i++){
    let x = random(width);
    let y = random(height);
    let r = random(10,30)
    let mass = random(4,100);
    particles.push(new Particle(x,y,r,mass,i,random(0.9),random(0.5),random(255)));
  }

}

function draw() {
  background(0);
  
  //construct the quadtree.
  let boundary = new Rectangle(width/2,height/2,width,height);
  checkedPairs.clear();
  let qt = new QuadTree(boundary,4);
  for(let particle1 of particles){
    qt.insert(new Point(particle1.position.x,particle1.position.y,particle1));
  }
  
  for(let particle1 of particles){
    //check all nearby particles. I'm checking all nearby circles in the range r*2
    let range = new Circle(particle1.position.x,particle1.position.y,particle1.radius *2);
    // noFill();
    // stroke(255);
    // circle(range.x,range.y,range.r*2);  //Uncomment these three lines to see the individual range covered of each particle
    let nearbyPoints = qt.detectPoints(range);
    for(let point1 of nearbyPoints){
      
      let currentNearbyParticle = point1.particleData;
      
      //Making a simple encrypted string of pairs of particles and checking if they have been examined before. Here is where the ID assigned to the particle comes in use
      if(currentNearbyParticle !== particle1){
        let idA = currentNearbyParticle.id;
        let idB = particle1.id;
        let hashString = idA<idB ? `${idA}:${idB}` : `${idB}:${idA}`;
        if(!checkedPairs.has(hashString)){
          particle1.collide(currentNearbyParticle);
          checkedPairs.add(hashString);
        }
      }
      
    }
  }
  
  for (let particle1 of particles) {
    particle1.update();
    particle1.edges();
    particle1.show();
  }
  // qt.show(); //Uncomment this line to see the structure of the quad tree
  

}



