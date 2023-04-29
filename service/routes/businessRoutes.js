const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth");
const {
  createBusiness,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
  getBusinesses,
  searchBusinesses,
  updateWaitlist,
  addCustomerToWaitlist,
} = require("../controllers/businessController");

// Place the search route before the :id route
router.get("/search", searchBusinesses);
router.post("/:id/waitlist", isAuthenticated, addCustomerToWaitlist);

router.put("/:id/waitlist", isAuthenticated, updateWaitlist);

router.post("/", isAuthenticated, createBusiness);
router.get("/:id", isAuthenticated, getBusinessById);
router.put("/:id", isAuthenticated, updateBusiness);
router.delete("/:id", isAuthenticated, deleteBusiness);
router.get("/", isAuthenticated, getBusinesses);

module.exports = router;
