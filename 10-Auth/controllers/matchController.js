const bycrpt = require("bcrypt");
module.exports.matchController = async (req, res) => {
  let result = await bycrpt.compare(
    "write_your_password",
    "$2b$10$UVp1MSkIuYTwEwsZvIWiwO7FnSfHJNpMWFxnjIsdqwTRQME91cZmG"
  );
  res.send(result);
};
