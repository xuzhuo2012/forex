/*

  -*- coding:utf-8 -*-

 */

var fs = require("fs");

var mongoose = require('mongoose');
var TransactionGroup = mongoose.model('TransactionGroup');

exports.showPage = function(req, res, next) {
    console.log("Request handler 'showPage' was called.");
    res.render("pages/"+req.params[0], {
        title: '汇自在 --- 外汇统计，复盘'
    });
};

/**
 * show login page
 * @param  {object}   req  the request object
 * @param  {object}   res  the response object
 * @param  {Function} next the next handler
 * @return {null}
 */

// index page
exports.showHome = function(req, res) {
    console.log('handler home.showHome was called');

    TransactionGroup.fetchByOwner(req.session.user.username, function(err, tgs){
        if (err) {
            console.log(err);
        }

        res.render('home', {
            title: '云单 --- 分析保存历史交易',
            user : req.session.user,
            tgs: tgs
        })
    });

};
