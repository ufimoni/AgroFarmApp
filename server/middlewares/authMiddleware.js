const jwt = require('jsonwebtoken');
const Users = require('./../models/userModel')
module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.token; // read token from cookies
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decodedToken = jwt.verify(token, process.env.Secret_Key); //  verify token
      const user = await Users.findById(decodedToken.userId).select('-password');
    req.body.userId = decodedToken.userId; // make userId accessible
      req.user = user
    next(); //  go to the next middleware/controller
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};


