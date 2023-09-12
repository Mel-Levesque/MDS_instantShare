const crypto = require('crypto');

function generateUniqueToken(length) {
  return crypto.randomBytes(length).toString('hex');
}

// Example usage: Generate a 32-character token
const token = generateUniqueToken(16);
console.log(token);