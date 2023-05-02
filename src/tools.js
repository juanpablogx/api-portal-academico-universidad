const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const hash = cadena => CryptoJS.SHA256(cadena).toString(CryptoJS.enc.Hex);

function generateAccessToken(user) {
  let token = jwt.sign(user, process.env.SECRET_TOKEN, {expiresIn: '1800s'});
  console.log(token);
  return token;
}

module.exports = {
  hash,
  generateAccessToken
}