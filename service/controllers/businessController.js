// controllers/businessController.js
const Business = require("../models/Business");

exports.getBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find();
    res.json(businesses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching businesses" });
  }
};

exports.getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      res.status(404).json({ message: "Business not found" });
    } else {
      res.json(business);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching business" });
  }
};

exports.createBusiness = async (req, res) => {
  try {
    const business = new Business({ ...req.body, ownerId: req.user._id });
    await business.save();
    res.status(201).json(business);
  } catch (error) {
    res.status(500).json({ message: "Error creating business" });
  }
};

exports.updateBusiness = async (req, res) => {
  try {
    const business = await Business.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user._id },
      req.body,
      { new: true }
    );

    if (!business) {
      res.status(404).json({ message: "Business not found" });
    } else {
      res.json(business);
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating business" });
  }
};

exports.deleteBusiness = async (req, res) => {
  try {
    const business = await Business.findOneAndDelete({
      _id: req.params.id,
      ownerId: req.user._id,
    });

    if (!business) {
      res.status(404).json({ message: "Business not found" });
    } else {
      res.json({ message: "Business deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting business" });
  }
};

exports.searchBusinesses = async (req, res) => {
  try {
    const { location } = req.query;
    console.log('Received search request:', req.query);
    // if (!location) {
    //   return res.status(400).json({ error: "Location is required" });
    // }

    const businesses = await Business.find({ location });
    res.status(200).json({ businesses });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
