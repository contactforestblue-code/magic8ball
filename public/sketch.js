let audioStarted = false;
const fadeDuration = 500; // milliseconds
let muted = false;

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
  // 10 new messages
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

  // Fade-in audio
  function startAudioFadeIn() {
    if (audioStarted) return;
    audioStarted = true;
    audio.volume = 0;
    audio.play().catch(() => {}); // browser may block autoplay

    nowPlaying.textContent = 'Now Playing - "Dream Guide" by Act Three';

    let start = null;
    const fadeStep = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      audio.volume = muted ? 0 : Math.min(elapsed / fadeDuration, 1);
      if (elapsed < fadeDuration) {
        requestAnimationFrame(fadeStep);
      } else {
        audio.volume = muted ? 0 : 1;
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

  // Start audio on first touch anywhere
  document.body.addEventListener("touchstart", startAudioFadeIn, { once: true });

  // Mute/unmute toggle
  muteBtn.addEventListener("click", () => {
    muted = !muted;
    audio.volume = muted ? 0 : 1;
    muteBtn.textContent = muted ? "Unmute" : "Mute";
  });
});
