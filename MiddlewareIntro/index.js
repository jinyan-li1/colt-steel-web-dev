const { application } = require("express");
const express = require("express");
const app = express();
const morgan = require("morgan");

const AppError = require("./AppError");

// use morgan middleware on every request - logs each request
app.use(morgan("tiny"))
app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log(req.method, req.path);
    next();
})

app.use("/dogs", (req, res, next) => {
    console.log("I LOVE DOGS!!!");
    next();
})


const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === "chickennugget") {
        next();
    }
    throw new AppError("password required!", 401);
    //res.send("SORRY YOU NEED A PASSWORD!")
    // throw new AppError ("Password required!", 400)
}

// next() would execute the next matching middleware or route handler
// app.use((req, res, next) => {
//     console.log("THIS IS MY FIRST MIDDLEWARE!!!")
//     return next();
//     console.log("THIS IS MY FIRST MIDDLEWARE - AFTER CALLING NEXT()") // this line would not run since return statement was above it
// })
// app.use((req, res, next) => {
//     console.log("THIS IS MY SECOND MIDDLEWARE!!!")
//     return next();
// })
// app.use((req, res, next) => {
//     console.log("THIS IS MY THIRD MIDDLEWARE!!!")
//     return next();
// })

app.get("/", (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send("HOME PAGE!")
})

app.get("/error", (req, res) => {
    chicken.fly()
})

app.get("/dogs", (req, res) => {
    console.log(`REQUEST DATE: ${req.requestTime}`)
    res.send("WOOF WOOF!")
})

// protects a specific route
app.get("/secret", verifyPassword, (req, res) => {
    res.send("MY SECRET IS: Sometimes I wear headphones in public so I dont have to talk to anyone");
})

app.get("/admin", (req, res) => {
    throw new AppError("You are not an Admin", 403)
})

// handle an undefined route
app.use((req, res) => {
    res.status(404).send("NOT FOUND!")
})

// app.use((err, req, res, next) => {
//     console.log("*********************************")
//     console.log("**************ERROR**************")
//     console.log("*********************************")
//     // res.status(500).send("Oh boy! We got an error!")
//     console.log(err)
//     next(err)
// })

app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong" } = err;
    res.status(status).send(message)
})

app.listen(3000, () => {
    console.log("App is running on localhost:3000")
})