var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var userDB = require('../models/user');

module.exports = function(app) {

  app.use(passport.initialize());
  app.use(passport.session());

  var ls = new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  }, (username, password, done) => {
    userDB.singleByUsername(username).then(rows => {
      if (rows.length === 0) {
        return done(null, false, { message: 'Invalid username.' });
      }

      var user = rows[0];
      console.log(username);
      console.log(password);
      console.log(bcrypt.hashSync(password,10));
      console.log(rows[0].CliPassword);
      var ret = bcrypt.compareSync(password,rows[0].CliPassword);
 
      console.log(ret);
      if (ret) {
        return done(null, user);
      }
      else{
        return done(null, false, { message: 'Invalid password.' });
      }

    }).catch(err => {
      return done(err, false);
    })
  });

  passport.use(ls);

  passport.serializeUser((user, done) => {
    return done(null, user);
  });

  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
}