const express = require("express")
const app = express()

app.get("/", (req, res) => {
    res.send("Hey, Rahul!!!")
})

app.listen(3000)