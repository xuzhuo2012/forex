/**
 * Created by Terry on 2015/7/11.
 */

// index page
exports.showIndex = function(req, res) {
    console.log('handler index.showIndex was called');

    res.render('index', {
        title: '云单 --- 分析保存历史交易',
        user: req.session.user
    })
};

