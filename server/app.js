const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes')
const profileRoutes = require('./Routes/profileRoutes')
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
app.use('/api/profile', profileRoutes);


/// Login out the activities in this application
const logger = function(req, res, next){
     console.log("Hello the app middleware Function is Called")
    next();
}
app.use(logger);


//// Global Errors handlers.
app.use('*', (req, res, next)=>{
  res.status(404).json({
    status: 'fail',
    message: `Sorry Cant find${req.originalUrl} on this server, Page not found`
  })
  next();
})


module.exports = app;