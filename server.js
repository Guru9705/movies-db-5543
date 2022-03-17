const express = require("express");

const mongoose = require("mongoose");

const PORT = 8000;

const userSchema=require("./schema/user.schema")
const User=mongoose.model("user",userSchema)
const DB_URL = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.2.3";

let app = express();
app.use(express.json())
const connect = () => {
    return mongoose.connect(DB_URL);
}


var db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get("/users", async (req, res) => {
    let users = await User.find({});
    res.status(200).json(users)
})

app.get("/users/:id", async (req, res) => {
    let user = await User.findById(req.params.id);
    res.status(200).json(user)
})

app.patch("/users/:id", async(req, res)=> {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log("user--patch",user)
    res.status(200).json(user)
})

app.post("/users", async(req, res)=> {
    let user = await User.create(req.body);
    console.log("user--create",user)
    res.status(200).json(user)
})


app.delete("/users/:id" ,async(req, res)=> {
    let user = await User.findByIdAndDelete(req.params.id);
    console.log("user--delete",user)
    res.status(200).json(user)
})

app.listen(PORT, () => {
    try {
        console.log(PORT, "listening");
        connect();
    } catch(e) {
        console.log("error",e)
    }
    
})