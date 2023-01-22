const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const routes = express.Router();


app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/propertize',{useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open',()=>{
    console.log("db connected!");
})

app.listen(PORT,()=>{
    console.log("Server is running on Port: " + PORT);
})