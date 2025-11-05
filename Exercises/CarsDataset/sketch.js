let table;
let mode = "fuel";
let stats = {};
let total = 0;
let colors = {};

function preload() {
  table = loadTable("Cars Datasets 2025.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight - 100);
  angleMode(DEGREES);
  textFont("Arial");
  colorMode(HSB, 360, 100, 100);

  computeStats("Fuel Types");
  select("#toggleBtn").mousePressed(toggleMode);
}

function draw() {
  background(250);
  translate(width/2, height/2);
  textAlign(CENTER);

  let angleStart = 0;
  let mouseHover = false;

  for (let key in stats) {
    let val = stats[key];
    let angleSpan = map(val, 0, total, 0, 360);
    let col = colors[key] || color(random(360), 80, 90);
    colors[key] = col;

    fill(col);
    stroke(255);
    strokeWeight(2);
    arc(0, 0, 400, 400, angleStart, angleStart + angleSpan, PIE);

    let mid = angleStart + angleSpan / 2;
    let x = cos(mid) * 150;
    let y = sin(mid) * 150;

    fill(0);
    noStroke();
    textSize(12);
    text(key, x, y);

    // Hover detection
    let d = dist(mouseX - width/2, mouseY - height/2, 0, 0);
    let a = degrees(atan2(mouseY - height/2, mouseX - width/2));
    if (a < 0) a += 360;
    if (d < 200 && a > angleStart && a < angleStart + angleSpan) {
      showTooltip(key, val);
      mouseHover = true;
    }

    angleStart += angleSpan;
  }

  if (!mouseHover) noLoop();
}

function showTooltip(key, val) {
  push();
  fill(255);
  stroke(0);
  rectMode(CENTER);
  rect(0, 250, 180, 60, 5);
  noStroke();
  fill(0);
  text(`${key}`, 0, 240);
  text(`${val} cars (${nf((val/total)*100,1,1)}%)`, 0, 260);
  pop();
}

function toggleMode() {
  mode = mode === "fuel" ? "engine" : "fuel";
  computeStats(mode === "fuel" ? "Fuel Types" : "Engines CC/Battery Capacity");
  loop();
}

function computeStats(column) {
  stats = {};
  for (let r = 0; r < table.getRowCount(); r++) {
    let val = table.getString(r, column);
    if (!val) continue;
    val = val.trim().toUpperCase();
    stats[val] = (stats[val] || 0) + 1;
  }
  total = Object.values(stats).reduce((a, b) => a + b, 0);
}
