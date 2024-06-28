const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ShreeEmbededDataModel")

const userSchema = mongoose.Schema({
    username: String
})

