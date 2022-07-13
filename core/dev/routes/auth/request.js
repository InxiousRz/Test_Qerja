// IMPORTS
// ===============================================================================
const express = require('express');
const joi = require('joi');

// MIDDLEWARES
// ===============================================================================
// const accessControlLab = require("../../../middleware/middleware").accessControlLab

// MODELS
// ===============================================================================
const internalErrorResponse = require("../../response_model/error_list/basic").InternalError;
const paramErrorResponse = require("../../response_model/error_list/basic").ParamError;

// FUNCTIONS
// ===============================================================================
const login = require("./function").login;
const generateAccessToken = require("../../utilities/token").generateAccessToken;

// CONFIGS
// ===============================================================================


// VARS
// ===============================================================================
const router = express.Router();

// FOR '/auth'
const head_route_name = '/auth';


// ROUTES
// ===============================================================================

//------------------------------------------------------------------------
// POST Job List 
//------------------------------------------------------------------------
router.post(
    '/login',
    // accessControlLab,
    async (req, res) => {

        // VARS
        //=============================================================
        const req_body = req.body;

        // JOI VALIDATION [REQ PARAM]
        //=============================================================
        let joi_schema = joi.object({
            "username": joi.string().required(),
            "password": joi.string().required()
        }).required();

        let joi_valid = joi_schema.validate(req_body);
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
        let username = joi_valid.value["username"];
        let password = joi_valid.value["password"];

        // GET DATA BY SEARCH
        //=============================================================
        let [get_success, get_result] = await login(
            username,
            password
        );

        // QUERY FAILS
        if (!get_success){
            console.log(get_result);
            const message = new internalErrorResponse(
                get_result,
                "On Func : login"
            );

            res.status(message.http_status_code).json(message.formResponse());
            return; //END
        }

        // GENERATE TOKEN
        //=============================================================
        console.log(get_result)
        let [token_success, token_result] = await generateAccessToken(
            get_result
        );

        // QUERY FAILS
        if (!token_success){
            console.log(token_result);
            const message = new internalErrorResponse(
                token_result,
                "On Func : generateAccessToken"
            );

            res.status(message.http_status_code).json(message.formResponse());
            return; //END
        }

        // ASSEMBLY RESPONSE
        //=============================================================
        res.status(200).json({
            "User_Data": get_result,
            "Access_Token": token_result
        });
        return; //END
    
});

// EXPORTS
// ===============================================================================
module.exports = {
    route_name: head_route_name,
    router: router
}