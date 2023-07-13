// Reverse Alphabet Cipher

function encipher(message) {
  const reverseAlphabet = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';
  let cipheredMessage = '';

  for (let i = 0; i < message.length; i++) {
    const char = message[i].toUpperCase();

    if (/[A-Z]/.test(char)) {
      const index = char.charCodeAt(0) - 65;
      const cipheredChar = reverseAlphabet[index];
      cipheredMessage += cipheredChar;
    } else {
      cipheredMessage += char;
    }
  }

  return cipheredMessage;
}

function decipher(cipheredMessage) {
  const reverseAlphabet = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';
  let decipheredMessage = '';

  for (let i = 0; i < cipheredMessage.length; i++) {
    const char = cipheredMessage[i].toUpperCase();

    if (/[A-Z]/.test(char)) {
      const index = reverseAlphabet.indexOf(char);
      const decipheredChar = String.fromCharCode(index + 65);
      decipheredMessage += decipheredChar;
    } else {
      decipheredMessage += char;
    }
  }

  return decipheredMessage;
}

const message = 'I love cryptography!';
const cipheredMessage = encipher(message);
console.log('Enciphered Message:', cipheredMessage);

const decipheredMessage = decipher(cipheredMessage);
console.log('Deciphered Message:', decipheredMessage);
