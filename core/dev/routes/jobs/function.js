
  
// IMPORTS
// ===============================================================================
const axios = require('axios').default;

// GET Job List
// ===============================================================================
async function getJobList(
    current_page=null,
    description=null,
    location=null,
    full_time=null
){

    let success;
    let result;

    try{

        // VARS
        result = [];
        const limit = 10;

        //SEND REQUEST
        let req_result;
        let req_ok;
        await axios.get(
            "http://dev3.dansmultipro.co.id/api/recruitment/positions.json",
        ).then((response) => {
            req_ok = true;
            req_result = response.data;
            // console.log(response.data.length);
        }).catch((err) => {
            req_ok = false;
            console.log("3rd Party Request Fail : " + err);
        })

        // REQ FAIL
        if (req_ok == false){
            success = req_ok;
            return [success, result]; 
        }

        // FILTER
        req_result.forEach((element)=>{
            let desc_filter_ok = null;
            if(description != null){
                desc_filter_ok = (element["description"].toString().toLowerCase().indexOf(description.toLowerCase()) != -1);
            }

            let location_filter_ok = null;
            if(location != null){
                location_filter_ok = (element["location"].toString().toLowerCase().indexOf(location.toLowerCase()) != -1);
            }

            let full_time_filter_ok = null;
            if(full_time != null){
                if (full_time == true){
                    full_time_filter_ok = (element["type"] == "Full Time");
                } else if (full_time == false){
                    full_time_filter_ok = (element["type"] != "Full Time");
                }
            }

            if ((desc_filter_ok == null || desc_filter_ok == true) &&
            (location_filter_ok == null || location_filter_ok == true) &&
            (full_time_filter_ok == null || full_time_filter_ok == true)){
                result.push(element);
            }
        });

        success = true;
        if (current_page != null){
            if (((current_page - 1) * limit) + 1 > result.length){
                return [success, result]; 
            } else {
                let offset = Math.max(((( current_page - 1)  * limit)), 0);
                result = result.slice(offset, offset + 10);
            }
        } else {
            return [success, result]; 
        }
        

        return [success, result]; 

    } catch(err){

        console.log(err.message);
        success = false;
        result = err.message;

    }
    
    // RETURN
    return [success, result];   


}

// GET Job Detail
// ===============================================================================
async function getJobDetail(
    id
){

    let success;
    let result;

    try{

        //SEND REQUEST
        let req_result;
        let req_ok;
        await axios.get(
            `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`,
        ).then((response) => {
            req_ok = true;
            req_result = response.data;
            console.log(response.data.length);
        }).catch((err) => {
            req_ok = false;
            console.log("3rd Party Request Fail : " + err);
        })

        // REQ FAIL
        if (req_ok == false){
            success = req_ok;
            return [success, result]; 
        }

        success = true;
        result = req_result;
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
exports.getJobList = getJobList;
exports.getJobDetail = getJobDetail;