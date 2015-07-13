var express = require('express');
var router = express.Router();

var home = require("../app/handler/home");
var user = require("../app/handler/user");
var index = require("../app/handler/index");



//index
router.get('/', index.showIndex);

//home
router.get('/home', user.signinRequired, home.showHome);
router.post('/upload', user.signinRequired, home.upload);


/* GET home page. */
router.get('/pages/*', home.showPage);
router.post('/TG', home.upload);

//router.get('/service/*', service.)

// User router
router.post('/user/signup', user.signup);
router.post('/user/signin', user.signin);
router.get('/signin', user.showSignin);
router.get('/signup', user.showSignup);
router.get('/logout', user.logout);
// router.get('/admin/user/list', user.signinRequired, user.adminRequired, user.list);


module.exports = router;
