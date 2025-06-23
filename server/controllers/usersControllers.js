const Users = require('./../models/userModel');
const asyncErrorHandler = require('./../middlewares/asyncErrorHandler');
exports.getUserDetails = asyncErrorHandler(async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.send({
        message: "User ID is missing from auth token",
        success: false,
      });
    }

    const user = await Users.findById(userId).select("-password");

    if (!user) {
      return res.send({
        message: "User does not exist",
        success: false,
      });
    }

    res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      success: false,
      message: error.message,
    });
  }
});


exports.getAllUsers = asyncErrorHandler(async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const loggedInUserRole = req.user.role;

    const roleFilter = req.query.role; // e.g., "agric-expert", "farm-manager"

    const query = {
      _id: { $ne: loggedInUser },
      role: { $ne: loggedInUserRole }, // exclude same role
    };

    if (roleFilter) {
      query.role = roleFilter; // filter only users with this role
    }

    const users = await Users.find(query).select('-password');

    res.send({
      success: true,
      message: "Users successfully fetched",
      users,
    });
  } catch (error) {
    console.log("Failed to fetch users:", error);
    res.send({
      success: false,
      message: "Failed to fetch users",
    });
  }
});

