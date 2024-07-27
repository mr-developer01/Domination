const express = require("express");
const app = express();
const path = require("path");
const config = require("config");

// *** require dotenv before any router is require
require("dotenv").config();
// console.log(process.env.EXPRESS_KEY);
const db = require("./config/mongoose-connection");

const indexRouter = require("./routes/index-router");
const userRouter = require("./routes/user-router");
const { log } = require("console");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/user", userRouter);

// app.listen(process.env.PORT || 3000);
app.listen(config.get("PORT"), () => {
    console.log(config.get("PORT"));
});
