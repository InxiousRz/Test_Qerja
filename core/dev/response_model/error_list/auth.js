const CORE_ERROR_CLASS = require('../core_error');

// Missing / Invalid Token
class InvalidTokenError extends CORE_ERROR_CLASS {
  constructor(err_data) {
    super();
    this.error_key = "TOKEN_INVALID_ERROR";
    this.error_message = "Token is either missing or invalid";
    this.error_data = err_data;
    this.http_status_code = 401;
    // this.http_status_code = -; // Default on Core Class
  }
}

// Default FOR Expired Token
class ExpiredTokenError extends CORE_ERROR_CLASS { 
  constructor(err_data) {
    super();
    this.error_key = "TOKEN_EXPIRED_ERROR";
    this.error_message = "Token is expired";
    this.error_data = err_data;
    this.http_status_code = 401;
    // this.http_status_code = -; // Default on Core Class
  }
}


exports.InvalidTokenError = InvalidTokenError;
exports.ExpiredTokenError = ExpiredTokenError;