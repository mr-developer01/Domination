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

    let token = generateToken({ email });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    //   maxAge: 1000 * 60 * 60 * 24 * 30, for thirty days
      maxAge: 1000 * 60,
    });

    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });

    if (!user) {
      return res.status(500).send("Email or Password is Incorrect.");
    }

    let result = await bcrypt.compare(password, user.password);

    if (result) {
      let token = generateToken({ email });

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        maxAge: 1000 * 60,
      });

      res.status(201).send("User loggedin successfully.");
    } else {
      return res.status(500).send("Email or Password is Incorrect.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports.logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
  });

  res.status(201).send("User logout successfully.");
};

module.exports.userProfile = (req, res) => {
  console.log(req.user);
  res.send(req.user.username);
};
