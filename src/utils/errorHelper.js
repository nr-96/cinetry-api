function ApplicationError({
  message = 'Unknown error',
  statusCode = 500,
  caller = 'unknown'
} = {}) {
  console.trace(`ApplicationError from ${caller}; ${statusCode}: ${message}`);
  Error.captureStackTrace(this, this.constructor);
  this.statusCode = statusCode;
  this.message = message;
  this.caller = caller;
}

ApplicationError.prototype = Object.create(Error.prototype);
ApplicationError.prototype.constructor = ApplicationError;

module.exports = ApplicationError