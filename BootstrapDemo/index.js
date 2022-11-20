const express = require('express');
const app = express();
const path = require("path");
const redditData = require("./data.json");

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

// enables nodemon outside the index.js folder
app.set("views", path.join(__dirname, "/views")) 

app.get("/", (req, res) => {
    res.render('home') // or home.ejs
})

app.get("/cats", (req, res) => {
    const cats = [
        "Blue", "Rocket", "Monty", "Stephanie", "Winston"
    ]
    res.render("cats", {cats})
})

app.get("/r/:subreddit", (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render("subreddit", { ...data });
    } else {
        res.render("notfound", {subreddit});
    }
    
})

app.get("/rand", (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render("random", {randNum: num}) // or just pass in num and call num in random.ejs template
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000")
})