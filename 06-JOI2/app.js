const express = require("express");
const app = express();
const mongooseConnection = require("./config/mongoose");
const { userModel, validateModel } = require("./models/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Working!!");
});

app.post("/create", (req, res) => {
  const { username, name, age, contact, email } = req.body;

  let error = validateModel({ username, name, age, contact, email });

  if (error) return res.status(500).send(error.message);

  res.send("Everything is Okay!!");
});

app.listen(3000);
