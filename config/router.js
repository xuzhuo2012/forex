var express = require('express');
var router = express.Router();

var home = require("../app/handler/home");
var user = require("../app/handler/user");
var index = require("../app/handler/index");
var tg = require("../app/handler/transaction_group");



//index
router.get('/', index.showIndex);

//home
router.get('/home', user.signinRequired, home.showHome);


/* GET home page. */
router.get('/tg/:id', tg.showTG);
router.post('/tg', user.signinRequired, tg.uploadTG);
router.get('/pages/*', user.signinRequired, home.showPage);

//router.get('/service/*', service.)

// User router
router.post('/user/signup', user.signup);
router.post('/user/signin', user.signin);
router.get('/signin', user.showSignin);
router.get('/signup', user.showSignup);
router.get('/logout', user.logout);
// router.get('/admin/user/list', user.signinRequired, user.adminRequired, user.list);


module.exports = router;
