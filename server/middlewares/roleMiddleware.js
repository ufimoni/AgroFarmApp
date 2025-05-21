//// This is a role middleware here  
// middlewares/roleMiddleware.js
const User = require('./../models/userModel')
module.exports = (allowedRoles) => {
  return async (req, res, next) => {
    const user = await User.findById(req.userId);
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    next();
  };
};
