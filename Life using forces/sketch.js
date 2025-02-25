let n;
let redParticles;
let blueParticles;
let greenParticles;
let whiteParticles;
let qtree;


function setup() {
  createCanvas(500,500);
  // frameRate(10);
  
  //initiating the particles
  n = 500;
  redParticles = new particleSystem(n,1);
  // blueParticles = new particleSystem(n,3);
  greenParticles = new particleSystem(n,2);
  // whiteParticles = new particleSystem(n,0)
}

function draw() {
  background(0);
  //constructing the quadtree 
  let boundary = new Rectangle(width/2,height/2,width,height);
  let qtree = new QuadTree(boundary,4);
  for(var i = 0;i<n;i++){
    let redP = redParticles.particles[i];
    // let blueP = blueParticles.particles[i];
    let greenP = greenParticles.particles[i];
    // let whiteP = whiteParticles.particles[i];
    qtree.insert(new Point(redP.position.x, redP.position.y, redP));
    // qtree.insert(new Point(blueP.position.x, blueP.position.y, blueP));
    qtree.insert(new Point(greenP.position.x, greenP.position.y, greenP));
    // qtree.insert(new Point(whiteP.position.x, whiteP.position.y, whiteP));
  }
  
  //attract(colour, intensity, quadtree)
  //repel(colour, intensity, quadtree)
  
  //write the rules, update, then show.
  //attract() and repel() Rules will just apply forces on particle's neighbors. update() will update all the velocity, position and acceleration components of particles. It will also trigger the collision engine.
  
  
  redParticles.attract(1,7,qtree);
  redParticles.attract(2,6,qtree);
  // redParticles.repel(0,5,qtree);
  // redParticles.repel(3,3,qtree);
  
  // greenParticles.repel(1,6,qtree);
  // greenParticles.repel(2,1,qtree);
  // greenParticles.repel(0,7,qtree);
  // greenParticles.attract(3,8,qtree);
  
  // whiteParticles.repel(0,10,qtree);
  // whiteParticles.attract(1,7,qtree);
  // whiteParticles.repel(2,9,qtree);
  // whiteParticles.repel(3,5,qtree);
  
  // blueParticles.repel(3,5,qtree);
  // blueParticles.attract(0,2,qtree);
  // blueParticles.repel(1,6,qtree);
  // blueParticles.attract(2,2,qtree);
  
  redParticles.update(qtree);
  // blueParticles.update(qtree);
  greenParticles.update(qtree);
  // whiteParticles.update(qtree);
  
  redParticles.show();
  // blueParticles.show();
  greenParticles.show();
  // whiteParticles.show();
  // qtree.show(); 
}