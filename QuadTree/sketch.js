let qt, mouseRect;
let count; //this variable is used to count the number of comparisions it took to find the points in the rectangle
function setup() {
  createCanvas(600,600);
  qt = new QuadTree(new Rectangle(300,300,400,400))
  //adding 300 random points to the QT
  for(let i = 0;i<300;i++){
    qt.insert(new Point(random(500),random(500)));
  }
  //Rectangle for mouse
  count = 0;
  mouseRect = new Rectangle(random(500),random(500),70,70);
}

function draw(){
  background(0);
  qt.show();
  
  
  rectMode(CENTER);
  stroke(100,230,100);
  strokeWeight(4);
  noFill();
  mouseRect.x = mouseX;
  mouseRect.y = mouseY;
  if (mouseX < width && mouseY < height) {
    rect(mouseRect.x, mouseRect.y, mouseRect.w * 2, mouseRect.h * 2);
    let points = qt.detectPoints(mouseRect);
    print(count); //Uncomment this line for seeing how many comparisions it did to find the number of points in the square.
    count = 0;  //Uncomment this line for seeing how many comparisions it did to find the number of points in the square.
    for (let p of points) {
      strokeWeight(4);
      point(p.x, p.y);
    }
  }
  
}