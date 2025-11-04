let table;
let cars = [];
let priceSlider;
let colors = {};

function preload() {
  // Make sure this path matches your actual CSV location
  table = loadTable("Cars Datasets 2025.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight - 120);
  textFont("Arial");

  // --- Load and clean ---
  for (let r = 0; r < table.getRowCount(); r++) {
    let company = table.getString(r, "Company Names");
    let name = table.getString(r, "Cars Names");
    let speed = parseFloat(table.getString(r, "Total Speed")?.replace(/[^0-9.]/g, ""));
    let accel = parseFloat(table.getString(r, "Performance(0 - 100 )KM/H")?.replace(/[^0-9.]/g, ""));
    let hp = parseFloat(table.getString(r, "HorsePower")?.replace(/[^0-9.]/g, ""));
    let torque = parseFloat(table.getString(r, "Torque")?.replace(/[^0-9.]/g, ""));
    let priceStr = table.getString(r, "Cars Prices");
    let priceNums = priceStr ? priceStr.replace(/[^0-9.-]/g, "").split("-").map(Number) : [0];
    let price = priceNums.length > 1 ? (priceNums[0] + priceNums[1]) / 2 : priceNums[0];
    let fuel = table.getString(r, "Fuel Types");
    let engine = table.getString(r, "Engines");
    let capacity = table.getString(r, "CC/Battery Capacity");

    // Add only if key values are present
    if (speed && accel && hp && price) {
      cars.push(new Car(company, name, engine, capacity, speed, accel, hp, price, fuel, torque));
    }
  }

  console.log("Loaded rows:", table.getRowCount());
  console.log("Cars created:", cars.length);

  // Assign colors to fuel types
  let fuels = [...new Set(cars.map(c => c.fuel))];
  colorMode(HSB, 360, 100, 100);
  for (let i = 0; i < fuels.length; i++) {
    colors[fuels[i]] = color((i * 80) % 360, 70, 80);
  }

  // Slider setup
  priceSlider = select("#priceSlider");
  select("#priceLabel").html(priceSlider.value());
  priceSlider.input(() => select("#priceLabel").html(priceSlider.value()));
}

function draw() {
  background(250);
  fill(30);
  textSize(16);
  textAlign(LEFT);
  text("Acceleration (0–100 km/h, lower is faster)", 40, height - 60);

  push();
  translate(40, 20);

  let maxPrice = parseFloat(priceSlider.value());
  let accelMin = min(cars.map(c => c.accel));
  let accelMax = max(cars.map(c => c.accel));
  let speedMin = min(cars.map(c => c.speed));
  let speedMax = max(cars.map(c => c.speed));

  for (let car of cars) {
    if (car.price <= maxPrice) {
      car.display(accelMin, accelMax, speedMin, speedMax);
    }
  }

  // axes
  stroke(100);
  line(0, height - 150, width - 100, height - 150);
  line(0, 0, 0, height - 150);
  pop();
}

class Car {
  constructor(company, name, engine, capacity, speed, accel, hp, price, fuel, torque) {
    Object.assign(this, { company, name, engine, capacity, speed, accel, hp, price, fuel, torque });
  }

  display(accelMin, accelMax, speedMin, speedMax) {
    let x = map(this.accel, accelMin, accelMax, 50, width - 120);
    let y = map(this.speed, speedMin, speedMax, height - 180, 40);
    let r = map(this.hp, 50, 1000, 5, 40);
    let col = colors[this.fuel] || color(200, 30, 80);

    noStroke();
    fill(col);
    ellipse(x, y, r * 2);

    if (dist(mouseX, mouseY, x, y) < r) {
      this.showTooltip(x, y);
    }
  }

  showTooltip(x, y) {
    push();
    fill(255);
    stroke(0);
    rectMode(CORNER);
    let w = 240;
    let h = 110;
    rect(x + 10, y - h - 10, w, h, 5);
    noStroke();
    fill(0);
    textSize(12);
    text(`${this.company} ${this.name}`, x + 20, y - h + 20);
    text(`Engine: ${this.engine} | ${this.capacity}`, x + 20, y - h + 38);
    text(`HP: ${this.hp}  |  Torque: ${this.torque} Nm`, x + 20, y - h + 56);
    text(`Speed: ${this.speed} km/h  |  0–100: ${this.accel}s`, x + 20, y - h + 74);
    text(`Price: $${this.price.toLocaleString()}`, x + 20, y - h + 92);
    pop();
  }
}

