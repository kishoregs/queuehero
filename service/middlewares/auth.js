const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to check if the user is authenticated
exports.isAuthenticated = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
   

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication required" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);



    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication required" });
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "Authentication required" });
  }
};
