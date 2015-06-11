var express = require('express');
var router = express.Router();

var home = require("../handler/home");



/*
 routes - the router of url request
 */


/* GET home page. */
router.get('/', home.showHome);
router.post('/upload', home.upload)

module.exports = router;
