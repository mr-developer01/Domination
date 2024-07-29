const express = require("express");
const app = express();

const userModel = require("./models/usermodel")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Working!!!");
});

app.post("/create", async(req, res) => {
    let createdUser = await userModel.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    res.send(createdUser)
})

app.post("/:username/create/post", async(req, res) => {
    const user = await userModel.findOne({username: req.params.username});
    user.posts.push({content: req.body.content});
    await user.save();
    res.send(user);
})

app.listen("3000");
