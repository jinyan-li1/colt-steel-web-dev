const express = require("express");

const app = express();

// app.use((req, res) => {
//    console.log("WE GOT A NEW REQUEST!")
    // res.send("HELLO, WE GOT YOUR RESQUEST! THIS IS A RESPONSE.")
    // res.send({color: "red"})
    // res.send("<h1>This is my webpage</h1>")
//})


app.get("/", (req, res) => {
    res.send("This is the home page!")
})

// define a pattern
app.get("/r/:subreddit", (req, res) => {
    const {subreddit} = req.params;
    res.send(`<h1>Browsing the ${subreddit} subreddit</h1>`)
})

app.get("/r/:subreddit/:postId", (req, res) => {
    const {subreddit, postId} = req.params;
    res.send(`<h1>Viewing the ${subreddit} subreddit with post id ${postId}</h1>`)
})

app.get("/cats", (req, res) => {
    res.send("MEOW!")
})

app.get("/dogs", (req, res) => {
    res.send("WOOF!")
})

// example: http://localhost:3000/search?q=dog
app.get("/search", (req, res) => {
    const { q } = req.query;
    if (!q) {
        res.send("NOTHING FOUND IF NOTHING SEARCHED!")
    }
    res.send(`<h1>Search result for ${q}</h1>`)
})

// catch-all: handle all get requests not defined, important to put at the end
app.get("*", (req, res) => {
    res.send(`I don't know that path!`)
})


// /cats => "meow"
// /dogs => "woof"
// "/"


app.listen(3000, () => {
    console.log("Listening on port 3000!")
})