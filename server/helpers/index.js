const bcrypt = require("bcryptjs");
const secret = "rahasianegara";
const jwt = require("jsonwebtoken");

function verifyPassword(input, existing) {
  return bcrypt.compareSync(input, existing);
}
function generateToken(user) {
  let token = jwt.sign({ id: user.id, role: user.role }, secret);
  return token;
}

function verifyToken(token) {
  let decoded = jwt.verify(token, secret);
  return decoded;
}

function convertRupiah(number) {
  return number.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
  });
}
module.exports = { verifyPassword, generateToken, verifyToken, convertRupiah };
