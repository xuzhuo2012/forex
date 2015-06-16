/*

  -*- coding:utf-8 -*-

 */
var fs = require("fs");
var User = require("../model/user");

/**
 * show login page
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next handler
 * @return {null}        
 */

exports.signup = function(req, res, next) {
    console.log(req.body);

    if (req.body.username == "") {
    	res.end();
    }

    var newUser = {};
    newUser.username = req.body.username;
    newUser.password = req.body.password;

    User.addUser(newUser, function(err, rows) {
 		if (err) {
            console.log(err);
        }

        console.log("addUser result : ");
        console.log(rows);

        if (rows && rows.affectedRows > 0) {
            console.log('add user ' + newUser.username + ' succeed!');
            res.redirect('/');

        } else {
            console.log('add user ' + newUser.username + ' failed!');
            res.redirect('/');
        }
    });

};

exports.upload = function(req, res, next) {
    console.log("Request handler 'upload' was called.");

    var form = new formidable.IncomingForm();
    form.uploadDir = "../upload";
    console.log("about to parse");
    form.parse(req, function(error, fields, files) {
        console.log("parsing done");
        console.log(files.upload.path);
      //   fs.rename(files.upload.path, "../upload/test.xlsx", function(){
      //   	res.writeHead(200, {"Content-Type": "text/html"});
		    // res.write("received sucessfully:<br/>");
		    // res.end();
      //   });
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write("received successfully!!!");
		res.end();	
    });
};

exports.signupDone = function(req, res, next) {
    console.log("Request handler 'signupDone' was called.");

    res.render('signupDone',{
        title: '汇自在 --- 外汇统计，复盘'
    })
};
