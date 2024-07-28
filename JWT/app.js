const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

app.get("/", (req, res) => {
  res.send("Rahul");
});

app.get("/tokenmaker", (req, res) => {
  let token = jwt.sign({ email: "email@email.com" }, "rarara");
  res.send(token);
});

app.get("/dataFetch", (req, res) => {
  try {
    let data = jwt.decode(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTcyMjExOTk0N30.AHUlZeVBnfHdnxCvuEAmSF5cHOJBGeX2oz71JhFjDlU",
      "rarara"
    );
    res.send(data);
  } catch (error) {
    // res.send(error.message);
    res.send("Something went wrong...");
  }
});

app.listen(3000);
