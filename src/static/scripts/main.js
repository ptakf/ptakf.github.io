function getRandomInt(max = 99, min = 0) {
  // Get a random integer in the [min, max] range
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function insertStringAtPosition(text, string, position) {
  // Insert a string at a specified position of a given text
  return text.slice(0, position) + string + text.slice(position);
}

function encodeText(text) {
  // Encode the passed text using a professional in-house algorithmTM
  let encodedText = "";

  // Go through the characters in reverse
  for (let i = text.length - 1; i >= 0; i--) {
    // Get char code and add extra obfuscation
    let charCode = text.charCodeAt(i) * 2 + 1;

    // Convert the char code from decimal to hexadecimal
    let charCode16 = charCode.toString(16);

    // Ensure the char code is 5 characters long
    let charId = charCode16.padStart(5, "0");

    encodedText += charId;
  }

  // Add garbage data
  const characters = "01234567890abcdefghijklmnopqrstuvwxyz";

  // Get garbage data
  let garbageData = (
    characters.charCodeAt(getRandomInt(characters.length - 1)) * 2 +
    1
  )
    .toString(16) // Convert it to hexadecimal
    .padStart(5, "0"); // Ensure it's 5 characters long

  // Randomly select the garbage data position
  let garbageDataPosition = getRandomInt(encodedText.length);

  // Insert the garbage data into the text
  encodedText = insertStringAtPosition(
    encodedText,
    garbageData,
    garbageDataPosition
  );

  // Prepend the garbage data position to the text
  encodedText = garbageDataPosition + "K" + encodedText;

  // Silver-hammer the text
  encodedText = insertStringAtPosition(
    encodedText,
    "maxwell",
    getRandomInt(encodedText.length)
  );

  return encodedText;
}

function decodeText(text) {
  // Decode text using a professional in-house algorithmTM
  let decodedText = "";

  // De-hammer the text
  text = text.replaceAll("maxwell", "");

  // Get garbage data position
  let garbageDataPosition = text.match(/\d+K/)[0].replaceAll("K", "");

  // Remove the position from encoded text
  text = text.slice(garbageDataPosition.length + 1, text.length);

  // Convert the position to integer
  garbageDataPosition = parseInt(garbageDataPosition);

  // Remove the garbage data
  text =
    text.slice(0, garbageDataPosition) + text.slice(garbageDataPosition + 5);

  // Go through the characters in reverse
  for (let i = text.length - 5; i >= 0; i -= 5) {
    // Extract a char code from the text
    let charId = text.slice(i, i + 5);

    // Convert the char code from hexadecimal do decimal
    let charCode16 = parseInt(charId, 16);

    // Remove extra obfuscation
    let charCode = ((charCode16 - 1) / 2).toString();

    decodedText += String.fromCharCode(charCode);
  }

  return decodedText;
}

function joinDataParts(element, pattern = "data-scrambled-part-") {
  // Join data-* parts of an element
  let data = "";

  let currentPart = element.getAttribute(`${pattern}1`);
  let partId = 2;
  // Go through every part
  while (currentPart !== undefined && currentPart !== null) {
    data += currentPart;
    currentPart = element.getAttribute(`${pattern}${partId}`);

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

for (let element of document.getElementsByClassName("scrambled-file")) {
  // Unscramble file
  element.href = decodeText(joinDataParts(element, "data-scrambled-href-"));

  element.download = decodeText(
    joinDataParts(element, "data-scrambled-download-")
  );
}
