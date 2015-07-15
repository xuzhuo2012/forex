/**
 * Created by Terry on 2015/7/13.
 */
var mongoose = require('mongoose');
var TransactionGroup = mongoose.model('TransactionGroup');

// tg page
exports.showTG = function(req, res) {
    console.log('handler transaction_group.showTG was called');

    var id = req.params.id;
    TransactionGroup.findById(id, function(err, tg){
        res.render('tg', {
            title: '交易组详情',
            user : req.session.user,
            tg : tg
        });
    });
};

exports.showMyTG = function(req, res) {
    console.log('handler transaction_group.showTG was called');

    var id = req.params.id;
    TransactionGroup.find({_id:id, owner:req.session.user.username}, function(err, tg){
        res.render('tg', {
            title: '交易组详情',
            user : req.session.user,
            tg : tg
        });
    });
};

exports.uploadTG = function(req, res, next) {
    console.log("Request handler 'transaction_group.uploadTG' was called.");
    var _tg = JSON.parse(req.body.tg);
    _tg.owner = req.session.user.username;
    var tg = new TransactionGroup(_tg);

    tg.calculate();

    tg.save(function (err) {
        console.log('enter save');
        if (err) {
            console.log(err)
        }

        res.redirect('/tg/' + tg._id);
    });
};
