const mongoose = require("mongoose");
const debuglog = require("debug")("development:mongooseconfig");

mongoose.connect("mongodb://127.0.0.1:27017/ShreeJOI");

const db = mongoose.connection;

db.on("error", (error) => {
  debuglog(error);
});

db.on("open", () => {
  debuglog("Connected to the Database");
});

module.exports = db;
