const CORE_ERROR_CLASS = require('../core_error');

// Missing / Invalid Parameter
class ParamError extends CORE_ERROR_CLASS {
  constructor(err_message, err_data) {
    super();
    this.error_key = "PARAM_ERROR";
    this.error_message = err_message;
    this.error_data = err_data;
    // this.http_status_code = -; // Default on Core Class
  }
}

// Default FOR GET By ID
class IDError extends CORE_ERROR_CLASS { 
  constructor(err_message, err_data) {
    super();
    this.error_key = "ID_ERROR";
    this.error_message = "Can't found data with id : " + (err_message == null ? 'null' : err_message.toString());
    this.error_data = err_data;
    // this.http_status_code = -; // Default on Core Class
  }
}
  
// For Unknown / Undefined Error
class InternalError extends CORE_ERROR_CLASS { 
  constructor(err_message, err_data) {
    super();
    this.error_key = "INTERNAL_ERROR";
    this.error_message = err_message;
    this.error_data = err_data;
    // this.http_status_code = -; // Default on Core Class
  }
}


exports.ParamError = ParamError;
exports.IDError = IDError;
exports.InternalError = InternalError;