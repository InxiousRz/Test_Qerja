

class SuccessResponse {
    constructor(data=null){
        this.message = "Success";
        this.data = data;
        this.http_status_code = 200;
    }

    formResponse(){
        return {
            "message": this.message,
            "data": this.data
        };
    }
}



module.exports = SuccessResponse;