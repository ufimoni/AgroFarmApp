const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage(); // store file in memory for Cloudinary stream

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|mp4/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file format. Only images and short videos allowed.'));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 30 * 1024 * 1024 }, // Max 30MB
  fileFilter
});

module.exports = upload;