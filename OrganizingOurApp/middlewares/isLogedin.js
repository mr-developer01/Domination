module.exports = (req, res, next) => {
    req.randomNumber = Math.random()
    console.log("Comming from middleware....");
    next()
    // res.redirect("/")
}