let song;
let canvas;
let doDraw = false;

let circles = [];
let circleCount = 600;

let globalRotationY = 0;

let centerBox = {
  x: 0,
  y: 0,
  r: 0
}

async function setup() {
  canvas = createCanvas(800, 600, WEBGL);
  canvas.parent = ("sketch-holder");


  song = await loadSound("assets/AMomentofMagnitude.mp3")

  
  
  background(0);
  let font = await loadFont("assets/FHWASeriesEmod2020minus20.otf")
  textFont(font);
  fill(255);
  textAlign(CENTER);
  text("Please click to begin.", 0, 0);
  // Help blind or low-vision users understand your sketch
  describe("A 400 by 400 pixel gray canvas.");

  


  for (c = 0; c < circleCount; c++){
    let newCircle = {
      x: random(width + 50),
      y: random(height + 50),
      s: random(10),
      r: random(0, 200),
      g: random(0, 150),
      b: random(0, 255)
    }
    circles.push(newCircle);
  }
}

function draw() {
  if (!doDraw) return;
  background(19, 14, 46);
  
  rotateZ(globalRotationY);
  globalRotationY += 0.0005;
  //globalRotationY += 0.00025;
  
  push();
  directionalLight(200,200,200,1,0,-1)
  stroke(255);
  strokeWeight(2);
  translate(0,0,100);
  rotateY(centerBox.r);
  rotateX(centerBox.r);
  rotateZ(cos(centerBox.r));
  fill(255, 100);
  centerBox.r += 0.01;
  box(80, 80);
  pop();
  
  translate(-400, 0);
  for (i of circles){
    push();
    noStroke();
    //emissiveMaterial(i.r, i.g, i.b, 100);
    fill(i.r, i.g, i.b);
    circle(i.x, i.y * cos(i.x), i.s);
    i.y -= 0.1;
    if (i.y <= -800){
      i.y = height;
    }
    pop();
  }
}

async function mousePressed() {
  doDraw = true;
  if (song.isPlaying()) return
  song.play();
  song.loop();
}