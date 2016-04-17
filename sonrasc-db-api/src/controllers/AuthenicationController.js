import Passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/User';

Passport.serializeUser((user, done) => done(null, user.id));

Passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user));
});

const findUser = (req, username, password, callback) => {
  return User.findOne({ username }, (usernameError, user) => {
      if (usernameError) return callback(usernameError);
      if (user) return callback(null, false);
      else return User.createUser(req, callback);
    }
  );
};

const loginUser = (req, username, password, callback) => {
  User.findOne({ username }, (err, user) => {
    if (err) return callback(err);
    if (!user) return callback(null, false);
    if (!user.validPassword(password)) return callback(null, false);
    return callback(null, user);
  })
};

Passport.use('local-signup', new LocalStrategy({ passReqToCallback: true },
  (req, username, password, callback) => process.nextTick(() => findUser(req, username, password, callback))
));

Passport.use('local-login', new LocalStrategy({ passReqToCallback: true },
  (req, username, password, callback) => process.nextTick(() => loginUser(req, username, password, callback))
));

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
};

export default {
  isAuthenticated
};
