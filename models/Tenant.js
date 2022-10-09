const mongoose = require("mongoose");

const TenantSchema = new mongoose.Schema(
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
    paybill: {
      type: String,
      required: [true, "Please provide paybill"],
      maxlength: 100,
    },
    account_number: {
      type: String,
      required: [true, "Please provide account number"],
      maxlength: 100,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      maxlength: 250,
    },
    status: {
      type: String,
      enum: ["up to date", "oderdue"],
      default: "up to date",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Caretaker",
      required: [true, "Please provide caretaker"],
      default: "6341708da4b3e94f6f4c7007",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tenant", TenantSchema);