const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.token; // read token from cookies
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decodedToken = jwt.verify(token, process.env.Secret_Key); //  verify token
    req.body.userId = decodedToken.userId; // make userId accessible

    next(); //  go to the next middleware/controller
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};


