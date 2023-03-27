const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;


//routes
const homeRoute = express.Router();
const accRoute = require('./routes/account.js');
const bussRoute = require('./routes/business.js');
const propRoute = require('./routes/property.js');
const mainRoute = require('./routes/maintenance.js'); //maintenance


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//routeHandler
app.use("/",homeRoute);
app.use("/account",accRoute);
app.use("/business",bussRoute);
app.use("/property",propRoute);
app.use("/maintenance",mainRoute);

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