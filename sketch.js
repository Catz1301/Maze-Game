/* eslint-disable no-undef, no-unused-vars */
var player1;
var wall1;
var walls = [];
var devMode = true;
var firstPointSet = false;
var secondPointSet = false;
var freeMode = false;
function setup() {
  createCanvas(windowWidth, windowHeight);
  if (devMode)
    DevelopmentTools.setUp();
  player1 = new Player(createVector(width/2, height/2), 25, 34, 139, 34);
  wall1 = new Wall(10, 23, 48, false);
  walls[walls.length] = wall1;
  walls[walls.length] = new Wall(79, 120, 320, false)
  // Put setup code here
  
}

 function keyPressed() {
//   if (keyCode === 39) {
//     player1.moveX(true);
//   } else if (keyCode === 38) {
//     player1.moveY(false);
//   } else if (keyCode === 37) {
//     player1.moveX(false);
//   } else if (keyCode === 40) {
//     player1.moveY(true);
//   }
   console.log("Key pressed. keyCode: " + keyCode);
   if (keyCode === 83) {
     CreatorTools.saveMaze(walls);
   } else if (keyCode === 76) {
     var wallsBackUp = walls;
     walls.length = 0;
     walls = CreatorTools.loadMaze();
     if (walls === null) {
       walls = wallsBackUp;
     }
   } else if (keyCode === 67) {
     walls.length = 0;
   } else if (keyCode === 68) {
     devMode = !devMode;
   } else if (keyCode === 70 || key === 'f')
     freeMode = !freeMode
}

function mouseClicked() {
  if (!firstPointSet) {
    if (freeMode)
      DevelopmentTools.clickPosition.pos1 = createVector(pmouseX - pmouseX % 10, pmouseY - pmouseY % 10);
    else
      DevelopmentTools.clickPosition.pos1 = createVector(pmouseX, pmouseY);
    firstPointSet = true;
  } else if (firstPointSet && !secondPointSet) {
    if (freeMode)
      DevelopmentTools.clickPosition.pos2 = createVector(pmouseX - pmouseX % 10, pmouseY - pmouseY % 10);
    else
      DevelopmentTools.clickPosition.pos2 = createVector(pmouseX, pmouseY);
    firstPointSet = true;
    secondPointSet = true;
    if (abs(DevelopmentTools.clickPosition.pos1.x - DevelopmentTools.clickPosition.pos2.x) > abs(DevelopmentTools.clickPosition.pos1.y - DevelopmentTools.clickPosition.pos2.y))
      walls[walls.length] = new Wall(DevelopmentTools.clickPosition.pos1.x, DevelopmentTools.clickPosition.pos1.y, DevelopmentTools.clickPosition.pos2.x, true);
    else
      walls[walls.length] = new Wall(DevelopmentTools.clickPosition.pos1.x, DevelopmentTools.clickPosition.pos1.y, DevelopmentTools.clickPosition.pos2.y, false)
  //} else {
    DevelopmentTools.clickPosition.pos1 = createVector(0, 0);
    DevelopmentTools.clickPosition.pos2 = createVector(0, 0);
    firstPointSet = false;
    secondPointSet = false;
  }
}

function draw() {
  // Put drawings here
  background(240);
  if (devMode) {
    DevelopmentTools.grid(10);
    DevelopmentTools.debugExtra("Snap Mode: " + freeMode)
    DevelopmentTools.debugInfo(player1);
    DevelopmentTools.reset();
  }
  player1.update(walls);
  player1.draw();
  for (var i = 0; i < walls.length; i++) {
    walls[i].draw();
  }
}

// This Redraws the Canvas when resized
windowResized = function() {
  resizeCanvas(windowWidth, windowHeight);
};