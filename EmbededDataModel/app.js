const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Working!!!");
});

app.post("/create", (req, res) => {
    let createdUser = userModel.create({
        
    })
})

app.listen("3000");
