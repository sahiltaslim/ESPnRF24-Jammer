const textElement = document.getElementById("textElement");
const originalText = textElement.textContent;
const originalTitle = document.title;
const specialChars = ">!*{&^%}$/#[@!<)](_+-";

setInterval(() => {
  const words = originalText.split(" ").filter(word => word !== "");
  const randomWordIndex = Math.floor(Math.random() * words.length);
  const randomWord = words[randomWordIndex];

  if (randomWord) {
    const randomCharIndex = Math.floor(Math.random() * randomWord.length);
    const randomChar = specialChars[Math.floor(Math.random() * specialChars.length)];

    const modifiedWord = randomWord.split("");
    modifiedWord[randomCharIndex] = randomChar;
    words[randomWordIndex] = modifiedWord.join("");

    textElement.textContent = words.join(" ");
    document.title = words.join(" ");
  }

  setTimeout(() => {
    textElement.textContent = originalText;
    document.title = originalTitle;
  }, 499);
}, 500);
