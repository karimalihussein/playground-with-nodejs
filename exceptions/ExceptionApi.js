const BaseError = require("./BaseError");

class ExceptionApi extends BaseError {
  constructor(
    name,
    httpStatusCode = 500,
    isOperational = true,
    description = "Internal server error"
  ) {
    super(name, httpStatusCode, isOperational, description);
  }
}