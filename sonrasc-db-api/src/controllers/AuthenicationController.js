import Passport from 'passport';
import { BasicStrategy } from 'passport-http';
import User from '../models/User';

Passport.use(new BasicStrategy(
  (username, password, callback) => {
    User.findOne({ username }, (usernameError, user) => {
      if (usernameError) return callback(usernameError);
      if (!user) return callback(null, false);

      user.verifyPassword(password, (passwordError, isMatch) => {
        if (passwordError) return callback(passwordError);
        if (!isMatch) return callback(null, false);
        return callback(null, user);
      });

    });
  }
));

const isAuthenticated = Passport.authenticate('basic', { session: true });
export default {
  isAuthenticated
};
