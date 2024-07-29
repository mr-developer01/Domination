const express = require("express");
const app = express();

const indexRouter = require("./routes/index-router");
const userRouter = require("./routes/user-router");
const encryptRouter = require("./routes/encrypt-router")
const matchRouter = require("./routes/match-router")

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/encrypt", encryptRouter)
app.use("/match", matchRouter)

app.listen(3000);
