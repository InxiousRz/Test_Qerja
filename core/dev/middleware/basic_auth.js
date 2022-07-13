
// IMPORTS
// ===============================================================================
const verifyAccessToken = require("../utilities/token").verifyAccessToken;


// MODELS
// ===============================================================================
const expiredTokenError = require("../response_model/error_list/auth").ExpiredTokenError;
const invalidTokenError = require("../response_model/error_list/auth").InvalidTokenError;


function getUIDFromHeader(req){
    /**
     * @TODO Edge and Internet Explorer do some weird things with the headers
     * So I believe that this should handle more 'edge' cases ;)
     */

    console.log(req.headers);
    let header_target = "authorization";
    header_target = header_target.toLowerCase();
    if (req.headers[header_target]){
      return req.headers[header_target].toString().split("Bearer ")[1];
    }
    return null;
}

async function userMiddleware(req, res, next){
  
    const auth_token = getUIDFromHeader(req);
  
    if (auth_token == undefined || auth_token == null){
      const message = new invalidTokenError({
        "Request_Headers": req.headers
      });

      res.status(message.http_status_code).json(message.formResponse());
      return; //END
  
    } else {
  
      let [validate_success, validate_result] = verifyAccessToken(
        auth_token
      )
  
      if(!validate_success){
        console.log(validate_result);
        const message = new invalidTokenError({
          "Request_Headers": req.headers
        });
  
        res.status(message.http_status_code).json(message.formResponse());
        return; //END
      }
  
  
      if(validate_result == "TokenExpiredError"){
        console.log(validate_result);
        const message = new expiredTokenError({
          "Request_Headers": req.headers
        });
  
        res.status(message.http_status_code).json(message.formResponse());
        return; //END
      }  
  
      // PASS SOME DATA
      // ==================================================
      res.locals.curr_author_data = validate_result;
      console.log(validate_result)
  
      //==========================================
  
      //NEXT 
      next();
  
  
    }
  
  }
  
  //EXPORTS
  exports.userMiddleware = userMiddleware;