const mongoose = require("mongoose");

const LandlordSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      maxlength: 20,
    },
    phone_number: {
      type: String,
      required: [true, "Please provide phone number"],
      maxlength: 20,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Landlord", LandlordSchema);
