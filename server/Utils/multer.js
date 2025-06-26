const multer = require('multer');

// Use memory storage so files are kept in memory as Buffer
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 30 * 1024 * 1024, // max file size 30MB (adjust if needed)
  },
});

module.exports = upload;
