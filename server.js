const express = require("express");

const mongoose =require('mongoose');

require('dotenv').config({path: 'variables.env'});

const Recipe = require("./models/Recipe");
const User = require("./models/User");

//connect to database
mongoose 
   .connect(process.env.MONGO_URI, {autoIndex: false})
   .then(() => console.log('DB connected'))
   .catch(err => console.log(err));


   //initialize application
const app = express();

const PORT = process.env.PORT || 4444;
app.listen(PORT, () =>{
    console.log(`server listening on PORT ${PORT}`);
});