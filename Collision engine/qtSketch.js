let qt;

function setup() {
  createCanvas(600,600);
  qt = new QuadTree(new Rectangle(300,300,400,400))
  background(0);
}

function draw(){
  qt.show();
}

function mousePressed(){
  qt.insert(new Point(mouseX,mouseY));
}