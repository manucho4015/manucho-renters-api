const Landlord = require("../models/Landlord");
const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors/custom-error");
const { StatusCodes } = require("http-status-codes");

const auth = (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomAPIError(StatusCodes.UNAUTHORIZED, "No valid token");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { landlordId: payload.landlordId, name: payload.name };
    next();
  } catch (error) {
    throw new CustomAPIError(
      StatusCodes.UNAUTHORIZED,
      "Authentication invalid"
    );
  }
};

module.exports = auth;
