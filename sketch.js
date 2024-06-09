var screenWidth = 600;
var screenHeight = 600;
var rows = 2;
var cols = 2;
var blockSize = Math.floor(screenWidth/rows);
var solidSpotsNumber = 0;
var airSpots = new Map();

//create 2d array to represent the canvas
var board = new Array(rows);
for(let i=0 ; i<board.length ; i++){
  board[i] = new Array(cols);
  //assign position for every spot
  for(let j=0 ; j<board[i].length ; j++){
    board[i][j] = new spot(i,j);
    //add the spot to the airSpots set
    //formula for set values is y*10+x
    airSpots.set(i*10+j , board[i][j]);
  }
}
//make start and finish tiles
const start = board[0][0];
const finish = board[rows][cols];

function setup() {
  //make random spots solid
  randomSolid(solidSpotsNumber);
      //make random start and finish tiles
      // randomStartFinish();
  //create the canvas showen on screen
  createCanvas(screenWidth, screenHeight);
}

function mousePressed(){
  //turn coordinates into x and y values for the tile pressed
  var x = Math.floor(mouseX/blockSize);
  var y = Math.floor(mouseY/blockSize);
  //turn x and y into airSpots values with the formula 
  var tileSetValue = y*10+x;
  //search the airSpots for the value
  if(airSpots.has(tileSetValue)){
    //remove the solid tile if exist and add if not
    airSpots.delete(tileSetValue);
  }else airSpots.set(tileSetValue , board[x][y]);
  //turn the spot into solid or air
  board[x][y].solid = !board[x][y].solid;
}

function draw() {
  frameRate(1);
  background(0);
  drawTiles();
}

function drawTiles(){
  //draw each spot on the canvas
  // for(let i=0 ; i<rows ; i++){
  //   for(let j=0 ; j<cols ; j++){
  //     board[i][j].show();
  //    }
  // }
  board[0][0].show();
}

class spot{
  x;
  y;
  solid = false;
  visited = false;

  constructor(x,y){
    this.x = x;
    this.y = y;
  }

  show(){
    //check if spot is solid to change color and stroke 
    if(this.solid){
      //color and stroke for solid
      fill(12,53,71);
      noStroke();
    }
    else {
      //color and stroke for air
      fill(255);
      stroke(175,216,248);
    }
     //draw the tilergb(64,206,227)
     rect(this.x*blockSize , this.y*blockSize , blockSize);
  }
}

function randomSolid(n){
  while(n>0){
    //get a random x and y for the tile
    let rx = Math.floor(Math.random()*cols);
    let ry = Math.floor(Math.random()*rows);
    //check if the tile exist as air spot
    if(airSpots.has(ry*10+rx)){
      //remove the tile from the air set
      airSpots.delete(ry*10+rx);
      //make the tile solid
      board[ry][rx].solid = true;
      n--;
    }
  }
}
//not finished
function randomStartFinish(){
  //get random start
  while(true){
    //get a random x and y for the tile
    let rx = Math.floor(Math.random()*cols);
    let ry = Math.floor(Math.random()*rows);
    //check if the tile exist as air spot
    if(airSpots.has(ry*10+rx)){
      break;
    }
  }
  //get random finish
  while(true){
    //get a random x and y for the tile
    let rx = Math.floor(Math.random()*cols);
    let ry = Math.floor(Math.random()*rows);
    //check if the tile exist as air spot
    if(airSpots.has(ry*10+rx)){
      break;
    }
  }
}