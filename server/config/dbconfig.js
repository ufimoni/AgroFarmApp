const mongoose = require('mongoose');

mongoose.connect(process.env.local_conn_str);

const db = mongoose.connection;

db.on('connected', ()=>{
console.log("Database Connected Successfully");
})

db.on('err',()=>{
    console.log("Error in Connecting to the Database");
})

module.exports = db;