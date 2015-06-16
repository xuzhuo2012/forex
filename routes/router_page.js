var express = require('express');
var router = express.Router();

var home = require("../handler/home");
var user = require("../handler/user");



/*
 routes - the router of url request
 */


/* GET home page. */
router.get('/', home.showHome);
router.post('/upload', home.upload);
router.post('/user/signup', user.signup);
router.get('/user/signupDone', user.signupDone);


module.exports = router;
