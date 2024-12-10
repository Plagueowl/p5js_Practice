class Point{
    constructor(x,y){
      this.x = x;
      this.y = y;
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
    contains(Point){
      return (Point.x <= this.x + this.w && Point.x > this.x - this.w &&
             Point.y <= this.y + this.h && Point.y > this.y -this.h);
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
          print("divided");
        }
        if(this.northEast.insert(point)){
          print("inserted ne");
          return true;
        }
        if(this.northWest.insert(point)){
          print("inserted nw");
          return true;
        }      
        if(this.southEast.insert(point)){
          print("inserted se");
          return true;
        }      
        if(this.southWest.insert(point)){
          print("inserted sw");
          return true;
        }
      }
      
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