const express = require("express");

const {connectMongoDb} = require("./connection");
const userRouter = require("./routes/user");
const {logReqRes} = require("./middlewares/index");

const app = express();
const PORT = 3000;

//connect to mongodb
connectMongoDb("mongodb://localhost:27017/mydatabase");

// Middleware to parse JSON data in req.body
app.use(express.json());

//middleware - express.urlencoded is a body-parsing middleware(specifically designed to handle form data.)
app.use(express.urlencoded({extended:false}))

//adding data in apiLog.txt file
app.use(logReqRes("apiLog.txt"));

// routes
app.use("/api/users",userRouter);

app.listen(PORT,() => console.log(`server started at PORT ${PORT}`));
