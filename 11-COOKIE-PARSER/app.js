const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("Kunal");
});

app.get("/setcookie", (req, res) => {
  // No-package is require to set cookie to our browser ---
  res.cookie("age", "25", {
    maxAge: 2000, // cookie will expire after 3 sec
    httpOnly: true, // cannot use document,cookie on inspect of browser
    secure: true, // follow https protocols
  });
  res.send("Cookie is set to our browser");
});

app.get("/readcookie", (req, res) => {
  // cookie-parser packege is require to read cookie from our browser
  const readCookie = req.cookies.age;
  res.send(readCookie);
});

app.listen(3000);
