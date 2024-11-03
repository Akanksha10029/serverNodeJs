const mongoose = require('mongoose');

//schema
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender:{
        type: String,
        required: true,
    }
},{timestamps: true});

//model creation
const User = mongoose.model("user", userSchema);

module.exports = User;