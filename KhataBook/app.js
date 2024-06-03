const express = require("express");
const path = require("path");
const fs = require("fs")
const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Getting All FIles
app.get("/", (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        res.render("index", {files})
        console.log(files);
    })
})

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
    if(err) return res.send("Something went wrong...")
    else res.send("Done")
  })
});

app.listen(3000);
