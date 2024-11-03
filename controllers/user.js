const User = require('../models/user');

async function handleGetAllUsers(req,res){
    const allDBusers = await User.find({});
    return res.json(allDBusers);
}

async function handleGetUserById(req,res){
    const id = req.params.id;
        try {
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            return res.json(user);
        } catch (err) {
            return res.status(500).json({ error: "Failed to fetch user" });
        }
}

async function handlePatchUserById(req,res){
    const id = req.params.id;
    
        try {
            // Update the user in MongoDB
            const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ error: "User not found" });
            }
    
            return res.json({ status: "success", user: updatedUser });
        } catch (err) {
            return res.status(500).json({ error: "Failed to update user" });
        }
}

async function handleDeleteUserById(req,res){
    const id = req.params.id;
    
        try {
            // Delete the user from MongoDB
            const deletedUser = await User.findByIdAndDelete(id);
            if (!deletedUser) {
                return res.status(404).json({ error: "User not found" });
            }
    
            return res.json({ status: "success", deletedUser });
        } catch (err) {
            return res.status(500).json({ error: "Failed to delete user" });
        }
}

async function handleCreateUser(req,res){
    const { first_name, last_name, email, gender } = req.body;
            
    // Validate required fields     
    if (!first_name || !last_name || !email || !gender) {
        return res.status(400).json({ error: "Please provide all details" });
    }
    
    try{// Check if user already exists in MongoDB by email
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(409).json({ status: "error", message: "User already exists" });
        }

        //this data will be stored in mongoDB database
        const result = await User.create({
            first_name,
            last_name,
            email,
            gender,       
        });
        console.log("result:", result);
        
        return res.status(201).json({msg: `user created with id ${result._id}`});
    } 
    catch (err) {
        return res.status(500).json({ status: "error", message: "Failed to create user" });
    }
}
module.exports = {handleGetAllUsers,handleGetUserById,handlePatchUserById,handleDeleteUserById,handleCreateUser};