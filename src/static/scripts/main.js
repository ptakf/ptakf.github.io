function getRandomInt(max = 99, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function insertStringAtPosition(text, string, position) {
  // Insert a string at a specified position of a given text
  return text.slice(0, position) + string + text.slice(position);
}

function encodeTextOLD(text) {
  // Pre-funk the text
  let encodedText = "rockafeller";

  // Go through the characters in reverse
  for (let i = text.length - 1; i >= 0; i--) {
    // Get char code and add extra obfuscation
    charCode = text.charCodeAt(i) * 2 + 1;

    // Convert the char code from decimal to hexadecimal
    charCode16 = charCode.toString(16);

    // Ensure the char code is four characters long
    charId = "0".repeat(5 - charCode16.length) + charCode16;

    encodedText += charId;
  }

  return encodedText;
}

function encodeText(text) {
  let encodedText = "";

  // Go through the characters in reverse
  for (let i = text.length - 1; i >= 0; i--) {
    // Get char code and add extra obfuscation
    charCode = text.charCodeAt(i) * 2 + 1;

    // Convert the char code from decimal to hexadecimal
    charCode16 = charCode.toString(16);

    // Ensure the char code is four characters long
    charId = charCode16.padStart(5, "0");

    encodedText += charId;
  }

  // Funk the text
  encodedText = insertStringAtPosition(
    encodedText,
    "rockafeller",
    getRandomInt(encodedText.length - 1)
  );

  return encodedText;
}

function decodeText(text) {
  let decodedText = "";

  // De-funk the text
  text = text.replaceAll("rockafeller", "");

  // Go through the characters in reverse
  for (let i = text.length - 5; i >= 0; i -= 5) {
    // Extract char code from the text
    charId = text.slice(i, i + 5);

    // Convert the char code from hexadecimal do decimal
    charCode16 = parseInt(charId, 16);

    // Remove extra obfuscation
    charCode = ((charCode16 - 1) / 2).toString();

    decodedText += String.fromCharCode(charCode);
  }

  return decodedText;
}

function joinDataParts(element) {
  // Join data-* parts of an element
  let data = "";

  let currentPart = element.getAttribute("data-scrambled-part-1");
  let partId = 2;
  // Go through every part
  while (currentPart !== undefined && currentPart !== null) {
    data += currentPart;
    currentPart = element.getAttribute(`data-scrambled-part-${partId}`);

    partId++;
  }

  return data;
}

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
