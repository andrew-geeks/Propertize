const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;


//routes
const homeRoute = express.Router();
const accRoute = require('./routes/account.js');


app.use(cors());
app.use(bodyParser.json());

//routeHandler
app.use("/",homeRoute);
app.use("/account",accRoute);

mongoose.connect('mongodb://localhost:27017/propertize',{useNewUrlParser: true});
const connection = mongoose.connection;


connection.once('open',()=>{
    console.log("db connected!");
})


homeRoute.get("/",(req,res)=>{
    res.send("<h1>Hello</h1>");
})



app.listen(PORT,()=>{
    console.log("Server is running on Port: " + PORT);
})