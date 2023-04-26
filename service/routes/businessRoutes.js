const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const {
  createBusiness,
  getBusiness,
  updateBusiness,
  deleteBusiness,
} = require("../controllers/businessController");

router.post("/", isAuthenticated, createBusiness);
router.get("/:id", isAuthenticated, getBusiness);
router.put("/:id", isAuthenticated, updateBusiness);
router.delete("/:id", isAuthenticated, deleteBusiness);

module.exports = router;
