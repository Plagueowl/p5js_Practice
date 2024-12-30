//This file has added code mostly of circle geometry because the quadtree specific code had point geometry.

//particleData variable is particle object
class Point{
  constructor(x,y,particleData){
    this.x = x;
    this.y = y;
    this.particleData = particleData;
  }
}

class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.rSquared = this.r * this.r;
  }

  contains(point1) {
    // check if the point is in the circle by checking if the euclidean distance of
    // the point and the center of the circle if smaller or equal to the radius of
    // the circle
    let d = Math.pow(point1.x - this.x, 2) + Math.pow(point1.y - this.y, 2);
    return d <= this.rSquared;
  }

  //checks if a rectangle intersects a circle (for quadtree rectangles)
  intersects(range) {
    var xDist = Math.abs(range.x - this.x);
    var yDist = Math.abs(range.y - this.y);

    // radius of the circle
    var r = this.r;

    var w = range.w;
    var h = range.h;

    var edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);

    // no intersection
    if (xDist > r + w || yDist > r + h) return false;

    // intersection within the circle
    if (xDist <= w || yDist <= h) return true;

    // intersection on the edge of the circle
    return edges <= this.rSquared;
  }
}
//this class will be used to determine every rectangle in a quadtree
//I am treating the x y as the center of the rectangle. To draw, I will use rectmode(CENTER)
class Rectangle{
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  
  //checks if code contains point. naming the variable point1 because same name is given to another library
  contains(point1){
    return (point1.x <= this.x + this.w && point1.x > this.x - this.w &&
           point1.y <= this.y + this.h && point1.y > this.y -this.h);
  }
  
  //checks if another rectangle is intersecting this rectangle
  intersects(range){
    return !(range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h);
  }
  
}


class QuadTree{
  //boundary is a rectangle object
  constructor(boundary,n){
    this.boundary = boundary;
    this.capacity = n;
    this.Points = [];
    this.divided = false;
  }
  //this function will create four more quadtrees inside a quadtree.
  subdivide(){
    //making these variables to reduce the long names
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w;
    let h = this.boundary.h;
    //ne = north east, se = south east, nw = north west, sw = southwest
    var ne = new QuadTree(new Rectangle(x + w/2, y - h/2,w/2,h/2),4);
    this.northEast = ne;
    var se = new QuadTree(new Rectangle(x + w/2, y + h/2,w/2,h/2),4);
    this.southEast = se
    var nw = new QuadTree(new Rectangle(x - w/2, y - h/2,w/2,h/2),4);
    this.northWest = nw;
    var sw = new QuadTree(new Rectangle(x - w/2, y + h/2,w/2,h/2),4);
    this.southWest = sw;
    
    this.divided = true;
  }
  insert(point){
    
    if(!this.boundary.contains(point)){
        return;
    }
    if(this.Points.length < this.capacity){
      this.Points.push(point);
      return true;
    }
    else{
      if(!this.divided){
        this.subdivide();
      }
      if(this.northEast.insert(point)){
        return true;
      }
      if(this.northWest.insert(point)){
        return true;
      }      
      if(this.southEast.insert(point)){
        return true;
      }      
      if(this.southWest.insert(point)){
        return true;
      }
    }
    
  }
  
  detectPoints(range, found){
    if(!found){
      found = [];
    }
    if(!this.boundary.intersects(range)){
      return;
    }
    
    for(let p of this.Points){ 
      if(range.contains(p)){
        found.push(p);
      }
    }
    if(this.divided){
      this.northWest.detectPoints(range,found);
      this.northEast.detectPoints(range,found);
      this.southWest.detectPoints(range,found);
      this.southEast.detectPoints(range,found);
    }
    return found;
  }
  
  
  show(){
    noFill();
    stroke(255);
    strokeWeight(1);
    
    //draw current box
    rectMode(CENTER);
    rect(this.boundary.x,this.boundary.y,this.boundary.w*2,this.boundary.h*2);
    for(let p of this.Points){
      strokeWeight(2);
      point(p.x,p.y);
    }
    if(this.divided){
      this.northEast.show();
      this.southEast.show();
      this.southWest.show();
      this.northWest.show();
    }
  }
}