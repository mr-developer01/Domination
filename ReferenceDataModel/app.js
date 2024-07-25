const express = require("express");
const app = express();
const userModel = require("./models/userModel");
const postModel = require("./models/postModel");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  try {
    res.send("Every Thing is Ok!!");
  } catch (error) {
    next(error);
  }
});

app.post("/create", async (req, res, next) => {
  try {
    const user = await userModel.create({
      username: req.body.username,
      email: req.body.email,
      passowrd: req.body.password,
    });
    res.send(user);
  } catch (error) {
    next(error);
  }
});

app.post("/:username/create/post", async (req, res, next) => {
  try {
    let user = await userModel.findOne({ username: req.params.username });
    let createdPost = await postModel.create({
      content: req.body.content,
      user: user._id,
    });
    user.posts.push(createdPost._id);
    await user.save();
    res.send({user, createdPost});
  } catch (error) {
    next(error);
  }
});

app.get("/posts", async(req, res, next) => {
    try {
        let posts = await postModel.find().populate("user")
        res.send(posts)
    } catch (error) {
        next(error)
    }
});

app.get("/postsByUser", async(req, res, next) => {
    try {
        let posts = await postModel.findOne({content: "I love my family...."}).populate("user")
        res.send(posts)
    } catch (error) {
        next(error)
    }
});

app.get("/users", async(req, res, next) => {
    try {
        let users = await userModel.find().populate("posts")
        res.send(users)
    } catch (error) {
        next(error)
    }
});

app.get("/totalPostsOfAUser", async(req, res, next) => {
    try {
        let users = await userModel.findOne({username: "Rahul"}).populate("posts")
        res.send(users)
    } catch (error) {
        next(error)
    }
});

app.get("*", (req, res) => {
  res.send("There is no such route!!");
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(3000);
