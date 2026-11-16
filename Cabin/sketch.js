let canvasWidth = 600;
let canvasHeight = 400;
let timeOfDay = 100;
let timeTrigger = false; // <-- False = Turn to Night ;; True = Turn to Day

let cameraX = 10;
let cameraY = -20;
let cameraZ = 200;

let treeCount = 25;
let trees = [];

let snowCount = 1000;
let snowflakes = [];

let snowPiles = [];
let snowPileCount = 15;

// Current time light direction variables
let currentDirectionalLightRotationDirectionX = 0;
let currentDirectionalLightRotationDirectionY = 0;
let currentDirectionalLightRotationDirectionZ = 0;

// Morning
let directionalLightMorningValueX = 1;
let directionalLightMorningValueY = 0;
let directionalLightMorningValueZ = 0;

// Noon
let directionalLightNoonValueX = 0;
let directionalLightNoonValueY = 1;
let directionalLightNoonValueZ = 0;

// Evening
let directionalLightEveningValueX = -1;
let directionalLightEveningValueY = 0;
let directionalLightEveningValueZ = 0;

function setup() {
  createCanvas(canvasWidth, canvasHeight, WEBGL);

  // == SETUP ==
  setupTrees();
  setupSnow();
  setupSnowpiles();
}

function draw() {
  // == SCENE ==
  background(timeOfDay);

  // == SCRIPTS ==
  dayNightCycle();
  
  // == LIGHTS ==
  ambientLight(timeOfDay);
  directionalLight(38, 48, 39, currentDirectionalLightRotationDirectionX, currentDirectionalLightRotationDirectionY, currentDirectionalLightRotationDirectionZ);
  //pointLight(255, 143, 90, -70, 0, 0)

  // == CAMERA ==
  orbitControl();
  camera(10,-20, 200, 10, -20, 20);

  // == DRAW OBJECTS ==
  drawTerrain();
  drawCabin();

  for (t of trees){
    drawTree(t.x, t.y, t.z);
  }

  for (s of snowflakes){
    drawSnow(s.x, s.y, s.z, s.s);
    if (floor(s.y) == 0){
      s.y = -100;
    } 
    s.y += s.spd;
  }

  for (sp of snowPiles)
  {
    drawSnowPiles(sp.x, sp.y, sp.z, sp.s)
  }
  
}

function dayNightCycle()
{
  if (timeOfDay >= 255)
  {
    timeTrigger = false;
  }

  if (timeOfDay <= 0)
  {
    timeTrigger = true;
  }
  
  if (timeTrigger == false)
  {
    timeOfDay -= 0.1;
  }
  else
  {
    timeOfDay += 0.1;
  }
  
  // Detect what time of day it is and set the directionalLight Vector

  // Morning / Night
  if (timeOfDay > 0 && timeOfDay < 175) 
  {
    if (timeTrigger == true)
    {
      // Morning
      currentDirectionalLightRotationDirectionX = lerp(currentDirectionalLightRotationDirectionX, directionalLightMorningValueX, 0.5);
      currentDirectionalLightRotationDirectionY = lerp(currentDirectionalLightRotationDirectionY, directionalLightMorningValueY, 0.5);
      currentDirectionalLightRotationDirectionZ = lerp(currentDirectionalLightRotationDirectionZ, directionalLightMorningValueZ, 0.5);
    }
    else
    {
      // Evening
      currentDirectionalLightRotationDirectionX = lerp(currentDirectionalLightRotationDirectionX, directionalLightEveningValueX, 0.5);
      currentDirectionalLightRotationDirectionY = lerp(currentDirectionalLightRotationDirectionY, directionalLightEveningValueY, 0.5);
      currentDirectionalLightRotationDirectionZ = lerp(currentDirectionalLightRotationDirectionZ, directionalLightEveningValueZ, 0.5);
    }
    
  }

  // Noon
  if (timeOfDay > 175 && timeOfDay < 255) 
  {
    currentDirectionalLightRotationDirectionX = lerp(currentDirectionalLightRotationDirectionX, directionalLightNoonValueX, 0.5);
    currentDirectionalLightRotationDirectionY = lerp(currentDirectionalLightRotationDirectionY, directionalLightNoonValueY, 0.5);
    currentDirectionalLightRotationDirectionZ = lerp(currentDirectionalLightRotationDirectionZ, directionalLightNoonValueZ, 0.5);
  }
}

function drawTerrain(){
  // Base Plane
  push(); 
  noStroke();
  fill(200);
  rotateX(HALF_PI);
  plane(500,500);
  pop();
}

