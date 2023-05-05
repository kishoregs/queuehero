const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, default: '000-000-0000' },
  password: { type: String, required: true },
  name: { type: String, required: true },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);