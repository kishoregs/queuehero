const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const {
  createBusiness,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
  getBusinesses
} = require("../controllers/businessController");

router.post("/", isAuthenticated, createBusiness);
router.get("/:id", isAuthenticated, getBusinessById);
router.put("/:id", isAuthenticated, updateBusiness);
router.delete("/:id", isAuthenticated, deleteBusiness);
router.get("/", isAuthenticated, getBusinesses);

module.exports = router;
