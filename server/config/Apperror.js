export class AppError extends Error {
  constructor(message, statusCode, code) {
    //calls constructor of Error class to create error object with message string
    super(message || "Internal server error occurred. Please try again later.");

    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
