const mongoose = require("mongoose");

const LandlordSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: 100,
    },
    landlord: {
      type: String,
      required: [true, "Please provide landlord"],
      maxlength: 20,
    },
    expected_income: {
      type: Number,
      required: [true, "Please provide phone expected income"],
      maxlength: 20,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Landlord", LandlordSchema);
