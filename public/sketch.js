// No canvas needed
document.addEventListener("DOMContentLoaded", () => {
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

  const btn = document.getElementById("interpretBtn");
  const input = document.getElementById("dreamInput");
  const result = document.getElementById("result");

  btn.addEventListener("click", () => {
    const dreamText = input.value.trim();
    if (!dreamText) {
      result.innerHTML = "Tell me your dream first...";
      return;
    }

    const randomInterpretation = interpretations[Math.floor(Math.random() * interpretations.length)];
    result.innerHTML = `<em>${randomInterpretation}</em>`;
  });
});
