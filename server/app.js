const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes')
const profileRoutes = require('./Routes/profileRoutes')
const cropsRoutes = require('./Routes/cropRoutes');
const farmRoutes = require('./Routes/farmRoutes');

const app = express();
app.use(morgan('dev'));


app.use(cookieParser());

/// since we will be uplo
app.use(express.json({ limit: '70mb'}));
app.use(express.urlencoded({
  extended: true,
  limit: '70mb'
}))


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use('/api/auth',authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/crops', cropsRoutes);
app.use('/api/farm', farmRoutes)


/// Login out the activities in this application
const logger = function(req, res, next){
     console.log("Hello the app middleware Function is Called")
    next();
}
app.use(logger);


//// Global Errors handlers.
// app.use('*', (req, res, next)=>{
//   res.status(404).json({
//     status: 'fail',
//     message: `Sorry Cant find${req.originalUrl} on this server, Page not found`
//   })
//   next();
// })


module.exports = app;