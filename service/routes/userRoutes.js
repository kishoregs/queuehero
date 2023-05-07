const express = require("express");
const router = express.Router();
const multer = require("multer");

const { isAuthenticated } = require("../middlewares/auth");
const { uploadProfilePhoto } = require("../controllers/userController");

const fs = require("fs");
const uploadsFolder = "uploads";

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
// "profilePhoto" is the field name in the form
router.post(
  "/profile-photo",
  isAuthenticated,
  upload.single("profilePhoto"),
  uploadProfilePhoto
);

module.exports = router;
