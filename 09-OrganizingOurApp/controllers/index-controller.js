const randomUserName = require("../utils/random-user");
module.exports.indexController = (req, res) => {
  const name = randomUserName();
  // res.send(name);
  res.render("index", {name})
};
