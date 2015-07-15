var mongoose = require('mongoose');
var User = mongoose.model('User');

// signup
exports.showSignup = function(req, res) {
  console.log('handler user.showSignup was called');

  res.render('user/signup', {
    title: '注册页面',
    user : req.session.user
  });
};

exports.showSignin = function(req, res) {
  console.log('handler user.showSignin was called');

  res.render('user/signin', {
    title: '登录页面',
    user : req.session.user
  });
};

exports.signup = function(req, res) {
  console.log('handler user.signup was called');

  var _user = req.body.user;

  User.findOne({username: _user.username},  function(err, user) {
    if (err) {
      console.log(err);
    }

    if (user) {
      return res.redirect('/signin');
    }
    else {
      user = new User(_user);
      user.save(function(err, user) {
        if (err) {
          console.log(err);
          res.redirect('/signup');
        }

        req.session.user = _user;
        res.redirect('/home');
      });
    }
  });
};

// signin
exports.signin = function(req, res) {
  console.log('handler user.signin was called');

  var _user = req.body.user;
  var username = _user.username;
  var password = _user.password;

  User.findOne({username : username}, function(err, user) {
    if (err) {
      console.log(err);
    }

    if (!user) {
      return res.redirect('/signin');
    }

    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        console.log(err);
      }

      if (isMatch) {
        req.session.user = _user;
        var redirectURL = req.cookies.preURL || '';
        res.clearCookie("preURL");
        if (redirectURL) {
          return res.redirect(redirectURL);
        } else {
          return res.redirect('/home');
        }
      }
      else {
        return res.redirect('/signin');
      }
    });
  });
};

// logout
exports.logout =  function(req, res) {
  console.log('handler user.logout was called');
  delete req.session.user;
  //delete app.locals.user

  res.redirect('/');
};

// userlist page
exports.list = function(req, res) {
  User.fetch(function(err, users) {
    if (err) {
      console.log(err);
    }

    res.render('userlist', {
      title: 'imooc 用户列表页',
      users: users
    });
  });
};

// middleware for user
exports.signinRequired = function(req, res, next) {
  var user = req.session.user;

  if (!user) {
    var url = req.path;
    res.cookie("preURL",url);
    return res.redirect('/signin');
  }

  next();
};

exports.adminRequired = function(req, res, next) {
  var user = req.session.user;

  if (user.role <= 10) {
    return res.redirect('/signin');
  }

  next();
};