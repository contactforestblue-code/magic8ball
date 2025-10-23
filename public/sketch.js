let interpretations = [
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

function setup() {
  noCanvas(); // we don’t need a p5 canvas here

  const btn = select("#interpretBtn");
  const input = select("#dreamInput");
  const result = select("#result");

  btn.mousePressed(() => {
    const dreamText = input.value().trim();
    if (!dreamText) {
      result.html("Tell me your dream first...");
      return;
    }

    const randomInterpretation = random(interpretations);
    result.html(`<em>${randomInterpretation}</em>`);
  });
}
