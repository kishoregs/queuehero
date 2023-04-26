const jwt = require("jsonwebtoken");

// ...Other code...

exports.login = async (req, res) => {
  // Validate user credentials and find the user in the database

  // Generate the JWT token
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Save the token to the user's document in the database (optional)

  // Send the token and user information to the frontend
  res.status(200).json({ success: true, token, user });
};
