const mongoose = require("mongoose");

const businessSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  description: String,
  address: String,
  contactEmail: String,
  contactPhone: String,
  hours: String,
  services: [String],
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  waitlist: [
    {
      customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      waitTime: { type: Number, default: 0 },
    },
  ],
});

module.exports = mongoose.model("Business", businessSchema);
