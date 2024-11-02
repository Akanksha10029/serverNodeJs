const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();

const PORT = 3000;

// Middleware to parse form data in req.body
//middleware - express.urlencoded is a body-parsing middleware(specifically designed to handle form data.)
app.use(express.urlencoded({extended:false}))

app.use((req, res, next)=>{
    const dateNow = new Date();
    const apiLog = `IP: ${req.ip} method: ${req.method} on ${dateNow.toLocaleDateString()} at url ${req.url}\n`;
    fs.appendFile("apiLog.txt",apiLog,(err)=>{
        if (err){
            console.log("Error writing to log file",err);
        }
    });
    next(); // Continue to the next middleware or route handler
})

//for browser(SSR-Server side rendering) - http://localhost:3000/users
app.get("/users",(req,res) => {
    const html = `
    <html>
        <head>
            <title>Users</title>
        </head>
        <body>
            <h1>Users</h1>
            <ul>
                ${users.map(user => `<li>User first name: ${user.first_name} ${user.last_name}</li>`).join("\n")}
            </ul>
        </body>
    </html>`
    res.send(html);
})

//for android - http://localhost:3000/api/users
app.get("/api/users",(req,res)=> {
    // console.log(req.params)
    console.log(req.headers);
    
    res.setHeader("X-Myname","Akanksha Rani") //custom header - Always add X- before the header name while creating custom header(good practice)
    
    return res.json(users);
});

//Dynamic Path parameters- get api/users/:userId or id
app 
   .route("/api/users/:id")

   .get((req, res)=>{
    const id = Number(req.params.id);
    const user = users.find(user =>user.id === id);
    if(!user){
        return res.status(404).json({error: "User not found"});
    }
    else{
        return res.json(user);
    }
    })
    
    .patch((req, res) => {
        const id = Number(req.params.id);
        const user = users.findIndex(user => user.id === id);

        if (user == -1) {
            return res.status(404).json({ error: "User not found" });
        }

        // Merge existing user data with the new data from req.body
        const updatedUser = { ...users[user], ...req.body };

        // Update the user in the array
        users[user] = updatedUser;

        // Save the updated data back to MOCK_DATA.json
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to update user" });
            }
            return res.json({ status: "success", user: updatedUser });
        });
    })

    .delete((req, res) => {
        const id = Number(req.params.id);
        const user = users.findIndex(user => user.id === id);

        if (user == -1) {
            return res.status(404).json({ error: "User not found" });
        }

        // Remove user from the array
        const deletedUser = users.splice(user, 1)[0];

        // Save updated data to MOCK_DATA.json
        fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to delete user" });
            }
            return res.json({ status: "success", deletedUser });
        });
    });

app.post("/api/users",(req, res)=>{
    //Create a new user

    const body = req.body;
    console.log(body);

    if(!body || !body.first_name || !body.last_name || !body.email || !body.gender){
        return res.status(400).json({ error: "Please provide all details" });
    }

    const userExists = users.some(user=> 
        user.first_name === body.first_name &&
        user.last_name === body.last_name &&
        user.email === body.email &&
        user.gender === body.gender
    );
    if(userExists){
        return res.status(409).json({ status: "error", message: "User already exists" });
    }

    const maxId = users.length > 0 ? Math.max(...users.map(user => user.id)):0;
    users.push({id:maxId+1, ...body});
    fs.writeFile("./MOCK_DATA.json",JSON.stringify(users),(err,data)=>{
        if (err){
            return res.status(500).json({error: "Failed to create user"});
        }
        return res.status(201).json({status: "success",id:maxId+1});
    })
    
    // return res.json({status: "pending"});
});

app.listen(PORT,() => console.log(`server started at PORT ${PORT}`));
