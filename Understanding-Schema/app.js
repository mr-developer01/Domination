const express = require("express");
const app = express();
const mongooseconnection = require("./config/mongoose");
const userModel = require("./models/user")
const debuglog = require("debug")("development:app")

app.get("/", function (req, res) {
  res.send("Hey!");
});

app.get("/create", async function (req, res) {
  const createdUser = await userModel.create({
    username: "Rahul",
    name: "Rahul",
    email: "r@r",
    password: "pass"
  })
  debuglog("user created")
  res.send(createdUser)
});

app.listen(3000);
