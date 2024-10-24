const http = require("http"); //http package/module
const fs = require("fs"); //file system package

const myServer = http.createServer((req, res) => {
    console.log("New request received");
    console.log("URL:",req.url);
    console.log("Method:",req.method);
    const dateNow = new Date();
    const log = `${dateNow.toLocaleDateString()}: New request received\n`;
    fs.appendFile("log.txt", log, (err, data)=>{
        if(err){
            console.log("Error writing to log file",err);
            res.end("Internal Server Error");
            return;
        }
        res.setHeader("content-type","text/plain");

        switch (req.url) {
            case "/":
                res.end("HomePage");
                break;
            case "/about":
                res.end("About Page: I am Akanksha Rani");
                break;
            default:
                res.end("Page Not Found");
        }
    }); 
});
 //create server
 // arrow function is resposible for handling request and response i.e to process the incoming requests

 myServer.listen(8000, ()=> console.log("Server is running on port 8000")); //listen to port 8000

 //run the server using node "index.js" or "npm start" command in terminal 