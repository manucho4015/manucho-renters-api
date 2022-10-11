require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      type: Number,
      required: [true, "Please provide phone number"],
      maxlength: 20,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      maxlength: 20,
    },
  },
  { timestamps: true }
);

LandlordSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

LandlordSchema.methods.createJWT = function () {
  return jwt.sign(
    { landlordId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

LandlordSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("Landlord", LandlordSchema);
