const bycrpt = require("bcrypt");
module.exports.encryptController = async (req, res) => {
  let salt = await bycrpt.genSalt(10);
  let encryptedPass = await bycrpt.hash("write_your_password", salt)
  res.send(encryptedPass);
};
