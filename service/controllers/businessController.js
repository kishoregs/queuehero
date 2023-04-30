// controllers/businessController.js
const Business = require("../models/business");

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
    console.log("Received search request:", req.query);
    // if (!location) {
    //   return res.status(400).json({ error: "Location is required" });
    // }

    const businesses = await Business.find({ location });
    res.status(200).json({ businesses });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.addCustomerToWaitlist = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).send("Business not found");
    }

    // Assume req.body.customerId contains the customer's ID and req.body.waitTime contains the wait time
    const customerId = req.body.customerId;
    const waitTime = req.body.waitTime;

    // Add the customer to the waitlist
    business.waitlist.push({ customerId, waitTime });
    await business.save();

    res.status(201).send(business.waitlist);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateWaitlist = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).send("Business not found");
    }

    // Update wait times for customers in the waitlist
    business.waitlist.forEach((customer) => {
      customer.waitTime -= req.body.timeElapsed;

      // Remove customers whose wait time has exceeded the maximum allowed wait time
      if (customer.waitTime <= 0) {
        business.waitlist.pull(customer);
      }
    });

    await business.save();

    res.status(200).send(business.waitlist);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get the waitlist for a business
exports.getWaitlist = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    const userIndex = business.waitlist.findIndex(
      (entry) => entry.user.toString() === req.params.userId
    );

    if (userIndex !== -1) {
      business.waitlist[userIndex].waitTime = req.body.waitTime;
      await business.save();
      res.send(business.waitlist[userIndex]);
    } else {
      res.status(404).send({ error: "User not found in waitlist" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
