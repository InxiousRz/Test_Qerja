// IMPORTS
// ===============================================================================
const express = require('express');
const joi = require('joi');

// MIDDLEWARES
// ===============================================================================
const userMiddleware = require("../../middleware/basic_auth").userMiddleware;

// MODELS
// ===============================================================================
const internalErrorResponse = require("../../response_model/error_list/basic").InternalError;
const paramErrorResponse = require("../../response_model/error_list/basic").ParamError;

// FUNCTIONS
// ===============================================================================
const getJobList = require("./function").getJobList;
const getJobDetail = require("./function").getJobDetail;

// CONFIGS
// ===============================================================================


// VARS
// ===============================================================================
const router = express.Router();

// FOR '/jobs'
const head_route_name = '/jobs';


// ROUTES
// ===============================================================================

//------------------------------------------------------------------------
// GET Job List 
//------------------------------------------------------------------------
router.get(
    '/get',
    userMiddleware,
    async (req, res) => {

        // VARS
        //=============================================================
        const url_query = req.query;

        // JOI VALIDATION [REQ PARAM]
        //=============================================================
        let joi_schema = joi.object({
            "description": joi.string().default(null),
            "location": joi.string().default(null),
            "full_time": joi.string().allow('true', 'false').default(null),

            // PAGINATION
            "page": joi.number().min(1).default(null)
        }).required();

        let joi_valid = joi_schema.validate(url_query);
        if (joi_valid.error){
            const message = new paramErrorResponse(
                joi_valid.error.stack,
                joi_valid.error.details
            );

            res.status(message.http_status_code).json(message.formResponse());
            return; //END
        }

        // PARAMETER
        //=============================================================
        let description = joi_valid.value["description"];
        let location = joi_valid.value["location"];
        let full_time;
        if (joi_valid.value["full_time"] == null){
            full_time = null;
        } else {
            full_time = joi_valid.value["full_time"] == 'true' ? true : false
        }
        let current_page = joi_valid.value["page"];

        // GET DATA BY SEARCH
        //=============================================================
        let [get_success, get_result] = await getJobList(
            current_page,
            description,
            location,
            full_time
        );

        // QUERY FAILS
        if (!get_success){
            console.log(get_result);
            const message = new internalErrorResponse(
                get_result,
                "On Func : getJobList"
            );

            res.status(message.http_status_code).json(message.formResponse());
            return; //END
        }


        // ASSEMBLY RESPONSE
        //=============================================================
        console.log(get_result.length);
        res.status(200).json(get_result);
        return; //END
    
});

//------------------------------------------------------------------------
// GET Job Detail
//------------------------------------------------------------------------
router.get(
    '/get/:id',
    userMiddleware,
    async (req, res) => {

        // VARS
        //=============================================================

        // JOI VALIDATION [ID]
        //=============================================================
        let joi_schema_id = joi.string().required();

        let joi_valid_id = joi_schema_id.validate(req.params.id);
        if (joi_valid_id.error){
            const message = new paramErrorResponse(
                joi_valid_id.error.stack,
                joi_valid_id.error.details
            );

            res.status(message.http_status_code).json(message.formResponse());
            return; //END
        }

        // PARAMETER
        //=============================================================
        let id = joi_valid_id.value;

        // GET BY ID
        //=============================================================
        let [get_success, get_result] = await getJobDetail(
            id
        );

        // QUERY FAILS
        if (!get_success){
            console.log(get_result);
            const message = new internalErrorResponse(
                get_result,
                "On Func : getJobDetail"
            );

            res.status(message.http_status_code).json(message.formResponse());
            return; //END
        }

        // ASSEMBLY RESPONSE
        //=============================================================
        res.status(200).json(get_result);
        return; //END
    
});

// EXPORTS
// ===============================================================================
module.exports = {
    route_name: head_route_name,
    router: router
}