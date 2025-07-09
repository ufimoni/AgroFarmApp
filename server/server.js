const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const server = require('./app');
const dbconfig = require('./config/dbconfig'); // This will connect to MongoDB

const Port = process.env.PORT || 5000;

server.listen(Port, () => {
  console.log("🚀 Server Running on Port: " + Port);
});
