const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/login-signup");

connect.then(() => {
    console.log("Database connected Successfully!");
})
.catch(() => {
    console.log("Database cannot be conected.");
})

//creating schema.
const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    password:{
        type:String,
        required: true
    }
});

//model
const collection = new mongoose.model("users",LoginSchema);
module.exports = collection;