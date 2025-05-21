const dotenv = require('dotenv');
dotenv.config({path: './config.env'})

const app = require('./app');

const dbconfig = require('./config/dbconfig');

const Port = process.env.PORT

app.listen(Port,()=>{
    console.log("Server Running on Port: " +Port)
})