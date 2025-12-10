// --- Basic 2D Platformer Setup ---
// Using p5.js + p5.play

let player;
let ground;
let gravity = 1; 
let jumpPower = -2;
let moveSpeed = 5;
let onGround = false;

function setup() {
  createCanvas(800, 400);
  world.gravity.y = gravity;

  // Ground
  ground = new Sprite(width / 2, height - 20, width, 40, 'static');
  ground.color = color(80, 160, 80);

  // Player
  player = new Sprite(100, 100, 30, 50);
  player.color = color(100, 150, 255);
  player.friction = 0.1;
  player.mass = 1;

  // NEW: Floating platform
  let platform = new Sprite(400, 250, 150, 20, 'static');
  platform.color = color(180, 100, 60);
}

function draw() {
  background(220);

  // Horizontal movement
  if (kb.pressing('left')) player.vel.x = -moveSpeed;
  else if (kb.pressing('right')) player.vel.x = moveSpeed;
  else player.vel.x = 0;

  // Check if player is on any platform (including ground)
  let touchingSomething = false;
  for (let s of allSprites) {
    if (player.colliding(s) && s !== player) {
      touchingSomething = true;
      break;
    }
  }

  // Jump only once when touching ground or platform
  if (kb.presses('space') && touchingSomething) {
    player.vel.y = jumpPower; // single upward push
  }

  // Gravity automatically pulls down (handled by world.gravity.y)

  // Camera follows player
  camera.x = player.x;
  camera.y = height / 2;

  // Instructions
  camera.off();
  fill(0);
  textSize(16);
  text('← → move | SPACE jump', 10, 20);
  camera.on();
}
