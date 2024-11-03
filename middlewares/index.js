const fs = require('fs');

function logReqRes(filename){
    return (req, res, next) => {
        const dateNow = new Date();
        const apiLog = `IP: ${req.ip} method: ${req.method} on ${dateNow.toLocaleDateString()} at url ${req.url}\n`;
        fs.appendFile(filename,apiLog,(err)=>{
        if (err){
            console.log("Error writing to log file",err);
        }
    });
    next(); // Continue to the next middleware or route handler
    };
}

module.exports = {logReqRes,};