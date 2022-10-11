const { StatusCodes } = require("http-status-codes");
const unirest = require("unirest");

const CustomAPIError = require("../errors/custom-error");
const Landlord = require("../models/Landlord");
const Caretaker = require("../models/Caretaker");
const Tenant = require("../models/Tenant");

const loginOwner = async (request, response) => {
  let res_body = {};
  let res_error = null;
  let req_daraja = unirest(
    "GET",
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
  )
    .headers({
      Authorization: `Basic ${process.env.DARAJA_SECRET}`,
    })
    .send()
    .then((res) => {
      if (res.error) {
        console.log(res.error);
        return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          msg: "Internal server error. Please confirm credentials used are valid",
        });
      }
      let a1 = res.raw_body.split("\n")[1];
      let a2 = a1.split(":")[1];
      let a3 = a2.split(" ")[1];
      let a4 = a3.split(",")[0];
      let a5 = a4.slice(1, 29);

      response.status(StatusCodes.OK).json({
        msg: "success",
        access_token: a5,
      });
    });
};

const loginLandlord = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomAPIError(
      StatusCodes.BAD_REQUEST,
      "Please provide both email and password"
    );
  }
  const landlord = await Landlord.findOne({ email });

  if (!landlord) {
    throw new CustomAPIError(StatusCodes.NOT_FOUND, "User not found");
  }
  const isPasswordCorrect = await landlord.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomAPIError(StatusCodes.UNAUTHORIZED, "Invalid Password");
  }

  const token = landlord.createJWT();

  res
    .status(StatusCodes.OK)
    .json({ success: true, message: "logged in!", token });
};

const loginCaretaker = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomAPIError(
      StatusCodes.BAD_REQUEST,
      "Please provide both email and password"
    );
  }
  const caretaker = await Caretaker.findOne({ email });
  if (!caretaker) {
    throw new CustomAPIError(StatusCodes.UNAUTHORIZED, "User not found");
  }
  const isPasswordCorrect = await caretaker.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomAPIError(StatusCodes.UNAUTHORIZED, "Invalid Password");
  }

  res.status(StatusCodes.OK).json({ success: true, status: "logged in!" });
};
const loginTenant = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomAPIError(
      StatusCodes.BAD_REQUEST,
      "Please provide both email and password"
    );
  }
  const tenant = await Tenant.findOne({ email });
  if (!tenant) {
    throw new CustomAPIError(StatusCodes.UNAUTHORIZED, "User not found");
  }
  const isPasswordCorrect = await tenant.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomAPIError(StatusCodes.UNAUTHORIZED, "Invalid Password");
  }

  res.status(StatusCodes.OK).json({ success: true, status: "logged in!" });
};

module.exports = {
  loginOwner,
  loginLandlord,
  loginCaretaker,
  loginTenant,
};
