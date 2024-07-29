const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generate-token");

module.exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (user) {
      return res
        .status(400)
        .send("Your account already exists, please login..");
    }

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);

    user = await userModel.create({
      username,
      email,
      password: hash,
    });

    let token = generateToken({email});

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports.loginUser = (req, res) => {
  res.send("Rahul....");
};

module.exports.logoutUser = (req, res) => {
  res.send("Rahul....");
};

module.exports.userProfile = (req, res) => {
  res.send("Rahul....");
};
