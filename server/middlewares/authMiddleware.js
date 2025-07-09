const jwt = require('jsonwebtoken');
const Users = require('./../models/userModel');

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.token; // read token from cookies

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decodedToken = jwt.verify(token, process.env.Secret_Key); // verify token

    const user = await Users.findById(decodedToken.userId).select('-password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    // Attach user doc plus a userId field to keep backward compatibility
    req.user = {
      ...user._doc,
      userId: user._id.toString()
    };

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};
