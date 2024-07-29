const express = require("express");
const app = express();
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://rahulpratik1212:mDNvwBNCyq6pZnbS@cluster0.isykdl4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("connected to database");
}).catch((err) => console.log(err));

app.get("/", function (req, res) {
  res.send("Hey!");
});

app.listen(3000);