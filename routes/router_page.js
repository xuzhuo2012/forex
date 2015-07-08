var express = require('express');
var router = express.Router();

var home = require("../handler/home");
var user = require("../handler/user");



/*
 routes - the router of url request
 */


/* GET home page. */

router.post('/upload', home.upload);
router.post('/user/signup', user.signup);
router.get('/user/signupDone', user.signupDone);

router.get('/pages/*', home.showPage);
router.post('/TG', home.upload);

//router.get('/service/*', service.)

module.exports = router;
