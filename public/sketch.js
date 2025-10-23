let answers = [
  "Yes.",
  "No.",
  "Maybe.",
  "Ask again later.",
  "Definitely!",
  "I don't think so.",
  "Without a doubt.",
  "Better not tell you now.",
  "The outlook is good.",
  "My sources say no."
];

let currentAnswer = "";
let fade = 0;
let shaking = false;
let shakeStart = 0;
let shakeDuration = 800; // milliseconds
let shakeOffset = 0;

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent(document.body);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);

  const button = document.getElementById("askButton");
  button.addEventListener("click", giveAnswer);
}

function draw() {
  background(10);

  // If shaking, calculate horizontal offset
  if (shaking) {
    let elapsed = millis() - shakeStart;
    if (elapsed < shakeDuration) {
      shakeOffset = sin(elapsed * 0.05) * 10;
    } else {
      shaking = false;
      shakeOffset = 0;
      fade = 255;
    }
  }

  push();
  translate(width / 2 + shakeOffset, height / 2);

  // Outer ball
  fill(30);
  ellipse(0, 0, 300);

  // Inner blue triangle
  fill(0, 80, 180);
  triangle(-80, 60, 80, 60, 0, -80);

  // Display the answer
  if (!shaking && fade > 0) {
    fill(255, fade);
    text(currentAnswer, 0, 10);
    fade -= 2;
  }

  pop();
}

function giveAnswer() {
  const question = document.getElementById("questionInput").value.trim();
  if (question.length === 0) {
    currentAnswer = "Ask a question first!";
    fade = 255;
    return;
  }

  currentAnswer = random(answers);
  shaking = true;
  shakeStart = millis();
  fade = 0;
}
