const mongoose = require("mongoose");

const CaretakerSchema = new mongoose.Schema(
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
      type: Number,
      required: [true, "Please provide phone number"],
      maxlength: 15,
    },
    apartment: {
      type: String,
      required: [true, "Please provide apartment"],
      maxlength: 100,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      maxlength: 100,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Landlord",
      required: [true, "Please provide account number"],
      default: "634165dfa3fb4454c65bcfc4",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Caretaker", CaretakerSchema);
