const express = require("express");
const app = express();

const indexRouter = require("./routes/index-router");
const userRouter = require("./routes/user-router");

app.use("/", indexRouter);
app.use("/user", userRouter);

app.listen(3000);
