const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authRoutes = require('./Routes/authRoutes');

const app = express();
app.use(morgan('dev'));


app.use(cookieParser());


app.use(express.json());





app.use('/api/auth',authRoutes);

/// Login out the activities in this application
const logger = function(req, res, next){
     console.log("Hello the app middleware Function is Called")
    next();
}
app.use(logger);



module.exports = app;