
  
// IMPORTS
// ===============================================================================
const jwt = require('jsonwebtoken');

// Generate Token
// ===============================================================================
function generateAccessToken(
    user_data
){

    let success;
    let access_token;

    try {

        access_token = jwt.sign(
            user_data,
            "koderahasia123", //CAN STORE SOMEWHERE PROPER
            {
                expiresIn: '30m',
                algorithm: "HS256"
            }
        )

        success = true;

    } catch(err){
        console.log(err.message);
        access_token = err.message;
        success = false;
    }

    return [success, access_token];

}

// Vetify Token
// ===============================================================================
function verifyAccessToken(access_token){

    let success;
    let valid_data;

    try {

        valid_data = jwt.verify(
            access_token,
            "koderahasia123", //CAN STORE SOMEWHERE PROPER
            {
                algorithm: "HS256"
            }
        );

        success = true;

    } catch(err){

        console.log(err.message);
        valid_data = err.message;
        success = false;

        // EXPIRED
        if(err.name == "TokenExpiredError"){
            success = true;
            valid_data = "TokenExpiredError";
        }
    }

    return [success, valid_data];

}


// EXPORTS
// ===============================================================================
exports.generateAccessToken = generateAccessToken;
exports.verifyAccessToken = verifyAccessToken;