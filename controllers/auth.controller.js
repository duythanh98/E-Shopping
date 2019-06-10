var userDB = require('../models/user');
var bcrypt = require('bcrypt');
var moment = require('moment');
var passport = require('passport');
var cartDB = require("../models/cart");

module.exports.payment = function(req,res){
    var sessionID = req.signedCookies.sessionID;

    Promise.all([cartDB.loadBySession(sessionID)]).then(([cart]) => {
      let total = 0;
      cart.forEach(x => {
          total += parseInt(x.ProCurrentPrice)* parseInt(x.ProAmount);
      });
      res.render('auth/payment',{
        cart: cart,
        total: total
      });
    })
  
}

module.exports.register = function(req,res,next) {
    res.render('auth/register');
}

module.exports.postRegister = function(req,res,next){
    var saltRounds = 10;
    var hash = bcrypt.hashSync(req.body.password,saltRounds);
    var dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
  
    var entity = {
        CliUserName: req.body.username,
        CliPassword: hash,
        CliName: req.body.name,
        CliEmail: req.body.email,
        CliDateOfBirth : dob,
        Permission: 0
    }

    userDB.add(entity).then(id => {
        console.log(id);
        res.redirect('/auth/login');
    })
}

module.exports.isAvailable = function(req,res){

    var user = req.query.username;
    userDB.singleByUsername(user).then(rows => {
        if ( rows.length > 0)
        {
            return res.json(false);
        }
        return res.json(true);
    })

}

module.exports.login = function(req,res,next){
  res.render('auth/login', {
      err_message: ''
  });
}

module.exports.postLogin = function(req,res,next){
  passport.authenticate('local', (err, user, info) => {
      if (err)
        return next(err);
  
      if (!user) {
        return res.render('auth/login', {
          err_message: info.message
        })
      }
  
      req.logIn(user, err => {
        if (err)
          return next(err);
  
        return res.redirect("/");
      });
    })(req, res, next);
}

module.exports.profile = function(req,res,next){
   res.end('profile');
}

module.exports.logout = function (req,res,next) {
  req.logOut();
  res.redirect('/auth/login');
}

