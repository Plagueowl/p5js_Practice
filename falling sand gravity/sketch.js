
let rows, cols, grid,pixelSize, velocityGrid,gravity;

//velocity grid will hold values of time spent of that particle. it should use 1/2gt^2 formula. because of the immense speed it was catching, I reduced the value to 1/2gt for approximate effect
let hueValue = 200;
function setup() {
  createCanvas(900,900);
  rows = 100;cols = 100;
  gravity = 1;
  grid = make2DGrid(rows,cols);
  velocityGrid = make2DGrid(rows,cols);
  pixelSize = 5;
}

function draw() {
  background(0);
  
  drawGrid();
  physicsEngine();
  
}

function withinHeight(j){
  return j < rows && j>=0;
}

function withinWidth(i){
  return i < cols && i >=0;
}

//this function simulates what happens with the particles by creating a new grid
function physicsEngine(){
  let newGrid = make2DGrid(rows,cols);
  let newVelocityGrid = make2DGrid(rows,cols);
  for(var i = 0; i < cols; i++){
    for(var j = 0; j < rows; j++){
      let below, below2, below1, moved = false;
      let isSand = grid[i][j];
      
      if(isSand > 0){
        let dir = 1;
        
        if(random(1) > 0.5){
          dir *= -1;
        }
        let distCovered = j+floor(0.5*gravity*velocityGrid[i][j]);
        
        for(let y = distCovered;y>j;y--){
          if(withinHeight(y)){
            below = grid[i][y];
          }
          if(withinHeight(j+1) && withinWidth(i+dir)){
            below1 = grid[i+dir][j+1];
          }
          if(withinHeight(j+1) && withinWidth(i-dir)){
            below2 = grid[i-dir][j+1];
          }
          if(below === 0){
            newGrid[i][y] = isSand;
            newVelocityGrid[i][y] = velocityGrid[i][j]+1;
            moved = true;
            break;
          }
          else if(below1 === 0){
            newGrid[i+dir][j+1] = isSand;
            moved = true;
            break;
          }
          else if(below2 ===0){
            newGrid[i-dir][j+1] = isSand;
            moved = true;
            break;
          }
        }  
      }
      if(isSand > 0 && !moved){
        newGrid[i][j] = grid[i][j];
        newVelocityGrid[i][j] = velocityGrid[i][j]+1;
      }
      
    }
  }
  grid = newGrid;
  velocityGrid = newVelocityGrid;
}
//this function creates the grid array

function make2DGrid(rows, cols){
  let arr = new Array(rows);
  for(let i = 0;i< rows;i++){
    arr[i] = new Array(cols);
  }
  for(let i = 0;i<rows;i++){
    for(let j = 0;j<cols;j++){
      arr[i][j] = 0;
    }
  }
  return arr;
}

function mouseDragged(){
//create sand when mouse pressed
  let mouseCol = floor(mouseX / pixelSize);
  let mouseRow = floor(mouseY / pixelSize);
  
  // Randomly add an area of sand particles
  let matrix = 5;
  let extent = floor(matrix / 2);
  for (let i = -extent; i <= extent; i++) {
    for (let j = -extent; j <= extent; j++) {
      if (random(1) < 0.75) {
        let col = mouseCol + i;
        let row = mouseRow + j;
        if (withinWidth(col) && withinHeight(row)) {
          grid[col][row] = hueValue;
          velocityGrid[col][row] = 1;
        }
      }
    }
  }
  // Change the color of the sand over time
  hueValue += 1;
  if (hueValue > 360) {
    hueValue = 1;
  }
}

//draw the grid.
function drawGrid(){
  for(let i = 0;i<rows;i++){
    noStroke();
    for(let j = 0;j<cols;j++){
      if(grid[i][j] > 0){
        fill(grid[i][j],100,200);
      }
      else{
        noFill();
      }
      square(i*pixelSize,j*pixelSize,pixelSize);
    }
  }
}


  
