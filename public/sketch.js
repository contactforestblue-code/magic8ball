let snake;
let rez = 20;
let food;
let w, h;
let gameOver = false;
let score = 0;

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent(document.body);
  frameRate(10);
  w = floor(width / rez);
  h = floor(height / rez);
  snake = new Snake();
  foodLocation();
  textAlign(CENTER, CENTER);

  // Touch controls
  setupMobileControls();
}

function foodLocation() {
  let x = floor(random(w));
  let y = floor(random(h));
  food = createVector(x, y);
}

function draw() {
  background(10);

  if (gameOver) {
    fill(255, 0, 0);
    textSize(24);
    text("Game Over!", width / 2, height / 2 - 20);
    textSize(16);
    text("Press ENTER or tap ⟳ to restart", width / 2, height / 2 + 10);
    text(`Score: ${score}`, width / 2, height / 2 + 40);
    return;
  }

  snake.update();
  snake.show();

  if (snake.eat(food)) {
    foodLocation();
    score++;
  }

  fill(255, 0, 0);
  noStroke();
  rect(food.x * rez, food.y * rez, rez, rez);

  fill(255);
  textSize(14);
  text(`Score: ${score}`, width / 2, 15);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) snake.setDir(-1, 0);
  else if (keyCode === RIGHT_ARROW) snake.setDir(1, 0);
  else if (keyCode === DOWN_ARROW) snake.setDir(0, 1);
  else if (keyCode === UP_ARROW) snake.setDir(0, -1);
  else if (keyCode === ENTER && gameOver) resetGame();
}

function resetGame() {
  gameOver = false;
  score = 0;
  snake = new Snake();
  foodLocation();
}

class Snake {
  constructor() {
    this.body = [createVector(floor(w / 2), floor(h / 2))];
    this.xdir = 0;
    this.ydir = 0;
    this.len = 0;
  }

  setDir(x, y) {
    if (this.body.length > 1) {
      let head = this.body[this.body.length - 1];
      let neck = this.body[this.body.length - 2];
      if (head.x + x === neck.x && head.y + y === neck.y) return;
    }
    this.xdir = x;
    this.ydir = y;
  }

  update() {
    if (this.xdir === 0 && this.ydir === 0) return;

    let head = this.body[this.body.length - 1].copy();
    head.x += this.xdir;
    head.y += this.ydir;

    // Wrap-around
    if (head.x >= w) head.x = 0;
    if (head.x < 0) head.x = w - 1;
    if (head.y >= h) head.y = 0;
    if (head.y < 0) head.y = h - 1;

    this.body.push(head);
    if (this.body.length > this.len + 1) this.body.shift();

    this.endGame();
  }

  endGame() {
    let head = this.body[this.body.length - 1];
    for (let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i];
      if (part.x === head.x && part.y === head.y) {
        gameOver = true;
        noLoop();
      }
    }
  }

  eat(pos) {
    let head = this.body[this.body.length - 1];
    if (head.x === pos.x && head.y === pos.y) {
      this.len++;
      return true;
    }
    return false;
  }

  show() {
    fill(0, 255, 0);
    for (let part of this.body) {
      rect(part.x * rez, part.y * rez, rez, rez);
    }
  }
}

function setupMobileControls() {
  const dirs = {
    up: [0, -1],
    down: [0, 1],
    left: [-1, 0],
    right: [1, 0]
  };

  for (let id in dirs) {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener("touchstart", e => {
        e.preventDefault();
        snake.setDir(...dirs[id]);
      });
    }
  }

  const restartBtn = document.getElementById("restart");
  restartBtn.addEventListener("touchstart", e => {
    e.preventDefault();
    if (gameOver) {
      loop();
      resetGame();
    }
  });
}
