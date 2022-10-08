const { StatusCodes } = require("http-status-codes");
const unirest = require("unirest");

const CustomAPIError = require("../errors/custom-error");

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

module.exports = {
  loginOwner,
};
