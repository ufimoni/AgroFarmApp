const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes')
const app = express();
app.use(morgan('dev'));


app.use(cookieParser());


app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));




app.use('/api/auth',authRoutes);
app.use('/api/user', userRoutes);


/// Login out the activities in this application
const logger = function(req, res, next){
     console.log("Hello the app middleware Function is Called")
    next();
}
app.use(logger);



module.exports = app;