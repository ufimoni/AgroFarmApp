const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');

// Route Imports
const authRoutes = require('./Routes/authRoutes');
const userRoutes = require('./Routes/userRoutes');
const profileRoutes = require('./Routes/profileRoutes');
const cropsRoutes = require('./Routes/cropRoutes');
const farmRoutes = require('./Routes/farmRoutes');
const taskRoutes = require('./Routes/taskRoutes');
const chatrouter = require('./Routes/chatRoutes');
const messageRouter = require('./Routes/messageRoutes');

// Express app
const app = express();

// HTTP server and socket.io instance created here
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

// Middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.json({ limit: '70mb' }));
app.use(express.urlencoded({ extended: true, limit: '70mb' }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Middleware logger
app.use((req, res, next) => {
  console.log("Hello the app middleware Function is Called");
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/crops', cropsRoutes);
app.use('/api/farm', farmRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/chat', chatrouter);
app.use('/api/message', messageRouter);

// 404 Handler
app.use((req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.status = 404;
  next(error);
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});






// 🌐 Socket.IO handling
const onlineUsers = [];

io.on('connection', (socket) => {
  console.log('🔌 User connected');

  socket.on('join-room', (userId) => {
    socket.join(userId);
  });

  socket.on('send-message', (message) => {
    console.log('[send-message]', message);
    io.to(message.members[0])
      .to(message.members[1])
      .emit('receive-message', message);
  });

  socket.on('clear-unread-messages', (data) => {
    io.to(data.members[0])
      .to(data.members[1])
      .emit('message-count-cleared', data);
  });

  socket.on('user-typing', (data) => {
    io.to(data.members[0])
      .to(data.members[1])
      .emit('started-typing', data);
  });

  socket.on('user-login', (userId) => {
    if (!onlineUsers.includes(userId)) {
      onlineUsers.push(userId);
    }
    socket.emit('online-user', onlineUsers);
  });

  socket.on('user-offline', (userId) => {
    const index = onlineUsers.indexOf(userId);
    if (index !== -1) onlineUsers.splice(index, 1);
    io.emit('online-users-active', onlineUsers);
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected');
  });
});



app.use((req, res, next) => {
  console.log("👉 Received Request:");
  console.log("Method:", req.method);
  console.log("Path:", req.path);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body); // ✅ Check this!
  next();
});

// Export the server (not the app!)
module.exports = server;
