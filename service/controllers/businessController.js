const Business = require("../models/business");

// Create a new business
exports.createBusiness = async (req, res) => {
  try {
    const businessData = {
      ...req.body,
      ownerId: req.user._id,
    };

    const newBusiness = new Business(businessData);
    await newBusiness.save();

    res.status(201).json({ success: true, data: newBusiness });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get a single business by ID
exports.getBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res
        .status(404)
        .json({ success: false, message: "Business not found" });
    }

    res.status(200).json({ success: true, data: business });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a business by ID
exports.updateBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res
        .status(404)
        .json({ success: false, message: "Business not found" });
    }

    if (business.ownerId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({
          success: false,
          message: "You do not have permission to edit this business",
        });
    }

    Object.assign(business, req.body);
    await business.save();

    res.status(200).json({ success: true, data: business });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a business by ID
exports.deleteBusiness = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res
        .status(404)
        .json({ success: false, message: "Business not found" });
    }

    if (business.ownerId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({
          success: false,
          message: "You do not have permission to delete this business",
        });
    }

    await business.remove();

    res
      .status(200)
      .json({ success: true, message: "Business deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
