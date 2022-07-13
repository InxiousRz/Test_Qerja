
  
// IMPORTS
// ===============================================================================
const sql_db = require('../../../../db').db;

// Login
// ===============================================================================
async function login(
    username,
    password
){

    let success;
    let result;

    try{

        // USER
        let user_stmt =  sql_db.prepare(
            `
                SELECT 
                    user_id,    
                    username
                FROM user
                WHERE username = '${username}' AND password = '${password}'
            `
        );
        let user_data = user_stmt.get();
        if(!user_data){
            success = true;
            result = null;
            return [
                success,
                result
            ]; 
        }
        console.log('user login ok :: username : ' + user_data["username"]);
        success = true;
        result = user_data;

        return [success, result]; 

    } catch(err){

        console.log(err.message);
        success = false;
        result = err.message;

    }
    
    // RETURN
    return [success, result];   


}

// EXPORTS
// ===============================================================================
exports.login = login;