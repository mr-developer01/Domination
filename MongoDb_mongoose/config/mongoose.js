const mongoose = require("mongoose")
const debuglog = require("debug")("development:mongooseconfig");
// DEBUG=development:mongooseconfig nodemon app.js
mongoose.connect("mongodb://127.0.0.1:27017/firstDb");

const db = mongoose.connection;

db.on("error", function(err){
    debuglog(err)
})

db.on("open", function(){
    debuglog("connected to the database")
})

module.exports = db;

// mDNvwBNCyq6pZnbS
// mongodb+srv://rahulpratik1212:mDNvwBNCyq6pZnbS@cluster0.isykdl4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0