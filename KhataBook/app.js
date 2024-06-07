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
    res.render("index", { files });
    console.log(files);
  });
});

// Creating Files
app.get("/create", (req, res) => {
  const currentDate = new Date();

  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const formattedDate = `${day < 10 ? "0" : ""}${day}-${
    month < 10 ? "0" : ""
  }${month}-${year}`;

  fs.writeFile(`./files/${formattedDate}.txt`, "Created first file", (err) => {
    if (err) return res.send("Something went wrong...");
    else res.send("Done");
  });
});

// Editing Files
app.get("/edit/:filename", (req, res) => {
  fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, data) => {
    if (err) return res.send(err);
    res.render("edit", { data, filename: req.params.filename });
  });
});

// updating file content
app.post("/update/:filename", (req, res) => {
  fs.writeFile(`./files/${req.params.filename}`, req.body.filedata, (err) => {
    if (err) return res.send(err);
    res.redirect("/");
  });
});

app.listen(3000);
