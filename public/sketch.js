// ======== DREAM INTERPRETER LOGIC ========
let audioStarted = false;
const fadeDuration = 500;
let muted = false;
let lastIndex = -1;

const interpretations = [
  "Your subconscious is urging you to release something you’ve been holding onto.",
  "This dream represents transformation — an old self fading as a new one awakens.",
  "You are seeking control in a situation that feels unpredictable.",
  "A hidden desire is surfacing, disguised in the symbols of your dream.",
  "You are at a crossroads between intuition and logic — trust your inner voice.",
  "The dream reflects unresolved emotions tied to someone from your past.",
  "It’s a message of creativity waiting to be expressed.",
  "The imagery suggests healing and renewal after a difficult period.",
  "You are being guided to confront something you’ve been avoiding.",
  "Your dream speaks of freedom — a desire to break away from limitations.",
  "The dream symbolizes a journey into your own psyche and self-discovery.",
  "An unknown fear is trying to be acknowledged through your dream imagery.",
  "This dream hints at hidden talents that are ready to be explored.",
  "You are processing unresolved conflicts in a safe, symbolic space.",
  "The dream indicates a need for patience and reflection in waking life.",
  "It suggests that you are ready to forgive yourself or someone else.",
  "Your subconscious is nudging you to take a risk you’ve been avoiding.",
  "The dream mirrors your desire for harmony and balance.",
  "A part of your creativity is asking for attention and nurturing.",
  "This dream represents closure — letting go of what no longer serves you."
];

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("interpretBtn");
  const muteBtn = document.getElementById("muteBtn");
  const input = document.getElementById("dreamInput");
  const result = document.getElementById("result");
  const nowPlaying = document.getElementById("nowPlaying");
  const audio = document.getElementById("dreamAudio");

  // Animate "Now Playing" text flicker
  function animateNowPlaying() {
    const intensity = 0.5 + Math.random() * 0.5;
    nowPlaying.style.textShadow = `
      0 0 ${4 * intensity}px #0f0,
      0 0 ${8 * intensity}px #0f0,
      0 0 ${12 * intensity}px #0f0
    `;
    requestAnimationFrame(animateNowPlaying);
  }
  animateNowPlaying();

  // ======== AUDIO HANDLER ========
  function startAudioFadeIn() {
    if (audioStarted) return;
    audioStarted = true;

    nowPlaying.textContent = 'Now Playing - "Dream Guide" by Act Three';

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          audio.volume = 0;
          fadeInAudio();
        })
        .catch(() => {
          console.log("Audio blocked. Waiting for user gesture.");
        });
    }
  }

  function fadeInAudio() {
    let start = null;
    const fadeStep = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      audio.volume = muted ? 0 : Math.min(elapsed / fadeDuration, 1);
      if (elapsed < fadeDuration) requestAnimationFrame(fadeStep);
      else audio.volume = muted ? 0 : 1;
    };
    requestAnimationFrame(fadeStep);
  }

  // First touch anywhere triggers audio for mobile
  document.body.addEventListener("touchstart", startAudioFadeIn, { once: true });

  // Button triggers audio and interpretation
  btn.addEventListener("click", () => {
    startAudioFadeIn();

    const dreamText = input.value.trim();
    if (!dreamText) {
      result.innerHTML = "Tell me your dream first...";
      return;
    }

    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * interpretations.length);
    } while (randomIndex === lastIndex && interpretations.length > 1);

    lastIndex = randomIndex;
    const randomInterpretation = interpretations[randomIndex];
    result.innerHTML = `<em>${randomInterpretation}</em>`;
  });

  // Mute/unmute
  muteBtn.addEventListener("click", () => {
    muted = !muted;
    audio.volume = muted ? 0 : 1;
    muteBtn.textContent = muted ? "Unmute" : "Mute";
  });
});

// ======== PARTICLE BACKGROUND WITH SPARKS & PARALLAX ========
let particles = [];
let sparks = [];
let offsetX = 0;
let offsetY = 0;
let tiltX = 0;
let tiltY = 0;

function setup() {
  const cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.position(0,0);
  cnv.style('z-index','1'); // behind UI
  for (let i = 0; i < 150; i++) particles.push(new Particle());

  // Device tilt support
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (event) => {
      tiltX = event.gamma / 30; // left/right tilt (~-1 to 1)
      tiltY = event.beta / 30;  // forward/back tilt (~-1 to 1)
    }, true);
  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  background(0, 20);

  // Mouse-based parallax (for desktop)
  const mouseOffsetX = map(mouseX, 0, width, -20, 20);
  const mouseOffsetY = map(mouseY, 0, height, -20, 20);

  // Combine mouse and tilt for total offset
  offsetX = mouseOffsetX + tiltX * 30;
  offsetY = mouseOffsetY + tiltY * 30;

  // Normal particles
  for (let p of particles) {
    p.update();
    p.show(offsetX * 0.5, offsetY * 0.5);
  }

  // Occasionally spawn sparks
  if (random() < 0.02) sparks.push(new Spark());

  // Sparks update
  for (let i = sparks.length - 1; i >= 0; i--) {
    sparks[i].update();
    sparks[i].show(offsetX, offsetY);
    if (sparks[i].alpha <= 0) sparks.splice(i, 1);
  }
}

// ====== NORMAL PARTICLES ======
class Particle {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(2, 5);
    this.speedX = random(-0.3, 0.3);
    this.speedY = random(-0.5, -0.1);
    this.alpha = random(50, 150);
    this.colorOffset = random(1000);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.y < -10) this.y = height + 10;
    if (this.x < -10) this.x = width + 10;
    if (this.x > width + 10) this.x = -10;
    this.colorOffset += 0.01;
  }

  show(pxOffset = 0, pyOffset = 0) {
    noStroke();
    const hue = 120 + 60 * sin(this.colorOffset);
    colorMode(HSB, 360, 100, 100, 255);
    fill(hue, 80, 100, this.alpha);
    ellipse(this.x + pxOffset, this.y + pyOffset, this.size);
    colorMode(RGB, 255);
  }
}

// ====== SPARK PARTICLES ======
class Spark {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = random(5, 12);
    this.speedX = random(-0.1, 0.1);
    this.speedY = random(-0.2, -0.05);
    this.alpha = 0;
    this.maxAlpha = random(150, 255);
    this.fadeIn = true;
    this.colorOffset = random(1000);
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.fadeIn) {
      this.alpha += 5;
      if (this.alpha >= this.maxAlpha) this.fadeIn = false;
    } else {
      this.alpha -= 2;
    }

    if (this.y < -10) this.y = height + 10;
    if (this.x < -10) this.x = width + 10;
    if (this.x > width + 10) this.x = -10;
    this.colorOffset += 0.02;
  }

  show(pxOffset = 0, pyOffset = 0) {
    noStroke();
    const hue = 120 + 60 * sin(this.colorOffset);
    colorMode(HSB, 360, 100, 100, 255);
    fill(hue, 80, 100, this.alpha);
    ellipse(this.x + pxOffset, this.y + pyOffset, this.size);
    colorMode(RGB, 255);
  }
}
