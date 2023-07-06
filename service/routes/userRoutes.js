const express = require("express");
const router = express.Router();
const multer = require("multer");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../models/User"); // your user model

const { isAuthenticated } = require("../middlewares/auth");
const { uploadProfilePhoto } = require("../controllers/userController");

const fs = require("fs");
const uploadsFolder = "uploads";

const speakeasy = require('speakeasy');
const QRCode = require('qrcode');



if (!fs.existsSync(uploadsFolder)) {
  fs.mkdirSync(uploadsFolder);
}

// Configure multer to store images in a dedicated folder
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/profile-photo",
  isAuthenticated,
  upload.single("profilePhoto"),
  uploadProfilePhoto
);

router.post("/forgot-password", (req, res) => {
  // Generate and set password reset token
  let resetToken = crypto.randomBytes(32).toString("hex");
  const resetExpires = Date.now() + 3600000; // Token valid for 1 hour

  User.findOneAndUpdate(
    { email: req.body.email },
    {
      resetPasswordToken: resetToken,
      resetPasswordExpires: resetExpires,
    },
    { new: true }
  ).then((user) => {
    // send email with password reset link
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: user.email,
      subject: "QueueHero  | Link to reset your password",
      text:
        "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
        `http://localhost:3001/reset-password/${resetToken}\n\n` +
        "If you did not request this, please ignore this email and your password will remain unchanged.\n",
    };

    transporter.sendMail(mailOptions, function (err) {
      if (err) {
        console.error(err)
        return res.status(500).json({ error: "Error sending email" });
      }
      res.status(200).json({ message: "Reset link sent successfully" });
    });
  });
});

// Reset password

router.post("/reset-password/:token", async (req, res) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      console.error("Password reset token is invalid or has expired");
      return res
        .status(400)
        .json({ error: "Password reset token is invalid or has expired" });
    }

    // Set the new password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    // Save the updated user object
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Enable 2FA
router.post('/2fa/enable', isAuthenticated, async (req, res) => {
  try {

    const { email } = req.user;

    const dbUser = await User.findOne({ email });

    // Generate a secret key
    const secret = speakeasy.generateSecret({
      length: 20,
      name: `QueueHero:${dbUser.email}`, // Set the accountname to be the user's id (or email, or other unique identifier)
      issuer: 'QueueHero', // Set the issuer to be the name of your application
    });

    // Save the secret key to the user
    dbUser.twoFASecret = secret.base32;

     // Generate a QR code for the user to scan
     dbUser.twoFAQRCode  = await QRCode.toDataURL(secret.otpauth_url);

     await dbUser.save();    

     const user = await User.findOne({ email }).select('_id email name profilePhoto phone twoFAQRCode'); 

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while enabling 2FA.' });
  }
});

router.post('/2fa/disable', isAuthenticated, async (req, res) => {
  try {
    const { email } = req.user;

    const dbUser = await User.findOne({ email });

    // Remove the 2FA secret from the user
    dbUser.twoFASecret = null;
    dbUser.twoFAQRCode = null;
    await dbUser.save();

    const user = await User.findOne({ email }).select('_id email name profilePhoto phone twoFAQRCode'); 

    res.status(200).json({ message: "2FA disabled successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while disabling 2FA.' });
  }
});




module.exports = router;
