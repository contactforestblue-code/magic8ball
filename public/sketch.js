let audioStarted = false;
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
  const audio = document.getElementById("dreamAudio");

  function startAudioOnce() {
    if (!audioStarted) {
      audio.play().catch(() => {
        // Autoplay blocked; will play on next click
      });
      audioStarted = true;
    }
  }

  btn.addEventListener("click", () => {
    startAudioOnce();

    const dreamText = input.value.trim();
    if (!dreamText) {
      result.innerHTML = "Tell me your dream first...";
      return;
    }

    const randomInterpretation = interpretations[Math.floor(Math.random() * interpretations.length)];
    result.innerHTML = `<em>${randomInterpretation}</em>`;
  });

  // Optional: start audio on first tap anywhere
  document.body.addEventListener("touchstart", startAudioOnce, { once: true });
});
