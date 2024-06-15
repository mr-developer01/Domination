const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Getting All FIles
app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    if(err) return res.status(500).send(err);
    res.render("index", { files });
  });
});

// Reading spacific hisaab
app.get("/hisaab/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}.txt`, "utf-8", (err, data) => {
    if(err) return res.status(500).send(err);
    // res.send(data)
    res.render("hisaab", { data, filename: req.params.filename });
  });
});

// Route for rendering create page
app.get("/create", (req, res) => {
  res.render("create");
});

// Editing Files
app.get("/edit/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}.txt`, "utf-8", (err, data) => {
    if (err) return res.status(500).send(err);
    res.render("edit", {data, filename: req.params.filename});
  });
});

// deleting file
app.get("/delete/:filename", (req, res) => {
  fs.unlink(`./files/${req.params.filename}.txt`, (err) => {
    if(err) return res.send(err);
    res.redirect("/")
  })
})

app.post("/createhisaab", (req, res) => {
  const currentDate = new Date();

  const date = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`

  fs.writeFile(`./files/${date}.txt`, req.body.content, (err) => {
    if (err) return res.status(500).send(err);
    res.redirect("/")
  });
})

// updating file content
app.post("/update/:filename", (req, res) => {
  fs.writeFile(`./files/${req.params.filename}.txt`, req.body.content, (err) => {
    if (err) return res.send(err);
    res.redirect("/");
  });
});

app.listen(3000);
