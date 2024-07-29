const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/ShreeEmbededDataModel");

// const userSchema = mongoose.Schema({
//     username: String,
//     email: String,
//     password: String,
//     posts: [
//         {
//             content: String,
//             date: {
//                 type: Date,
//                 default: Date.now()
//             }
//         }
//     ]
// });

// or

const postSchema = mongoose.Schema({
  content: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  posts: [postSchema],
});

module.exports = mongoose.model("User", userSchema);
