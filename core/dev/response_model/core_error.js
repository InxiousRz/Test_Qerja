

class ErrorResponse {
    constructor(){
        this.message = "Failed";
        this.error_key = null;
        this.error_message = null;
        this.error_data = null;
        this.http_status_code = 200;
    }

    formResponse(){
        return {
            "message": this.message,
            "error_key": this.error_key,
            "error_message": this.error_message,
            "error_data": this.error_data
        };
    }
}



module.exports = ErrorResponse;