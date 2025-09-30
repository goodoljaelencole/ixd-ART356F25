let particles = [];
let words = ["chaos", "dream", "flux", "void", "spark", "shift", "echo", "chance"];
let messages = [];
let startTime;
let customImgs = [];
let showInstructions = true; // flag to show text

function preload() {
  // Example images (replace with your own files in assets/)
  customImgs.push(loadImage("diamond.jpg"));
  customImgs.push(loadImage("star.png"));
  customImgs.push(loadImage("emerald.png"));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(20);
  textAlign(CENTER, CENTER);
  textSize(24);
  noStroke();
  startTime = millis();
}

function draw() {
    let r = map(mouseX, 0, width, 50, 200);
  let g = map(mouseY, 0, height, 50, 200);
  let b = 150;

  background(r, g, b);

  // Show instructions for first 10 seconds OR until user interacts
  if (showInstructions && millis() - startTime < 10000) {
    fill(255);
    textSize(28);
    text("🎲 Random Realms 🎲", width / 2, height / 2 - 50);
    textSize(20);
    text("Move your mouse → colors shift\nClick → spawn shapes\nPress any key → random words & images\n\nEnjoy the chaos!", width / 2, height / 2 + 30);
  }

  // Display floating words
  fill(255);
  for (let i = 0; i < messages.length; i++) {
    let msg = messages[i];
    text(msg.txt, msg.x, msg.y);
    msg.y += msg.speed;
    if (msg.y > height) messages.splice(i, 1);
  }

  // Update & show particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }

  // Chaos mode after 1 minute
  if (millis() - startTime > 60000) {
    chaosMode();
  }
}

function mousePressed() {
  showInstructions = false; // hide instructions after first interaction
  for (let i = 0; i < 15; i++) {
    particles.push(new Particle(mouseX, mouseY));
  }
  let img = random(customImgs);
  image(img, mouseX - img.width / 4, mouseY - img.height / 4, img.width / 2, img.height / 2);
}

function keyPressed() {
  showInstructions = false;
  let w = random(words);
  messages.push({ txt: w, x: random(width), y: 0, speed: random(1, 3) });
  let img = random(customImgs);
  image(img, random(width), random(height), img.width / 3, img.height / 3);
}

function chaosMode() {
  push();
  let img = random(customImgs);
  tint(random(255), random(255), random(255), 180);
  image(img, random(width), random(height), random(50, 200), random(50, 200));
  pop();
}

// Particle class
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-3, 3);
    this.vy = random(-3, 3);
    this.alpha = 255;
  }
  finished() {
    return this.alpha < 0;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 3;
  }
  show() {
    noStroke();
    fill(255, this.alpha);
    ellipse(this.x, this.y, 10);
  }
}
