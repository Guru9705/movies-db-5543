const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    "movie_name": String,
    "movie_genre": String,
    "production_year": Number,
    "budget": Number
})

module.exports=userSchema