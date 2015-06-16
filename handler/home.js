/*

  -*- coding:utf-8 -*-

 */
var formidable = require("formidable");
var fs = require("fs");


/**
 * show login page
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next handler
 * @return {null}        
 */

exports.showHome = function(req, res, next) {
    console.log("Request handler 'showHome' was called.");
    res.render("home", {
        title: '汇自在 --- 外汇统计，复盘'
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
		    // res.write("received successfully:<br/>");
		    // res.end();
      //   });
		res.writeHead(200, {"Content-Type": "text/html"});
		res.write("received successfully!!!");
		res.end();	
    });
};
