const http = require("http"); //http package/module
const fs = require("fs"); //file system package
// const url = require("url"); //url package

const express = require("express"); //express package

const app = express(); //create express app

// Middleware to log each request
app.use((req, res, next) => {
    const dateNow = new Date();
    const log = `New request received.. method: ${req.method} on ${dateNow.toLocaleDateString()} at url ${req.url}\n`;
    
    fs.appendFile("log.txt", log, (err) => {
        if (err) {
            console.log("Error writing to log file", err);
        }
    });

    next(); // Continue to the next middleware or route handler
});

app.get("/", (req, res) => {
    return res.send("Home Page");
})
app.get("/about", (req, res) => {
    return res.send(`About Page: Hi ${req.query.username}`);
})

app.get("/search", (req, res) => {
    return res.send(`Search Page: Searching for ${req.query.search_query}`);
})

// const myServer = http.createServer(app); //create server using express app

app.listen(8000,()=> console.log("Server Started!"));


// const myServer = http.createServer((req, res) => {
//     console.log("New request received");
//     console.log("URL:",req.url);
//     if(req.url === "/favicon.ico"){
//         return res.end();
//     }

//     const dateNow = new Date();
//     const log = `New request received.. method: ${req.method} on ${dateNow.toLocaleDateString()} at url ${req.url}\n`;
    
//     const myUrl = url.parse(req.url, true);
//     // console.log("Parsed URL:", myUrl);

//     fs.appendFile("log.txt", log, (err, data)=>{
//         if(err){
//             console.log("Error writing to log file",err);
//             res.end("Internal Server Error");
//             return;
//         }
//         res.setHeader("content-type","text/plain");

//         switch (myUrl.pathname) {
//             case "/":
//                 res.end("HomePage");
//                 break;
//             case "/about":
//                 const userName = myUrl.query.username;
//                 res.end(`About Page: Hi ${userName}`);
//                 break;
//             case "/search":
//                 const search = myUrl.query.search_query;
//                 res.end(`Search Page: Searching for ${search}`);
//                 break;
//             case "/signUp":
//                 if(req.method === "GET") res.end("This is a signup page");
//                 else if(req.method === "POST") res.end("User signed up successfully");  
//                 break;
//             default:
//                 res.end("Page Not Found");
//         }
//     }); 
// });
//  //create server
//  // arrow function is resposible for handling request and response i.e to process the incoming requests

//  myServer.listen(8000, ()=> console.log("Server is running on port 8000")); //listen to port 8000

//  //run the server using node "index.js" or "npm start" command in terminal 