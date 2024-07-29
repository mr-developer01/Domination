const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports.protect = async (req, res, next) => {
  // console.log(req.cookies.token);
  if (req.cookies.token) {
    try {
      const data = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
      console.log(data);
      req.user = await userModel
        .findOne({ email: data.email });
        
      next();
    } catch (error) {
      res.status(401).send("Not Authorized");
    }
  }

  if (!req.cookies.token) {
    res
      .status(401)
      .send("Not Authorized, You don't have permission to access.");
  }
};
