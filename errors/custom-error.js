class CustomAPIError extends Error {
  constructor(statusCode, msg) {
    super(msg);
    this.statusCode = statusCode;
    this.msg = msg;
  }
}

module.exports = CustomAPIError;
