// controllers/businessController.js
const Business = require("../models/business");

exports.getBusinesses = async (req, res) => {
  try {
    const ownerId = req.query.ownerId;

    // If an ownerId is provided, filter businesses by the ownerId
    const query = ownerId ? { ownerId: ownerId } : {};

    const businesses = await Business.find(query);
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
    const { searchTerm, userId } = req.query;

    // Return an empty array if the search term is empty
    if (!searchTerm) {
      return res.json([]);
    }

    // Create a case-insensitive regular expression for the search term
    const searchTermRegex = new RegExp(searchTerm, "i");

    const businesses = await Business.find({
      $or: [
        { location: searchTermRegex },
        { address: searchTermRegex },
        { name: searchTermRegex },
        { description: searchTermRegex },
        { services: searchTermRegex },
      ],
    });

    const averageServiceTime = 15;

    const businessesWithJoinStatus = businesses.map((business) => {
      const isJoined = business.waitlist.some(
        (entry) => entry.customerId.toString() === userId
      );

      // Calculate the estimated wait time for a new customer
      let estimatedWaitTime = 0;

      if (!isJoined) {
        // If the user has not joined and there are users already in the queue,
        // their wait time should be the total wait time plus the service time
        if (business.waitlist.length > 0) {
          estimatedWaitTime = business.waitlist.reduce(
            (acc, curr) => acc + curr.waitTime,
            0
          );
          estimatedWaitTime += averageServiceTime;
        }
      } else {
        // If the user has joined, their wait time should be the sum of the wait times of the users in front of them in the queue
        const index = business.waitlist.findIndex(
          (entry) => entry.customerId.toString() === userId
        );
        if (index >= 0) {
          estimatedWaitTime = business.waitlist
            .slice(0, index + 1)
            .reduce((acc, curr) => acc + curr.waitTime, 0);
        }
      }

      return {
        ...business.toObject(),
        isJoined,
        waitlistCount: business.waitlist.length,
        estimatedWaitTime,
      };
    });

    res.status(200).json({ businessesWithJoinStatus });
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
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;
    const waitTime = req.body.waitTime;

    // Add the customer to the waitlist
    business.waitlist.push({ customerId, name, phone, email, waitTime });
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
    res.send(business.waitlist);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.unjoinWaitlist = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).send("Business not found");
    }

    // Read the customerId from the query parameters
    const customerId = req.query.customerId;

    // Remove the customer from the waitlist
    business.waitlist = business.waitlist.filter(
      (entry) => entry.customerId.toString() !== customerId
    );
    await business.save();

    res.status(200).send(business.waitlist);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.joinWaitlist = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) {
      return res.status(404).send("Business not found");
    }

    // Assume req.body.customerId contains the customer's ID
    const customerId = req.body.customerId;
    const name = req.body.name;
    const phone = req.body.phone;
    const email = req.body.email;

    // Assume an average service time of 15 minutes
    const averageServiceTime = 15;

    // Calculate the wait time based on the current waitlist length and the average service time
    const currentWaitTime = business.waitlist.reduce((acc, curr) => {
      return acc + curr.waitTime;
    }, 0);

    // If it's the first customer, waitTime should be 0, otherwise currentWaitTime + averageServiceTime
    const waitTime =
      business.waitlist.length === 0 ? 0 : currentWaitTime + averageServiceTime;

    // Add the customer to the waitlist
    business.waitlist.push({ customerId, name, phone, email, waitTime });
    await business.save();

    // Calculate the estimated wait time for the customer
    const estimatedWaitTime = business.waitlist.reduce((acc, curr) => {
      return acc + curr.waitTime;
    }, 0);

    res.status(201).send({ waitlist: business.waitlist, estimatedWaitTime });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};
