const { StatusCodes } = require("http-status-codes");

const CustomAPIError = require("../errors/custom-error");

const errorHandler = async (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.msg });
  }
};

module.exports = errorHandler;
