const mongoose = require("mongoose");

async function connectMongoDb(url){
    try{
        await mongoose.connect(url);
        console.log("Connected to MongoDB");
    }catch(err){
        console.log("Failed to connect to MongoDB",err);
    }
} 
module.exports = {connectMongoDb,};