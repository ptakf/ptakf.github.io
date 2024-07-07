import { decodeText, joinDataParts } from "./utils.js";

for (let element of document.getElementsByClassName("no-javascript-notice")) {
  // Hide "no JavaScript" notice
  element.classList.add("d-none");
}

for (let element of document.getElementsByClassName("scrambled-text")) {
  // Unscramble text
  element.textContent = decodeText(joinDataParts(element));
}

for (let element of document.getElementsByClassName("scrambled-email")) {
  // Unscramble e-mail
  let decodedText = decodeText(joinDataParts(element));

  element.textContent = decodedText;
  element.href = `mailto:${decodedText}`;
}

for (let element of document.getElementsByClassName("scrambled-file")) {
  // Unscramble file
  element.href = decodeText(joinDataParts(element, "data-scrambled-href-"));

  element.download = decodeText(
    joinDataParts(element, "data-scrambled-download-")
  );
}
