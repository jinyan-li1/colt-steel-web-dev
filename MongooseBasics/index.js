const mongoose = require("mongoose");

// handle connection errors
mongoose.connect('mongodb://localhost:27017/movieApp')
    .then (() => {
        console.log("Connection open!")
    })
    .catch(err => {
        console.log("Oh no! Error!")
        console.log(err)
    })

// define a schema and saves as a db in mongosh
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

// tell mongoose to make a model using the defined schema
// param 1: name of the model - needs to be singular, capitalize first letter.
// mongoose will take the param 1 and make a collection with its 
// plural and lowercase version => "movies"
// param 2: name of defined schema
const Movie = mongoose.model('Movie', movieSchema);

// const amadeus = new Movie({ title: 'Amadeus', year: 1986, score: 9.2, rating: 'R' });
// amadeus.save();

// we do not need to call save on insertMany(), this method returns a promise
// Movie.insertMany([
//     { title: 'Amelie', year: 2001, score: 8.3, rating: 'R' },
//     { title: 'Alien', year: 1979, score: 8.1, rating: 'R' },
//     { title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG' },
//     { title: 'Stand By Me', year: 1986, score: 8.6, rating: 'R' },
//     { title: 'Moonrise Kingdom', year: 2012, score: 7.3, rating: 'PG-13' }
// ])
//     .then(data => {
//         console.log("IT WORKED!")
//         console.log(data);
//     })

