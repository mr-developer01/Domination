const express = require("express");
const app = express();
require("dotenv").config();
const connectDb = require("./config/mongoose-connection");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth-routes")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
connectDb(); //connecting to DB

app.use("/api/auth", authRoute);

app.listen(3000);
