const User = require("../models/User");

exports.uploadProfilePhoto = async (req, res) => {
  try {
    const userId = req.user._id;
    const profilePhotoPath = req.file.path;

    console.log("uploadProfilePhoto  - at server");

    // Update user's profile photo path in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePhoto: profilePhotoPath },
      { new: true }
    );

    res
      .status(200)
      .json({
        message: "Profile photo uploaded successfully!",
        user: updatedUser,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload profile photo." });
  }
};
