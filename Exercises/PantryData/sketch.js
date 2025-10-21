let table;
let foods = [];
let mode = 'calories';

function preload() {
  table = loadTable('food.csv', 'csv', 'header');
}

function setup() {
  createCanvas(950, 700);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  noStroke();

  let centerX = width / 2;
  let centerY = height / 2;
  let numItems = table.getRowCount();
  let angleStep = 360 / numItems;

  // Load rows into objects
  for (let i = 0; i < numItems; i++) {
    let row = table.getRow(i);
    let food = {
      name: row.getString('Food'),
      calories: row.getNum('Calories'),
      sugar: row.getNum('Sugar'),
      carbs: row.getNum('Carbs'),
      sodium: row.getNum('Sodium'),
      protein: row.getNum('Protein'),
      angle: i * angleStep
    };

    // Position on circle
    food.x = centerX + cos(food.angle) * 250;
    food.y = centerY + sin(food.angle) * 250;

    foods.push(food);
  }
}

function draw() {
  background(20);
  translate(width / 2, height / 2);
  noStroke();
  fill(255);
  textSize(26);
  text("Pantry Nutrient Visualization", 0, -300);

  textSize(14);
  text(`Mode: ${mode.toUpperCase()} (Press 1–5 to change)`, 0, 300);

  translate(-width / 2, -height / 2);
  drawWheel();
  drawTooltip();
}

function drawWheel() {
  let centerX = width / 2;
  let centerY = height / 2;

  for (let food of foods) {
    let d = dist(mouseX, mouseY, food.x, food.y);
    let isHover = d < 20;

    // Animated pulse on hover
    let pulse = isHover ? sin(frameCount * 5) * 4 : 0;

    let sizeVal, colorVal;

    switch (mode) {
      case 'calories':
        sizeVal = map(food.calories, 0, 400, 10, 60);
        colorVal = lerpColor(color('#fff59d'), color('#f57f17'), food.calories / 400);
        break;
      case 'protein':
        sizeVal = map(food.protein, 0, 20, 10, 60);
        colorVal = lerpColor(color('#bbdefb'), color('#0d47a1'), food.protein / 20);
        break;
      case 'carbs':
        sizeVal = map(food.carbs, 0, 40, 10, 60);
        colorVal = lerpColor(color('#c8e6c9'), color('#1b5e20'), food.carbs / 40);
        break;
      case 'sugar':
        sizeVal = map(food.sugar, 0, 25, 10, 60);
        colorVal = lerpColor(color('#ffcdd2'), color('#b71c1c'), food.sugar / 25);
        break;
      case 'sodium':
        sizeVal = map(food.sodium, 0, 2, 10, 60);
        colorVal = lerpColor(color('#b3e5fc'), color('#01579b'), food.sodium / 2);
        break;
    }

    // Connecting line (based on calories)
    stroke(lerpColor(color('#ffeb3b'), color('#ff6f00'), food.calories / 400));
    strokeWeight(map(food.protein, 0, 20, 1, 5));
    line(centerX, centerY, food.x, food.y);

    // Circle node
    noStroke();
    fill(colorVal);
    ellipse(food.x, food.y, sizeVal + pulse);

    // Label
    fill(255);
    textSize(12);
    text(food.name, food.x, food.y + sizeVal / 1.5);
  }
}

function drawTooltip() {
  for (let food of foods) {
    let d = dist(mouseX, mouseY, food.x, food.y);
    if (d < 25) {
      fill(255, 240);
      rect(mouseX + 10, mouseY - 80, 210, 110, 8);
      fill(0);
      textAlign(LEFT, TOP);
      textSize(12);
      text(
        `${food.name}\n` +
        `Calories: ${food.calories}\n` +
        `Sugar: ${food.sugar} g\n` +
        `Carbs: ${food.carbs} g\n` +
        `Protein: ${food.protein} g\n` +
        `Sodium: ${food.sodium} g`,
        mouseX + 18, mouseY - 72
      );
      break;
    }
  }
}

function keyPressed() {
  if (key === '1') mode = 'calories';
  else if (key === '2') mode = 'protein';
  else if (key === '3') mode = 'carbs';
  else if (key === '4') mode = 'sugar';
  else if (key === '5') mode = 'sodium';
}
