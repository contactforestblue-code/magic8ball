let audioStarted = false;
const fadeDuration = 500; // milliseconds
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
  "Your dream speaks of freedom — a desire to break away from limitations."
];

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("interpretBtn");
  const input = document.getElementById("dreamInput");
  const result = document.getElementById("result");

  // Create or select the audio element
  let audio = document.getElementById("dreamAudio");
  if (!audio) {
    audio = document.createElement("audio");
    audio.src = "dreamguide.mp3";
    audio.loop = true;
    audio.volume = 0;
    document.body.appendChild(audio);
  }

  // Create "Now Playing" text container
  let nowPlaying = document.getElementById("nowPlaying");
  if (!nowPlaying) {
    nowPlaying = document.createElement("div");
    nowPlaying.id = "nowPlaying";
    nowPlaying.style.color = "#0f0";
    nowPlaying.style.textAlign = "center";
    nowPlaying.style.fontSize = "0.9rem";
    nowPlaying.style.marginTop = "10px";
    nowPlaying.style.textShadow = "0 0 5px #0f0";
    document.body.appendChild(nowPlaying);
  }

  function startAudioFadeIn() {
    if (audioStarted) return;
    audioStarted = true;
    audio.play().catch(() => {}); // in case autoplay is blocked

    nowPlaying.textContent = 'Now Playing - "Dream Guide" by Act Three';

    let start = null;
    const fadeStep = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      audio.volume = Math.min(elapsed / fadeDuration, 1);
      if (elapsed < fadeDuration) {
        requestAnimationFrame(fadeStep);
      } else {
        audio.volume = 1;
      }
    };
    requestAnimationFrame(fadeStep);
  }

  btn.addEventListener("click", () => {
    startAudioFadeIn();

    const dreamText = input.value.trim();
    if (!dreamText) {
      result.innerHTML = "Tell me your dream first...";
      return;
    }

    const randomInterpretation = interpretations[Math.floor(Math.random() * interpretations.length)];
    result.innerHTML = `<em>${randomInterpretation}</em>`;
  });

  // Also start audio on first touch anywhere
  document.body.addEventListener("touchstart", startAudioFadeIn, { once: true });
});
