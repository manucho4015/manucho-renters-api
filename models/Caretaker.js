require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

CaretakerSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

LandlordSchema.methods.createJWT = function () {
  return jwt.sign(
    { caretakerId: this._id, name: this.name, landlord: this.createdBy },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

CaretakerSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Caretaker", CaretakerSchema);
