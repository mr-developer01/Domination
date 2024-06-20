const express = require("express");
const app = express();
const mongooseconnection = require("./config/mongoose");
const {userModel, validateUserModel} = require("./models/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/create", async (req, res) => {
  const { username, name, age, email, contact } = req.body;
  let error = validateUserModel({username, name, age, email, contact})
//   let user = await userModel.create({ username, name, age, contact, email });
    if(error) return res.status(500).send(error.message)
    res.send("Every thing is working")
});

app.listen(3000);
