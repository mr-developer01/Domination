const express = require("express");
const app = express();
const mongooseconnection = require("./config/mongoose");

app.get("/", function (req, res) {
  res.send("Hey!");
});

app.listen(3000);
