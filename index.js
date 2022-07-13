// IMPORTS
// ===============================================================================
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require('compression');


// CONFIGS
// ===============================================================================

// EXPRESS JS
// ===============================================================================

// APP
const app = express();
app.use(cors()); //cors (expressjs)
app.use(express.json({
    limit:'2mb' //REQ SIZE LIMIT
}));
app.use(helmet()); //helmet (expressjs)
app.use(compression()); //compression (expressjs)

 

// ROUTES
// ===============================================================================


// MISC ROUTES
// ===============================================================================
const project_alias = 'test_api';
app.get('/', (req, res)=>{
    res.send("pong");
});


// MAIN ROUTES
// ===============================================================================

// ROUTE IMPORT
const r_jobs = require('./core/dev/routes/jobs/request');
const r_auth = require('./core/dev/routes/auth/request');

// ROUTE IMPLEMENTATION
app.use("/" + project_alias + r_jobs.route_name, r_jobs.router);
app.use("/" + project_alias + r_auth.route_name, r_auth.router);



// EXPORTS
// ===============================================================================
module.exports = app;