function drawCabin(){
push();
  noStroke();
  fill(59, 48, 44);
  translate(40, 0, -65);
  rotateY(QUARTER_PI * (HALF_PI - QUARTER_PI));
  push();
    // Wall 1
    push();
      translate(0, -15, 0);
    // Log 1
      push();
      rotateZ(HALF_PI);
      translate(0,0,0);
      cylinder(5, 60);
      pop();
    
    // Log 2
      push();
      rotateZ(HALF_PI);
      translate(10,0,0);
      cylinder(5, 60);
      pop();
  
    // Log 3
      push();
      rotateZ(HALF_PI);
      translate(-10,0,0);
      cylinder(5, 60);
      pop();
    pop();
  
    // Wall 2
    push();
      translate(0, -15, 60);
    // Log 1
      push();
      rotateZ(HALF_PI);
      translate(0,0,0);
      cylinder(5, 60);
      pop();
    
    // Log 2
      push();
      rotateZ(HALF_PI);
      translate(10,0,0);
      cylinder(5, 60);
      pop();
  
    // Log 3
      push();
      rotateZ(HALF_PI);
      translate(-10,0,0);
      cylinder(5, 60);
      pop();
    pop();
  pop();
  
    // Second half of walls
  push();
    // Wall 1
    rotateY(HALF_PI);
    translate(-30, 0, -30)
    push();
      translate(0,-15, 0);
      
    // Log 1
      push();
      rotateZ(HALF_PI);
      translate(0,0,0);
      cylinder(5, 60);
      pop();
    
    // Log 2
      push();
      rotateZ(HALF_PI);
      translate(10,0,0);
      cylinder(5, 60);
      pop();
  
    // Log 3
      push();
      rotateZ(HALF_PI);
      translate(-10,0,0);
      cylinder(5, 60);
      pop();
    pop();
  
    // Wall 2
    push();
      translate(0, -15, 60);
    // Log 1
      push();
      rotateZ(HALF_PI);
      translate(0,0,0);
      cylinder(5, 60);
      pop();
    
    // Log 2
      push();
      rotateZ(HALF_PI);
      translate(10,0,0);
      cylinder(5, 60);
      pop();
  
    // Log 3
      push();
      rotateZ(HALF_PI);
      translate(-10,0,0);
      cylinder(5, 60);
      pop();
    pop();
  pop();

  // Roof
  push();
    translate(0, -40, 35);
    rotateX(PI);
    rotateY(QUARTER_PI);

    fill(122, 96, 78);
    cone(50, 20, 5);

  pop();

  // Window
  push();
    translate(-35, -15, 17);
    scale(0.75)
    emissiveMaterial(255, 193, 96);
    box(10, 20, 30)
  pop();

  // Door
  push();
    translate(-35, -10, 45);
    fill(128, 106, 89);
    scale(0.75)
    box(1, 30, 20)
  pop();
pop();
}

function setupTrees()
{
  for (i=0; i < treeCount; i++)
  {
    let newTree = {
      x : random(-250, 250),
      y : -10,
      z : random(-250, 250)
    } 
    trees.push(newTree);    
  }
}

function drawTree(x, y, z)
{
  push();
    translate(x,y,z);
    
    noStroke();
    // Bark
    push();
      fill(97, 72, 51);
      cylinder(5,20);
    pop();
    

    // Leaves
    push();
      translate(0, -25, 0);
      rotateX(PI);
      fill(168, 204, 157);
      cone(20,50);
    pop();
    
  pop();
}

function setupSnow()
{
  for (i=0; i < snowCount; i++)
  {
    let newSnow = {
      x : random(-250, 250),
      y : -100,
      z : random(-250, 250),
      s : random(2, 5),
      spd : random(0.1, 1)
    }
    snowflakes.push(newSnow);
  }
}

function drawSnow(x, y, z, s)
{
  push();
  translate(x, y, z);
  noStroke();
  let distanceX = cameraX - x;
  let distanceZ = cameraZ - z;
  rotateY(atan2(distanceX, distanceZ));
  circle(0, 0, s);
  pop();
}

function setupSnowpiles()
{
  for (i=0; i < snowPileCount; i++)
  {
    let newSnowPile = {
      x : random(-250, 250),
      y : random(0, 20),
      z : random(-250, 250),
      s : random(2, 5)
    }
    snowPiles.push(newSnowPile);
  }
}

function drawSnowPiles(x, y, z, s)
{
  push();
  translate(x, y, z);
  noStroke();
  fill(200);
  ellipsoid(30, 20);

  pop();
}